---
title: VoiceStateUpdate
description: API Reference for VoiceStateUpdate
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/types/src/index.ts:275](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L275)

Discord voice state update.

## Properties

### channel\_id

> **channel\_id**: `string` \| `null`

Defined in: [packages/types/src/index.ts:278](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L278)

Voice channel ID.

***

### guild\_id

> **guild\_id**: `string`

Defined in: [packages/types/src/index.ts:276](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L276)

Guild ID.

***

### session\_id

> **session\_id**: `string`

Defined in: [packages/types/src/index.ts:277](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L277)

Session ID.

***

### user\_id?

> `optional` **user\_id?**: `string`

Defined in: [packages/types/src/index.ts:279](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L279)

User the state belongs to, when provided by the Discord library.
