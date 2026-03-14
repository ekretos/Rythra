---
title: UpdatePlayerInfo
description: API Reference for UpdatePlayerInfo
---

[**Rythra Documentation v0.0.2**](../README.md)

***

Defined in: [src/Types.ts:247](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L247)

## Properties

### guildId

> **guildId**: `string`

Defined in: [src/Types.ts:248](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L248)

***

### noReplace?

> `optional` **noReplace**: `boolean`

Defined in: [src/Types.ts:249](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L249)

***

### playerOptions

> **playerOptions**: `object`

Defined in: [src/Types.ts:250](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L250)

#### filters?

> `optional` **filters**: [`Filters`](Filters.md)

#### paused?

> `optional` **paused**: `boolean`

#### position?

> `optional` **position**: `number`

#### track?

> `optional` **track**: `object`

##### track.encoded?

> `optional` **encoded**: `string` \| `null`

##### track.identifier?

> `optional` **identifier**: `string`

##### track.userData?

> `optional` **userData**: `Record`\<`string`, `unknown`\>

#### voice?

> `optional` **voice**: `object`

##### voice.channelId?

> `optional` **channelId**: `string`

##### voice.endpoint

> **endpoint**: `string`

##### voice.sessionId

> **sessionId**: `string`

##### voice.token

> **token**: `string`

#### volume?

> `optional` **volume**: `number`
