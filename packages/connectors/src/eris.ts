import { Connector } from '@rythra/core';
import type { GatewayPacket, VoiceStateUpdate, VoiceServerUpdate } from '@rythra/core';
interface ErisClient { on(event: 'rawWS', listener: (packet: GatewayPacket) => void): this; shards: { get(id: number): { sendWS(op: number | undefined, data: unknown, important: boolean): void } | undefined }; user: { id: string } | null; }
/** Connector for Eris. */
export class Eris extends Connector<ErisClient> {
    /** Starts listening for Eris gateway voice events. */
    public listen(): void { this.client.on('rawWS', (packet) => { if (packet.t === 'VOICE_STATE_UPDATE') this.manager?.voiceStateUpdate(packet.d as VoiceStateUpdate); else if (packet.t === 'VOICE_SERVER_UPDATE') void this.manager?.voiceServerUpdate(packet.d as VoiceServerUpdate); }); }
    /** Sends a gateway packet through Eris. */
    public sendPacket(shardId: number, payload: GatewayPacket, important: boolean): void { this.client.shards.get(shardId)?.sendWS(payload.op, payload.d, important); }
    /** Returns the Discord application user ID. */
    public getId(): string | null { return this.client.user?.id ?? null; }
}
export default Eris;
