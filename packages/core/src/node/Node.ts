import { EventEmitter } from 'node:events';
import type WebSocket from 'ws';
import type { RythraManager } from '../contracts.js';
import type { NodeOptions, Stats } from '@rythra/types';
import { Rest } from '../Rest.js';
import { ConfigurationError } from '../errors/RythraError.js';
import { getLavalinkApiVersion, type LavalinkApiVersion } from '../protocol/LavalinkProtocol.js';
import { resolveProtocol, type LavalinkServerMessage, type ProtocolAdapter } from '../protocol/ProtocolAdapter.js';
import { CircuitBreaker } from '../reliability/CircuitBreaker.js';
import { WebSocketTransport } from '../transport/WebSocketTransport.js';
import type { SocketTransport, SocketTransportHandlers } from '../transport/Transport.js';
import { NodeStateMachine, type NodeState } from './NodeState.js';

/**
 * Runtime for a single Lavalink node.
 *
 * @remarks
 * The runtime owns node state, statistics and reconnect policy. Wire concerns
 * are delegated: the socket lives in a {@link WebSocketTransport} and every
 * version-specific detail lives behind a {@link ProtocolAdapter}.
 *
 * @extends EventEmitter
 */
export class Node extends EventEmitter {
    /** The Rythra manager that owns this node. */ public readonly manager: RythraManager;
    /** The configuration used to connect to Lavalink. */ public readonly options: NodeOptions;
    /** The version-aware REST client for this node. */ public readonly rest: Rest;
    /** Circuit breaker protecting this node from repeated connection attempts. */ public readonly circuit = new CircuitBreaker();
    /** The most recently received Lavalink statistics payload. */ public stats: Stats = { players: 0, playingPlayers: 0, uptime: 0, memory: { free: 0, used: 0, allocated: 0, reservable: 0 }, cpu: { cores: 0, systemLoad: 0, lavalinkLoad: 0 } };
    /** The Lavalink session ID used for session resumption. */ public sessionId: string | null = null;
    /** The Lavalink API generation selected for this node. */ public apiVersion: LavalinkApiVersion | null = null;
    /** The protocol adapter selected for this node, or `null` until detection completes. */ public protocol: ProtocolAdapter | null = null;
    /** Lifecycle state machine for this node. */ private readonly machine: NodeStateMachine;
    /** The active socket transport, or `null` when disconnected. */ private transport: SocketTransport | null = null;
    /** Timer used for a pending reconnect attempt. */ private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    /** Number of reconnect attempts made since the last successful connection. */ private reconnectAttempts = 0;
    /** Prevents automatic reconnecting after an explicit disconnect. */ private manuallyDisconnected = false;
    /** Set when the server rejected our credentials; reconnecting cannot succeed. */ private authFailed = false;

    /** Creates a Lavalink node. */
    private readonly password: string;

    constructor(manager: RythraManager, options: NodeOptions) {
        super();
        if (!options.password) throw new ConfigurationError('Lavalink node password is required.', { host: options.host });
        this.password = options.password;
        this.manager = manager;
        this.options = { ...options, lavalinkVersion: options.lavalinkVersion ?? manager.options.lavalinkVersion };
        this.apiVersion = this.options.lavalinkVersion === 'auto' || this.options.lavalinkVersion === undefined ? null : this.options.lavalinkVersion;
        if (this.apiVersion) this.protocol = resolveProtocol(this.apiVersion);
        this.machine = new NodeStateMachine((to, from) => this.emit('state', to, from));
        this.rest = new Rest(this);
    }

    /** The current lifecycle state of this node. */
    public get state(): NodeState { return this.machine.state; }

    /** Whether the node currently has an open WebSocket connection. */
    public get connected(): boolean { return this.machine.state === 'ready'; }

    /** The active Lavalink WebSocket, or `null` when disconnected. */
    public get ws(): WebSocket | null { return (this.transport as { socket?: WebSocket | null } | null)?.socket ?? null; }

    /** Human-readable identifier used in logs and errors. */
    public get label(): string { return this.options.identifier ?? this.options.host; }

    /** The protocol adapter in use, falling back to the oldest supported generation. */
    private get activeProtocol(): ProtocolAdapter { return this.protocol ?? resolveProtocol(4); }

    /** The HTTP origin of this node. */
    private get httpOrigin(): string { return `${this.options.secure ? 'https' : 'http'}://${this.options.host}${this.options.port ? `:${this.options.port}` : ''}`; }

    /** The WebSocket origin of this node. */
    private get websocketOrigin(): string { return `${this.options.secure ? 'wss' : 'ws'}://${this.options.host}${this.options.port ? `:${this.options.port}` : ''}`; }

    /** The version-aware base URL used for REST requests. */
    public get restUrl(): string { return this.activeProtocol.restUrl(this.httpOrigin); }

    /** Detects the Lavalink generation when the node is configured for automatic selection. */
    private async detectVersion(): Promise<void> {
        if (this.apiVersion) return;
        const response = await fetch(`${this.httpOrigin}/version`, { headers: { Authorization: this.password }, signal: AbortSignal.timeout((this.manager.options.restTimeout || 10) * 1000) });
        if (!response.ok) throw new Error(`Unable to detect Lavalink version (${response.status})`);
        const semver = (await response.text()).trim();
        this.apiVersion = getLavalinkApiVersion(semver);
        this.protocol = resolveProtocol(this.apiVersion);
        this.emit('version', this.apiVersion, semver);
    }

