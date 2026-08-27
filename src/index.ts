/**
 * Public Rythra API.
 *
 * @packageDocumentation
 */

export * from './Rythra';
export * from './Node';
export * from './Player';
export * from './Queue';
export * from './Rest';
export * from './Types';
export * from './protocol/LavalinkProtocol';
export * from './errors/RythraError';
export * from './health/Health';
export * from './reliability/CircuitBreaker';

import { Connector as BaseConnector } from './Connector';
import { DiscordJS } from './connectors/DiscordJS';
import { Eris } from './connectors/Eris';
import { OceanicJS } from './connectors/OceanicJS';
import { Seyfert } from './connectors/Seyfert';

/**
 * Built-in Discord library connectors grouped for convenient access.
 *
 * @example
 * ```typescript
 * const connector = new Connectors.DiscordJS(client);
 * ```
 */
export const Connectors = {
    /** Connector implementation for discord.js. */
    DiscordJS,
    /** Connector implementation for Eris. */
    Eris,
    /** Connector implementation for Oceanic.js. */
    OceanicJS,
    /** Connector implementation for Seyfert. */
    Seyfert,
};

/**
 * Base connector class with static references to Rythra's built-in connectors.
 *
 * @example
 * ```typescript
 * const connector = new Connector.DiscordJS(client);
 * ```
 */
export abstract class Connector extends BaseConnector {
    /** Connector implementation for discord.js. */
    public static DiscordJS = DiscordJS;
    /** Connector implementation for Eris. */
    public static Eris = Eris;
    /** Connector implementation for Oceanic.js. */
    public static OceanicJS = OceanicJS;
    /** Connector implementation for Seyfert. */
    public static Seyfert = Seyfert;
}

/** Re-exported discord.js connector. */
export { DiscordJS };
/** Re-exported Eris connector. */
export { Eris };
/** Re-exported Oceanic.js connector. */
export { OceanicJS };
/** Re-exported Seyfert connector. */
export { Seyfert };
