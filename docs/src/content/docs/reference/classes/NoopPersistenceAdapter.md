---
title: NoopPersistenceAdapter
description: API Reference for NoopPersistenceAdapter
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/persistence/Persistence.ts:40](https://github.com/ekretos/Rythra/blob/8c65b2b9a1c3f4d653aa63873bbc3c7b0f9b3db4/packages/core/src/persistence/Persistence.ts#L40)

No-op persistence adapter for applications that do not need durable state.

## Implements

- [`PersistenceAdapter`](../interfaces/PersistenceAdapter.md)

## Constructors

### Constructor

> **new NoopPersistenceAdapter**(): `NoopPersistenceAdapter`

#### Returns

`NoopPersistenceAdapter`

## Methods

### delete()

> **delete**(): `Promise`\<`void`\>

Defined in: [packages/core/src/persistence/Persistence.ts:46](https://github.com/ekretos/Rythra/blob/8c65b2b9a1c3f4d653aa63873bbc3c7b0f9b3db4/packages/core/src/persistence/Persistence.ts#L46)

Deletes a snapshot.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`PersistenceAdapter`](../interfaces/PersistenceAdapter.md).[`delete`](../interfaces/PersistenceAdapter.md#delete)

***

### keys()

> **keys**(): `Promise`\<`string`[]\>

Defined in: [packages/core/src/persistence/Persistence.ts:48](https://github.com/ekretos/Rythra/blob/8c65b2b9a1c3f4d653aa63873bbc3c7b0f9b3db4/packages/core/src/persistence/Persistence.ts#L48)

Lists stored snapshot keys.

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`PersistenceAdapter`](../interfaces/PersistenceAdapter.md).[`keys`](../interfaces/PersistenceAdapter.md#keys)

***

### load()

> **load**(): `Promise`\<`undefined`\>

Defined in: [packages/core/src/persistence/Persistence.ts:44](https://github.com/ekretos/Rythra/blob/8c65b2b9a1c3f4d653aa63873bbc3c7b0f9b3db4/packages/core/src/persistence/Persistence.ts#L44)

Loads a snapshot by key.

#### Returns

`Promise`\<`undefined`\>

#### Implementation of

[`PersistenceAdapter`](../interfaces/PersistenceAdapter.md).[`load`](../interfaces/PersistenceAdapter.md#load)

***

### save()

> **save**(): `Promise`\<`void`\>

Defined in: [packages/core/src/persistence/Persistence.ts:42](https://github.com/ekretos/Rythra/blob/8c65b2b9a1c3f4d653aa63873bbc3c7b0f9b3db4/packages/core/src/persistence/Persistence.ts#L42)

Saves or replaces a snapshot.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`PersistenceAdapter`](../interfaces/PersistenceAdapter.md).[`save`](../interfaces/PersistenceAdapter.md#save)
