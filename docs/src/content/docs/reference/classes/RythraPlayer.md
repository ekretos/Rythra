---
title: RythraPlayer
description: API Reference for RythraPlayer
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/player/Player.ts:33](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L33)

## Extends

- `EventEmitter`

## Constructors

### Constructor

> **new RythraPlayer**(`node`, `options`): `RythraPlayer`

Defined in: [packages/core/src/player/Player.ts:54](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L54)

#### Parameters

##### node

`PlayerNode`

##### options

[`PlayerOptions`](../interfaces/PlayerOptions.md)

#### Returns

`RythraPlayer`

#### Overrides

`EventEmitter.constructor`

## Properties

### data

> `readonly` **data**: `Map`\<`string`, `unknown`\>

Defined in: [packages/core/src/player/Player.ts:47](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L47)

***

### guild

> `readonly` **guild**: `string`

Defined in: [packages/core/src/player/Player.ts:35](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L35)

***

### lastPosition

> **lastPosition**: `number` = `0`

Defined in: [packages/core/src/player/Player.ts:46](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L46)

Last playback position reported by Lavalink, in milliseconds.

***

### loop

> **loop**: `LoopMode` = `'none'`

Defined in: [packages/core/src/player/Player.ts:41](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L41)

***

### node

> **node**: `PlayerNode`

Defined in: [packages/core/src/player/Player.ts:34](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L34)

***

### paused

> **paused**: `boolean` = `false`

Defined in: [packages/core/src/player/Player.ts:39](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L39)

***

### playing

> **playing**: `boolean` = `false`

Defined in: [packages/core/src/player/Player.ts:38](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L38)

***

### queue

> `readonly` **queue**: [`Queue`](Queue.md)

Defined in: [packages/core/src/player/Player.ts:48](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L48)

***

### textChannel

> **textChannel**: `string`

Defined in: [packages/core/src/player/Player.ts:37](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L37)

***

### voiceChannel

> **voiceChannel**: `string`

Defined in: [packages/core/src/player/Player.ts:36](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L36)

***

### voiceServer

> **voiceServer**: [`VoiceServerUpdate`](../interfaces/VoiceServerUpdate.md) \| `null` = `null`

Defined in: [packages/core/src/player/Player.ts:44](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L44)

Last Discord voice server data, kept so the player can be moved to another node.

***

### voiceState

> **voiceState**: `Partial`\<[`VoiceStateUpdate`](../interfaces/VoiceStateUpdate.md)\> = `{}`

Defined in: [packages/core/src/player/Player.ts:42](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L42)

***

### volume

> **volume**: `number` = `100`

Defined in: [packages/core/src/player/Player.ts:40](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L40)

## Accessors

### guildId

#### Get Signature

> **get** **guildId**(): `string`

Defined in: [packages/core/src/player/Player.ts:50](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L50)

##### Returns

`string`

***

### textId

#### Get Signature

> **get** **textId**(): `string`

Defined in: [packages/core/src/player/Player.ts:52](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L52)

##### Returns

`string`

***

### voiceId

#### Get Signature

> **get** **voiceId**(): `string`

Defined in: [packages/core/src/player/Player.ts:51](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L51)

##### Returns

`string`

## Methods

### connect()

> **connect**(`options?`): `void`

Defined in: [packages/core/src/player/Player.ts:190](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L190)

#### Parameters

##### options?

###### selfDeaf?

`boolean`

###### selfMute?

`boolean`

###### voiceChannel?

`string`

#### Returns

`void`

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:155](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L155)

#### Returns

`Promise`\<`void`\>

***

### moveTo()

> **moveTo**(`node`): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:109](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L109)

Moves this player to another node and restores voice, track, position, volume and pause state.

#### Parameters

##### node

`PlayerNode`

#### Returns

`Promise`\<`void`\>

#### Throws

When Discord voice data needed to re-establish the session is missing.

***

### pause()

> **pause**(`pause`): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:165](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L165)

#### Parameters

##### pause

`boolean`

#### Returns

`Promise`\<`void`\>

***

### play()

> **play**(`track?`, `options?`): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:140](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L140)

#### Parameters

##### track?

`string` \| [`Track`](../interfaces/Track.md)

##### options?

`Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`void`\>

***

### search()

> **search**(`query`, `options?`): `Promise`\<`PlayerSearchResult`\>

Defined in: [packages/core/src/player/Player.ts:130](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L130)

#### Parameters

##### query

`string`

##### options?

###### requester?

`unknown`

###### source?

`string`

#### Returns

`Promise`\<`PlayerSearchResult`\>

***

### seek()

> **seek**(`position`): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:184](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L184)

#### Parameters

##### position

`number`

#### Returns

`Promise`\<`void`\>

***

### setLoop()

> **setLoop**(`mode`): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:178](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L178)

#### Parameters

##### mode

`LoopMode`

#### Returns

`Promise`\<`void`\>

***

### setVolume()

> **setVolume**(`volume`): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:171](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L171)

#### Parameters

##### volume

`number`

#### Returns

`Promise`\<`void`\>

***

### skip()

> **skip**(): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:157](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L157)

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:149](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L149)

#### Returns

`Promise`\<`void`\>
