---
title: Metrics
description: API Reference for Metrics
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/metrics/Metrics.ts:26](https://github.com/ekretos/Rythra/blob/main/packages/core/src/metrics/Metrics.ts#L26)

Lightweight dependency-free metrics collector.

## Remarks

Applications can export snapshots to Prometheus, OpenTelemetry or their own
telemetry backend without coupling Rythra to a specific observability stack.

## Constructors

### Constructor

> **new Metrics**(): `Metrics`

#### Returns

`Metrics`

## Methods

### recordMigration()

> **recordMigration**(): `void`

Defined in: [packages/core/src/metrics/Metrics.ts:45](https://github.com/ekretos/Rythra/blob/main/packages/core/src/metrics/Metrics.ts#L45)

Records a player migration.

#### Returns

`void`

***

### recordReconnect()

> **recordReconnect**(): `void`

Defined in: [packages/core/src/metrics/Metrics.ts:43](https://github.com/ekretos/Rythra/blob/main/packages/core/src/metrics/Metrics.ts#L43)

Records a reconnect attempt.

#### Returns

`void`

***

### recordRestError()

> **recordRestError**(): `void`

Defined in: [packages/core/src/metrics/Metrics.ts:47](https://github.com/ekretos/Rythra/blob/main/packages/core/src/metrics/Metrics.ts#L47)

Records a failed REST request.

#### Returns

`void`

***

### recordRestLatency()

> **recordRestLatency**(`milliseconds`): `void`

Defined in: [packages/core/src/metrics/Metrics.ts:49](https://github.com/ekretos/Rythra/blob/main/packages/core/src/metrics/Metrics.ts#L49)

Records one REST request latency sample.

#### Parameters

##### milliseconds

`number`

#### Returns

`void`

***

### reset()

> **reset**(): `void`

Defined in: [packages/core/src/metrics/Metrics.ts:69](https://github.com/ekretos/Rythra/blob/main/packages/core/src/metrics/Metrics.ts#L69)

Resets counters while retaining no historical samples.

#### Returns

`void`

***

### setConnectedNodes()

> **setConnectedNodes**(`value`): `void`

Defined in: [packages/core/src/metrics/Metrics.ts:37](https://github.com/ekretos/Rythra/blob/main/packages/core/src/metrics/Metrics.ts#L37)

Sets the current node count.

#### Parameters

##### value

`number`

#### Returns

`void`

***

### setPlayers()

> **setPlayers**(`value`): `void`

Defined in: [packages/core/src/metrics/Metrics.ts:39](https://github.com/ekretos/Rythra/blob/main/packages/core/src/metrics/Metrics.ts#L39)

Sets the current player count.

#### Parameters

##### value

`number`

#### Returns

`void`

***

### setPlayingPlayers()

> **setPlayingPlayers**(`value`): `void`

Defined in: [packages/core/src/metrics/Metrics.ts:41](https://github.com/ekretos/Rythra/blob/main/packages/core/src/metrics/Metrics.ts#L41)

Sets the current playing-player count.

#### Parameters

##### value

`number`

#### Returns

`void`

***

### snapshot()

> **snapshot**(): [`MetricsSnapshot`](../interfaces/MetricsSnapshot.md)

Defined in: [packages/core/src/metrics/Metrics.ts:56](https://github.com/ekretos/Rythra/blob/main/packages/core/src/metrics/Metrics.ts#L56)

Returns a point-in-time metrics snapshot.

#### Returns

[`MetricsSnapshot`](../interfaces/MetricsSnapshot.md)
