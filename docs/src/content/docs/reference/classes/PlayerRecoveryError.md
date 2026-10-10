---
title: PlayerRecoveryError
description: API Reference for PlayerRecoveryError
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/errors/RythraError.ts:51](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L51)

Error raised when a player cannot be recovered or migrated.

## Extends

- [`RythraError`](RythraError.md)

## Constructors

### Constructor

> **new PlayerRecoveryError**(`message`, `options?`): `PlayerRecoveryError`

Defined in: [packages/core/src/errors/RythraError.ts:52](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L52)

Creates a player recovery error.

#### Parameters

##### message

`string`

##### options?

###### cause?

`unknown`

###### context?

`Record`\<`string`, `unknown`\>

#### Returns

`PlayerRecoveryError`

#### Overrides

[`RythraError`](RythraError.md).[`constructor`](RythraError.md#constructor)

## Properties

### cause?

> `readonly` `optional` **cause?**: `unknown`

Defined in: [packages/core/src/errors/RythraError.ts:21](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L21)

Optional originating error.

#### Inherited from

[`RythraError`](RythraError.md).[`cause`](RythraError.md#cause)

***

### code

> `readonly` **code**: [`RythraErrorCode`](../type-aliases/RythraErrorCode.md)

Defined in: [packages/core/src/errors/RythraError.ts:20](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L20)

Stable machine-readable error code.

#### Inherited from

[`RythraError`](RythraError.md).[`code`](RythraError.md#code)

***

### context

> `readonly` **context**: `Readonly`\<`Record`\<`string`, `unknown`\>\>

Defined in: [packages/core/src/errors/RythraError.ts:22](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L22)

Additional structured diagnostic context.

#### Inherited from

[`RythraError`](RythraError.md).[`context`](RythraError.md#context)
