import { EventEmitter } from 'node:events';
import { Rythra } from './Rythra';
import type { NodeOptions, Stats } from './Types';
import { Rest } from './Rest';
import { getLavalinkApiPath, getLavalinkApiVersion, type LavalinkApiVersion } from './protocol/LavalinkProtocol';
import { validateNodeOptions } from './Validation';
import WebSocket from 'ws';

/** Represents one managed Lavalink node connection. */
export class Node extends EventEmitter {
    /** Rythra manager owning this node. */ public readonly manager: Rythra;
    /** Node connection configuration. */ public readonly options: NodeOptions;
    /** Version-aware REST client. */ public readonly rest: Rest;
    /** Active Lavalink WebSocket. */ public ws: WebSocket | null = null;
    /** Latest node statistics. */ public stats: Stats = { players: 0, playingPlayers: 0, uptime: 0, memory: { free: 0, used: 0, allocated: 0, reservable: 0 }, cpu: { cores: 0, systemLoad: 0, lavalinkLoad: 0 } };
    /** Lavalink session ID used for resume. */ public sessionId: string | null = null;
    /** Whether the WebSocket is currently connected. */ public connected = false;
    /** Selected Lavalink API generation. */ public apiVersion: LavalinkApiVersion | null = null;
    /** Pending reconnect timer. */ private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    /** Number of reconnect attempts since the last successful connection. */ private reconnectAttempts = 0;
    /** Whether disconnect was explicitly requested. */ private manuallyDisconnected = false;

    /** Creates a validated Lavalink node. */
    constructor(manager: Rythra, options: NodeOptions) {
        super();
        validateNodeOptions(options);
        this.manager = manager;
        this.options = { ...options, lavalinkVersion: options.lavalinkVersion ?? manager.options.lavalinkVersion };
        this.apiVersion = this.options.lavalinkVersion === 'auto' || this.options.lavalinkVersion === undefined ? null : this.options.lavalinkVersion;
        this.rest = new Rest(this);
    }

    /** Returns the versioned REST base URL. */
    public get restUrl(): string {
        const protocol = this.options.secure ? 'https' : 'http';
        const port = this.options.port ? `:${this.options.port}` : '';
        return `${protocol}://${this.options.host}${port}${getLavalinkApiPath(this.apiVersion ?? 4)}`;
    }

    /** Returns the versioned WebSocket URL. */
    private get websocketUrl(): string {
        const protocol = this.options.secure ? 'wss' : 'ws';
        const port = this.options.port ? `:${this.options.port}` : '';
        return `${protocol}://${this.options.host}${port}${getLavalinkApiPath(this.apiVersion ?? 4)}/websocket`;
    }

    /** Detects the server API generation when `lavalinkVersion` is `auto`. */
    private async detectVersion(): Promise<void> {
        if (this.apiVersion) return;
        const protocol = this.options.secure ? 'https' : 'http';
        const port = this.options.port ? `:${this.options.port}` : '';
        const response = await fetch(`${protocol}://${this.options.host}${port}/version`, { headers: { Authorization: this.options.password || 'youshallnotpass' }, signal: AbortSignal.timeout((this.manager.options.restTimeout || 10) * 1000) });
        if (!response.ok) throw new Error(`Unable to detect Lavalink version (${response.status})`);
        const version = (await response.text()).trim();
        this.apiVersion = getLavalinkApiVersion(version);
        this.emit('version', this.apiVersion, version);
    }

    /** Opens the Lavalink WebSocket and enables session resumption. */
    public async connect(): Promise<void> {
        this.manuallyDisconnected = false;
        if (this.connected || this.ws) return;
        try { await this.detectVersion(); }
        catch (error) { this.emit('error', error); this.scheduleReconnect(); return; }
        const wasReconnect = this.reconnectAttempts > 0;
        const headers: Record<string, string> = { Authorization: this.options.password || 'youshallnotpass', 'Client-Name': `${this.manager.options.clientName || 'Rythra'}/${this.manager.version}`, 'User-Id': this.manager.options.clientId || this.manager.options.connector.getId() || '' };
        if (this.sessionId) headers['Session-Id'] = this.sessionId;
        this.ws = new WebSocket(this.websocketUrl, { headers, rejectUnauthorized: this.options.rejectUnauthorized ?? true } as WebSocket.ClientOptions);
        this.ws.onopen = () => {
            this.connected = true;
            if (wasReconnect) this.manager.metrics.reconnect();
            this.reconnectAttempts = 0;
            this.emit('connect');
        };
        this.ws.onmessage = (event: WebSocket.MessageEvent) => {
            try {
                const data = JSON.parse(event.data.toString());
                if (data.op === 'ready') {
                    this.sessionId = data.sessionId;
                    this.emit('ready', data);
                    if (this.options.retryAmount !== 0) void this.rest.updateSession(true, 60).catch((error) => this.emit('error', error));
                } else if (data.op === 'stats') { this.stats = data; this.emit('stats', data); }
                else if (data.op === 'playerUpdate') { const player = this.manager.players.get(data.guildId); if (player) player.emit('playerUpdate', data); }
                else if (data.op === 'event') { const player = this.manager.players.get(data.guildId); if (player) player.emit(data.type, data); this.emit('event', data); }
            } catch (error) { this.emit('error', error); }
        };
        this.ws.onclose = () => { this.ws = null; this.connected = false; this.emit('disconnect'); if (!this.manuallyDisconnected) this.scheduleReconnect(); };
        this.ws.onerror = (err: WebSocket.ErrorEvent) => this.emit('error', err);
    }

    /** Schedules an automatic reconnect with the configured retry policy. */
    private scheduleReconnect(): void {
        if (this.manuallyDisconnected || this.reconnectTimer) return;
        const maxAttempts = this.options.retryAmount ?? Infinity;
        if (this.reconnectAttempts >= maxAttempts) { this.emit('reconnectFailed'); return; }
        this.reconnectAttempts++;
        const delay = this.options.retryInterval ?? 5000;
        this.reconnectTimer = setTimeout(() => { this.reconnectTimer = null; void this.connect(); }, delay);
    }

    /** Explicitly closes the connection and disables automatic reconnects. */
    public disconnect(): void {
        this.manuallyDisconnected = true;
        if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
        this.connected = false;
        this.ws?.close();
        this.ws = null;
    }
}
