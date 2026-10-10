---
title: Queue
description: API Reference for Queue
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/Queue.ts:12](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Queue.ts#L12)

Ordered collection of tracks waiting for playback.

## Remarks

Queue extends the native array API while providing Rythra-specific state
for the current track and playback history.

## Extends

- `Array`\<[`Track`](../interfaces/Track.md)\>

## Indexable

> \[`n`: `number`\]: [`Track`](../interfaces/Track.md)

## Constructors

### Constructor

> **new Queue**(`arrayLength`): `Queue`

Defined in: scripts/typedoc/node\_modules/typescript/lib/lib.es5.d.ts:1513

#### Parameters

##### arrayLength

`number`

#### Returns

`Queue`

#### Inherited from

`Array<Track>.constructor`

### Constructor

> **new Queue**(...`items`): `Queue`

Defined in: scripts/typedoc/node\_modules/typescript/lib/lib.es5.d.ts:1514

#### Parameters

##### items

...[`Track`](../interfaces/Track.md)[]

#### Returns

`Queue`

#### Inherited from

`Array<Track>.constructor`

## Properties

### current

> **current**: [`Track`](../interfaces/Track.md) \| `null` = `null`

Defined in: [packages/core/src/Queue.ts:14](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Queue.ts#L14)

The track currently selected for playback.

***

### previous

> **previous**: [`Track`](../interfaces/Track.md)[] = `[]`

Defined in: [packages/core/src/Queue.ts:16](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Queue.ts#L16)

Tracks that have already completed or been skipped, newest first.

***

### maxHistory

> `static` **maxHistory**: `number` = `100`

Defined in: [packages/core/src/Queue.ts:18](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Queue.ts#L18)

Maximum number of tracks retained in [Queue.previous](#previous).

## Methods

### add()

> **add**(`track`): `void`

Defined in: [packages/core/src/Queue.ts:27](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Queue.ts#L27)

Adds one or more tracks to the end of the queue.

#### Parameters

##### track

[`Track`](../interfaces/Track.md) \| [`Track`](../interfaces/Track.md)[]

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [packages/core/src/Queue.ts:38](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Queue.ts#L38)

Removes every pending track while preserving current/history state.

#### Returns

`void`

***

### pushHistory()

> **pushHistory**(`track`): `void`

Defined in: [packages/core/src/Queue.ts:21](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Queue.ts#L21)

Records a finished track in the bounded history, newest first.

#### Parameters

##### track

[`Track`](../interfaces/Track.md)

#### Returns

`void`

***

### remove()

> **remove**(`index`): [`Track`](../interfaces/Track.md) \| `undefined`

Defined in: [packages/core/src/Queue.ts:33](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Queue.ts#L33)

Removes a track at a specific queue index.

#### Parameters

##### index

`number`

#### Returns

[`Track`](../interfaces/Track.md) \| `undefined`

***

### shuffle()

> **shuffle**(): `void`

Defined in: [packages/core/src/Queue.ts:43](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Queue.ts#L43)

Randomly reorders pending tracks using Fisher-Yates shuffling.

#### Returns

`void`
