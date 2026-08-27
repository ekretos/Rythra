import { EventEmitter } from 'node:events';
import { Rythra } from './Rythra';
import type { NodeOptions, Stats } from './Types';
import { Rest } from './Rest';
import { getLavalinkApiPath, getLavalinkApiVersion, type LavalinkApiVersion } from './protocol/LavalinkProtocol';
import WebSocket from 'ws';

export class Node extends EventEmitter {
    public readonly manager: Rythra;
    public readonly options: NodeOptions;
    public readonly rest: Rest;
    public ws: WebSocket | null = null;
    public stats: Stats = {
        players: 0,
        playingPlayers: 0,
        uptime: 0,
        memory: { free: 0, used: 0, allocated: 0, reservable: 0 },
        cpu: { cores: 0, systemLoad: 0, lavalinkLoad: 0 },
    };
    public sessionId: string | null = null;
    public connected = false;
    public apiVersion: LavalinkApiVersion | null = null;
    private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    private reconnectAttempts = 0;
    private manuallyDisconnected = false;

    constructor(manager: Rythra, options: NodeOptions) {
        super();
        this.manager = manager;
        this.options = options;
        this.apiVersion = options.lavalinkVersion === 'auto' || options.lavalinkVersion === undefined
            ? null
            : options.lavalinkVersion;
        this.rest = new Rest(this);
    }

    public get restUrl(): string {
        const protocol = this.options.secure ? 'https' : 'http';
        const port = this.options.port ? `:${this.options.port}` : '';
        const apiVersion = this.apiVersion ?? 4;
        return `${protocol}://${this.options.host}${port}${getLavalinkApiPath(apiVersion)}`;
    }

    private get websocketUrl(): string {
        const protocol = this.options.secure ? 'wss' : 'ws';
        const port = this.options.port ? `:${this.options.port}` : '';
        const apiVersion = this.apiVersion ?? 4;
        return `${protocol}://${this.options.host}${port}${getLavalinkApiPath(apiVersion)}/websocket`;
    }

    /** Detects the Lavalink server generation using the unversioned /version endpoint. */
    private async detectVersion(): Promise<void> {
        if (this.apiVersion) return;

        const protocol = this.options.secure ? 'https' : 'http';
        const port = this.options.port ? `:${this.options.port}` : '';
        const url = `${protocol}://${this.options.host}${port}/version`;
        const response = await fetch(url, {
            headers: { Authorization: this.options.password || 'youshallnotpass' },
            signal: AbortSignal.timeout((this.manager.options.restTimeout || 10) * 1000),
        });

        if (!response.ok) {
            throw new Error(`Unable to detect Lavalink version (${response.status})`);
        }

        const version = (await response.text()).trim();
        this.apiVersion = getLavalinkApiVersion(version);
        this.emit('version', this.apiVersion, version);
    }

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

    public disconnect(): void {
        this.manuallyDisconnected = true;
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.connected = false;
        this.ws?.close();
        this.ws = null;
        this.emit('disconnect');
    }
}
