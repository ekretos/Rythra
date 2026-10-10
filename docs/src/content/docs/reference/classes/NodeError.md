---
title: NodeError
description: API Reference for NodeError
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/errors/RythraError.ts:40](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L40)

Error raised while connecting to or communicating with a Lavalink node.

## Extends

- [`RythraError`](RythraError.md)

## Constructors

### Constructor

> **new NodeError**(`message`, `code?`, `options?`): `NodeError`

Defined in: [packages/core/src/errors/RythraError.ts:41](https://github.com/ekretos/Rythra/blob/main/packages/core/src/errors/RythraError.ts#L41)

Creates a node error.

#### Parameters

##### message

`string`

##### code?

`"NODE"` \| `"NODE_CONNECTION"` \| `"NODE_TIMEOUT"`

##### options?

###### cause?

`unknown`

###### context?

`Record`\<`string`, `unknown`\>

#### Returns

`NodeError`

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
