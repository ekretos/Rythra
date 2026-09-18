import { getLavalinkApiPath, getLavalinkApiVersion, type LavalinkApiVersion } from './LavalinkProtocol';

/** Feature set advertised by a Lavalink protocol generation. */
export interface ProtocolCapabilities {
    /** Whether the generation supports session resuming. */ readonly sessionResume: boolean;
    /** Whether the generation supports player filters. */ readonly filters: boolean;
    /** Whether the generation supports DAVE voice integration. */ readonly dave: boolean;
}

/** Values required to build a Lavalink WebSocket handshake. */
export interface ProtocolHandshake {
    /** Node password. */ password: string;
    /** Client name reported to Lavalink. */ clientName: string;
    /** Discord user ID owning the session. */ userId: string;
    /** Previous session ID to resume, when available. */ sessionId?: string | null;
}

/** A decoded Lavalink server message. */
export interface LavalinkServerMessage {
    /** Message opcode. */ op: string;
    /** Guild the message belongs to, for player scoped messages. */ guildId?: string;
    /** Event type, for `event` messages. */ type?: string;
    /** Remaining wire fields. */ [key: string]: unknown;
}

/**
 * Version boundary between Rythra core and the Lavalink wire protocol.
 *
 * @remarks
 * Core never branches on the Lavalink generation: it resolves an adapter once
 * and asks it for URLs, handshake headers and decoded messages. Supporting a
 * new generation means adding an adapter, not editing the node runtime.
 */
export interface ProtocolAdapter {
    /** The Lavalink API generation implemented by this adapter. */ readonly version: LavalinkApiVersion;
    /** The HTTP/WebSocket path prefix for this generation. */ readonly apiPath: string;
    /** Capabilities advertised by this generation. */ readonly capabilities: ProtocolCapabilities;
    /** Builds the REST base URL for an origin such as `https://localhost:2333`. */ restUrl(origin: string): string;
    /** Builds the WebSocket URL for an origin such as `ws://localhost:2333`. */ websocketUrl(origin: string): string;
    /** Builds the WebSocket handshake headers. */ handshakeHeaders(handshake: ProtocolHandshake): Record<string, string>;
    /** Normalizes a raw server payload into a decoded message. */ decode(payload: unknown): LavalinkServerMessage | undefined;
}

/** Creates a protocol adapter for a Lavalink generation. */
function createAdapter(version: LavalinkApiVersion, capabilities: ProtocolCapabilities): ProtocolAdapter {
    const apiPath = getLavalinkApiPath(version);
    return {
        version,
        apiPath,
        capabilities,
        restUrl: (origin) => `${origin}${apiPath}`,
        websocketUrl: (origin) => `${origin}${apiPath}/websocket`,
        handshakeHeaders: ({ password, clientName, userId, sessionId }) => {
            const headers: Record<string, string> = { Authorization: password, 'Client-Name': clientName, 'User-Id': userId };
            if (sessionId && capabilities.sessionResume) headers['Session-Id'] = sessionId;
            return headers;
        },
        decode: (payload) => {
            if (!payload || typeof payload !== 'object') return undefined;
            const message = payload as LavalinkServerMessage;
            return typeof message.op === 'string' ? message : undefined;
        },
    };
}

/** Lavalink v4 protocol adapter. */
export const V4_ADAPTER: ProtocolAdapter = createAdapter(4, { sessionResume: true, filters: true, dave: false });

/** Lavalink v5 protocol adapter. */
export const V5_ADAPTER: ProtocolAdapter = createAdapter(5, { sessionResume: true, filters: true, dave: true });

/** Resolves the adapter implementing a Lavalink API generation. */
export function resolveProtocol(version: LavalinkApiVersion): ProtocolAdapter {
    return version === 5 ? V5_ADAPTER : V4_ADAPTER;
}

/** Resolves the adapter implementing a Lavalink server semantic version. */
export function resolveProtocolFromServerVersion(semver: string): ProtocolAdapter {
    return resolveProtocol(getLavalinkApiVersion(semver));
}
