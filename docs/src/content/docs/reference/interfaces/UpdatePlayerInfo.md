---
title: UpdatePlayerInfo
description: API Reference for UpdatePlayerInfo
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/Types.ts:55](https://github.com/ekretos/Rythra/blob/6f3cdb5f756fe86d62209c0aacb9051c0a349611/packages/core/src/Types.ts#L55)

Player update request.

## Properties

### guildId

> **guildId**: `string`

Defined in: [packages/core/src/Types.ts:55](https://github.com/ekretos/Rythra/blob/6f3cdb5f756fe86d62209c0aacb9051c0a349611/packages/core/src/Types.ts#L55)

***

### noReplace?

> `optional` **noReplace?**: `boolean`

Defined in: [packages/core/src/Types.ts:55](https://github.com/ekretos/Rythra/blob/6f3cdb5f756fe86d62209c0aacb9051c0a349611/packages/core/src/Types.ts#L55)

***

### playerOptions

> **playerOptions**: `object`

Defined in: [packages/core/src/Types.ts:55](https://github.com/ekretos/Rythra/blob/6f3cdb5f756fe86d62209c0aacb9051c0a349611/packages/core/src/Types.ts#L55)

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
