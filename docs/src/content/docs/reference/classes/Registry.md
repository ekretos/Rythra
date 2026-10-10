---
title: Registry
description: API Reference for Registry
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/kernel/Registry.ts:13](https://github.com/ekretos/Rythra/blob/main/packages/core/src/kernel/Registry.ts#L13)

Keyed registry of runtime entities owned by the Rythra kernel.

## Remarks

The registry extends Map so existing consumers keep the familiar
`get`/`set`/`values` surface while the kernel gains domain-aware lookups.

## Extends

- `Map`\<`string`, `V`\>

## Extended by

- [`NodeRegistry`](NodeRegistry.md)
- [`PlayerRegistry`](PlayerRegistry.md)

## Type Parameters

### V

`V`

The registered entity type.

## Constructors

### Constructor

> **new Registry**\<`V`\>(`entries?`): `Registry`\<`V`\>

Defined in: scripts/typedoc/node\_modules/typescript/lib/lib.es2015.collection.d.ts:51

#### Parameters

##### entries?

readonly readonly \[`string`, `V`\][] \| `null`

#### Returns

`Registry`\<`V`\>

#### Inherited from

`Map<string, V>.constructor`

### Constructor

> **new Registry**\<`V`\>(`iterable?`): `Registry`\<`V`\>

Defined in: scripts/typedoc/node\_modules/typescript/lib/lib.es2015.collection.d.ts:50

#### Parameters

##### iterable?

`Iterable`\<readonly \[`string`, `V`\], `any`, `any`\> \| `null`

#### Returns

`Registry`\<`V`\>

#### Inherited from

`Map<string, V>.constructor`

## Methods

### filter()

> **filter**(`predicate`): `V`[]

Defined in: [packages/core/src/kernel/Registry.ts:19](https://github.com/ekretos/Rythra/blob/main/packages/core/src/kernel/Registry.ts#L19)

Returns the registered entries matching a predicate.

#### Parameters

##### predicate

(`value`) => `boolean`

#### Returns

`V`[]

***

### list()

> **list**(): `V`[]

Defined in: [packages/core/src/kernel/Registry.ts:15](https://github.com/ekretos/Rythra/blob/main/packages/core/src/kernel/Registry.ts#L15)

Returns every registered entry.

#### Returns

`V`[]
