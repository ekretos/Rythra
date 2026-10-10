---
title: PlayerRecoveryError
description: API Reference for PlayerRecoveryError
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/errors/RythraError.ts:19](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L19)

Error raised when a player cannot be recovered or migrated.

## Extends

- [`RythraError`](RythraError.md)

## Constructors

### Constructor

> **new PlayerRecoveryError**(`message`, `options?`): `PlayerRecoveryError`

Defined in: [packages/core/src/errors/RythraError.ts:19](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L19)

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

Defined in: [packages/core/src/errors/RythraError.ts:7](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L7)

Optional originating error.

#### Inherited from

[`RythraError`](RythraError.md).[`cause`](RythraError.md#cause)

***

### code

> `readonly` **code**: [`RythraErrorCode`](../type-aliases/RythraErrorCode.md)

Defined in: [packages/core/src/errors/RythraError.ts:6](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L6)

Stable machine-readable error code.

#### Inherited from

[`RythraError`](RythraError.md).[`code`](RythraError.md#code)

***

### context

> `readonly` **context**: `Readonly`\<`Record`\<`string`, `unknown`\>\>

Defined in: [packages/core/src/errors/RythraError.ts:8](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L8)

Additional structured diagnostic context.

#### Inherited from

[`RythraError`](RythraError.md).[`context`](RythraError.md#context)
