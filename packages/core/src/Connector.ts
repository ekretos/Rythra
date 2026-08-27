import { Rythra } from './Rythra';
import type { GatewayPacket } from './Types';

/**
 * Abstract class representing a connector to a Discord library.
 *
 * @remarks
 * Connectors keep Discord gateway concerns outside the Rythra playback core.
 */
export abstract class Connector<T = unknown> {
    /** The Rythra manager instance. */
    public manager: Rythra | null = null;
    /** The Discord library client. */
    public readonly client: T;

    /** Creates a connector around a Discord library client. */
    constructor(client: T) { this.client = client; }

    /** Sets the Rythra manager for this connector. */
    public setManager(manager: Rythra): void { this.manager = manager; }

    /** Sends a packet to the Discord gateway. */
    public abstract sendPacket(shardId: number, payload: GatewayPacket, important: boolean): void;

    /** Starts listening for gateway events. */
    public abstract listen(): void;

    /** Gets the client ID from the Discord client. */
    public abstract getId(): string | null;
}
