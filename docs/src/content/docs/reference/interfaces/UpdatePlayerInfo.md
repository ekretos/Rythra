---
title: UpdatePlayerInfo
description: API Reference for UpdatePlayerInfo
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/types/src/index.ts:66](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L66)

Player update request.

## Properties

### guildId

> **guildId**: `string`

Defined in: [packages/types/src/index.ts:66](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L66)

***

### noReplace?

> `optional` **noReplace?**: `boolean`

Defined in: [packages/types/src/index.ts:66](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L66)

***

### playerOptions

> **playerOptions**: `object`

Defined in: [packages/types/src/index.ts:66](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L66)

#### filters?

> `optional` **filters?**: [`Filters`](Filters.md)

#### paused?

> `optional` **paused?**: `boolean`

#### position?

> `optional` **position?**: `number`

#### track?

> `optional` **track?**: `object`

##### track.encoded?

> `optional` **encoded?**: `string` \| `null`

##### track.identifier?

> `optional` **identifier?**: `string`

##### track.userData?

> `optional` **userData?**: `Record`\<`string`, `unknown`\>

#### voice?

> `optional` **voice?**: `object`

##### voice.channelId?

> `optional` **channelId?**: `string`

##### voice.endpoint

> **endpoint**: `string`

##### voice.sessionId

> **sessionId**: `string`

##### voice.token

> **token**: `string`

#### volume?

> `optional` **volume?**: `number`
