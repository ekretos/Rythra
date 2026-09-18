---
title: Health
description: API Reference for Health
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/health/Health.ts:5](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/health/Health.ts#L5)

Collects lightweight runtime health information without network I/O.

## Constructors

### Constructor

> **new Health**(`manager`): `Health`

Defined in: [packages/core/src/health/Health.ts:7](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/health/Health.ts#L7)

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

Defined in: [packages/core/src/health/Health.ts:9](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/health/Health.ts#L9)

Returns a point-in-time health snapshot.

#### Returns

[`HealthSnapshot`](../interfaces/HealthSnapshot.md)
