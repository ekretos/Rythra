---
title: SearchResponse
description: API Reference for SearchResponse
---

[**Rythra Documentation v0.3.0**](../README.md)

***

> **SearchResponse** = \{ `data`: [`Track`](../interfaces/Track.md); `loadType`: `"track"`; \} \| \{ `data`: [`PlaylistData`](../interfaces/PlaylistData.md); `loadType`: `"playlist"`; \} \| \{ `data`: [`SearchResultData`](../interfaces/SearchResultData.md); `loadType`: `"search"`; \} \| \{ `data`: `Record`\<`string`, `never`\>; `loadType`: `"empty"`; \} \| \{ `data`: [`LavalinkRestError`](../interfaces/LavalinkRestError.md); `loadType`: `"error"`; \}

Defined in: [packages/types/src/index.ts:44](https://github.com/ekretos/Rythra/blob/8c65b2b9a1c3f4d653aa63873bbc3c7b0f9b3db4/packages/types/src/index.ts#L44)

Discriminated Lavalink response.
