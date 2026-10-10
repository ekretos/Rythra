---
title: RestTransport
description: API Reference for RestTransport
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/transport/Transport.ts:12](https://github.com/ekretos/Rythra/blob/8c65b2b9a1c3f4d653aa63873bbc3c7b0f9b3db4/packages/core/src/transport/Transport.ts#L12)

Request/response transport used by the Lavalink REST client.

## Methods

### request()

> **request**\<`T`\>(`request`): `Promise`\<`T` \| `undefined`\>

Defined in: [packages/core/src/transport/Transport.ts:14](https://github.com/ekretos/Rythra/blob/8c65b2b9a1c3f4d653aa63873bbc3c7b0f9b3db4/packages/core/src/transport/Transport.ts#L14)

Performs a request and resolves the decoded JSON body, if any.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### request

[`TransportRequest`](TransportRequest.md)

#### Returns

`Promise`\<`T` \| `undefined`\>
