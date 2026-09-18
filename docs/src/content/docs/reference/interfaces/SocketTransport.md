---
title: SocketTransport
description: API Reference for SocketTransport
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/transport/Transport.ts:26](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L26)

Bidirectional transport used by a node runtime to talk to Lavalink.

## Properties

### connected

> `readonly` **connected**: `boolean`

Defined in: [packages/core/src/transport/Transport.ts:27](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L27)

Whether the socket is currently open.

## Methods

### connect()

> **connect**(): `Promise`\<`void`\>

Defined in: [packages/core/src/transport/Transport.ts:28](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L28)

Opens the socket and resolves once it is usable.

#### Returns

`Promise`\<`void`\>

***

### disconnect()

> **disconnect**(): `void`

Defined in: [packages/core/src/transport/Transport.ts:29](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L29)

Closes the socket without reconnecting.

#### Returns

`void`

***

### send()

> **send**(`payload`): `void`

Defined in: [packages/core/src/transport/Transport.ts:30](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L30)

Sends a payload over the socket.

#### Parameters

##### payload

`unknown`

#### Returns

`void`
