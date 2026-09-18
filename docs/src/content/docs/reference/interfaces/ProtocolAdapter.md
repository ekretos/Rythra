---
title: ProtocolAdapter
description: API Reference for ProtocolAdapter
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:34](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L34)

Version boundary between Rythra core and the Lavalink wire protocol.

## Remarks

Core never branches on the Lavalink generation: it resolves an adapter once
and asks it for URLs, handshake headers and decoded messages. Supporting a
new generation means adding an adapter, not editing the node runtime.

## Properties

### apiPath

> `readonly` **apiPath**: `string`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:36](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L36)

The HTTP/WebSocket path prefix for this generation.

***

### capabilities

> `readonly` **capabilities**: [`ProtocolCapabilities`](ProtocolCapabilities.md)

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:37](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L37)

Capabilities advertised by this generation.

***

### version

> `readonly` **version**: [`LavalinkApiVersion`](../type-aliases/LavalinkApiVersion.md)

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:35](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L35)

The Lavalink API generation implemented by this adapter.

## Methods

### decode()

> **decode**(`payload`): [`LavalinkServerMessage`](LavalinkServerMessage.md) \| `undefined`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:41](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L41)

Normalizes a raw server payload into a decoded message.

#### Parameters

##### payload

`unknown`

#### Returns

[`LavalinkServerMessage`](LavalinkServerMessage.md) \| `undefined`

***

### handshakeHeaders()

> **handshakeHeaders**(`handshake`): `Record`\<`string`, `string`\>

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:40](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L40)

Builds the WebSocket handshake headers.

#### Parameters

##### handshake

[`ProtocolHandshake`](ProtocolHandshake.md)

#### Returns

`Record`\<`string`, `string`\>

***

### restUrl()

> **restUrl**(`origin`): `string`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:38](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L38)

Builds the REST base URL for an origin such as `https://localhost:2333`.

#### Parameters

##### origin

`string`

#### Returns

`string`

***

### websocketUrl()

> **websocketUrl**(`origin`): `string`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:39](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L39)

Builds the WebSocket URL for an origin such as `ws://localhost:2333`.

#### Parameters

##### origin

`string`

#### Returns

`string`
