---
title: RestError
description: API Reference for RestError
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/transport/RestTransport.ts:5](https://github.com/ekretos/Rythra/blob/main/packages/core/src/transport/RestTransport.ts#L5)

Error thrown when Lavalink answers a REST call with a failure payload.

## Extends

- `Error`

## Constructors

### Constructor

> **new RestError**(`data`): `RestError`

Defined in: [packages/core/src/transport/RestTransport.ts:13](https://github.com/ekretos/Rythra/blob/main/packages/core/src/transport/RestTransport.ts#L13)

Creates a REST error from a Lavalink error payload.

#### Parameters

##### data

[`LavalinkRestError`](../interfaces/LavalinkRestError.md)

#### Returns

`RestError`

#### Overrides

`Error.constructor`

## Properties

### error

> `readonly` **error**: `string`

Defined in: [packages/core/src/transport/RestTransport.ts:8](https://github.com/ekretos/Rythra/blob/main/packages/core/src/transport/RestTransport.ts#L8)

Error type reported by Lavalink.

***

### path

> `readonly` **path**: `string`

Defined in: [packages/core/src/transport/RestTransport.ts:9](https://github.com/ekretos/Rythra/blob/main/packages/core/src/transport/RestTransport.ts#L9)

Request path.

***

### status

> `readonly` **status**: `number`

Defined in: [packages/core/src/transport/RestTransport.ts:7](https://github.com/ekretos/Rythra/blob/main/packages/core/src/transport/RestTransport.ts#L7)

HTTP status code.

***

### timestamp

> `readonly` **timestamp**: `number`

Defined in: [packages/core/src/transport/RestTransport.ts:6](https://github.com/ekretos/Rythra/blob/main/packages/core/src/transport/RestTransport.ts#L6)

Error timestamp reported by Lavalink.

***

### trace?

> `readonly` `optional` **trace?**: `string`

Defined in: [packages/core/src/transport/RestTransport.ts:10](https://github.com/ekretos/Rythra/blob/main/packages/core/src/transport/RestTransport.ts#L10)

Optional stack trace reported by Lavalink.
