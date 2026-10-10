import { Connector } from '@rythra/core';
import type { GatewayPacket, VoiceStateUpdate, VoiceServerUpdate } from '@rythra/core';
interface OceanicClient { on(event: 'packet', listener: (packet: GatewayPacket) => void): this; shards: { get(id: number): { send(op: number | undefined, data: unknown, important: boolean): void } | undefined }; user: { id: string } | null; }
/** Connector for Oceanic.js. */
export class OceanicJS extends Connector<OceanicClient> {
    /** Starts listening for Oceanic gateway voice events. */
    public listen(): void { this.client.on('packet', (packet) => { if (packet.t === 'VOICE_STATE_UPDATE') this.manager?.voiceStateUpdate(packet.d as VoiceStateUpdate); else if (packet.t === 'VOICE_SERVER_UPDATE') void this.manager?.voiceServerUpdate(packet.d as VoiceServerUpdate); }); }
    /** Sends a gateway packet through Oceanic.js. */
    public sendPacket(shardId: number, payload: GatewayPacket, important: boolean): void { this.client.shards.get(shardId)?.send(payload.op, payload.d, important); }
    /** Returns the Discord application user ID. */
    public getId(): string | null { return this.client.user?.id ?? null; }
}
export default OceanicJS;
