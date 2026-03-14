---
title: Seyfert
description: API Reference for Seyfert
---

[**Rythra Documentation v0.0.2**](../README.md)

***

Defined in: [src/connectors/Seyfert.ts:15](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/connectors/Seyfert.ts#L15)

## Extends

- `Connector`\<`SeyfertClient`\>

## Constructors

### Constructor

> **new Seyfert**(`client`): `Seyfert`

Defined in: [src/Connector.ts:17](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Connector.ts#L17)

Creates a new Connector instance.

#### Parameters

##### client

`SeyfertClient`

The Discord library client.

#### Returns

`Seyfert`

#### Inherited from

`Connector<SeyfertClient>.constructor`

## Properties

### client

> `readonly` **client**: `SeyfertClient`

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

Defined in: [src/connectors/Seyfert.ts:30](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/connectors/Seyfert.ts#L30)

Gets the client ID from the Discord client.

#### Returns

`string` \| `null`

The client ID, or null if it cannot be determined.

#### Overrides

`Connector.getId`

***

### listen()

> **listen**(): `void`

Defined in: [src/connectors/Seyfert.ts:16](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/connectors/Seyfert.ts#L16)

Starts listening for gateway events.

#### Returns

`void`

#### Overrides

`Connector.listen`

***

### sendPacket()

> **sendPacket**(`shardId`, `payload`, `_important`): `void`

Defined in: [src/connectors/Seyfert.ts:26](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/connectors/Seyfert.ts#L26)

Sends a packet to the Discord gateway.

#### Parameters

##### shardId

`number`

The ID of the shard to send the packet on.

##### payload

[`GatewayPacket`](../interfaces/GatewayPacket.md)

The payload to send.

##### \_important

`boolean`

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
