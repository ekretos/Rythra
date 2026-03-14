---
title: Rest
description: API Reference for Rest
---

[**Rythra Documentation v0.0.2**](../README.md)

***

Defined in: [src/Rest.ts:40](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L40)

A wrapper around the Lavalink REST API.

## Constructors

### Constructor

> **new Rest**(`node`): `Rest`

Defined in: [src/Rest.ts:52](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L52)

Creates a new Rest instance.

#### Parameters

##### node

[`Node`](Node.md)

The node this REST client will use.

#### Returns

`Rest`

## Properties

### auth

> `protected` `readonly` **auth**: `string`

Defined in: [src/Rest.ts:46](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L46)

The authorization header value.

***

### node

> `protected` `readonly` **node**: [`Node`](Node.md)

Defined in: [src/Rest.ts:42](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L42)

The node this REST client is associated with.

***

### url

> `protected` `readonly` **url**: `string`

Defined in: [src/Rest.ts:44](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L44)

The base URL for the Lavalink REST API.

## Accessors

### sessionId

#### Get Signature

> **get** `protected` **sessionId**(): `string`

Defined in: [src/Rest.ts:62](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L62)

Gets the current session ID from the node.

##### Throws

Error if no session ID is available.

##### Returns

`string`

## Methods

### decode()

> **decode**(`track`): `Promise`\<[`Track`](../interfaces/Track.md) \| `undefined`\>

Defined in: [src/Rest.ts:96](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L96)

Decodes a base64 encoded track string into a Track object.

#### Parameters

##### track

`string`

The encoded track string.

#### Returns

`Promise`\<[`Track`](../interfaces/Track.md) \| `undefined`\>

A promise that resolves to the Track object.

***

### destroyPlayer()

> **destroyPlayer**(`guildId`): `Promise`\<`void`\>

Defined in: [src/Rest.ts:147](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L147)

#### Parameters

##### guildId

`string`

#### Returns

`Promise`\<`void`\>

***

### fetch()

> `protected` **fetch**\<`T`\>(`fetchOptions`): `Promise`\<`T` \| `undefined`\>

Defined in: [src/Rest.ts:205](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L205)

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

Defined in: [src/Rest.ts:195](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L195)

#### Returns

`Promise`\<[`NodeInfo`](../interfaces/NodeInfo.md) \| `undefined`\>

***

### getPlayer()

> **getPlayer**(`guildId`): `Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

Defined in: [src/Rest.ts:121](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L121)

Retrieves the state of a specific player.

#### Parameters

##### guildId

`string`

The guild ID of the player.

#### Returns

`Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

A promise that resolves to the Lavalink player state.

***

### getPlayers()

> **getPlayers**(): `Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md)[]\>

Defined in: [src/Rest.ts:108](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L108)

Retrieves a list of all players on the current session.

#### Returns

`Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md)[]\>

A promise that resolves to an array of Lavalink players.

***

### getRoutePlannerStatus()

> **getRoutePlannerStatus**(): `Promise`\<[`RoutePlanner`](../interfaces/RoutePlanner.md) \| `undefined`\>

Defined in: [src/Rest.ts:175](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L175)

#### Returns

`Promise`\<[`RoutePlanner`](../interfaces/RoutePlanner.md) \| `undefined`\>

***

### resolve()

> **resolve**(`identifier`): `Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md) \| `undefined`\>

Defined in: [src/Rest.ts:71](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L71)

Resolves a track identifier or search query.

#### Parameters

##### identifier

`string`

The identifier or query to resolve.

#### Returns

`Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md) \| `undefined`\>

A promise that resolves to the Lavalink response.

***

### search()

> **search**(`identifier`): `Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md)\>

Defined in: [src/Rest.ts:85](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L85)

Searches for tracks using the given identifier.

#### Parameters

##### identifier

`string`

The search query (e.g., 'ytsearch:song name').

#### Returns

`Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md)\>

A promise that resolves to the search response.

#### Throws

Error if the search returns no response.

***

### stats()

> **stats**(): `Promise`\<[`Stats`](../interfaces/Stats.md) \| `undefined`\>

Defined in: [src/Rest.ts:167](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L167)

#### Returns

`Promise`\<[`Stats`](../interfaces/Stats.md) \| `undefined`\>

***

### unmarkFailedAddress()

> **unmarkFailedAddress**(`address`): `Promise`\<`void`\>

Defined in: [src/Rest.ts:183](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L183)

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`void`\>

***

### updatePlayer()

> **updatePlayer**(`data`): `Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

Defined in: [src/Rest.ts:134](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L134)

Updates the state of a player (e.g., play, stop, pause, volume, voice).

#### Parameters

##### data

[`UpdatePlayerInfo`](../interfaces/UpdatePlayerInfo.md)

The player update information.

#### Returns

`Promise`\<[`LavalinkPlayer`](../interfaces/LavalinkPlayer.md) \| `undefined`\>

A promise that resolves to the updated Lavalink player state.

***

### updateSession()

> **updateSession**(`resuming?`, `timeout?`): `Promise`\<[`SessionInfo`](../interfaces/SessionInfo.md) \| `undefined`\>

Defined in: [src/Rest.ts:155](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Rest.ts#L155)

#### Parameters

##### resuming?

`boolean`

##### timeout?

`number`

#### Returns

`Promise`\<[`SessionInfo`](../interfaces/SessionInfo.md) \| `undefined`\>
