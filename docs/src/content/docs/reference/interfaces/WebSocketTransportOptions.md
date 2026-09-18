---
title: WebSocketTransportOptions
description: API Reference for WebSocketTransportOptions
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/transport/WebSocketTransport.ts:5](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/WebSocketTransport.ts#L5)

Connection details resolved lazily for every socket attempt.

## Properties

### rejectUnauthorized?

> `optional` **rejectUnauthorized?**: `boolean`

Defined in: [packages/core/src/transport/WebSocketTransport.ts:8](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/WebSocketTransport.ts#L8)

Whether TLS certificates must be validated.

## Methods

### headers()

> **headers**(): `Record`\<`string`, `string`\>

Defined in: [packages/core/src/transport/WebSocketTransport.ts:7](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/WebSocketTransport.ts#L7)

Resolves the handshake headers for the next attempt.

#### Returns

`Record`\<`string`, `string`\>

***

### url()

> **url**(): `string`

Defined in: [packages/core/src/transport/WebSocketTransport.ts:6](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/WebSocketTransport.ts#L6)

Resolves the WebSocket URL for the next attempt.

#### Returns

`string`
