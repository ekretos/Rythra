import WebSocket from 'ws';
import type { SocketTransport, SocketTransportHandlers } from './Transport';

/** Connection details resolved lazily for every socket attempt. */
export interface WebSocketTransportOptions {
    /** Resolves the WebSocket URL for the next attempt. */ url(): string;
    /** Resolves the handshake headers for the next attempt. */ headers(): Record<string, string>;
    /** Whether TLS certificates must be validated. */ rejectUnauthorized?: boolean;
}

/** Lavalink socket transport implemented with the `ws` client. */
export class WebSocketTransport implements SocketTransport {
    /** The active socket, or `null` when closed. */ public socket: WebSocket | null = null;
    private opened = false;
    private resolveConnect: (() => void) | null = null;
    private rejectConnect: ((error: Error) => void) | null = null;

    /** Creates a socket transport. */
    public constructor(private readonly options: WebSocketTransportOptions, private readonly handlers: SocketTransportHandlers) {}

    /** Whether the socket is currently open. */
    public get connected(): boolean { return this.opened; }

    /** Opens the socket and resolves once Lavalink accepts the handshake. */
    public connect(): Promise<void> {
        if (this.socket) return Promise.reject(new Error('WebSocket transport is already connecting or connected.'));
        return new Promise<void>((resolve, reject) => {
            this.resolveConnect = resolve;
            this.rejectConnect = reject;
            const socket = new WebSocket(this.options.url(), { headers: this.options.headers(), rejectUnauthorized: this.options.rejectUnauthorized ?? true } as WebSocket.ClientOptions);
            this.socket = socket;
            socket.onopen = () => {
                this.opened = true;
                this.settle();
                this.handlers.onOpen();
            };
            socket.onmessage = (event: WebSocket.MessageEvent) => {
                try {
                    this.handlers.onMessage(JSON.parse(event.data.toString()));
                } catch (error) {
                    this.handlers.onError(error);
                }
            };
            socket.onclose = () => {
                const openedBefore = this.opened;
                this.socket = null;
                this.opened = false;
                if (!openedBefore) this.fail(new Error('Lavalink closed the WebSocket before it was ready.'));
                this.handlers.onClose(openedBefore);
            };
            socket.onerror = (event: WebSocket.ErrorEvent) => {
                this.handlers.onError(event);
                if (!this.opened) this.fail(new Error(event.message || 'Unable to connect to Lavalink.'));
            };
        });
    }

    /** Closes the socket without reconnecting. */
    public disconnect(): void {
        this.opened = false;
        this.socket?.close();
        this.socket = null;
        this.settle();
    }

    /** Sends a payload over the socket. */
    public send(payload: unknown): void {
        if (!this.socket || !this.opened) throw new Error('WebSocket transport is not connected.');
        this.socket.send(JSON.stringify(payload));
    }

    /** Resolves a pending connection attempt. */
    private settle(): void {
        this.resolveConnect?.();
        this.resolveConnect = null;
        this.rejectConnect = null;
    }

    /** Rejects a pending connection attempt. */
    private fail(error: Error): void {
        this.rejectConnect?.(error);
        this.resolveConnect = null;
        this.rejectConnect = null;
    }
}
