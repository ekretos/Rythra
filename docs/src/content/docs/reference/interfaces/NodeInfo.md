---
title: NodeInfo
description: API Reference for NodeInfo
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/types/src/index.ts:225](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L225)

Lavalink server information.

## Properties

### buildTime

> **buildTime**: `number`

Defined in: [packages/types/src/index.ts:234](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L234)

Build time.

***

### filters

> **filters**: `string`[]

Defined in: [packages/types/src/index.ts:239](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L239)

Filters.

***

### git

> **git**: `object`

Defined in: [packages/types/src/index.ts:235](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L235)

Git.

#### branch

> **branch**: `string`

#### commit

> **commit**: `string`

#### commitTime

> **commitTime**: `number`

***

### jvm

> **jvm**: `string`

Defined in: [packages/types/src/index.ts:236](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L236)

JVM.

***

### lavaplayer

> **lavaplayer**: `string`

Defined in: [packages/types/src/index.ts:237](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L237)

Lavaplayer.

***

### plugins

> **plugins**: [`PluginInfo`](PluginInfo.md)[]

Defined in: [packages/types/src/index.ts:240](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L240)

Plugins.

***

### sourceManagers

> **sourceManagers**: `string`[]

Defined in: [packages/types/src/index.ts:238](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L238)

Sources.

***

### version

> **version**: `object`

Defined in: [packages/types/src/index.ts:226](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L226)

Version.

#### build

> **build**: `string` \| `null`

Build.

#### major

> **major**: `number`

Major.

#### minor

> **minor**: `number`

Minor.

#### patch

> **patch**: `number`

Patch.

#### preRelease

> **preRelease**: `string` \| `null`

Pre-release.

#### semver

> **semver**: `string`

SemVer.
