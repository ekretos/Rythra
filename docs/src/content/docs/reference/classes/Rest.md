---
title: Rest
description: API Reference for Rest
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/Rest.ts:14](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L14)

Version-aware wrapper around the Lavalink REST API.

## Constructors

### Constructor

> **new Rest**(`node`, `transport?`): `Rest`

Defined in: [packages/core/src/Rest.ts:19](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L19)

Creates a REST client for a Lavalink node.

#### Parameters

##### node

[`RestNode`](../interfaces/RestNode.md)

##### transport?

[`RestTransport`](../interfaces/RestTransport.md) = `...`

#### Returns

`Rest`

## Properties

### auth

> `protected` `readonly` **auth**: `string`

Defined in: [packages/core/src/Rest.ts:16](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L16)

Password used for Lavalink authorization.

***

### node

> `protected` `readonly` **node**: [`RestNode`](../interfaces/RestNode.md)

Defined in: [packages/core/src/Rest.ts:15](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L15)

Node that owns this REST client.

***

### transport

> `protected` `readonly` **transport**: [`RestTransport`](../interfaces/RestTransport.md)

Defined in: [packages/core/src/Rest.ts:17](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L17)

Transport used to perform the underlying HTTP requests.

## Accessors

### sessionId

#### Get Signature

> **get** `protected` **sessionId**(): `string`

Defined in: [packages/core/src/Rest.ts:28](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L28)

Gets the active Lavalink session ID.

##### Returns

`string`

***

### url

#### Get Signature

> **get** `protected` **url**(): `string`

Defined in: [packages/core/src/Rest.ts:24](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L24)

The version-aware base URL for REST requests.

##### Returns

`string`

## Methods

### decode()

> **decode**(`track`): `Promise`\<[`Track`](../interfaces/Track.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:46](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L46)

Decodes an encoded Lavalink track.

#### Parameters

##### track

`string`

#### Returns

`Promise`\<[`Track`](../interfaces/Track.md) \| `undefined`\>

***

### destroyPlayer()

> **destroyPlayer**(`guildId`): `Promise`\<`void`\>

Defined in: [packages/core/src/Rest.ts:65](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L65)

Destroys a Lavalink player.

#### Parameters

##### guildId

`string`

#### Returns

`Promise`\<`void`\>

***

### fetch()

> `protected` **fetch**\<`T`\>(`fetchOptions`): `Promise`\<`T` \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:89](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L89)

Executes an authenticated request against Lavalink.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### fetchOptions

[`FetchOptions`](../interfaces/FetchOptions.md)

#### Returns

`Promise`\<`T` \| `undefined`\>

***

### getLavalinkInfo()

> **getLavalinkInfo**(): `Promise`\<[`NodeInfo`](../interfaces/NodeInfo.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:85](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L85)

Gets information about the connected Lavalink server.

#### Returns

`Promise`\<[`NodeInfo`](../interfaces/NodeInfo.md) \| `undefined`\>

***

### getPlayer()

> **getPlayer**(`guildId`): `Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:54](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L54)

Gets the Lavalink player for a guild.

#### Parameters

##### guildId

`string`

#### Returns

`Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

***

### getPlayers()

> **getPlayers**(): `Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md)[]\>

Defined in: [packages/core/src/Rest.ts:50](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L50)

Gets every player belonging to the current Lavalink session.

#### Returns

`Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md)[]\>

***

### getRoutePlannerStatus()

> **getRoutePlannerStatus**(): `Promise`\<[`RoutePlanner`](../interfaces/RoutePlanner.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:77](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L77)

Gets the current route planner status.

#### Returns

`Promise`\<[`RoutePlanner`](../interfaces/RoutePlanner.md) \| `undefined`\>

***

### resolve()

> **resolve**(`identifier`): `Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:33](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L33)

Resolves a Lavalink identifier or search query.

#### Parameters

##### identifier

`string`

#### Returns

`Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md) \| `undefined`\>

***

### search()

> **search**(`identifier`): `Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md)\>

Defined in: [packages/core/src/Rest.ts:37](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L37)

Searches Lavalink for tracks and normalizes legacy array-shaped search responses.

#### Parameters

##### identifier

`string`

#### Returns

`Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md)\>

***

### stats()

> **stats**(): `Promise`\<[`Stats`](../interfaces/Stats.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:73](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L73)

Gets current Lavalink statistics.

#### Returns

`Promise`\<[`Stats`](../interfaces/Stats.md) \| `undefined`\>

***

### unmarkFailedAddress()

> **unmarkFailedAddress**(`address`): `Promise`\<`void`\>

Defined in: [packages/core/src/Rest.ts:81](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L81)

Releases a failed route-planner address.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`void`\>

***

### updatePlayer()

> **updatePlayer**(`data`): `Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:58](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L58)

Updates a Lavalink player.

#### Parameters

##### data

[`UpdatePlayerInfo`](../interfaces/UpdatePlayerInfo.md)

#### Returns

`Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

***

### updateSession()

> **updateSession**(`resuming?`, `timeout?`): `Promise`\<[`SessionInfo`](../interfaces/SessionInfo.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:69](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rest.ts#L69)

Updates Lavalink session resumption settings.

#### Parameters

##### resuming?

`boolean`

##### timeout?

`number`

#### Returns

`Promise`\<[`SessionInfo`](../interfaces/SessionInfo.md) \| `undefined`\>