    /** Connects the node, resolving once Lavalink accepts the WebSocket handshake. */
    public async connect(): Promise<void> {
        this.manuallyDisconnected = false;
        this.authFailed = false;
        if (this.connected) return;
        if (this.transport) {
            return new Promise<void>((resolve, reject) => {
                const onConnect = () => { cleanup(); resolve(); };
                const onError = (error: Error) => { cleanup(); reject(error); };
                const onAbort = () => { cleanup(); reject(new Error(`Lavalink node ${this.label} was disconnected before it connected.`)); };
                const cleanup = () => { this.off('connect', onConnect); this.off('error', onError); this.off('manualDisconnect', onAbort); };
                this.once('connect', onConnect);
                this.once('error', onError);
                this.once('manualDisconnect', onAbort);
            });
        }
        if (!this.circuit.canRequest()) throw new Error(`Lavalink node ${this.label} is unavailable (circuit breaker open).`);
        this.machine.transition('connecting');
        try {
            await this.detectVersion();
            const transport = this.createTransport({
                    onOpen: () => { if (this.transport === transport) this.handleOpen(); },
                    onMessage: (message) => { if (this.transport === transport) this.handleMessage(message); },
                    onClose: () => { if (this.transport === transport) this.handleClose(); },
                    onError: (error) => { if (this.transport === transport) this.handleTransportError(error); },
            });
            this.transport = transport;
            await transport.connect();
        } catch (error) {
            if (this.manuallyDisconnected) throw error instanceof Error ? error : new Error(String(error));
            this.transport = null;
            this.circuit.failure();
            this.machine.transition('degraded');
            this.emitError(error);
            this.scheduleReconnect();
            throw error instanceof Error ? error : new Error(String(error));
        }
    }

    /** Creates the socket transport for one connection attempt. Overridable for testing. */
    protected createTransport(handlers: SocketTransportHandlers): SocketTransport {
        return new WebSocketTransport(
            {
                url: () => this.activeProtocol.websocketUrl(this.websocketOrigin),
                headers: () => this.activeProtocol.handshakeHeaders({
                    password: this.password,
                    clientName: `${this.manager.options.clientName || 'Rythra'}/${this.manager.version}`,
                    userId: this.manager.options.clientId || this.manager.options.connector.getId() || '',
                    sessionId: this.sessionId,
                }),
                rejectUnauthorized: this.options.rejectUnauthorized ?? true,
            },
            handlers,
        );
    }

    /** Emits `error` only when a listener exists, because an unhandled `error` event would throw. */
    private emitError(error: unknown): void {
        if (this.listenerCount('error') > 0) this.emit('error', error);
    }

    /** Records credential rejections so they are not retried forever, then reports the error. */
    private handleTransportError(error: unknown): void {
        const message = (error as { message?: unknown } | null)?.message;
        if (typeof message === 'string' && /Unexpected server response: (401|403)\b/.test(message)) this.authFailed = true;
        this.emitError(error);
    }

    /** Handles a successful handshake. */
    private handleOpen(): void {
        this.reconnectAttempts = 0;
        this.circuit.success();
        this.machine.transition('ready');
        this.emit('connect');
    }

    /** Routes a decoded Lavalink message to the manager and its players. */
    private handleMessage(payload: unknown): void {
        const message: LavalinkServerMessage | undefined = this.activeProtocol.decode(payload);
        if (!message) return;
        if (message.op === 'ready') {
            this.sessionId = typeof message.sessionId === 'string' ? message.sessionId : null;
            this.emit('ready', message);
            return;
        }
        if (message.op === 'stats') {
            this.stats = message as unknown as Stats;
            this.emit('stats', message);
            return;
        }
        if (message.op === 'playerUpdate') {
            const player = message.guildId ? this.manager.players.get(message.guildId) : undefined;
            player?.emit('playerUpdate', message);
            return;
        }
        if (message.op === 'event') {
            const player = message.guildId ? this.manager.players.get(message.guildId) : undefined;
            if (player && message.type) player.emit(message.type, message);
            this.emit('event', message);
        }
    }

    /** Handles a closed socket, scheduling a reconnect unless disconnected explicitly. */
    private handleClose(): void {
        this.transport = null;
        this.circuit.failure();
        this.machine.transition(this.manuallyDisconnected ? 'disconnected' : 'degraded');
        this.emit('disconnect');
        if (!this.manuallyDisconnected) this.scheduleReconnect();
    }

    /** Schedules the next reconnect attempt using exponential backoff with jitter. */
    private scheduleReconnect(): void {
        if (this.manuallyDisconnected || this.reconnectTimer) return;
        if (this.authFailed) {
            if (this.machine.transition('disconnected')) this.emit('reconnectFailed');
            return;
        }
        if (!this.circuit.canRequest()) return;
        const maxAttempts = this.options.retryAmount ?? Infinity;
        if (this.reconnectAttempts >= maxAttempts) {
            if (this.machine.transition('disconnected')) this.emit('reconnectFailed');
            return;
        }
        this.reconnectAttempts++;
        const base = this.options.retryInterval ?? 5000;
        const maximum = this.options.maxRetryInterval ?? 60_000;
        const exponential = Math.min(maximum, base * 2 ** Math.max(0, this.reconnectAttempts - 1));
        const jitter = Math.min(1, Math.max(0, this.options.retryJitter ?? 0.2));
        const factor = 1 + (Math.random() * 2 - 1) * jitter;
        const delay = Math.max(0, Math.round(exponential * factor));
        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            void this.connect().catch(() => undefined);
        }, delay);
    }

    /** Disconnects the node and cancels any pending reconnect. */
    public disconnect(): void {
        this.manuallyDisconnected = true;
        this.emit('manualDisconnect');
        if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
        this.machine.transition('draining');
        this.transport?.disconnect();
        this.transport = null;
        this.machine.transition('disconnected');
    }
}
