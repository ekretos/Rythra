import { EventEmitter } from 'node:events';
import { Rythra } from './Rythra';
import type { NodeOptions, Stats } from './Types';
import { Rest } from './Rest';
import { getLavalinkApiPath, getLavalinkApiVersion, type LavalinkApiVersion } from './protocol/LavalinkProtocol';
import WebSocket from 'ws';
import { CircuitBreaker } from './reliability/CircuitBreaker';

/**
 * Represents a single Lavalink node connection managed by Rythra.
 *
 * @remarks
 * A node owns both the Lavalink REST client and WebSocket connection. It is
 * also responsible for API-version detection, session resumption, bounded
 * exponential reconnects and circuit-breaking repeated failures.
 *
 * @extends EventEmitter
 */
export class Node extends EventEmitter {
    /** The Rythra manager that owns this node. */ public readonly manager: Rythra;
    /** The configuration used to connect to Lavalink. */ public readonly options: NodeOptions;
    /** The version-aware REST client for this node. */ public readonly rest: Rest;
    /** Circuit breaker protecting this node from repeated connection attempts. */ public readonly circuit = new CircuitBreaker();
    /** The active Lavalink WebSocket, or `null` when disconnected. */ public ws: WebSocket | null = null;
    /** The most recently received Lavalink statistics payload. */ public stats: Stats = { players: 0, playingPlayers: 0, uptime: 0, memory: { free: 0, used: 0, allocated: 0, reservable: 0 }, cpu: { cores: 0, systemLoad: 0, lavalinkLoad: 0 } };
    /** The Lavalink session ID used for session resumption. */ public sessionId: string | null = null;
    /** Whether the node currently has an open WebSocket connection. */ public connected = false;
    /** The Lavalink API generation selected for this node. */ public apiVersion: LavalinkApiVersion | null = null;
    /** Timer used for a pending reconnect attempt. */ private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    /** Number of reconnect attempts made since the last successful connection. */ private reconnectAttempts = 0;
    /** Prevents automatic reconnecting after an explicit disconnect. */ private manuallyDisconnected = false;
    /** Promise resolver for an in-flight connection attempt. */ private connectResolve: (() => void) | null = null;
    /** Promise rejecter for an in-flight connection attempt. */ private connectReject: ((error: Error) => void) | null = null;

    /** Creates a Lavalink node. */
    constructor(manager: Rythra, options: NodeOptions) {
        super();
        this.manager = manager;
        this.options = { ...options, lavalinkVersion: options.lavalinkVersion ?? manager.options.lavalinkVersion };
        this.apiVersion = this.options.lavalinkVersion === 'auto' || this.options.lavalinkVersion === undefined ? null : this.options.lavalinkVersion;
        this.rest = new Rest(this);
    }

    /** Gets the base REST API URL for the selected Lavalink generation. */
    public get restUrl(): string {
        const protocol = this.options.secure ? 'https' : 'http';
        const port = this.options.port ? `:${this.options.port}` : '';
        const apiVersion = this.apiVersion ?? 4;
        return `${protocol}://${this.options.host}${port}${getLavalinkApiPath(apiVersion)}`;
    }

    /** Gets the WebSocket URL for the selected Lavalink generation. */
    private get websocketUrl(): string {
        const protocol = this.options.secure ? 'wss' : 'ws';
        const port = this.options.port ? `:${this.options.port}` : '';
        const apiVersion = this.apiVersion ?? 4;
        return `${protocol}://${this.options.host}${port}${getLavalinkApiPath(apiVersion)}/websocket`;
    }

    /** Detects the Lavalink server API generation when automatic detection is enabled. */
    private async detectVersion(): Promise<void> {
        if (this.apiVersion) return;
        const protocol = this.options.secure ? 'https' : 'http';
        const port = this.options.port ? `:${this.options.port}` : '';
        const response = await fetch(`${protocol}://${this.options.host}${port}/version`, { headers: { Authorization: this.options.password || 'youshallnotpass' }, signal: AbortSignal.timeout((this.manager.options.restTimeout || 10) * 1000) });
        if (!response.ok) throw new Error(`Unable to detect Lavalink version (${response.status})`);
        this.apiVersion = getLavalinkApiVersion((await response.text()).trim());
        this.emit('version', this.apiVersion);
    }

