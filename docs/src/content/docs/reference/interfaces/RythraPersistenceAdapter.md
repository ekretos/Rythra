---
title: RythraPersistenceAdapter
description: API Reference for RythraPersistenceAdapter
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/persistence/PersistenceAdapter.ts:8](https://github.com/ekretos/Rythra/blob/c7739a96c2261c82cc1ff98863eeadbd1fe9a7fe/packages/core/src/persistence/PersistenceAdapter.ts#L8)

Persistence boundary used by recovery and application integrations.

Implementations may back this contract with Redis, SQL, a document store,
or an in-memory implementation for tests. The core does not depend on any
particular storage engine.

## Type Parameters

### T

`T` = `unknown`

## Methods

### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: [packages/core/src/persistence/PersistenceAdapter.ts:16](https://github.com/ekretos/Rythra/blob/c7739a96c2261c82cc1ff98863eeadbd1fe9a7fe/packages/core/src/persistence/PersistenceAdapter.ts#L16)

Remove a value.

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`\>

***

### flush()?

> `optional` **flush**(): `Promise`\<`void`\>

Defined in: [packages/core/src/persistence/PersistenceAdapter.ts:19](https://github.com/ekretos/Rythra/blob/c7739a96c2261c82cc1ff98863eeadbd1fe9a7fe/packages/core/src/persistence/PersistenceAdapter.ts#L19)

Flush pending writes before shutdown.

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`key`): `Promise`\<`T` \| `undefined`\>

Defined in: [packages/core/src/persistence/PersistenceAdapter.ts:10](https://github.com/ekretos/Rythra/blob/c7739a96c2261c82cc1ff98863eeadbd1fe9a7fe/packages/core/src/persistence/PersistenceAdapter.ts#L10)

Read a previously stored value.

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`T` \| `undefined`\>

***

### set()

> **set**(`key`, `value`): `Promise`\<`void`\>

Defined in: [packages/core/src/persistence/PersistenceAdapter.ts:13](https://github.com/ekretos/Rythra/blob/c7739a96c2261c82cc1ff98863eeadbd1fe9a7fe/packages/core/src/persistence/PersistenceAdapter.ts#L13)

Store or replace a value.

#### Parameters

##### key

`string`

##### value

`T`

#### Returns

`Promise`\<`void`\>
