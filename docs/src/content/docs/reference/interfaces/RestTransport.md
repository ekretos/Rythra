---
title: RestTransport
description: API Reference for RestTransport
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/transport/Transport.ts:12](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L12)

Request/response transport used by the Lavalink REST client.

## Methods

### request()

> **request**\<`T`\>(`request`): `Promise`\<`T` \| `undefined`\>

Defined in: [packages/core/src/transport/Transport.ts:14](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/Transport.ts#L14)

Performs a request and resolves the decoded JSON body, if any.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### request

[`TransportRequest`](TransportRequest.md)

#### Returns

`Promise`\<`T` \| `undefined`\>
