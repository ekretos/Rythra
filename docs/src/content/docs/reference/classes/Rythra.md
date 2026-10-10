---
title: Rythra
description: API Reference for Rythra
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/Rythra.ts:26](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L26)

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

Defined in: [packages/core/src/Rythra.ts:62](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L62)

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

Defined in: [packages/core/src/Rythra.ts:51](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L51)

Local health collector for operational integrations.

***

### migrations

> **migrations**: `number` = `0`

Defined in: [packages/core/src/Rythra.ts:46](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L46)

Number of player migrations performed by this runtime.

***

### nodes

> `readonly` **nodes**: [`NodeRegistry`](NodeRegistry.md)

Defined in: [packages/core/src/Rythra.ts:28](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L28)

All Lavalink nodes currently managed by this instance.

***

### options

> `readonly` **options**: [`RythraOptions`](../interfaces/RythraOptions.md)

Defined in: [packages/core/src/Rythra.ts:34](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L34)

Configuration used to initialize the runtime.

***

### players

> `readonly` **players**: [`PlayerRegistry`](PlayerRegistry.md)

Defined in: [packages/core/src/Rythra.ts:31](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L31)

All guild players currently managed by this instance.

***

### reconnects

> **reconnects**: `number` = `0`

Defined in: [packages/core/src/Rythra.ts:43](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L43)

Number of reconnect attempts observed across managed nodes.

***

### shuttingDown

> **shuttingDown**: `boolean` = `false`

Defined in: [packages/core/src/Rythra.ts:54](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L54)

Whether the runtime has begun shutting down.

***

### startedAt

> `readonly` **startedAt**: `number`

Defined in: [packages/core/src/Rythra.ts:40](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L40)

Timestamp at which this runtime was created.

***

### version

> `readonly` **version**: `string`

Defined in: [packages/core/src/Rythra.ts:37](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L37)

The version string reported as the Rythra client name.

## Methods

### connect()

> **connect**(): `Promise`\<`void`\>

Defined in: [packages/core/src/Rythra.ts:346](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L346)

Connects all configured Lavalink nodes concurrently.

#### Returns

`Promise`\<`void`\>

***

### createNode()

> **createNode**(`options`): [`Node`](Node.md)

Defined in: [packages/core/src/Rythra.ts:112](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L112)

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

Defined in: [packages/core/src/Rythra.ts:172](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L172)

Gets an existing guild player or creates one on a ready node.

#### Parameters

##### options

[`PlayerOptions`](../interfaces/PlayerOptions.md)

#### Returns

[`RythraPlayer`](RythraPlayer.md)

***

### destroy()

> **destroy**(`timeout?`): `Promise`\<`void`\>

Defined in: [packages/core/src/Rythra.ts:313](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L313)

Gracefully shuts down Rythra and all managed Lavalink nodes.

#### Parameters

##### timeout?

`number` = `10_000`

#### Returns

`Promise`\<`void`\>

***

### destroyPlayer()

> **destroyPlayer**(`guild`): `Promise`\<`void`\>

Defined in: [packages/core/src/Rythra.ts:194](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L194)

Destroys a guild player and removes it from the runtime.

#### Parameters

##### guild

`string`

#### Returns

`Promise`\<`void`\>

***

### getBestNode()

> **getBestNode**(): [`Node`](Node.md) \| `undefined`

Defined in: [packages/core/src/Rythra.ts:153](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L153)

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

Defined in: [packages/core/src/Rythra.ts:308](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L308)

Returns the current local health snapshot without network I/O.

#### Returns

[`HealthSnapshot`](../interfaces/HealthSnapshot.md)

***

### migratePlayers()

> **migratePlayers**(`from`): `Promise`\<`number`\>

Defined in: [packages/core/src/Rythra.ts:289](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L289)

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

Defined in: [packages/core/src/Rythra.ts:208](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L208)

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

Defined in: [packages/core/src/Rythra.ts:250](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L250)

Forwards a Discord voice server update to Lavalink.

#### Parameters

##### data

[`VoiceServerUpdate`](../interfaces/VoiceServerUpdate.md)

#### Returns

`Promise`\<`void`\>

***

### voiceStateUpdate()

> **voiceStateUpdate**(`data`): `void`

Defined in: [packages/core/src/Rythra.ts:237](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Rythra.ts#L237)

Updates the stored Discord voice state for a guild player.

#### Parameters

##### data

[`VoiceStateUpdate`](../interfaces/VoiceStateUpdate.md)

#### Returns

`void`
