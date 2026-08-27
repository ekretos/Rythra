import { Rythra } from './Rythra';
import type { GatewayPacket } from './Types';
import type { DaveCapabilities } from './voice/DAVE';

/**
 * Abstract adapter between Rythra and a Discord library.
 *
 * @typeParam T Underlying Discord library client type.
 */
export abstract class Connector<T = unknown> {
    /** Rythra manager instance assigned to this connector. */
    public manager: Rythra | null = null;
    /** Underlying Discord library client. */
    public readonly client: T;

    /** Creates a connector around a Discord client. */
    constructor(client: T) { this.client = client; }
    /** Assigns the Rythra manager. */
    public setManager(manager: Rythra): void { this.manager = manager; }
    /** Sends a raw gateway packet. */
    public abstract sendPacket(shardId: number, payload: GatewayPacket, important: boolean): void;
    /** Starts listening for voice gateway events. */
    public abstract listen(): void;
    /** Returns the Discord bot user ID when available. */
    public abstract getId(): string | null;
    /**
     * Returns DAVE capability information.
     *
     * @remarks
     * DAVE cryptography belongs to the Discord voice implementation. Rythra
     * only exposes the capability boundary and never implements cryptography.
     */
    public getDAVECapabilities(): DaveCapabilities { return { supported: false }; }
}
