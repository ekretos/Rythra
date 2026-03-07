export * from "./Rythra";
export * from "./Node";
export * from "./Player";
export * from "./Queue";
export * from "./Rest";
export * from "./Types";

import { Connector as BaseConnector } from "./Connector";
import { DiscordJS } from "./connectors/DiscordJS";
import { Eris } from "./connectors/Eris";
import { OceanicJS } from "./connectors/OceanicJS";
import { Seyfert } from "./connectors/Seyfert";

/**
 * Grouped connectors for easier access.
 */
export const Connectors = {
    /** Connector for discord.js */
    DiscordJS,
    /** Connector for Eris */
    Eris,
    /** Connector for Oceanic.js */
    OceanicJS,
    /** Connector for Seyfert */
    Seyfert,
};

/**
 * The Connector class with static references to its implementations.
 * Use this as the primary way to access library-specific connectors.
 * @example
 * ```typescript
 * const connector = new Connector.DiscordJS(client);
 * ```
 */
export abstract class Connector extends BaseConnector {
    /** Static reference to the DiscordJS connector. */
    public static DiscordJS = DiscordJS;
    /** Static reference to the Eris connector. */
    public static Eris = Eris;
    /** Static reference to the OceanicJS connector. */
    public static OceanicJS = OceanicJS;
    /** Static reference to the Seyfert connector. */
    public static Seyfert = Seyfert;
}

export { DiscordJS, Eris, OceanicJS, Seyfert };
