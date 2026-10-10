---
title: Rythra
description: API Reference for Rythra
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/Rythra.ts:35](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L35)

The main Rythra runtime.

## Remarks

Rythra is deliberately an orchestration layer: registries own runtime
entities, Node owns node lifecycle, Player owns player state, transports own
I/O, and protocol adapters own Lavalink-version details. The public manager
API remains stable while those responsibilities stay isolated internally.

## Implements

IRythra

## Extends

- `EventEmitter`

## Implements

- [`IRythra`](../interfaces/IRythra.md)

## Constructors

### Constructor

> **new Rythra**(`options`): `Rythra`

Defined in: [packages/core/src/Rythra.ts:71](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L71)

Creates a new Rythra runtime.

#### Parameters

##### options

[`RythraOptions`](../interfaces/RythraOptions.md)

Runtime, connector and Lavalink node configuration.

#### Returns

`Rythra`

#### Throws

If the connector or node configuration is invalid.

#### Overrides

`EventEmitter.constructor`

## Properties

### healthMonitor

> `readonly` **healthMonitor**: [`Health`](Health.md)

Defined in: [packages/core/src/Rythra.ts:60](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L60)

Local health collector for operational integrations.

***

### migrations

> **migrations**: `number` = `0`

Defined in: [packages/core/src/Rythra.ts:55](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L55)

Number of player migrations performed by this runtime.

***

### nodes

> `readonly` **nodes**: [`NodeRegistry`](NodeRegistry.md)

Defined in: [packages/core/src/Rythra.ts:37](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L37)

All Lavalink nodes currently managed by this instance.

***

### options

> `readonly` **options**: [`RythraOptions`](../interfaces/RythraOptions.md)

Defined in: [packages/core/src/Rythra.ts:43](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L43)

Configuration used to initialize the runtime.

***

### players

> `readonly` **players**: [`PlayerRegistry`](PlayerRegistry.md)

Defined in: [packages/core/src/Rythra.ts:40](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L40)

All guild players currently managed by this instance.

***

### reconnects

> **reconnects**: `number` = `0`

Defined in: [packages/core/src/Rythra.ts:52](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L52)

Number of reconnect attempts observed across managed nodes.

***

### shuttingDown

> **shuttingDown**: `boolean` = `false`

Defined in: [packages/core/src/Rythra.ts:63](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L63)

Whether the runtime has begun shutting down.

***

### startedAt

> `readonly` **startedAt**: `number`

Defined in: [packages/core/src/Rythra.ts:49](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L49)

Timestamp at which this runtime was created.

***

### version

> `readonly` **version**: `string`

Defined in: [packages/core/src/Rythra.ts:46](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L46)

The version string reported as the Rythra client name.

## Methods

### connect()

> **connect**(): `Promise`\<`void`\>

Defined in: [packages/core/src/Rythra.ts:372](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L372)

Connects all configured Lavalink nodes concurrently.

#### Returns

`Promise`\<`void`\>

***

### createNode()

> **createNode**(`options`): [`Node`](Node.md)

Defined in: [packages/core/src/Rythra.ts:121](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L121)

Registers a node with the runtime.

#### Parameters

##### options

[`NodeOptions`](../interfaces/NodeOptions.md)

#### Returns

[`Node`](Node.md)

#### Remarks

Event forwarding is centralized here so Node remains independent from
manager-level lifecycle semantics.

***

### createPlayer()

> **createPlayer**(`options`): [`RythraPlayer`](RythraPlayer.md)

Defined in: [packages/core/src/Rythra.ts:190](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L190)

Gets an existing guild player or creates one on a ready node.

#### Parameters

##### options

[`PlayerOptions`](../interfaces/PlayerOptions.md)

#### Returns

[`RythraPlayer`](RythraPlayer.md)

***

### destroy()

> **destroy**(`timeout?`): `Promise`\<`void`\>

Defined in: [packages/core/src/Rythra.ts:337](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L337)

Gracefully shuts down Rythra and all managed Lavalink nodes.

#### Parameters

##### timeout?

`number` = `10_000`

#### Returns

`Promise`\<`void`\>

***

### destroyPlayer()

> **destroyPlayer**(`guild`): `Promise`\<`void`\>

Defined in: [packages/core/src/Rythra.ts:212](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L212)

Destroys a guild player and removes it from the runtime.

#### Parameters

##### guild

`string`

#### Returns

`Promise`\<`void`\>

***

### getBestNode()

> **getBestNode**(): [`Node`](Node.md) \| `undefined`

Defined in: [packages/core/src/Rythra.ts:168](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L168)

Selects the least-loaded ready node.

#### Returns

[`Node`](Node.md) \| `undefined`

#### Remarks

Selection is intentionally kept as a small default policy. A dedicated
node-selection policy can replace this later without changing the public
player API.

***

### health()

> **health**(): [`HealthSnapshot`](../interfaces/HealthSnapshot.md)

Defined in: [packages/core/src/Rythra.ts:332](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L332)

Returns the current local health snapshot without network I/O.

#### Returns

[`HealthSnapshot`](../interfaces/HealthSnapshot.md)

***

### migratePlayers()

> **migratePlayers**(`from`): `Promise`\<`number`\>

Defined in: [packages/core/src/Rythra.ts:313](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L313)

Moves every player bound to `from` onto the best other ready node.

#### Parameters

##### from

[`Node`](Node.md)

#### Returns

`Promise`\<`number`\>

The number of players successfully migrated.

***

### search()

> **search**(`query`, `_requester`, `source?`): `Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md)\>

Defined in: [packages/core/src/Rythra.ts:226](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L226)

Searches Lavalink for a track, playlist or search result.

#### Parameters

##### query

`string`

##### \_requester

`unknown`

##### source?

[`SearchPlatform`](../type-aliases/SearchPlatform.md)

#### Returns

`Promise`\<[`SearchResponse`](../type-aliases/SearchResponse.md)\>

***

### voiceServerUpdate()

> **voiceServerUpdate**(`data`): `Promise`\<`void`\>

Defined in: [packages/core/src/Rythra.ts:275](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L275)

Forwards a Discord voice server update to Lavalink.

#### Parameters

##### data

[`VoiceServerUpdate`](../interfaces/VoiceServerUpdate.md)

#### Returns

`Promise`\<`void`\>

***

### voiceStateUpdate()

> **voiceStateUpdate**(`data`): `void`

Defined in: [packages/core/src/Rythra.ts:262](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L262)

Updates the stored Discord voice state for a guild player.

#### Parameters

##### data

[`VoiceStateUpdate`](../interfaces/VoiceStateUpdate.md)

#### Returns

`void`
