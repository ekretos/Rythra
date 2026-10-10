---
title: RythraError
description: API Reference for RythraError
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/errors/RythraError.ts:5](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L5)

Base error type for all Rythra failures.

## Extends

- `Error`

## Extended by

- [`ConfigurationError`](ConfigurationError.md)
- [`NodeError`](NodeError.md)
- [`PlayerRecoveryError`](PlayerRecoveryError.md)
- [`ValidationError`](ValidationError.md)

## Constructors

### Constructor

> **new RythraError**(`message`, `code`, `options?`): `RythraError`

Defined in: [packages/core/src/errors/RythraError.ts:10](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L10)

Creates a structured Rythra error.

#### Parameters

##### message

`string`

##### code

[`RythraErrorCode`](../type-aliases/RythraErrorCode.md)

##### options?

###### cause?

`unknown`

###### context?

`Record`\<`string`, `unknown`\>

#### Returns

`RythraError`

#### Overrides

`Error.constructor`

## Properties

### cause?

> `readonly` `optional` **cause?**: `unknown`

Defined in: [packages/core/src/errors/RythraError.ts:7](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L7)

Optional originating error.

#### Overrides

`Error.cause`

***

### code

> `readonly` **code**: [`RythraErrorCode`](../type-aliases/RythraErrorCode.md)

Defined in: [packages/core/src/errors/RythraError.ts:6](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L6)

Stable machine-readable error code.

***

### context

> `readonly` **context**: `Readonly`\<`Record`\<`string`, `unknown`\>\>

Defined in: [packages/core/src/errors/RythraError.ts:8](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L8)

Additional structured diagnostic context.
