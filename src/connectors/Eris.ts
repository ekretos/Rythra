import { Connector } from '../Connector';
import type { GatewayPacket, VoiceStateUpdate, VoiceServerUpdate } from '../Types';

interface ErisClient {
    on(event: 'rawWS', listener: (packet: GatewayPacket) => void): this;
    shards: {
        get(id: number):
            | {
                  sendWS(op: number | undefined, data: unknown, important: boolean): void;
              }
            | undefined;
    };
    user: { id: string } | null;
}

/**
 * Connector for the Eris library.
 */
export class Eris extends Connector<ErisClient> {
    /**
     * Starts listening for Eris 'rawWS' events to handle voice updates.
     */
    public listen(): void {
        this.client.on('rawWS', (packet: GatewayPacket) => {
            if (packet.t === 'VOICE_STATE_UPDATE') {
                this.manager?.voiceStateUpdate(packet.d as VoiceStateUpdate);
            } else if (packet.t === 'VOICE_SERVER_UPDATE') {
                this.manager?.voiceServerUpdate(packet.d as VoiceServerUpdate);
            }
        });
    }

    /**
     * Sends a packet to the Discord gateway using Eris.
     * @param shardId The ID of the shard to send the packet on.
     * @param payload The payload to send.
     * @param important Whether the packet is important.
     */
    public sendPacket(shardId: number, payload: GatewayPacket, important: boolean): void {
        this.client.shards.get(shardId)?.sendWS(payload.op, payload.d, important);
    }

    /**
     * Gets the bot's user ID from Eris.
     * @returns The user ID, or null if it cannot be determined.
     */
    public getId(): string | null {
        return this.client.user?.id ?? null;
    }
}
