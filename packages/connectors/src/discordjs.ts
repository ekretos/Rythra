import { Connector } from '@rythra/core';
import type { GatewayPacket, VoiceStateUpdate, VoiceServerUpdate } from '@rythra/core';

/** Structural subset of a discord.js `Client` used by the connector, so `discord.js` stays an optional peer. */
export interface DiscordJSClient {
    on(event: 'raw', listener: (packet: GatewayPacket) => void): unknown;
    ws: { shards: { get(id: number): { send(payload: GatewayPacket, important?: boolean): unknown } | undefined } };
    user: { id: string } | null;
}

/** Connector for discord.js. */
export class DiscordJS extends Connector<DiscordJSClient> {
    /** Starts listening for Discord gateway voice events. */
    public listen(): void {
        if (this.listening) return;
        this.listening = true;
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
