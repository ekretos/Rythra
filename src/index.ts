export * from './Rythra';
export * from './Node';
export * from './Player';
export * from './Queue';
export * from './Rest';
export * from './Types';
export * from './protocol/LavalinkProtocol';

import { Connector as BaseConnector } from './Connector';
import { DiscordJS } from './connectors/DiscordJS';
import { Eris } from './connectors/Eris';
import { OceanicJS } from './connectors/OceanicJS';
import { Seyfert } from './connectors/Seyfert';

export const Connectors = {
    DiscordJS,
    Eris,
    OceanicJS,
    Seyfert,
};

export abstract class Connector extends BaseConnector {
    public static DiscordJS = DiscordJS;
    public static Eris = Eris;
    public static OceanicJS = OceanicJS;
    public static Seyfert = Seyfert;
}

export { DiscordJS, Eris, OceanicJS, Seyfert };
