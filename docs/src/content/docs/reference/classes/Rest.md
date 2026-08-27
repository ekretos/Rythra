---
title: Rest
description: API Reference for Rest
---

[**Rythra Documentation v0.1.0**](../README.md)

***

Defined in: [packages/core/src/Rest.ts:16](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L16)

Version-aware wrapper around the Lavalink REST API.

## Constructors

### Constructor

> **new Rest**(`node`): `Rest`

Defined in: [packages/core/src/Rest.ts:20](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L20)

Creates a REST client for a Lavalink node.

#### Parameters

##### node

[`Node`](Node.md)

#### Returns

`Rest`

## Properties

### auth

> `protected` `readonly` **auth**: `string`

Defined in: [packages/core/src/Rest.ts:18](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L18)

Password used for Lavalink authorization.

***

### node

> `protected` `readonly` **node**: [`Node`](Node.md)

Defined in: [packages/core/src/Rest.ts:17](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L17)

Node that owns this REST client.

## Accessors

### sessionId

#### Get Signature

> **get** `protected` **sessionId**(): `string`

Defined in: [packages/core/src/Rest.ts:23](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L23)

Gets the active Lavalink session ID.

##### Returns

`string`

***

### url

#### Get Signature

> **get** `protected` **url**(): `string`

Defined in: [packages/core/src/Rest.ts:21](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L21)

The version-aware base URL for REST requests.

##### Returns

`string`

## Methods

### decode()

> **decode**(`track`): `Promise`\<[`Track`](../interfaces/Track.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:36](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L36)

Decodes an encoded Lavalink track.

#### Parameters

##### track

`string`

#### Returns

`Promise`\<[`Track`](../interfaces/Track.md) \| `undefined`\>

***

### destroyPlayer()

> **destroyPlayer**(`guildId`): `Promise`\<`void`\>

Defined in: [packages/core/src/Rest.ts:44](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L44)

Destroys a Lavalink player.

#### Parameters

##### guildId

`string`

#### Returns

`Promise`\<`void`\>

***

### fetch()

> `protected` **fetch**\<`T`\>(`fetchOptions`): `Promise`\<`T` \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:56](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L56)

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

Defined in: [packages/core/src/Rest.ts:54](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L54)

Gets information about the connected Lavalink server.

#### Returns

`Promise`\<[`NodeInfo`](../interfaces/NodeInfo.md) \| `undefined`\>

***

### getPlayer()

> **getPlayer**(`guildId`): `Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:40](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L40)

Gets the Lavalink player for a guild.

#### Parameters

##### guildId

`string`

#### Returns

`Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

***

### getPlayers()

> **getPlayers**(): `Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md)[]\>

Defined in: [packages/core/src/Rest.ts:38](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L38)

Gets every player belonging to the current Lavalink session.

#### Returns

`Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md)[]\>

***

### getRoutePlannerStatus()

> **getRoutePlannerStatus**(): `Promise`\<[`RoutePlanner`](../interfaces/RoutePlanner.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:50](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L50)

Gets the current route planner status.

#### Returns

`Promise`\<[`RoutePlanner`](../interfaces/RoutePlanner.md) \| `undefined`\>

***

### resolve()

> **resolve**(`identifier`): `Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:25](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L25)

Resolves a Lavalink identifier or search query.

#### Parameters

##### identifier

`string`

#### Returns

`Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md) \| `undefined`\>

***

### search()

> **search**(`identifier`): `Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md)\>

Defined in: [packages/core/src/Rest.ts:27](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L27)

Searches Lavalink for tracks and normalizes legacy array-shaped search responses.

#### Parameters

##### identifier

`string`

#### Returns

`Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md)\>

***

### stats()

> **stats**(): `Promise`\<[`Stats`](../interfaces/Stats.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:48](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L48)

Gets current Lavalink statistics.

#### Returns

`Promise`\<[`Stats`](../interfaces/Stats.md) \| `undefined`\>

***

### unmarkFailedAddress()

> **unmarkFailedAddress**(`address`): `Promise`\<`void`\>

Defined in: [packages/core/src/Rest.ts:52](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L52)

Releases a failed route-planner address.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`void`\>

***

### updatePlayer()

> **updatePlayer**(`data`): `Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:42](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L42)

Updates a Lavalink player.

#### Parameters

##### data

[`UpdatePlayerInfo`](../interfaces/UpdatePlayerInfo.md)

#### Returns

`Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

***

### updateSession()

> **updateSession**(`resuming?`, `timeout?`): `Promise`\<[`SessionInfo`](../interfaces/SessionInfo.md) \| `undefined`\>

Defined in: [packages/core/src/Rest.ts:46](https://github.com/ekretos/Rythra/blob/a364f23696345c8ee22bece2228759c31953118f/packages/core/src/Rest.ts#L46)

Updates Lavalink session resumption settings.

#### Parameters

##### resuming?

`boolean`

##### timeout?

`number`

#### Returns

`Promise`\<[`SessionInfo`](../interfaces/SessionInfo.md) \| `undefined`\>
