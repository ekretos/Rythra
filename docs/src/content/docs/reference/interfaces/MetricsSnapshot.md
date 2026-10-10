---
title: MetricsSnapshot
description: API Reference for MetricsSnapshot
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/metrics/Metrics.ts:2](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/metrics/Metrics.ts#L2)

Snapshot of runtime counters and latency measurements.

## Properties

### averageRestLatencyMs

> **averageRestLatencyMs**: `number`

Defined in: [packages/core/src/metrics/Metrics.ts:16](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/metrics/Metrics.ts#L16)

Average recorded REST latency in milliseconds.

***

### connectedNodes

> **connectedNodes**: `number`

Defined in: [packages/core/src/metrics/Metrics.ts:4](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/metrics/Metrics.ts#L4)

Number of nodes currently connected.

***

### migrations

> **migrations**: `number`

Defined in: [packages/core/src/metrics/Metrics.ts:12](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/metrics/Metrics.ts#L12)

Total player migrations.

***

### players

> **players**: `number`

Defined in: [packages/core/src/metrics/Metrics.ts:6](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/metrics/Metrics.ts#L6)

Number of active players.

***

### playingPlayers

> **playingPlayers**: `number`

Defined in: [packages/core/src/metrics/Metrics.ts:8](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/metrics/Metrics.ts#L8)

Number of players currently playing.

***

### reconnects

> **reconnects**: `number`

Defined in: [packages/core/src/metrics/Metrics.ts:10](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/metrics/Metrics.ts#L10)

Total node reconnect attempts.

***

### restErrors

> **restErrors**: `number`

Defined in: [packages/core/src/metrics/Metrics.ts:14](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/core/src/metrics/Metrics.ts#L14)

Total failed REST requests.
