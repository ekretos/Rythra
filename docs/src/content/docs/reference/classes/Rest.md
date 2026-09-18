---
title: Rest
description: API Reference for Rest
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/Rest.ts:7](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L7)

Version-aware wrapper around the Lavalink REST API.

## Constructors

### Constructor

> **new Rest**(`node`, `transport?`): `Rest`

Defined in: [packages/core/src/Rest.ts:12](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L12)

Creates a REST client for a Lavalink node.

#### Parameters

##### node

[`Node`](Node.md)

##### transport?

[`RestTransport`](../interfaces/RestTransport.md) = `...`

#### Returns

`Rest`

## Properties

### auth

> `protected` `readonly` **auth**: `string`

Defined in: [packages/core/src/Rest.ts:9](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L9)

Password used for Lavalink authorization.

***

### node

> `protected` `readonly` **node**: [`Node`](Node.md)

Defined in: [packages/core/src/Rest.ts:8](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L8)

Node that owns this REST client.

***

### transport

> `protected` `readonly` **transport**: [`RestTransport`](../interfaces/RestTransport.md)

Defined in: [packages/core/src/Rest.ts:10](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L10)

Transport used to perform the underlying HTTP requests.

## Accessors

### sessionId

#### Get Signature

> **get** `protected` **sessionId**(): `string`

Defined in: [packages/core/src/Rest.ts:15](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L15)

Gets the active Lavalink session ID.

##### Returns

`string`

***

### url

#### Get Signature

> **get** `protected` **url**(): `string`

Defined in: [packages/core/src/Rest.ts:13](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L13)

The version-aware base URL for REST requests.

##### Returns

`string`

## Methods

### decode()

> **decode**(`track`): `Promise`\<[`Track`](../interfaces/Track.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:28](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L28)

Decodes an encoded Lavalink track.

#### Parameters

##### track

`string`

#### Returns

`Promise`\<[`Track`](../interfaces/Track.md) \| `undefined`\>

***

### destroyPlayer()

> **destroyPlayer**(`guildId`): `Promise`\<`void`\>

Defined in: [packages/core/src/Rest.ts:36](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L36)

Destroys a Lavalink player.

#### Parameters

##### guildId

`string`

#### Returns

`Promise`\<`void`\>

***

### fetch()

> `protected` **fetch**\<`T`\>(`fetchOptions`): `Promise`\<`T` \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:48](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L48)

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

Defined in: [packages/core/src/Rest.ts:46](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L46)

Gets information about the connected Lavalink server.

#### Returns

`Promise`\<[`NodeInfo`](../interfaces/NodeInfo.md) \| `undefined`\>

***

### getPlayer()

> **getPlayer**(`guildId`): `Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:32](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L32)

Gets the Lavalink player for a guild.

#### Parameters

##### guildId

`string`

#### Returns

`Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

***

### getPlayers()

> **getPlayers**(): `Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md)[]\>

Defined in: [packages/core/src/Rest.ts:30](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L30)

Gets every player belonging to the current Lavalink session.

#### Returns

`Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md)[]\>

***

### getRoutePlannerStatus()

> **getRoutePlannerStatus**(): `Promise`\<[`RoutePlanner`](../interfaces/RoutePlanner.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:42](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L42)

Gets the current route planner status.

#### Returns

`Promise`\<[`RoutePlanner`](../interfaces/RoutePlanner.md) \| `undefined`\>

***

### resolve()

> **resolve**(`identifier`): `Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:17](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L17)

Resolves a Lavalink identifier or search query.

#### Parameters

##### identifier

`string`

#### Returns

`Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md) \| `undefined`\>

***

### search()

> **search**(`identifier`): `Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md)\>

Defined in: [packages/core/src/Rest.ts:19](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L19)

Searches Lavalink for tracks and normalizes legacy array-shaped search responses.

#### Parameters

##### identifier

`string`

#### Returns

`Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md)\>

***

### stats()

> **stats**(): `Promise`\<[`Stats`](../interfaces/Stats.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:40](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L40)

Gets current Lavalink statistics.

#### Returns

`Promise`\<[`Stats`](../interfaces/Stats.md) \| `undefined`\>

***

### unmarkFailedAddress()

> **unmarkFailedAddress**(`address`): `Promise`\<`void`\>

Defined in: [packages/core/src/Rest.ts:44](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L44)

Releases a failed route-planner address.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`void`\>

***

### updatePlayer()

> **updatePlayer**(`data`): `Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:34](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L34)

Updates a Lavalink player.

#### Parameters

##### data

[`UpdatePlayerInfo`](../interfaces/UpdatePlayerInfo.md)

#### Returns

`Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

***

### updateSession()

> **updateSession**(`resuming?`, `timeout?`): `Promise`\<[`SessionInfo`](../interfaces/SessionInfo.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:38](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Rest.ts#L38)

Updates Lavalink session resumption settings.

#### Parameters

##### resuming?

`boolean`

##### timeout?

`number`

#### Returns

`Promise`\<[`SessionInfo`](../interfaces/SessionInfo.md) \| `undefined`\>
