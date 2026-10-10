---
title: Registry
description: API Reference for Registry
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/kernel/Registry.ts:13](https://github.com/ekretos/Rythra/blob/c7739a96c2261c82cc1ff98863eeadbd1fe9a7fe/packages/core/src/kernel/Registry.ts#L13)

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

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:51

#### Parameters

##### entries?

readonly readonly \[`string`, `V`\][] \| `null`

#### Returns

`Registry`\<`V`\>

#### Inherited from

`Map<string, V>.constructor`

### Constructor

> **new Registry**\<`V`\>(`iterable?`): `Registry`\<`V`\>

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:50

#### Parameters

##### iterable?

`Iterable`\<readonly \[`string`, `V`\], `any`, `any`\> \| `null`

#### Returns

`Registry`\<`V`\>

#### Inherited from

`Map<string, V>.constructor`

## Properties

### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `string`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:135

#### Inherited from

`Registry`.[`[toStringTag]`](#tostringtag)

***

### size

> `readonly` **size**: `number`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:46

#### Returns

the number of elements in the Map.

#### Inherited from

`Registry`.[`size`](#size)

***

### \[species\]

> `readonly` `static` **\[species\]**: `MapConstructor`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:317

#### Inherited from

`Map.[species]`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `MapIterator`\<\[`string`, `V`\]\>

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:141

Returns an iterable of entries in the map.

#### Returns

`MapIterator`\<\[`string`, `V`\]\>

#### Inherited from

`Map.[iterator]`

***

### clear()

> **clear**(): `void`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:21

Removes all elements from the Map.

#### Returns

`void`

#### Inherited from

`Map.clear`

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

`Map.delete`

***

### entries()

> **entries**(): `MapIterator`\<\[`string`, `V`\]\>

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:146

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`MapIterator`\<\[`string`, `V`\]\>

#### Inherited from

`Map.entries`

***

### filter()

> **filter**(`predicate`): `V`[]

Defined in: [packages/core/src/kernel/Registry.ts:17](https://github.com/ekretos/Rythra/blob/c7739a96c2261c82cc1ff98863eeadbd1fe9a7fe/packages/core/src/kernel/Registry.ts#L17)

Returns the registered entries matching a predicate.

#### Parameters

##### predicate

(`value`) => `boolean`

#### Returns

`V`[]

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

`Map.forEach`

***

### get()

> **get**(`key`): `V` \| `undefined`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:34

Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.

#### Parameters

##### key

`string`

#### Returns

`V` \| `undefined`

Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.

#### Inherited from

`Map.get`

***

### getOrInsert()

> **getOrInsert**(`key`, `defaultValue`): `V`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.esnext.collection.d.ts:25

Returns a specified element from the Map object.
If no element is associated with the specified key, a new element with the value `defaultValue` will be inserted into the Map and returned.

#### Parameters

##### key

`string`

##### defaultValue

`V`

#### Returns

`V`

The element associated with the specified key, which will be `defaultValue` if no element previously existed.

#### Inherited from

`Map.getOrInsert`

***

### getOrInsertComputed()

> **getOrInsertComputed**(`key`, `callback`): `V`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.esnext.collection.d.ts:31

Returns a specified element from the Map object.
If no element is associated with the specified key, the result of passing the specified key to the `callback` function will be inserted into the Map and returned.

#### Parameters

##### key

`string`

##### callback

(`key`) => `V`

#### Returns

`V`

The element associated with the specific key, which will be the newly computed value if no element previously existed.

#### Inherited from

`Map.getOrInsertComputed`

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

`Map.has`

***

### keys()

> **keys**(): `MapIterator`\<`string`\>

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:151

Returns an iterable of keys in the map

#### Returns

`MapIterator`\<`string`\>

#### Inherited from

`Map.keys`

***

### list()

> **list**(): `V`[]

Defined in: [packages/core/src/kernel/Registry.ts:15](https://github.com/ekretos/Rythra/blob/c7739a96c2261c82cc1ff98863eeadbd1fe9a7fe/packages/core/src/kernel/Registry.ts#L15)

Returns every registered entry.

#### Returns

`V`[]

***

### set()

> **set**(`key`, `value`): `this`

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:42

Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.

#### Parameters

##### key

`string`

##### value

`V`

#### Returns

`this`

#### Inherited from

`Map.set`

***

### values()

> **values**(): `MapIterator`\<`V`\>

Defined in: node\_modules/.bun/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:156

Returns an iterable of values in the map

#### Returns

`MapIterator`\<`V`\>

#### Inherited from

`Map.values`

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

`Map.groupBy`
