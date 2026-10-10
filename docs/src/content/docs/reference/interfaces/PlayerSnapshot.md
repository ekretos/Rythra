---
title: PlayerSnapshot
description: API Reference for PlayerSnapshot
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/persistence/Persistence.ts:2](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/core/src/persistence/Persistence.ts#L2)

Serializable player recovery snapshot.

## Properties

### guildId

> **guildId**: `string`

Defined in: [packages/core/src/persistence/Persistence.ts:4](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/core/src/persistence/Persistence.ts#L4)

Guild identifier.

***

### nodeId?

> `optional` **nodeId?**: `string`

Defined in: [packages/core/src/persistence/Persistence.ts:6](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/core/src/persistence/Persistence.ts#L6)

Node identifier, when known.

***

### paused

> **paused**: `boolean`

Defined in: [packages/core/src/persistence/Persistence.ts:12](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/core/src/persistence/Persistence.ts#L12)

Pause state.

***

### position

> **position**: `number`

Defined in: [packages/core/src/persistence/Persistence.ts:10](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/core/src/persistence/Persistence.ts#L10)

Playback position in milliseconds.

***

### queue

> **queue**: `unknown`[]

Defined in: [packages/core/src/persistence/Persistence.ts:16](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/core/src/persistence/Persistence.ts#L16)

Serialized queue.

***

### track?

> `optional` **track?**: `string`

Defined in: [packages/core/src/persistence/Persistence.ts:8](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/core/src/persistence/Persistence.ts#L8)

Encoded current track, when playing.

***

### updatedAt

> **updatedAt**: `number`

Defined in: [packages/core/src/persistence/Persistence.ts:18](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/core/src/persistence/Persistence.ts#L18)

Unix timestamp at which the snapshot was produced.

***

### volume

> **volume**: `number`

Defined in: [packages/core/src/persistence/Persistence.ts:14](https://github.com/ekretos/Rythra/blob/6d3e11d8b74cbecf36b255d64f946bfb20532192/packages/core/src/persistence/Persistence.ts#L14)

Volume.
