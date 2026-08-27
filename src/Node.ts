import { EventEmitter } from 'node:events';
import { Rythra } from './Rythra';
import type { NodeOptions, Stats } from './Types';
import { Rest } from './Rest';
import { getLavalinkApiPath, getLavalinkApiVersion, type LavalinkApiVersion } from './protocol/LavalinkProtocol';
import WebSocket from 'ws';

/**
 * Represents a single Lavalink node connection managed by Rythra.
 *
 * @remarks
 * A node owns both the Lavalink REST client and WebSocket connection. It is
 * also responsible for API-version detection, session resumption and retrying
 * interrupted connections.
 *
 * @extends EventEmitter
 */
export class Node extends EventEmitter {
    /** The Rythra manager that owns this node. */
    public readonly manager: Rythra;
    /** The configuration used to connect to Lavalink. */
    public readonly options: NodeOptions;
    /** The version-aware REST client for this node. */
    public readonly rest: Rest;
    /** The active Lavalink WebSocket, or `null` when disconnected. */
    public ws: WebSocket | null = null;
    /** The most recently received Lavalink statistics payload. */
    public stats: Stats = {
        players: 0,
        playingPlayers: 0,
        uptime: 0,
        memory: { free: 0, used: 0, allocated: 0, reservable: 0 },
        cpu: { cores: 0, systemLoad: 0, lavalinkLoad: 0 },
    };
    /** The Lavalink session ID used for session resumption. */
    public sessionId: string | null = null;
    /** Whether the node currently has an open WebSocket connection. */
    public connected = false;
    /** The Lavalink API generation selected for this node. */
    public apiVersion: LavalinkApiVersion | null = null;

    /** Timer used for a pending reconnect attempt. */
    private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    /** Number of reconnect attempts made since the last successful connection. */
    private reconnectAttempts = 0;
    /** Prevents automatic reconnecting after an explicit disconnect. */
    private manuallyDisconnected = false;

    /**
     * Creates a Lavalink node.
     *
     * @param manager The Rythra manager that owns the node.
     * @param options Node connection and protocol configuration.
     */
    constructor(manager: Rythra, options: NodeOptions) {
        super();
        this.manager = manager;
        this.options = {
            ...options,
            lavalinkVersion: options.lavalinkVersion ?? manager.options.lavalinkVersion,
        };
        this.apiVersion = this.options.lavalinkVersion === 'auto' || this.options.lavalinkVersion === undefined
            ? null
            : this.options.lavalinkVersion;
        this.rest = new Rest(this);
    }

    /**
     * Gets the base REST API URL for the selected Lavalink generation.
     *
     * @remarks
     * The URL is evaluated dynamically so automatic protocol detection can
     * select the correct generation before the first REST request.
     */
    public get restUrl(): string {
        const protocol = this.options.secure ? 'https' : 'http';
        const port = this.options.port ? `:${this.options.port}` : '';
        const apiVersion = this.apiVersion ?? 4;
        return `${protocol}://${this.options.host}${port}${getLavalinkApiPath(apiVersion)}`;
    }

    /** The WebSocket URL for the selected Lavalink generation. */
    private get websocketUrl(): string {
        const protocol = this.options.secure ? 'wss' : 'ws';
        const port = this.options.port ? `:${this.options.port}` : '';
        const apiVersion = this.apiVersion ?? 4;
        return `${protocol}://${this.options.host}${port}${getLavalinkApiPath(apiVersion)}/websocket`;
    }

    /**
     * Detects the Lavalink server API generation when automatic detection is enabled.
     *
     * @returns A promise that resolves once the API generation has been selected.
     * @throws {Error} If the version endpoint cannot be reached or the version is unsupported.
     */
    private async detectVersion(): Promise<void> {
        if (this.apiVersion) return;

        const protocol = this.options.secure ? 'https' : 'http';
        const port = this.options.port ? `:${this.options.port}` : '';
        const url = `${protocol}://${this.options.host}${port}/version`;
        const response = await fetch(url, {
            headers: { Authorization: this.options.password || 'youshallnotpass' },
            signal: AbortSignal.timeout((this.manager.options.restTimeout || 10) * 1000),
        });

        if (!response.ok) throw new Error(`Unable to detect Lavalink version (${response.status})`);

        const version = (await response.text()).trim();
        this.apiVersion = getLavalinkApiVersion(version);
        this.emit('version', this.apiVersion, version);
    }

    /**
     * Opens a WebSocket connection to Lavalink.
     *
     * @remarks
     * The node detects its API generation first when configured with `auto`.
     * Existing session IDs are sent to allow Lavalink session resumption.
     */
    public async connect(): Promise<void> {
        this.manuallyDisconnected = false;
        if (this.connected || this.ws) return;

        try {
            await this.detectVersion();
        } catch (error) {
            this.emit('error', error);
            this.scheduleReconnect();
            return;
        }

        const headers: Record<string, string> = {
            Authorization: this.options.password || 'youshallnotpass',
            'Client-Name': `${this.manager.options.clientName || 'Rythra'}/${this.manager.version}`,
            'User-Id': this.manager.options.clientId || this.manager.options.connector.getId() || '',
        };

        if (this.sessionId) headers['Session-Id'] = this.sessionId;

        this.ws = new WebSocket(this.websocketUrl, {
            headers,
            rejectUnauthorized: this.options.rejectUnauthorized ?? true,
        } as WebSocket.ClientOptions);

        this.ws.onopen = () => {
            this.connected = true;
            this.reconnectAttempts = 0;
            this.emit('connect');
        };

        this.ws.onmessage = (event: WebSocket.MessageEvent) => {
            try {
                const data = JSON.parse(event.data.toString());
                if (data.op === 'ready') {
                    this.sessionId = data.sessionId;
                    this.emit('ready', data);
                } else if (data.op === 'stats') {
                    this.stats = data;
                    this.emit('stats', data);
                } else if (data.op === 'playerUpdate') {
                    const player = this.manager.players.get(data.guildId);
                    if (player) player.emit('playerUpdate', data);
                } else if (data.op === 'event') {
                    const player = this.manager.players.get(data.guildId);
                    if (player) player.emit(data.type, data);
                    this.emit('event', data);
                }
            } catch (error) {
                this.emit('error', error);
            }
        };

        this.ws.onclose = () => {
            this.ws = null;
            this.connected = false;
            this.emit('disconnect');
            if (!this.manuallyDisconnected) this.scheduleReconnect();
        };

        this.ws.onerror = (err: WebSocket.ErrorEvent) => {
            this.emit('error', err);
        };
    }

    /**
     * Schedules a reconnect attempt while respecting the configured retry limit.
     */
    private scheduleReconnect(): void {
        if (this.manuallyDisconnected || this.reconnectTimer) return;

        const maxAttempts = this.options.retryAmount ?? Infinity;
        if (this.reconnectAttempts >= maxAttempts) {
            this.emit('reconnectFailed');
            return;
        }

        this.reconnectAttempts++;
        const delay = this.options.retryInterval ?? 5000;
        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            void this.connect();
        }, delay);
    }

    /**
     * Permanently closes the current connection and disables automatic reconnects.
     */
    public disconnect(): void {
        this.manuallyDisconnected = true;
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.connected = false;
        this.ws?.close();
        this.ws = null;
    }
}
