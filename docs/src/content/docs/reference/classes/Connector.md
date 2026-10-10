---
title: Connector
description: API Reference for Connector
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/Connector.ts:10](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Connector.ts#L10)

Abstract class representing a connector to a Discord library.

## Remarks

Connectors keep Discord gateway concerns outside the Rythra playback core.

## Type Parameters

### T

`T` = `unknown`

## Constructors

### Constructor

> **new Connector**\<`T`\>(`client`): `Connector`\<`T`\>

Defined in: [packages/core/src/Connector.ts:19](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Connector.ts#L19)

Creates a connector around a Discord library client.

#### Parameters

##### client

`T`

#### Returns

`Connector`\<`T`\>

## Properties

### client

> `readonly` **client**: `T`

Defined in: [packages/core/src/Connector.ts:14](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Connector.ts#L14)

The Discord library client.

***

### listening

> `protected` **listening**: `boolean` = `false`

Defined in: [packages/core/src/Connector.ts:16](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Connector.ts#L16)

Whether [Connector.listen](#listen) already registered its gateway listeners.

***

### manager

> **manager**: [`Rythra`](Rythra.md) \| `null` = `null`

Defined in: [packages/core/src/Connector.ts:12](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Connector.ts#L12)

The Rythra manager instance.

## Methods

### getId()

> `abstract` **getId**(): `string` \| `null`

Defined in: [packages/core/src/Connector.ts:31](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Connector.ts#L31)

Gets the client ID from the Discord client.

#### Returns

`string` \| `null`

***

### listen()

> `abstract` **listen**(): `void`

Defined in: [packages/core/src/Connector.ts:28](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Connector.ts#L28)

Starts listening for gateway events.

#### Returns

`void`

***

### sendPacket()

> `abstract` **sendPacket**(`shardId`, `payload`, `important`): `void`

Defined in: [packages/core/src/Connector.ts:25](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Connector.ts#L25)

Sends a packet to the Discord gateway.

#### Parameters

##### shardId

`number`

##### payload

[`GatewayPacket`](../interfaces/GatewayPacket.md)

##### important

`boolean`

#### Returns

`void`

***

### setManager()

> **setManager**(`manager`): `void`

Defined in: [packages/core/src/Connector.ts:22](https://github.com/ekretos/Rythra/blob/main/packages/core/src/Connector.ts#L22)

Sets the Rythra manager for this connector.

#### Parameters

##### manager

[`Rythra`](Rythra.md)

#### Returns

`void`
