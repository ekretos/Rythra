/**
 * Public entry point for the Rythra core package.
 *
 * @remarks
 * The public surface is intentionally flat for compatibility, while the
 * implementation is split internally into kernel, node, player, transport
 * and protocol layers.
 */

// Runtime orchestration.
export * from './Rythra';

// Kernel registries.
export * from './kernel/Registry';

// Node runtime and lifecycle state.
export * from './node/Node';
export * from './node/NodeState';

// Player runtime.
export * from './player/Player';

// Backwards-compatible core facades.
export * from './Queue';
export * from './Rest';
export * from './Connector';

// Public contracts and domain types.
export * from './Types';
export * from './errors/RythraError';
export * from './health/Health';
export * from './reliability/CircuitBreaker';

// Lavalink protocol abstraction.
export * from './protocol/LavalinkProtocol';
export * from './protocol/ProtocolAdapter';

// Transport contracts and implementations.
export * from './transport/Transport';
export * from './transport/RestTransport';
export * from './transport/WebSocketTransport';
