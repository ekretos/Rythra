---
title: RythraOptions
description: API Reference for RythraOptions
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/Types.ts:7](https://github.com/ekretos/Rythra/blob/f7f92181524349d3a52cccb7d61140eaeab9e974/packages/core/src/Types.ts#L7)

Configuration used to create a Rythra manager.

## Properties

### autoPlay?

> `optional` **autoPlay?**: `boolean`

Defined in: [packages/core/src/Types.ts:14](https://github.com/ekretos/Rythra/blob/f7f92181524349d3a52cccb7d61140eaeab9e974/packages/core/src/Types.ts#L14)

Whether players should automatically advance to the next track.

***

### clientId?

> `optional` **clientId?**: `string`

Defined in: [packages/core/src/Types.ts:11](https://github.com/ekretos/Rythra/blob/f7f92181524349d3a52cccb7d61140eaeab9e974/packages/core/src/Types.ts#L11)

Discord application/client ID sent to Lavalink.

***

### clientName?

> `optional` **clientName?**: `string`

Defined in: [packages/core/src/Types.ts:12](https://github.com/ekretos/Rythra/blob/f7f92181524349d3a52cccb7d61140eaeab9e974/packages/core/src/Types.ts#L12)

Custom client name sent in the Lavalink `Client-Name` header.

***

### connector

> **connector**: [`Connector`](../classes/Connector.md)

Defined in: [packages/core/src/Types.ts:8](https://github.com/ekretos/Rythra/blob/f7f92181524349d3a52cccb7d61140eaeab9e974/packages/core/src/Types.ts#L8)

Discord library connector used by the manager.

***

### defaultSearchPlatform?

> `optional` **defaultSearchPlatform?**: [`SearchPlatform`](../type-aliases/SearchPlatform.md)

Defined in: [packages/core/src/Types.ts:16](https://github.com/ekretos/Rythra/blob/f7f92181524349d3a52cccb7d61140eaeab9e974/packages/core/src/Types.ts#L16)

Default search platform.

***

### lavalinkVersion?

> `optional` **lavalinkVersion?**: [`LavalinkApiVersionMode`](../type-aliases/LavalinkApiVersionMode.md)

Defined in: [packages/core/src/Types.ts:19](https://github.com/ekretos/Rythra/blob/f7f92181524349d3a52cccb7d61140eaeab9e974/packages/core/src/Types.ts#L19)

Default Lavalink API generation.

***

### nodes?

> `optional` **nodes?**: [`NodeOptions`](NodeOptions.md)[]

Defined in: [packages/core/src/Types.ts:10](https://github.com/ekretos/Rythra/blob/f7f92181524349d3a52cccb7d61140eaeab9e974/packages/core/src/Types.ts#L10)

Lavalink nodes to register during manager initialization.

***

### restTimeout?

> `optional` **restTimeout?**: `number`

Defined in: [packages/core/src/Types.ts:18](https://github.com/ekretos/Rythra/blob/f7f92181524349d3a52cccb7d61140eaeab9e974/packages/core/src/Types.ts#L18)

REST request timeout in seconds.

***

### shards?

> `optional` **shards?**: `number`

Defined in: [packages/core/src/Types.ts:13](https://github.com/ekretos/Rythra/blob/f7f92181524349d3a52cccb7d61140eaeab9e974/packages/core/src/Types.ts#L13)

Number of Discord shards used by the bot.

***

### trackPartial?

> `optional` **trackPartial?**: `string`[]

Defined in: [packages/core/src/Types.ts:15](https://github.com/ekretos/Rythra/blob/f7f92181524349d3a52cccb7d61140eaeab9e974/packages/core/src/Types.ts#L15)

Track properties retained by integrations.

***

### userAgent?

> `optional` **userAgent?**: `string`

Defined in: [packages/core/src/Types.ts:17](https://github.com/ekretos/Rythra/blob/f7f92181524349d3a52cccb7d61140eaeab9e974/packages/core/src/Types.ts#L17)

Custom User-Agent used for REST requests.

***

### version?

> `optional` **version?**: `string`

Defined in: [packages/core/src/Types.ts:9](https://github.com/ekretos/Rythra/blob/f7f92181524349d3a52cccb7d61140eaeab9e974/packages/core/src/Types.ts#L9)

Rythra client version included in Lavalink identification headers.
