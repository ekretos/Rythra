---
title: RythraMetricsAdapter
description: API Reference for RythraMetricsAdapter
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/metrics/MetricsAdapter.ts:8](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/metrics/MetricsAdapter.ts#L8)

Minimal metrics boundary for Rythra observability.

Keeping metrics behind an adapter allows applications to connect Prometheus,
OpenTelemetry, StatsD, or a custom telemetry backend without adding those
dependencies to the core package.

## Methods

### counter()

> **counter**(`name`, `value?`): `void`

Defined in: [packages/core/src/metrics/MetricsAdapter.ts:10](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/metrics/MetricsAdapter.ts#L10)

Increment a counter by the supplied amount.

#### Parameters

##### name

`string`

##### value?

`number`

#### Returns

`void`

***

### gauge()

> **gauge**(`name`, `value`): `void`

Defined in: [packages/core/src/metrics/MetricsAdapter.ts:13](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/metrics/MetricsAdapter.ts#L13)

Record the current value of a gauge.

#### Parameters

##### name

`string`

##### value

`number`

#### Returns

`void`

***

### histogram()

> **histogram**(`name`, `value`): `void`

Defined in: [packages/core/src/metrics/MetricsAdapter.ts:16](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/metrics/MetricsAdapter.ts#L16)

Record an observation in a histogram.

#### Parameters

##### name

`string`

##### value

`number`

#### Returns

`void`
