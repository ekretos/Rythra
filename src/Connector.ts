import { Rythra } from './Rythra';
import type { GatewayPacket } from './Types';

/**
 * Abstract class representing a connector to a Discord library.
 */
export abstract class Connector<T = unknown> {
    /** The Rythra manager instance. */
    public manager: Rythra | null = null;
    /** The Discord library client. */
    public readonly client: T;

    /**
     * Creates a new Connector instance.
     * @param client The Discord library client.
     */
    constructor(client: T) {
        this.client = client;
    }

    /**
     * Sets the Rythra manager for this connector.
     * @param manager The Rythra manager instance.
     */
    public setManager(manager: Rythra): void {
        this.manager = manager;
    }

    /**
     * Sends a packet to the Discord gateway.
     * @param shardId The ID of the shard to send the packet on.
     * @param payload The payload to send.
     * @param important Whether the packet is important.
     */
    public abstract sendPacket(shardId: number, payload: GatewayPacket, important: boolean): void;

    /**
     * Starts listening for gateway events.
     */
    public abstract listen(): void;

    /**
     * Gets the client ID from the Discord client.
     * @returns The client ID, or null if it cannot be determined.
     */
    public abstract getId(): string | null;
}
