/** Description of a single Lavalink REST request, independent of the HTTP client. */
export interface TransportRequest {
    /** Absolute request URL. */ url: string;
    /** HTTP method, defaulting to `GET`. */ method?: string;
    /** Query string parameters. */ params?: Record<string, string>;
    /** Request headers. */ headers?: Record<string, string>;
    /** JSON request body. */ body?: unknown;
    /** Request timeout in milliseconds. */ timeout?: number;
}

/** Request/response transport used by the Lavalink REST client. */
export interface RestTransport {
    /** Performs a request and resolves the decoded JSON body, if any. */
    request<T = unknown>(request: TransportRequest): Promise<T | undefined>;
}

/** Callbacks a socket transport reports back to its owning node runtime. */
export interface SocketTransportHandlers {
    /** Invoked once the socket is open. */ onOpen(): void;
    /** Invoked for every decoded server message. */ onMessage(message: unknown): void;
    /** Invoked once the socket closes, with `openedBefore` describing whether it ever opened. */ onClose(openedBefore: boolean): void;
    /** Invoked for transport or decoding errors. */ onError(error: unknown): void;
}

/** Bidirectional transport used by a node runtime to talk to Lavalink. */
export interface SocketTransport {
    /** Whether the socket is currently open. */ readonly connected: boolean;
    /** Opens the socket and resolves once it is usable. */ connect(): Promise<void>;
    /** Closes the socket without reconnecting. */ disconnect(): void;
    /** Sends a payload over the socket. */ send(payload: unknown): void;
}