    /**
     * Opens a Lavalink WebSocket and resolves only after Lavalink confirms the
     * connection. Automatic reconnects remain enabled after a failed attempt.
     *
     * @throws {Error} When the initial connection cannot be established.
     */
    public async connect(): Promise<void> {
        this.manuallyDisconnected = false;
        if (this.connected) return;
        if (this.ws) {
            return new Promise<void>((resolve, reject) => {
                const onConnect = () => { cleanup(); resolve(); };
                const onError = (error: Error) => { cleanup(); reject(error); };
                const cleanup = () => { this.off('connect', onConnect); this.off('error', onError); };
                this.once('connect', onConnect);
                this.once('error', onError);
            });
        }
        if (!this.circuit.canRequest()) throw new Error(`Lavalink node ${this.options.identifier ?? this.options.host} is unavailable (circuit breaker open).`);

        try {
            await this.detectVersion();
            const headers: Record<string, string> = { Authorization: this.options.password || 'youshallnotpass', 'Client-Name': `${this.manager.options.clientName || 'Rythra'}/${this.manager.version}`, 'User-Id': this.manager.options.clientId || this.manager.options.connector.getId() || '' };
            if (this.sessionId) headers['Session-Id'] = this.sessionId;
            await new Promise<void>((resolve, reject) => {
                this.connectResolve = resolve;
                this.connectReject = reject;
                this.ws = new WebSocket(this.websocketUrl, { headers, rejectUnauthorized: this.options.rejectUnauthorized ?? true } as WebSocket.ClientOptions);
                this.ws.onopen = () => {
                    this.connected = true;
                    this.reconnectAttempts = 0;
                    this.circuit.success();
                    this.emit('connect');
                    this.connectResolve?.();
                    this.connectResolve = null;
                    this.connectReject = null;
                };
                this.ws.onmessage = (event: WebSocket.MessageEvent) => {
                    try {
                        const data = JSON.parse(event.data.toString());
                        if (data.op === 'ready') { this.sessionId = data.sessionId; this.emit('ready', data); }
                        else if (data.op === 'stats') { this.stats = data; this.emit('stats', data); }
                        else if (data.op === 'playerUpdate') { const player = this.manager.players.get(data.guildId); if (player) player.emit('playerUpdate', data); }
                        else if (data.op === 'event') { const player = this.manager.players.get(data.guildId); if (player) player.emit(data.type, data); this.emit('event', data); }
                    } catch (error) { this.emit('error', error); }
                };
                this.ws.onclose = () => {
                    const wasConnecting = !this.connected;
                    this.ws = null;
                    this.connected = false;
                    this.circuit.failure();
                    if (wasConnecting) {
                        const error = new Error(`Unable to connect to Lavalink node ${this.options.identifier ?? this.options.host}.`);
                        this.connectReject?.(error);
                        this.connectResolve = null;
                        this.connectReject = null;
                    }
                    this.emit('disconnect');
                    if (!this.manuallyDisconnected) this.scheduleReconnect();
                };
                this.ws.onerror = (err: WebSocket.ErrorEvent) => {
                    const error = new Error(err.message || `Unable to connect to Lavalink node ${this.options.identifier ?? this.options.host}.`);
                    this.emit('error', err);
                    if (!this.connected) {
                        this.connectReject?.(error);
                        this.connectResolve = null;
                        this.connectReject = null;
                    }
                };
            });
        } catch (error) {
            this.ws = null;
            this.connected = false;
            this.circuit.failure();
            this.emit('error', error);
            this.scheduleReconnect();
            throw error instanceof Error ? error : new Error(String(error));
        }
    }

    /** Schedules a bounded exponential reconnect with optional jitter. */
    private scheduleReconnect(): void {
        if (this.manuallyDisconnected || this.reconnectTimer || !this.circuit.canRequest()) return;
        const maxAttempts = this.options.retryAmount ?? Infinity;
        if (this.reconnectAttempts >= maxAttempts) { this.emit('reconnectFailed'); return; }
        this.reconnectAttempts++;
        const base = this.options.retryInterval ?? 5000;
        const maximum = this.options.maxRetryInterval ?? 60_000;
        const exponential = Math.min(maximum, base * 2 ** Math.max(0, this.reconnectAttempts - 1));
        const jitter = Math.min(1, Math.max(0, this.options.retryJitter ?? 0.2));
        const factor = 1 + ((Math.random() * 2 - 1) * jitter);
        const delay = Math.max(0, Math.round(exponential * factor));
        this.reconnectTimer = setTimeout(() => { this.reconnectTimer = null; void this.connect().catch(() => undefined); }, delay);
    }

    /** Permanently closes the current connection and disables automatic reconnects. */
    public disconnect(): void {
        this.manuallyDisconnected = true;
        if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
        this.connected = false;
        this.ws?.close();
        this.ws = null;
    }
}
