---
title: RythraOptions
description: API Reference for RythraOptions
---

[**Rythra Documentation v0.0.2**](../README.md)

***

Defined in: [src/Types.ts:7](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L7)

Configuration options for the Rythra manager.

## Properties

### autoPlay?

> `optional` **autoPlay**: `boolean`

Defined in: [src/Types.ts:21](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L21)

Whether players should automatically play the next song in the queue.

***

### clientId?

> `optional` **clientId**: `string`

Defined in: [src/Types.ts:15](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L15)

The bot's client ID.

***

### clientName?

> `optional` **clientName**: `string`

Defined in: [src/Types.ts:17](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L17)

Custom value for the `Client-Name` header sent to Lavalink.

***

### connector

> **connector**: `Connector`

Defined in: [src/Types.ts:9](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L9)

The connector to use for Discord library integration.

***

### defaultSearchPlatform?

> `optional` **defaultSearchPlatform**: [`SearchPlatform`](../type-aliases/SearchPlatform.md)

Defined in: [src/Types.ts:25](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L25)

The default search platform to use (e.g., 'youtube', 'soundcloud').

***

### nodes?

> `optional` **nodes**: [`NodeOptions`](NodeOptions.md)[]

Defined in: [src/Types.ts:13](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L13)

The array of Lavalink nodes to connect to.

***

### restTimeout?

> `optional` **restTimeout**: `number`

Defined in: [src/Types.ts:29](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L29)

Timeout for REST requests in seconds.

***

### shards?

> `optional` **shards**: `number`

Defined in: [src/Types.ts:19](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L19)

The number of shards the bot is using.

***

### trackPartial?

> `optional` **trackPartial**: `string`[]

Defined in: [src/Types.ts:23](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L23)

An array of track properties to keep in the track object.

***

### userAgent?

> `optional` **userAgent**: `string`

Defined in: [src/Types.ts:27](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L27)

Custom User-Agent header for REST requests.

***

### version?

> `optional` **version**: `string`

Defined in: [src/Types.ts:11](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L11)

The library version.
