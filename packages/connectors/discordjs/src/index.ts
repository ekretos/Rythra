import { Client } from 'discord.js';
import { Connector } from '@rythra/core';
import type { GatewayPacket, VoiceStateUpdate, VoiceServerUpdate } from '@rythra/core';

/** Connector for discord.js. */
export class DiscordJS extends Connector<Client> {
    /** Starts listening for Discord gateway voice events. */
    public listen(): void {
        this.client.on('raw', (packet: GatewayPacket) => {
            if (packet.t === 'VOICE_STATE_UPDATE') this.manager?.voiceStateUpdate(packet.d as VoiceStateUpdate);
            else if (packet.t === 'VOICE_SERVER_UPDATE') void this.manager?.voiceServerUpdate(packet.d as VoiceServerUpdate);
        });
    }
    /** Sends a gateway packet through discord.js. */
    public sendPacket(shardId: number, payload: GatewayPacket, important: boolean): void { this.client.ws.shards.get(shardId)?.send(payload, important); }
    /** Returns the Discord application user ID. */
    public getId(): string | null { return this.client.user?.id ?? null; }
}
export default DiscordJS;
