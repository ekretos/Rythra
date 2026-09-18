---
title: TransportRequest
description: API Reference for TransportRequest
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/transport/Transport.ts:2](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L2)

Description of a single Lavalink REST request, independent of the HTTP client.

## Properties

### body?

> `optional` **body?**: `unknown`

Defined in: [packages/core/src/transport/Transport.ts:7](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L7)

JSON request body.

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [packages/core/src/transport/Transport.ts:6](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L6)

Request headers.

***

### method?

> `optional` **method?**: `string`

Defined in: [packages/core/src/transport/Transport.ts:4](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L4)

HTTP method, defaulting to `GET`.

***

### params?

> `optional` **params?**: `Record`\<`string`, `string`\>

Defined in: [packages/core/src/transport/Transport.ts:5](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L5)

Query string parameters.

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [packages/core/src/transport/Transport.ts:8](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L8)

Request timeout in milliseconds.

***

### url

> **url**: `string`

Defined in: [packages/core/src/transport/Transport.ts:3](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L3)

Absolute request URL.
