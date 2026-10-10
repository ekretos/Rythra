---
title: Node
description: API Reference for Node
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/node/Node.ts:24](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L24)

Runtime for a single Lavalink node.

## Remarks

The runtime owns node state, statistics and reconnect policy. Wire concerns
are delegated: the socket lives in a [WebSocketTransport](WebSocketTransport.md) and every
version-specific detail lives behind a [ProtocolAdapter](../interfaces/ProtocolAdapter.md).

## Extends

- `EventEmitter`

## Constructors

### Constructor

> **new Node**(`manager`, `options`): `Node`

Defined in: [packages/core/src/node/Node.ts:49](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L49)

#### Parameters

##### manager

`RythraManager`

##### options

[`NodeOptions`](../interfaces/NodeOptions.md)

#### Returns

`Node`

#### Overrides

`EventEmitter.constructor`

## Properties

### apiVersion

> **apiVersion**: [`LavalinkApiVersion`](../type-aliases/LavalinkApiVersion.md) \| `null` = `null`

Defined in: [packages/core/src/node/Node.ts:37](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L37)

The Lavalink API generation selected for this node.

***

### circuit

> `readonly` **circuit**: [`CircuitBreaker`](CircuitBreaker.md)

Defined in: [packages/core/src/node/Node.ts:28](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L28)

Circuit breaker protecting this node from repeated connection attempts.

***

### manager

> `readonly` **manager**: `RythraManager`

Defined in: [packages/core/src/node/Node.ts:25](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L25)

The Rythra manager that owns this node.

***

### options

> `readonly` **options**: [`NodeOptions`](../interfaces/NodeOptions.md)

Defined in: [packages/core/src/node/Node.ts:26](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L26)

The configuration used to connect to Lavalink.

***

### protocol

> **protocol**: [`ProtocolAdapter`](../interfaces/ProtocolAdapter.md) \| `null` = `null`

Defined in: [packages/core/src/node/Node.ts:38](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L38)

The protocol adapter selected for this node, or `null` until detection completes.

***

### rest

> `readonly` **rest**: [`Rest`](Rest.md)

Defined in: [packages/core/src/node/Node.ts:27](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L27)

The version-aware REST client for this node.

***

### sessionId

> **sessionId**: `string` \| `null` = `null`

Defined in: [packages/core/src/node/Node.ts:36](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L36)

The Lavalink session ID used for session resumption.

***

### stats

> **stats**: [`Stats`](../interfaces/Stats.md)

Defined in: [packages/core/src/node/Node.ts:29](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L29)

The most recently received Lavalink statistics payload.

## Accessors

### connected

#### Get Signature

> **get** **connected**(): `boolean`

Defined in: [packages/core/src/node/Node.ts:67](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L67)

Whether the node currently has an open WebSocket connection.

##### Returns

`boolean`

***

### label

#### Get Signature

> **get** **label**(): `string`

Defined in: [packages/core/src/node/Node.ts:77](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L77)

Human-readable identifier used in logs and errors.

##### Returns

`string`

***

### restUrl

#### Get Signature

> **get** **restUrl**(): `string`

Defined in: [packages/core/src/node/Node.ts:97](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L97)

The version-aware base URL used for REST requests.

##### Returns

`string`

***

### state

#### Get Signature

> **get** **state**(): [`NodeState`](../type-aliases/NodeState.md)

Defined in: [packages/core/src/node/Node.ts:62](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L62)

The current lifecycle state of this node.

##### Returns

[`NodeState`](../type-aliases/NodeState.md)

***

### ws

#### Get Signature

> **get** **ws**(): `WebSocket` \| `null`

Defined in: [packages/core/src/node/Node.ts:72](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L72)

The active Lavalink WebSocket, or `null` when disconnected.

##### Returns

`WebSocket` \| `null`

## Methods

### connect()

> **connect**(): `Promise`\<`void`\>

Defined in: [packages/core/src/node/Node.ts:116](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L116)

Connects the node, resolving once Lavalink accepts the WebSocket handshake.

#### Returns

`Promise`\<`void`\>

***

### createTransport()

> `protected` **createTransport**(`handlers`): [`SocketTransport`](../interfaces/SocketTransport.md)

Defined in: [packages/core/src/node/Node.ts:176](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L176)

Creates the socket transport for one connection attempt. Overridable for testing.

#### Parameters

##### handlers

[`SocketTransportHandlers`](../interfaces/SocketTransportHandlers.md)

#### Returns

[`SocketTransport`](../interfaces/SocketTransport.md)

***

### disconnect()

> **disconnect**(): `void`

Defined in: [packages/core/src/node/Node.ts:275](https://github.com/ekretos/Rythra/blob/main/packages/core/src/node/Node.ts#L275)

Disconnects the node and cancels any pending reconnect.

#### Returns

`void`
