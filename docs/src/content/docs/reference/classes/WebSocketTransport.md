---
title: WebSocketTransport
description: API Reference for WebSocketTransport
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/transport/WebSocketTransport.ts:12](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/WebSocketTransport.ts#L12)

Lavalink socket transport implemented with the `ws` client.

## Implements

- [`SocketTransport`](../interfaces/SocketTransport.md)

## Constructors

### Constructor

> **new WebSocketTransport**(`options`, `handlers`): `WebSocketTransport`

Defined in: [packages/core/src/transport/WebSocketTransport.ts:19](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/WebSocketTransport.ts#L19)

Creates a socket transport.

#### Parameters

##### options

[`WebSocketTransportOptions`](../interfaces/WebSocketTransportOptions.md)

##### handlers

[`SocketTransportHandlers`](../interfaces/SocketTransportHandlers.md)

#### Returns

`WebSocketTransport`

## Properties

### socket

> **socket**: `WebSocket` \| `null` = `null`

Defined in: [packages/core/src/transport/WebSocketTransport.ts:13](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/WebSocketTransport.ts#L13)

The active socket, or `null` when closed.

## Accessors

### connected

#### Get Signature

> **get** **connected**(): `boolean`

Defined in: [packages/core/src/transport/WebSocketTransport.ts:22](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/WebSocketTransport.ts#L22)

Whether the socket is currently open.

##### Returns

`boolean`

Whether the socket is currently open.

#### Implementation of

[`SocketTransport`](../interfaces/SocketTransport.md).[`connected`](../interfaces/SocketTransport.md#connected)

## Methods

### connect()

> **connect**(): `Promise`\<`void`\>

Defined in: [packages/core/src/transport/WebSocketTransport.ts:25](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/WebSocketTransport.ts#L25)

Opens the socket and resolves once Lavalink accepts the handshake.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SocketTransport`](../interfaces/SocketTransport.md).[`connect`](../interfaces/SocketTransport.md#connect)

***

### disconnect()

> **disconnect**(): `void`

Defined in: [packages/core/src/transport/WebSocketTransport.ts:59](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/WebSocketTransport.ts#L59)

Closes the socket without reconnecting.

#### Returns

`void`

#### Implementation of

[`SocketTransport`](../interfaces/SocketTransport.md).[`disconnect`](../interfaces/SocketTransport.md#disconnect)

***

### send()

> **send**(`payload`): `void`

Defined in: [packages/core/src/transport/WebSocketTransport.ts:67](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/WebSocketTransport.ts#L67)

Sends a payload over the socket.

#### Parameters

##### payload

`unknown`

#### Returns

`void`

#### Implementation of

[`SocketTransport`](../interfaces/SocketTransport.md).[`send`](../interfaces/SocketTransport.md#send)
