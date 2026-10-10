---
title: PersistenceAdapter
description: API Reference for PersistenceAdapter
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/persistence/Persistence.ts:26](https://github.com/ekretos/Rythra/blob/c7739a96c2261c82cc1ff98863eeadbd1fe9a7fe/packages/core/src/persistence/Persistence.ts#L26)

Storage adapter used for crash recovery and optional long-lived player state.

## Type Parameters

### Snapshot

`Snapshot` = [`PlayerSnapshot`](PlayerSnapshot.md)

Snapshot representation persisted by the adapter.

## Methods

### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: [packages/core/src/persistence/Persistence.ts:32](https://github.com/ekretos/Rythra/blob/c7739a96c2261c82cc1ff98863eeadbd1fe9a7fe/packages/core/src/persistence/Persistence.ts#L32)

Deletes a snapshot.

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`\>

***

### keys()

> **keys**(): `Promise`\<`string`[]\>

Defined in: [packages/core/src/persistence/Persistence.ts:34](https://github.com/ekretos/Rythra/blob/c7739a96c2261c82cc1ff98863eeadbd1fe9a7fe/packages/core/src/persistence/Persistence.ts#L34)

Lists stored snapshot keys.

#### Returns

`Promise`\<`string`[]\>

***

### load()

> **load**(`key`): `Promise`\<`Snapshot` \| `undefined`\>

Defined in: [packages/core/src/persistence/Persistence.ts:30](https://github.com/ekretos/Rythra/blob/c7739a96c2261c82cc1ff98863eeadbd1fe9a7fe/packages/core/src/persistence/Persistence.ts#L30)

Loads a snapshot by key.

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`Snapshot` \| `undefined`\>

***

### save()

> **save**(`key`, `snapshot`): `Promise`\<`void`\>

Defined in: [packages/core/src/persistence/Persistence.ts:28](https://github.com/ekretos/Rythra/blob/c7739a96c2261c82cc1ff98863eeadbd1fe9a7fe/packages/core/src/persistence/Persistence.ts#L28)

Saves or replaces a snapshot.

#### Parameters

##### key

`string`

##### snapshot

`Snapshot`

#### Returns

`Promise`\<`void`\>
