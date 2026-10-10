---
title: NodeRegistry
description: API Reference for NodeRegistry
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/kernel/Registry.ts:21](https://github.com/ekretos/Rythra/blob/main/packages/core/src/kernel/Registry.ts#L21)

Registry of Lavalink nodes managed by a Rythra runtime.

## Extends

- [`Registry`](Registry.md)\<[`Node`](Node.md)\>

## Constructors

### Constructor

> **new NodeRegistry**(`entries?`): `NodeRegistry`

Defined in: scripts/typedoc/node\_modules/typescript/lib/lib.es2015.collection.d.ts:51

#### Parameters

##### entries?

readonly readonly \[`string`, [`Node`](Node.md)\][] \| `null`

#### Returns

`NodeRegistry`

#### Inherited from

[`Registry`](Registry.md).[`constructor`](Registry.md#constructor)

### Constructor

> **new NodeRegistry**(`iterable?`): `NodeRegistry`

Defined in: scripts/typedoc/node\_modules/typescript/lib/lib.es2015.collection.d.ts:50

#### Parameters

##### iterable?

`Iterable`\<readonly \[`string`, [`Node`](Node.md)\], `any`, `any`\> \| `null`

#### Returns

`NodeRegistry`

#### Inherited from

[`Registry`](Registry.md).[`constructor`](Registry.md#constructor)

## Methods

### available()

> **available**(): [`Node`](Node.md)[]

Defined in: [packages/core/src/kernel/Registry.ts:25](https://github.com/ekretos/Rythra/blob/main/packages/core/src/kernel/Registry.ts#L25)

Returns the nodes eligible to receive work, preferring connected nodes.

#### Returns

[`Node`](Node.md)[]

***

### connected()

> **connected**(): [`Node`](Node.md)[]

Defined in: [packages/core/src/kernel/Registry.ts:23](https://github.com/ekretos/Rythra/blob/main/packages/core/src/kernel/Registry.ts#L23)

Returns the nodes whose transport is currently connected.

#### Returns

[`Node`](Node.md)[]

***

### filter()

> **filter**(`predicate`): [`Node`](Node.md)[]

Defined in: [packages/core/src/kernel/Registry.ts:17](https://github.com/ekretos/Rythra/blob/main/packages/core/src/kernel/Registry.ts#L17)

Returns the registered entries matching a predicate.

#### Parameters

##### predicate

(`value`) => `boolean`

#### Returns

[`Node`](Node.md)[]

#### Inherited from

[`Registry`](Registry.md).[`filter`](Registry.md#filter)

***

### list()

> **list**(): [`Node`](Node.md)[]

Defined in: [packages/core/src/kernel/Registry.ts:15](https://github.com/ekretos/Rythra/blob/main/packages/core/src/kernel/Registry.ts#L15)

Returns every registered entry.

#### Returns

[`Node`](Node.md)[]

#### Inherited from

[`Registry`](Registry.md).[`list`](Registry.md#list)
