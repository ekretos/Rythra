/**
 * Public entry point for the Rythra core package.
 *
 * @remarks
 * The public surface is intentionally flat for compatibility, while the
 * implementation is split internally into kernel, node, player, transport
 * and protocol layers.
 */

// Runtime orchestration.
export * from './Rythra.js';

// Kernel registries.
export * from './kernel/Registry.js';

// Node runtime and lifecycle state.
export * from './node/Node.js';
export * from './node/NodeState.js';

// Player runtime.
export * from './player/Player.js';

// Backwards-compatible core facades.
export * from './Queue.js';
export * from './Rest.js';
export * from './Connector.js';

// Public contracts and domain types.
export type * from '@rythra/types';
export * from './errors/RythraError.js';
export * from './health/Health.js';
export * from './reliability/CircuitBreaker.js';

// Lavalink protocol abstraction.
export * from './protocol/LavalinkProtocol.js';
export * from './protocol/ProtocolAdapter.js';

// Transport contracts and implementations.
export * from './transport/Transport.js';
export * from './transport/RestTransport.js';
export * from './transport/WebSocketTransport.js';
export * from './metrics/Metrics.js';
export * from './metrics/MetricsAdapter.js';
export * from './persistence/Persistence.js';
export * from './persistence/PersistenceAdapter.js';
