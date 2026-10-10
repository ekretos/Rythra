---
title: IConnector
description: API Reference for IConnector
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/types/src/index.ts:9](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/types/src/index.ts#L9)

Minimal Discord library connector contract.

## Properties

### client

> `readonly` **client**: `unknown`

Defined in: [packages/types/src/index.ts:10](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/types/src/index.ts#L10)

The Discord library client.

## Methods

### getId()

> **getId**(): `string` \| `null`

Defined in: [packages/types/src/index.ts:14](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/types/src/index.ts#L14)

Gets the client ID from the Discord client.

#### Returns

`string` \| `null`

***

### listen()

> **listen**(): `void`

Defined in: [packages/types/src/index.ts:13](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/types/src/index.ts#L13)

Starts listening for gateway events.

#### Returns

`void`

***

### sendPacket()

> **sendPacket**(`shardId`, `payload`, `important`): `void`

Defined in: [packages/types/src/index.ts:12](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/types/src/index.ts#L12)

Sends a packet to the Discord gateway.

#### Parameters

##### shardId

`number`

##### payload

[`GatewayPacket`](GatewayPacket.md)

##### important

`boolean`

#### Returns

`void`

***

### setManager()

> **setManager**(`manager`): `void`

Defined in: [packages/types/src/index.ts:11](https://github.com/ekretos/Rythra/blob/494517dd89f9fe3e5101c12673c172d6033bc461/packages/types/src/index.ts#L11)

Sets the Rythra manager for this connector.

#### Parameters

##### manager

[`IRythra`](IRythra.md)

#### Returns

`void`
