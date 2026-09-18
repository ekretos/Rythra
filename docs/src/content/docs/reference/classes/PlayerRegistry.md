---
title: PlayerRegistry
description: API Reference for PlayerRegistry
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/kernel/Registry.ts:29](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/kernel/Registry.ts#L29)

Registry of guild players managed by a Rythra runtime.

## Extends

- [`Registry`](Registry.md)\<[`RythraPlayer`](RythraPlayer.md)\>

## Constructors

### Constructor

> **new PlayerRegistry**(`entries?`): `PlayerRegistry`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:50

#### Parameters

##### entries?

readonly readonly \[`string`, [`RythraPlayer`](RythraPlayer.md)\][] \| `null`

#### Returns

`PlayerRegistry`

#### Inherited from

[`Registry`](Registry.md).[`constructor`](Registry.md#constructor)

### Constructor

> **new PlayerRegistry**(`iterable?`): `PlayerRegistry`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:49

#### Parameters

##### iterable?

`Iterable`\<readonly \[`string`, [`RythraPlayer`](RythraPlayer.md)\], `any`, `any`\> \| `null`

#### Returns

`PlayerRegistry`

#### Inherited from

[`Registry`](Registry.md).[`constructor`](Registry.md#constructor)

## Properties

### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `string`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:137

#### Inherited from

[`Registry`](Registry.md).[`[toStringTag]`](Registry.md#tostringtag)

***

### size

> `readonly` **size**: `number`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:45

#### Returns

the number of elements in the Map.

#### Inherited from

[`Registry`](Registry.md).[`size`](Registry.md#size)

***

### \[species\]

> `readonly` `static` **\[species\]**: `MapConstructor`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:319

#### Inherited from

[`Registry`](Registry.md).[`[species]`](Registry.md#species)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `MapIterator`\<\[`string`, [`RythraPlayer`](RythraPlayer.md)\]\>

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:143

Returns an iterable of entries in the map.

#### Returns

`MapIterator`\<\[`string`, [`RythraPlayer`](RythraPlayer.md)\]\>

#### Inherited from

[`Registry`](Registry.md).[`[iterator]`](Registry.md#iterator)

***

### clear()

> **clear**(): `void`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:20

#### Returns

`void`

#### Inherited from

[`Registry`](Registry.md).[`clear`](Registry.md#clear)

***

### delete()

> **delete**(`key`): `boolean`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:24

#### Parameters

##### key

`string`

#### Returns

`boolean`

true if an element in the Map existed and has been removed, or false if the element does not exist.

#### Inherited from

[`Registry`](Registry.md).[`delete`](Registry.md#delete)

***

### entries()

> **entries**(): `MapIterator`\<\[`string`, [`RythraPlayer`](RythraPlayer.md)\]\>

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:148

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`MapIterator`\<\[`string`, [`RythraPlayer`](RythraPlayer.md)\]\>

#### Inherited from

[`Registry`](Registry.md).[`entries`](Registry.md#entries)

***

### filter()

> **filter**(`predicate`): [`RythraPlayer`](RythraPlayer.md)[]

Defined in: [packages/core/src/kernel/Registry.ts:17](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/kernel/Registry.ts#L17)

Returns the registered entries matching a predicate.

#### Parameters

##### predicate

(`value`) => `boolean`

#### Returns

[`RythraPlayer`](RythraPlayer.md)[]

#### Inherited from

[`Registry`](Registry.md).[`filter`](Registry.md#filter)

***

### forEach()

> **forEach**(`callbackfn`, `thisArg?`): `void`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:28

Executes a provided function once per each key/value pair in the Map, in insertion order.

#### Parameters

##### callbackfn

(`value`, `key`, `map`) => `void`

##### thisArg?

`any`

#### Returns

`void`

#### Inherited from

[`Registry`](Registry.md).[`forEach`](Registry.md#foreach)

***

### get()

> **get**(`key`): [`RythraPlayer`](RythraPlayer.md) \| `undefined`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:33

Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.

#### Parameters

##### key

`string`

#### Returns

[`RythraPlayer`](RythraPlayer.md) \| `undefined`

Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.

#### Inherited from

[`Registry`](Registry.md).[`get`](Registry.md#get)

***

### has()

> **has**(`key`): `boolean`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:37

#### Parameters

##### key

`string`

#### Returns

`boolean`

boolean indicating whether an element with the specified key exists or not.

#### Inherited from

[`Registry`](Registry.md).[`has`](Registry.md#has)

***

### keys()

> **keys**(): `MapIterator`\<`string`\>

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:153

Returns an iterable of keys in the map

#### Returns

`MapIterator`\<`string`\>

#### Inherited from

[`Registry`](Registry.md).[`keys`](Registry.md#keys)

***

### list()

> **list**(): [`RythraPlayer`](RythraPlayer.md)[]

Defined in: [packages/core/src/kernel/Registry.ts:15](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/kernel/Registry.ts#L15)

Returns every registered entry.

#### Returns

[`RythraPlayer`](RythraPlayer.md)[]

#### Inherited from

[`Registry`](Registry.md).[`list`](Registry.md#list)

***

### playing()

> **playing**(): [`RythraPlayer`](RythraPlayer.md)[]

Defined in: [packages/core/src/kernel/Registry.ts:31](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/kernel/Registry.ts#L31)

Returns the players that currently have a track playing.

#### Returns

[`RythraPlayer`](RythraPlayer.md)[]

***

### set()

> **set**(`key`, `value`): `this`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:41

Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.

#### Parameters

##### key

`string`

##### value

[`RythraPlayer`](RythraPlayer.md)

#### Returns

`this`

#### Inherited from

[`Registry`](Registry.md).[`set`](Registry.md#set)

***

### values()

> **values**(): `MapIterator`\<[`RythraPlayer`](RythraPlayer.md)\>

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:158

Returns an iterable of values in the map

#### Returns

`MapIterator`\<[`RythraPlayer`](RythraPlayer.md)\>

#### Inherited from

[`Registry`](Registry.md).[`values`](Registry.md#values)

***

### groupBy()

> `static` **groupBy**\<`K`, `T`\>(`items`, `keySelector`): `Map`\<`K`, `T`[]\>

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2024.collection.d.ts:25

Groups members of an iterable according to the return value of the passed callback.

#### Type Parameters

##### K

`K`

##### T

`T`

#### Parameters

##### items

`Iterable`\<`T`\>

An iterable.

##### keySelector

(`item`, `index`) => `K`

A callback which will be invoked for each item in items.

#### Returns

`Map`\<`K`, `T`[]\>

#### Inherited from

[`Registry`](Registry.md).[`groupBy`](Registry.md#groupby)
