import { Rythra } from './Rythra';
import { Connector as BaseConnector } from './Connector';
import { DiscordJS } from './connectors/DiscordJS';
import { Eris } from './connectors/Eris';
import { OceanicJS } from './connectors/OceanicJS';
import { Seyfert } from './connectors/Seyfert';
import type { GatewayPacket } from './Types';

/** Public Rythra package entry point. */
export * from './Rythra';
export * from './Node';
export * from './Player';
export * from './Queue';
export * from './QueueStore';
export * from './Rest';
export * from './Types';
export * from './Metrics';
export * from './Persistence';
export * from './Plugin';
export * from './Filters';
export * from './Validation';
export * from './voice/DAVE';
export * from './protocol/LavalinkProtocol';

/** Built-in Discord library connectors. */
export const Connectors = { DiscordJS, Eris, OceanicJS, Seyfert };

/**
 * Base connector with convenient access to built-in adapters.
 *
 * @remarks
 * DAVE is deliberately delegated to the underlying Discord voice stack.
 * Implementations can expose `getDAVECapabilities()` when supported.
 */
export abstract class Connector extends BaseConnector {
    /** discord.js connector. */ public static DiscordJS = DiscordJS;
    /** Eris connector. */ public static Eris = Eris;
    /** Oceanic.js connector. */ public static OceanicJS = OceanicJS;
    /** Seyfert connector. */ public static Seyfert = Seyfert;
    /** Returns DAVE capability information for this connector. */
    public getDAVECapabilities() { return { supported: false as const }; }
}

/** Re-exported discord.js connector. */ export { DiscordJS };
/** Re-exported Eris connector. */ export { Eris };
/** Re-exported Oceanic.js connector. */ export { OceanicJS };
/** Re-exported Seyfert connector. */ export { Seyfert };
