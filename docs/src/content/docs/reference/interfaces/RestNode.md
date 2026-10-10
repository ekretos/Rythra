---
title: RestNode
description: API Reference for RestNode
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/Rest.ts:6](https://github.com/ekretos/Rythra/blob/8c65b2b9a1c3f4d653aa63873bbc3c7b0f9b3db4/packages/core/src/Rest.ts#L6)

Minimal node surface required by the REST client.

## Properties

### manager

> `readonly` **manager**: `object`

Defined in: [packages/core/src/Rest.ts:10](https://github.com/ekretos/Rythra/blob/8c65b2b9a1c3f4d653aa63873bbc3c7b0f9b3db4/packages/core/src/Rest.ts#L10)

Owning manager settings.

#### options

> `readonly` **options**: `object`

##### options.restTimeout?

> `optional` **restTimeout?**: `number`

##### options.userAgent?

> `optional` **userAgent?**: `string`

***

### options

> `readonly` **options**: `object`

Defined in: [packages/core/src/Rest.ts:7](https://github.com/ekretos/Rythra/blob/8c65b2b9a1c3f4d653aa63873bbc3c7b0f9b3db4/packages/core/src/Rest.ts#L7)

Node configuration.

#### password?

> `optional` **password?**: `string`

***

### restUrl

> `readonly` **restUrl**: `string`

Defined in: [packages/core/src/Rest.ts:8](https://github.com/ekretos/Rythra/blob/8c65b2b9a1c3f4d653aa63873bbc3c7b0f9b3db4/packages/core/src/Rest.ts#L8)

Version-aware REST base URL.

***

### sessionId

> `readonly` **sessionId**: `string` \| `null`

Defined in: [packages/core/src/Rest.ts:9](https://github.com/ekretos/Rythra/blob/8c65b2b9a1c3f4d653aa63873bbc3c7b0f9b3db4/packages/core/src/Rest.ts#L9)

Current Lavalink session ID.
