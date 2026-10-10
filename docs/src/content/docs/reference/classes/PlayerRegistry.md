---
title: PlayerRegistry
description: API Reference for PlayerRegistry
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/kernel/Registry.ts:38](https://github.com/ekretos/Rythra/blob/main/packages/core/src/kernel/Registry.ts#L38)

Registry of guild players managed by a Rythra runtime.

## Extends

- [`Registry`](Registry.md)\<[`RythraPlayer`](RythraPlayer.md)\>

## Constructors

### Constructor

> **new PlayerRegistry**(`entries?`): `PlayerRegistry`

Defined in: scripts/typedoc/node\_modules/typescript/lib/lib.es2015.collection.d.ts:51

#### Parameters

##### entries?

readonly readonly \[`string`, [`RythraPlayer`](RythraPlayer.md)\][] \| `null`

#### Returns

`PlayerRegistry`

#### Inherited from

[`Registry`](Registry.md).[`constructor`](Registry.md#constructor)

### Constructor

> **new PlayerRegistry**(`iterable?`): `PlayerRegistry`

Defined in: scripts/typedoc/node\_modules/typescript/lib/lib.es2015.collection.d.ts:50

#### Parameters

##### iterable?

`Iterable`\<readonly \[`string`, [`RythraPlayer`](RythraPlayer.md)\], `any`, `any`\> \| `null`

#### Returns

`PlayerRegistry`

#### Inherited from

[`Registry`](Registry.md).[`constructor`](Registry.md#constructor)

## Methods

### filter()

> **filter**(`predicate`): [`RythraPlayer`](RythraPlayer.md)[]

Defined in: [packages/core/src/kernel/Registry.ts:19](https://github.com/ekretos/Rythra/blob/main/packages/core/src/kernel/Registry.ts#L19)

Returns the registered entries matching a predicate.

#### Parameters

##### predicate

(`value`) => `boolean`

#### Returns

[`RythraPlayer`](RythraPlayer.md)[]

#### Inherited from

[`Registry`](Registry.md).[`filter`](Registry.md#filter)

***

### list()

> **list**(): [`RythraPlayer`](RythraPlayer.md)[]

Defined in: [packages/core/src/kernel/Registry.ts:15](https://github.com/ekretos/Rythra/blob/main/packages/core/src/kernel/Registry.ts#L15)

Returns every registered entry.

#### Returns

[`RythraPlayer`](RythraPlayer.md)[]

#### Inherited from

[`Registry`](Registry.md).[`list`](Registry.md#list)

***

### playing()

> **playing**(): [`RythraPlayer`](RythraPlayer.md)[]

Defined in: [packages/core/src/kernel/Registry.ts:40](https://github.com/ekretos/Rythra/blob/main/packages/core/src/kernel/Registry.ts#L40)

Returns the players that currently have a track playing.

#### Returns

[`RythraPlayer`](RythraPlayer.md)[]
