import type { RythraOptions, SearchPlatform, SearchResponse } from '@rythra/types';
import type { Rest } from './Rest';

/** Minimal player surface a node needs to route Lavalink events. */
export interface PlayerEventTarget {
    /** Emits a Lavalink-originated event on the player. */
    emit(event: string, ...args: unknown[]): boolean;
}

/** Minimal manager surface shared by nodes and players, breaking the Rythra ↔ Node ↔ Player import cycle. */
export interface RythraManager {
    /** Manager configuration. */ readonly options: RythraOptions;
    /** Client version reported to Lavalink. */ readonly version: string;
    /** Active players by guild. */ readonly players: { get(guild: string): PlayerEventTarget | undefined };
    /** Searches Lavalink for tracks. */ search(query: string, requester: unknown, source?: SearchPlatform): Promise<SearchResponse>;
    /** Destroys a guild's player. */ destroyPlayer(guild: string): Promise<void>;
}

/** Minimal node surface a player needs. */
export interface PlayerNode {
    /** REST client of the node. */ readonly rest: Pick<Rest, 'updatePlayer'>;
    /** Owning manager. */ readonly manager: RythraManager;
}
