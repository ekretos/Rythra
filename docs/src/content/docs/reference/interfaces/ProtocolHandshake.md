---
title: ProtocolHandshake
description: API Reference for ProtocolHandshake
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:11](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L11)

Values required to build a Lavalink WebSocket handshake.

## Properties

### clientName

> **clientName**: `string`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:13](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L13)

Client name reported to Lavalink.

***

### password

> **password**: `string`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:12](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L12)

Node password.

***

### sessionId?

> `optional` **sessionId?**: `string` \| `null`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:15](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L15)

Previous session ID to resume, when available.

***

### userId

> **userId**: `string`

Defined in: [packages/core/src/protocol/ProtocolAdapter.ts:14](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/protocol/ProtocolAdapter.ts#L14)

Discord user ID owning the session.
