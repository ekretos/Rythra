---
title: Health
description: API Reference for Health
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/health/Health.ts:14](https://github.com/ekretos/Rythra/blob/main/packages/core/src/health/Health.ts#L14)

Collects lightweight runtime health information without network I/O.

## Constructors

### Constructor

> **new Health**(`manager`): `Health`

Defined in: [packages/core/src/health/Health.ts:16](https://github.com/ekretos/Rythra/blob/main/packages/core/src/health/Health.ts#L16)

Creates a health collector.

#### Parameters

##### manager

###### migrations?

`number`

###### nodes

`Map`\<`string`, \{ `connected`: `boolean`; `stats`: \{ `players`: `number`; `playingPlayers`: `number`; \}; \}\>

###### players

`Map`\<`string`, \{ `playing`: `boolean`; \}\>

###### reconnects?

`number`

###### startedAt?

`number`

#### Returns

`Health`

## Methods

### snapshot()

> **snapshot**(): [`HealthSnapshot`](../interfaces/HealthSnapshot.md)

Defined in: [packages/core/src/health/Health.ts:26](https://github.com/ekretos/Rythra/blob/main/packages/core/src/health/Health.ts#L26)

Returns a point-in-time health snapshot.

#### Returns

[`HealthSnapshot`](../interfaces/HealthSnapshot.md)
