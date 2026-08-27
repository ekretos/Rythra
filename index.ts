/**
 * Rythra public facade.
 *
 * @remarks
 * The monorepo remains internally modular while consumers can use the single
 * `rythra` package for the stable, high-level API. Individual `@rythra/*`
 * packages remain available for advanced integrations and independent use.
 */

export { Rythra, Node, RythraPlayer } from '@rythra/core';
export type {
    Track,
    SearchResponse,
    RythraOptions,
    NodeOptions,
    PlayerOptions,
    Stats,
} from '@rythra/core';

/** Discord.js integration exported as an optional convenience from the facade. */
export { DiscordJS } from '@rythra/connector-discordjs';
