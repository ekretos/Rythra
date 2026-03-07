import { Connector } from "../Connector";

/**
 * Connector for the Oceanic.js library.
 */
export class OceanicJS extends Connector {
    /**
     * Starts listening for Oceanic.js 'packet' events to handle voice updates.
     */
    public listen(): void {
        this.client.on("packet", (packet: any) => {
            if (packet.t === "VOICE_STATE_UPDATE") {
                this.manager?.voiceStateUpdate(packet.d);
            } else if (packet.t === "VOICE_SERVER_UPDATE") {
                this.manager?.voiceServerUpdate(packet.d);
            }
        });
    }

    /**
     * Sends a packet to the Discord gateway using Oceanic.js.
     * @param shardId The ID of the shard to send the packet on.
     * @param payload The payload to send.
     * @param important Whether the packet is important.
     */
    public sendPacket(shardId: number, payload: any, important: boolean): void {
        this.client.shards.get(shardId)?.send(payload.op, payload.d, important);
    }

    /**
     * Gets the bot's user ID from Oceanic.js.
     * @returns The user ID, or null if it cannot be determined.
     */
    public getId(): string | null {
        return this.client.user?.id ?? null;
    }
}
