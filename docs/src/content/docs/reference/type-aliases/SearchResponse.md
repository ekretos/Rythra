---
title: SearchResponse
description: API Reference for SearchResponse
---

[**Rythra Documentation v0.0.2**](../README.md)

***

> **SearchResponse** = \{ `data`: [`Track`](../interfaces/Track.md); `loadType`: `"track"`; \} \| \{ `data`: [`PlaylistData`](../interfaces/PlaylistData.md); `loadType`: `"playlist"`; \} \| \{ `data`: [`SearchResultData`](../interfaces/SearchResultData.md); `loadType`: `"search"`; \} \| \{ `data`: `Record`\<`string`, `never`\>; `loadType`: `"empty"`; \} \| \{ `data`: [`LavalinkRestError`](../interfaces/LavalinkRestError.md); `loadType`: `"error"`; \}

Defined in: [src/Types.ts:89](https://github.com/ekretos/Rythra/blob/97bb66158cadfed295d503388eb818d9992b5725/src/Types.ts#L89)
