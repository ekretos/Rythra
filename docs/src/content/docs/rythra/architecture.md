---
title: Architecture
description: "How the Rythra runtime is layered: kernel, node runtime, transport and protocol."
---

Rythra is a Lavalink **runtime**, not a thin wrapper. Responsibilities are split so each layer can change without touching the others.

```
Rythra (manager)
 ├── kernel/Registry ....... NodeRegistry, PlayerRegistry
 ├── node/Node ............. lifecycle, stats, reconnect policy
 │    ├── node/NodeState ... explicit state machine
 │    ├── transport/ ....... WebSocketTransport, FetchRestTransport
 │    └── protocol/ ........ v4 / v5 adapters
 └── player/Player ......... per-guild playback and queue
```

## Kernel registries

`rythra.nodes` and `rythra.players` are `NodeRegistry` / `PlayerRegistry` instances. Both extend `Map`, so existing code keeps working, while lookups that used to live in the manager now live with the data:

```ts
rythra.nodes.connected();  // nodes whose socket is open
rythra.nodes.available();  // connected nodes, or all nodes as a fallback
rythra.players.playing();  // players with an active track
```

## Node state machine

Node lifecycle is a single state machine (`NodeStateMachine`) instead of scattered booleans. `node.connected` is derived from it, every change emits `state` on the node and `nodeState` on the manager, and illegal transitions are rejected rather than silently applied. See [Event Handling](../events/) for the state diagram.

## Transport

Sockets and HTTP are behind interfaces, so the node runtime never touches `ws` or `fetch` directly:

- `SocketTransport` — `connect()`, `disconnect()`, `send()`, implemented by `WebSocketTransport`.
- `RestTransport` — `request()`, implemented by `FetchRestTransport`.

`Rest` accepts a transport, which makes the REST surface testable without a server:

```ts
class RecordingTransport implements RestTransport {
    public async request<T>(): Promise<T | undefined> { return undefined; }
}

const rest = new Rest(node, new RecordingTransport());
```

## Protocol adapters

Every version-specific detail lives in a `ProtocolAdapter`: the API path, the WebSocket URL, handshake headers, capabilities and message decoding.

```ts
import { resolveProtocol, resolveProtocolFromServerVersion } from 'rythra';

resolveProtocol(4).restUrl('http://localhost:2333');        // http://localhost:2333/v4
resolveProtocol(5).websocketUrl('ws://localhost:2333');     // ws://localhost:2333/v5/websocket
resolveProtocolFromServerVersion('5.0.0').capabilities;     // { sessionResume, filters, dave }
```

A node resolves its adapter once — from `lavalinkVersion`, or from `GET /version` when set to `'auto'` — and the runtime never branches on the Lavalink generation afterwards. Supporting a new generation means adding an adapter, not editing the node runtime.

## Reliability

- **Circuit breaker** — repeated connection failures open the circuit (`node.circuit`) and suspend attempts until the reset timeout elapses.
- **Backoff** — reconnects use exponential backoff capped by `maxRetryInterval`, with `retryJitter` applied to avoid reconnect storms.
- **Health** — `rythra.health()` returns an O(1) snapshot: node counts, connected nodes, players, playing players, reconnects, migrations and uptime.
