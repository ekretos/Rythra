---
title: PlayerRegistry
description: API Reference for PlayerRegistry
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/kernel/Registry.ts:29](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/kernel/Registry.ts#L29)

Registry of guild players managed by a Rythra runtime.

## Extends

- [`Registry`](Registry.md)\<[`RythraPlayer`](RythraPlayer.md)\>

## Constructors

### Constructor

> **new PlayerRegistry**(`entries?`): `PlayerRegistry`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:51

#### Parameters

##### entries?

readonly readonly \[`string`, [`RythraPlayer`](RythraPlayer.md)\][] \| `null`

#### Returns

`PlayerRegistry`

#### Inherited from

[`Registry`](Registry.md).[`constructor`](Registry.md#constructor)

### Constructor

> **new PlayerRegistry**(`iterable?`): `PlayerRegistry`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:50

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

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:135

#### Inherited from

[`Registry`](Registry.md).[`[toStringTag]`](Registry.md#tostringtag)

***

### size

> `readonly` **size**: `number`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:46

#### Returns

the number of elements in the Map.

#### Inherited from

[`Registry`](Registry.md).[`size`](Registry.md#size)

***

### \[species\]

> `readonly` `static` **\[species\]**: `MapConstructor`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:317

#### Inherited from

[`Registry`](Registry.md).[`[species]`](Registry.md#species)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `MapIterator`\<\[`string`, [`RythraPlayer`](RythraPlayer.md)\]\>

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:141

Returns an iterable of entries in the map.

#### Returns

`MapIterator`\<\[`string`, [`RythraPlayer`](RythraPlayer.md)\]\>

#### Inherited from

[`Registry`](Registry.md).[`[iterator]`](Registry.md#iterator)

***

### clear()

> **clear**(): `void`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:21

Removes all elements from the Map.

#### Returns

`void`

#### Inherited from

[`Registry`](Registry.md).[`clear`](Registry.md#clear)

***

### delete()

> **delete**(`key`): `boolean`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:25

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

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:146

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`MapIterator`\<\[`string`, [`RythraPlayer`](RythraPlayer.md)\]\>

#### Inherited from

[`Registry`](Registry.md).[`entries`](Registry.md#entries)

***

### filter()

> **filter**(`predicate`): [`RythraPlayer`](RythraPlayer.md)[]

Defined in: [packages/core/src/kernel/Registry.ts:17](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/kernel/Registry.ts#L17)

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

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:29

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

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:34

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

### getOrInsert()

> **getOrInsert**(`key`, `defaultValue`): [`RythraPlayer`](RythraPlayer.md)

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.esnext.collection.d.ts:25

Returns a specified element from the Map object.
If no element is associated with the specified key, a new element with the value `defaultValue` will be inserted into the Map and returned.

#### Parameters

##### key

`string`

##### defaultValue

[`RythraPlayer`](RythraPlayer.md)

#### Returns

[`RythraPlayer`](RythraPlayer.md)

The element associated with the specified key, which will be `defaultValue` if no element previously existed.

#### Inherited from

[`Registry`](Registry.md).[`getOrInsert`](Registry.md#getorinsert)

***

### getOrInsertComputed()

> **getOrInsertComputed**(`key`, `callback`): [`RythraPlayer`](RythraPlayer.md)

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.esnext.collection.d.ts:31

Returns a specified element from the Map object.
If no element is associated with the specified key, the result of passing the specified key to the `callback` function will be inserted into the Map and returned.

#### Parameters

##### key

`string`

##### callback

(`key`) => [`RythraPlayer`](RythraPlayer.md)

#### Returns

[`RythraPlayer`](RythraPlayer.md)

The element associated with the specific key, which will be the newly computed value if no element previously existed.

#### Inherited from

[`Registry`](Registry.md).[`getOrInsertComputed`](Registry.md#getorinsertcomputed)

***

### has()

> **has**(`key`): `boolean`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:38

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

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:151

Returns an iterable of keys in the map

#### Returns

`MapIterator`\<`string`\>

#### Inherited from

[`Registry`](Registry.md).[`keys`](Registry.md#keys)

***

### list()

> **list**(): [`RythraPlayer`](RythraPlayer.md)[]

Defined in: [packages/core/src/kernel/Registry.ts:15](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/kernel/Registry.ts#L15)

Returns every registered entry.

#### Returns

[`RythraPlayer`](RythraPlayer.md)[]

#### Inherited from

[`Registry`](Registry.md).[`list`](Registry.md#list)

***

### playing()

> **playing**(): [`RythraPlayer`](RythraPlayer.md)[]

Defined in: [packages/core/src/kernel/Registry.ts:31](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/kernel/Registry.ts#L31)

Returns the players that currently have a track playing.

#### Returns

[`RythraPlayer`](RythraPlayer.md)[]

***

### set()

> **set**(`key`, `value`): `this`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:42

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

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:156

Returns an iterable of values in the map

#### Returns

`MapIterator`\<[`RythraPlayer`](RythraPlayer.md)\>

#### Inherited from

[`Registry`](Registry.md).[`values`](Registry.md#values)

***

### groupBy()

> `static` **groupBy**\<`K`, `T`\>(`items`, `keySelector`): `Map`\<`K`, `T`[]\>

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2024.collection.d.ts:23

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
