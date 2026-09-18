---
title: FetchRestTransport
description: API Reference for FetchRestTransport
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/transport/RestTransport.ts:25](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/RestTransport.ts#L25)

REST transport backed by the runtime's native `fetch` implementation.

## Implements

- [`RestTransport`](../interfaces/RestTransport.md)

## Constructors

### Constructor

> **new FetchRestTransport**(): `FetchRestTransport`

#### Returns

`FetchRestTransport`

## Methods

### request()

> **request**\<`T`\>(`request`): `Promise`\<`T` \| `undefined`\>

Defined in: [packages/core/src/transport/RestTransport.ts:27](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/transport/RestTransport.ts#L27)

Performs a request and resolves the decoded JSON body, if any.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### request

[`TransportRequest`](../interfaces/TransportRequest.md)

#### Returns

`Promise`\<`T` \| `undefined`\>

#### Implementation of

[`RestTransport`](../interfaces/RestTransport.md).[`request`](../interfaces/RestTransport.md#request)
