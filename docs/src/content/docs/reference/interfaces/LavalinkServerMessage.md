---
title: LavalinkServerMessage
description: API Reference for LavalinkServerMessage
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:19](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/protocol/ProtocolAdapter.ts#L19)

A decoded Lavalink server message.

## Indexable

> \[`key`: `string`\]: `unknown`

Remaining wire fields.

## Properties

### guildId?

> `optional` **guildId?**: `string`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:21](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/protocol/ProtocolAdapter.ts#L21)

Guild the message belongs to, for player scoped messages.

***

### op

> **op**: `string`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:20](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/protocol/ProtocolAdapter.ts#L20)

Message opcode.

***

### type?

> `optional` **type?**: `string`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:22](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/protocol/ProtocolAdapter.ts#L22)

Event type, for `event` messages.
