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

Defined in: [packages/core/src/player/Player.ts:60](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L60)

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

Defined in: [packages/core/src/player/Player.ts:56](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L56)

##### Returns

`string`

***

### voiceId

#### Get Signature

> **get** **voiceId**(): `string`

Defined in: [packages/core/src/player/Player.ts:53](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L53)

##### Returns

`string`

## Methods

### connect()

> **connect**(`options?`): `void`

Defined in: [packages/core/src/player/Player.ts:206](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L206)

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

Defined in: [packages/core/src/player/Player.ts:169](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L169)

#### Returns

`Promise`\<`void`\>

***

### moveTo()

> **moveTo**(`node`): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:118](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L118)

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

Defined in: [packages/core/src/player/Player.ts:181](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L181)

#### Parameters

##### pause

`boolean`

#### Returns

`Promise`\<`void`\>

***

### play()

> **play**(`track?`, `options?`): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:154](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L154)

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

Defined in: [packages/core/src/player/Player.ts:139](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L139)

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

Defined in: [packages/core/src/player/Player.ts:200](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L200)

#### Parameters

##### position

`number`

#### Returns

`Promise`\<`void`\>

***

### setLoop()

> **setLoop**(`mode`): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:194](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L194)

#### Parameters

##### mode

`LoopMode`

#### Returns

`Promise`\<`void`\>

***

### setVolume()

> **setVolume**(`volume`): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:187](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L187)

#### Parameters

##### volume

`number`

#### Returns

`Promise`\<`void`\>

***

### skip()

> **skip**(): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:173](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L173)

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [packages/core/src/player/Player.ts:163](https://github.com/ekretos/Rythra/blob/main/packages/core/src/player/Player.ts#L163)

#### Returns

`Promise`\<`void`\>
