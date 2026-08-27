/** Supported Lavalink protocol versions. Add a new literal here when Lavalink ships a new protocol. */
export type LavalinkVersion = "v3" | "v4" | "v5" | (string & {});

/** Capabilities exposed by a concrete Lavalink protocol adapter. */
export interface ProtocolCapabilities {
    /** Protocol version implemented by the adapter. */
    readonly version: LavalinkVersion;
    /** Whether the protocol supports session resuming. */
    readonly sessionResume: boolean;
    /** Whether player filters are supported. */
    readonly filters: boolean;
    /** Whether DAVE-related voice integration is supported by this protocol adapter. */
    readonly dave: boolean;
}

/**
 * Common protocol contract consumed by Rythra core.
 *
 * Version-specific wire details stay behind this interface, allowing v3/v4/v5
 * to coexist and future versions to be added without changing player APIs.
 */
export interface LavalinkProtocol {
    /** Advertise capabilities without exposing wire-format details. */
    readonly capabilities: ProtocolCapabilities;
}

/** Factory for a version-specific protocol implementation. */
export interface ProtocolFactory {
    /** Protocol version provided by this factory. */
    readonly version: LavalinkVersion;
    /** Create the protocol adapter. */
    create(): LavalinkProtocol;
}
