---
title: Connector
description: API Reference for Connector
---

[**Rythra Documentation v0.0.2**](../README.md)

***

Defined in: [src/index.ts:36](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/index.ts#L36)

The Connector class with static references to its implementations.
Use this as the primary way to access library-specific connectors.

## Example

```typescript
const connector = new Connector.DiscordJS(client);
```

## Extends

- `Connector`

## Constructors

### Constructor

> **new Connector**(`client`): `Connector`

Defined in: [src/Connector.ts:17](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Connector.ts#L17)

Creates a new Connector instance.

#### Parameters

##### client

`unknown`

The Discord library client.

#### Returns

`Connector`

#### Inherited from

`BaseConnector.constructor`

## Properties

### client

> `readonly` **client**: `unknown`

Defined in: [src/Connector.ts:11](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Connector.ts#L11)

The Discord library client.

#### Inherited from

`BaseConnector.client`

***

### manager

> **manager**: [`Rythra`](Rythra.md) \| `null` = `null`

Defined in: [src/Connector.ts:9](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Connector.ts#L9)

The Rythra manager instance.

#### Inherited from

`BaseConnector.manager`

***

### DiscordJS

> `static` **DiscordJS**: *typeof* [`DiscordJS`](DiscordJS.md)

Defined in: [src/index.ts:38](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/index.ts#L38)

Static reference to the DiscordJS connector.

***

### Eris

> `static` **Eris**: *typeof* [`Eris`](Eris.md)

Defined in: [src/index.ts:40](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/index.ts#L40)

Static reference to the Eris connector.

***

### OceanicJS

> `static` **OceanicJS**: *typeof* [`OceanicJS`](OceanicJS.md)

Defined in: [src/index.ts:42](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/index.ts#L42)

Static reference to the OceanicJS connector.

***

### Seyfert

> `static` **Seyfert**: *typeof* [`Seyfert`](Seyfert.md)

Defined in: [src/index.ts:44](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/index.ts#L44)

Static reference to the Seyfert connector.

## Methods

### getId()

> `abstract` **getId**(): `string` \| `null`

Defined in: [src/Connector.ts:46](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Connector.ts#L46)

Gets the client ID from the Discord client.

#### Returns

`string` \| `null`

The client ID, or null if it cannot be determined.

#### Inherited from

`BaseConnector.getId`

***

### listen()

> `abstract` **listen**(): `void`

Defined in: [src/Connector.ts:40](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Connector.ts#L40)

Starts listening for gateway events.

#### Returns

`void`

#### Inherited from

`BaseConnector.listen`

***

### sendPacket()

> `abstract` **sendPacket**(`shardId`, `payload`, `important`): `void`

Defined in: [src/Connector.ts:35](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Connector.ts#L35)

Sends a packet to the Discord gateway.

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

#### Inherited from

`BaseConnector.sendPacket`

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

`BaseConnector.setManager`
