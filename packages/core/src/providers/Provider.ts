/**
 * Framework-independent source/provider contract.
 *
 * Providers can implement search and direct resolution without coupling the
 * Rythra core to a particular media source.
 */
export interface RythraProvider {
    /** Stable provider identifier. */
    readonly name: string;

    /** Search a provider for playable results. */
    search(query: string): Promise<RythraSearchResult>;

    /** Resolve a provider-specific identifier into tracks. */
    resolve(identifier: string): Promise<RythraTrackResult>;
}

/** Provider search result container. */
export interface RythraSearchResult {
    /** Resolved tracks, ordered by provider relevance. */
    readonly tracks: readonly unknown[];

    /** Provider-specific load information when available. */
    readonly loadType?: string;
}

/** Result returned when resolving a provider identifier. */
export type RythraTrackResult = RythraSearchResult;
