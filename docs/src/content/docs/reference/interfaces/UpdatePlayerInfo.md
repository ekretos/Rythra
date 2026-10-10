---
title: UpdatePlayerInfo
description: API Reference for UpdatePlayerInfo
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/types/src/index.ts:193](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L193)

Player update request.

## Properties

### guildId

> **guildId**: `string`

Defined in: [packages/types/src/index.ts:194](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L194)

Guild ID.

***

### noReplace?

> `optional` **noReplace?**: `boolean`

Defined in: [packages/types/src/index.ts:195](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L195)

Do not replace current track.

***

### playerOptions

> **playerOptions**: `object`

Defined in: [packages/types/src/index.ts:196](https://github.com/ekretos/Rythra/blob/main/packages/types/src/index.ts#L196)

Player options.

#### filters?

> `optional` **filters?**: [`Filters`](Filters.md)

Filters.

#### paused?

> `optional` **paused?**: `boolean`

Paused.

#### position?

> `optional` **position?**: `number`

Position.

#### track?

> `optional` **track?**: `object`

Track.

##### track.encoded?

> `optional` **encoded?**: `string` \| `null`

##### track.identifier?

> `optional` **identifier?**: `string`

##### track.userData?

> `optional` **userData?**: `Record`\<`string`, `unknown`\>

#### voice?

> `optional` **voice?**: `object`

Voice.

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

Volume.
