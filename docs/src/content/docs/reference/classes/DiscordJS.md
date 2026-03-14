---
title: DiscordJS
description: API Reference for DiscordJS
---

[**Rythra Documentation v0.0.2**](../README.md)

***

Defined in: [src/connectors/DiscordJS.ts:8](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/connectors/DiscordJS.ts#L8)

Connector for the discord.js library.

## Extends

- `Connector`\<`Client`\>

## Constructors

### Constructor

> **new DiscordJS**(`client`): `DiscordJS`

Defined in: [src/Connector.ts:17](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Connector.ts#L17)

Creates a new Connector instance.

#### Parameters

##### client

`Client`

The Discord library client.

#### Returns

`DiscordJS`

#### Inherited from

`Connector<Client>.constructor`

## Properties

### client

> `readonly` **client**: `Client`

Defined in: [src/Connector.ts:11](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Connector.ts#L11)

The Discord library client.

#### Inherited from

`Connector.client`

***

### manager

> **manager**: [`Rythra`](Rythra.md) \| `null` = `null`

Defined in: [src/Connector.ts:9](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Connector.ts#L9)

The Rythra manager instance.

#### Inherited from

`Connector.manager`

## Methods

### getId()

> **getId**(): `string` \| `null`

Defined in: [src/connectors/DiscordJS.ts:36](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/connectors/DiscordJS.ts#L36)

Gets the bot's user ID from discord.js.

#### Returns

`string` \| `null`

The user ID, or null if it cannot be determined.

#### Overrides

`Connector.getId`

***

### listen()

> **listen**(): `void`

Defined in: [src/connectors/DiscordJS.ts:12](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/connectors/DiscordJS.ts#L12)

Starts listening for discord.js 'raw' events to handle voice updates.

#### Returns

`void`

#### Overrides

`Connector.listen`

***

### sendPacket()

> **sendPacket**(`shardId`, `payload`, `important`): `void`

Defined in: [src/connectors/DiscordJS.ts:28](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/connectors/DiscordJS.ts#L28)

Sends a packet to the Discord gateway using discord.js.

#### Parameters

##### shardId

`number`

The ID of the shard to send the packet on.

##### payload

[`GatewayPacket`](../interfaces/GatewayPacket.md)

The payload to send.

##### important

`boolean`

Whether the packet is important.

#### Returns

`void`

#### Overrides

`Connector.sendPacket`

***

### setManager()

> **setManager**(`manager`): `void`

Defined in: [src/Connector.ts:25](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Connector.ts#L25)

Sets the Rythra manager for this connector.

#### Parameters

##### manager

[`Rythra`](Rythra.md)

The Rythra manager instance.

#### Returns

`void`

#### Inherited from

`Connector.setManager`
