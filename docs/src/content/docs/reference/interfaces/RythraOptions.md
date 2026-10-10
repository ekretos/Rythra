---
title: RythraOptions
description: API Reference for RythraOptions
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/types/src/index.ts:18](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L18)

Configuration used to create a Rythra manager.

## Properties

### autoPlay?

> `optional` **autoPlay?**: `boolean`

Defined in: [packages/types/src/index.ts:25](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L25)

Whether players should automatically advance to the next track.

***

### clientId?

> `optional` **clientId?**: `string`

Defined in: [packages/types/src/index.ts:22](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L22)

Discord application/client ID sent to Lavalink.

***

### clientName?

> `optional` **clientName?**: `string`

Defined in: [packages/types/src/index.ts:23](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L23)

Custom client name sent in the Lavalink `Client-Name` header.

***

### connector

> **connector**: [`IConnector`](IConnector.md)

Defined in: [packages/types/src/index.ts:19](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L19)

Discord library connector used by the manager.

***

### defaultSearchPlatform?

> `optional` **defaultSearchPlatform?**: [`SearchPlatform`](../type-aliases/SearchPlatform.md)

Defined in: [packages/types/src/index.ts:27](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L27)

Default search platform.

***

### failover?

> `optional` **failover?**: `boolean`

Defined in: [packages/types/src/index.ts:25](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L25)

***

### failoverDelay?

> `optional` **failoverDelay?**: `number`

Defined in: [packages/types/src/index.ts:25](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L25)

***

### lavalinkVersion?

> `optional` **lavalinkVersion?**: [`LavalinkApiVersionMode`](../type-aliases/LavalinkApiVersionMode.md)

Defined in: [packages/types/src/index.ts:30](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L30)

Default Lavalink API generation.

***

### nodes?

> `optional` **nodes?**: [`NodeOptions`](NodeOptions.md)[]

Defined in: [packages/types/src/index.ts:21](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L21)

Lavalink nodes to register during manager initialization.

***

### restTimeout?

> `optional` **restTimeout?**: `number`

Defined in: [packages/types/src/index.ts:29](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L29)

REST request timeout in seconds.

***

### shards?

> `optional` **shards?**: `number`

Defined in: [packages/types/src/index.ts:24](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L24)

Number of Discord shards used by the bot.

***

### trackPartial?

> `optional` **trackPartial?**: `string`[]

Defined in: [packages/types/src/index.ts:26](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L26)

Track properties retained by integrations.

***

### userAgent?

> `optional` **userAgent?**: `string`

Defined in: [packages/types/src/index.ts:28](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L28)

Custom User-Agent used for REST requests.

***

### version?

> `optional` **version?**: `string`

Defined in: [packages/types/src/index.ts:20](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/types/src/index.ts#L20)

Rythra client version included in Lavalink identification headers.
