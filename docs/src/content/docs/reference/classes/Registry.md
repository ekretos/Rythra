---
title: Registry
description: API Reference for Registry
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/kernel/Registry.ts:13](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/kernel/Registry.ts#L13)

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

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:50

#### Parameters

##### entries?

readonly readonly \[`string`, `V`\][] \| `null`

#### Returns

`Registry`\<`V`\>

#### Inherited from

`Map<string, V>.constructor`

### Constructor

> **new Registry**\<`V`\>(`iterable?`): `Registry`\<`V`\>

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:49

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

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:137

#### Inherited from

`Registry`.[`[toStringTag]`](#tostringtag)

***

### size

> `readonly` **size**: `number`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:45

#### Returns

the number of elements in the Map.

#### Inherited from

`Registry`.[`size`](#size)

***

### \[species\]

> `readonly` `static` **\[species\]**: `MapConstructor`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:319

#### Inherited from

`Map.[species]`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `MapIterator`\<\[`string`, `V`\]\>

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:143

Returns an iterable of entries in the map.

#### Returns

`MapIterator`\<\[`string`, `V`\]\>

#### Inherited from

`Map.[iterator]`

***

### clear()

> **clear**(): `void`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:20

#### Returns

`void`

#### Inherited from

`Map.clear`

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

`Map.delete`

***

### entries()

> **entries**(): `MapIterator`\<\[`string`, `V`\]\>

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:148

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`MapIterator`\<\[`string`, `V`\]\>

#### Inherited from

`Map.entries`

***

### filter()

> **filter**(`predicate`): `V`[]

Defined in: [packages/core/src/kernel/Registry.ts:17](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/kernel/Registry.ts#L17)

Returns the registered entries matching a predicate.

#### Parameters

##### predicate

(`value`) => `boolean`

#### Returns

`V`[]

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

`Map.forEach`

***

### get()

> **get**(`key`): `V` \| `undefined`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:33

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

`Map.has`

***

### keys()

> **keys**(): `MapIterator`\<`string`\>

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:153

Returns an iterable of keys in the map

#### Returns

`MapIterator`\<`string`\>

#### Inherited from

`Map.keys`

***

### list()

> **list**(): `V`[]

Defined in: [packages/core/src/kernel/Registry.ts:15](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/kernel/Registry.ts#L15)

Returns every registered entry.

#### Returns

`V`[]

***

### set()

> **set**(`key`, `value`): `this`

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:41

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

Defined in: node\_modules/.bun/typescript@5.8.2/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:158

Returns an iterable of values in the map

#### Returns

`MapIterator`\<`V`\>

#### Inherited from

`Map.values`

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

`Map.groupBy`
