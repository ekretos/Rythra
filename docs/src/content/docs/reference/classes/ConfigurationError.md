---
title: ConfigurationError
description: API Reference for ConfigurationError
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/errors/RythraError.ts:33](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L33)

Error caused by invalid Rythra configuration.

## Extends

- [`RythraError`](RythraError.md)

## Constructors

### Constructor

> **new ConfigurationError**(`message`, `context?`): `ConfigurationError`

Defined in: [packages/core/src/errors/RythraError.ts:34](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L34)

Creates a configuration error.

#### Parameters

##### message

`string`

##### context?

`Record`\<`string`, `unknown`\>

#### Returns

`ConfigurationError`

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
