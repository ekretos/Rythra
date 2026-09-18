---
title: SearchResponse
description: API Reference for SearchResponse
---

[**Rythra Documentation v0.2.0**](../README.md)

***

> **SearchResponse** = \{ `data`: [`Track`](../interfaces/Track.md); `loadType`: `"track"`; \} \| \{ `data`: [`PlaylistData`](../interfaces/PlaylistData.md); `loadType`: `"playlist"`; \} \| \{ `data`: [`SearchResultData`](../interfaces/SearchResultData.md); `loadType`: `"search"`; \} \| \{ `data`: `Record`\<`string`, `never`\>; `loadType`: `"empty"`; \} \| \{ `data`: [`LavalinkRestError`](../interfaces/LavalinkRestError.md); `loadType`: `"error"`; \}

Defined in: [packages/core/src/Types.ts:33](https://github.com/ekretos/Rythra/blob/6c930d7e9f0c1ef34b406255dcc9686af3cb2be2/packages/core/src/Types.ts#L33)

Discriminated Lavalink response.
