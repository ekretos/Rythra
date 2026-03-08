import { Client } from 'discord.js';
import { Connector } from '../Connector';
import type { GatewayPacket, VoiceStateUpdate, VoiceServerUpdate } from '../Types';

/**
 * Connector for the discord.js library.
 */
export class DiscordJS extends Connector<Client> {
    /**
     * Starts listening for discord.js 'raw' events to handle voice updates.
     */
    public listen(): void {
        this.client.on('raw', (packet: GatewayPacket) => {
            if (packet.t === 'VOICE_STATE_UPDATE') {
                this.manager?.voiceStateUpdate(packet.d as VoiceStateUpdate);
            } else if (packet.t === 'VOICE_SERVER_UPDATE') {
                this.manager?.voiceServerUpdate(packet.d as VoiceServerUpdate);
            }
        });
    }

    /**
     * Sends a packet to the Discord gateway using discord.js.
     * @param shardId The ID of the shard to send the packet on.
     * @param payload The payload to send.
     * @param important Whether the packet is important.
     */
    public sendPacket(shardId: number, payload: GatewayPacket, important: boolean): void {
        this.client.ws.shards.get(shardId)?.send(payload, important);
    }

    /**
     * Gets the bot's user ID from discord.js.
     * @returns The user ID, or null if it cannot be determined.
     */
    public getId(): string | null {
        return this.client.user?.id ?? null;
    }
}
