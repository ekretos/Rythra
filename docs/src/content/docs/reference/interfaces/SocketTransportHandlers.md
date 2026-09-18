---
title: SocketTransportHandlers
description: API Reference for SocketTransportHandlers
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/transport/Transport.ts:18](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L18)

Callbacks a socket transport reports back to its owning node runtime.

## Methods

### onClose()

> **onClose**(`openedBefore`): `void`

Defined in: [packages/core/src/transport/Transport.ts:21](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L21)

Invoked once the socket closes, with `openedBefore` describing whether it ever opened.

#### Parameters

##### openedBefore

`boolean`

#### Returns

`void`

***

### onError()

> **onError**(`error`): `void`

Defined in: [packages/core/src/transport/Transport.ts:22](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L22)

Invoked for transport or decoding errors.

#### Parameters

##### error

`unknown`

#### Returns

`void`

***

### onMessage()

> **onMessage**(`message`): `void`

Defined in: [packages/core/src/transport/Transport.ts:20](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L20)

Invoked for every decoded server message.

#### Parameters

##### message

`unknown`

#### Returns

`void`

***

### onOpen()

> **onOpen**(): `void`

Defined in: [packages/core/src/transport/Transport.ts:19](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L19)

Invoked once the socket is open.

#### Returns

`void`
