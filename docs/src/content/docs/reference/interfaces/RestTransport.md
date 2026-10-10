---
title: RestTransport
description: API Reference for RestTransport
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/transport/Transport.ts:12](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/transport/Transport.ts#L12)

Request/response transport used by the Lavalink REST client.

## Methods

### request()

> **request**\<`T`\>(`request`): `Promise`\<`T` \| `undefined`\>

Defined in: [packages/core/src/transport/Transport.ts:14](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/transport/Transport.ts#L14)

Performs a request and resolves the decoded JSON body, if any.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### request

[`TransportRequest`](TransportRequest.md)

#### Returns

`Promise`\<`T` \| `undefined`\>
