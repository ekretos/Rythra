---
title: OceanicJS
description: API Reference for OceanicJS
---

[**Rythra Documentation v0.0.2**](../README.md)

***

Defined in: [src/connectors/OceanicJS.ts:19](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/connectors/OceanicJS.ts#L19)

Connector for the Oceanic.js library.

## Extends

- `Connector`\<`OceanicClient`\>

## Constructors

### Constructor

> **new OceanicJS**(`client`): `OceanicJS`

Defined in: [src/Connector.ts:17](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Connector.ts#L17)

Creates a new Connector instance.

#### Parameters

##### client

`OceanicClient`

The Discord library client.

#### Returns

`OceanicJS`

#### Inherited from

`Connector<OceanicClient>.constructor`

## Properties

### client

> `readonly` **client**: `OceanicClient`

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

Defined in: [src/connectors/OceanicJS.ts:47](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/connectors/OceanicJS.ts#L47)

Gets the bot's user ID from Oceanic.js.

#### Returns

`string` \| `null`

The user ID, or null if it cannot be determined.

#### Overrides

`Connector.getId`

***

### listen()

> **listen**(): `void`

Defined in: [src/connectors/OceanicJS.ts:23](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/connectors/OceanicJS.ts#L23)

Starts listening for Oceanic.js 'packet' events to handle voice updates.

#### Returns

`void`

#### Overrides

`Connector.listen`

***

### sendPacket()

> **sendPacket**(`shardId`, `payload`, `important`): `void`

Defined in: [src/connectors/OceanicJS.ts:39](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/connectors/OceanicJS.ts#L39)

Sends a packet to the Discord gateway using Oceanic.js.

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
