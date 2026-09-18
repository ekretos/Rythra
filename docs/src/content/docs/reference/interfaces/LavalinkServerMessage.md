---
title: LavalinkServerMessage
description: API Reference for LavalinkServerMessage
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:19](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L19)

A decoded Lavalink server message.

## Indexable

> \[`key`: `string`\]: `unknown`

Remaining wire fields.

## Properties

### guildId?

> `optional` **guildId?**: `string`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:21](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L21)

Guild the message belongs to, for player scoped messages.

***

### op

> **op**: `string`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:20](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L20)

Message opcode.

***

### type?

> `optional` **type?**: `string`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:22](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L22)

Event type, for `event` messages.
