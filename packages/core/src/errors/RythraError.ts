/** Stable error categories exposed by Rythra. */
export type RythraErrorCode = 'CONFIGURATION' | 'NODE' | 'NODE_CONNECTION' | 'NODE_TIMEOUT' | 'NODE_MIGRATION' | 'PLAYER' | 'PLAYER_RECOVERY' | 'LAVALINK' | 'LAVALINK_PROTOCOL' | 'TRACK' | 'QUEUE' | 'PERSISTENCE' | 'PLUGIN' | 'VALIDATION';

/** Base error type for all Rythra failures. */
export class RythraError extends Error {
    /** Stable machine-readable error code. */ public readonly code: RythraErrorCode;
    /** Optional originating error. */ public readonly override cause?: unknown;
    /** Additional structured diagnostic context. */ public readonly context: Readonly<Record<string, unknown>>;
    /** Creates a structured Rythra error. */
    constructor(message: string, code: RythraErrorCode, options: { cause?: unknown; context?: Record<string, unknown> } = {}) {
        super(message, { cause: options.cause }); this.name = 'RythraError'; this.code = code; this.cause = options.cause; this.context = Object.freeze({ ...(options.context ?? {}) });
    }
}
/** Error caused by invalid Rythra configuration. */
export class ConfigurationError extends RythraError { /** Creates a configuration error. */ constructor(message: string, context?: Record<string, unknown>) { super(message, 'CONFIGURATION', { context }); this.name = 'ConfigurationError'; } }
/** Error raised while connecting to or communicating with a Lavalink node. */
export class NodeError extends RythraError { /** Creates a node error. */ constructor(message: string, code: Extract<RythraErrorCode, 'NODE' | 'NODE_CONNECTION' | 'NODE_TIMEOUT'> = 'NODE', options: { cause?: unknown; context?: Record<string, unknown> } = {}) { super(message, code, options); this.name = 'NodeError'; } }
/** Error raised when a player cannot be recovered or migrated. */
export class PlayerRecoveryError extends RythraError { /** Creates a player recovery error. */ constructor(message: string, options: { cause?: unknown; context?: Record<string, unknown> } = {}) { super(message, 'PLAYER_RECOVERY', options); this.name = 'PlayerRecoveryError'; } }
/** Error raised when an operation fails validation. */
export class ValidationError extends RythraError { /** Creates a validation error. */ constructor(message: string, context?: Record<string, unknown>) { super(message, 'VALIDATION', { context }); this.name = 'ValidationError'; } }
