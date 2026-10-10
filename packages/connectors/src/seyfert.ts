import { Connector } from '@rythra/core';
import type { GatewayPacket, VoiceStateUpdate, VoiceServerUpdate } from '@rythra/core';
interface SeyfertClient { gateway: { events: { on(event: 'packet', listener: (packet: GatewayPacket) => void): void }; send(shardId: number, payload: GatewayPacket): void }; botId?: string; me?: { id: string }; }
/** Connector for Seyfert. */
export class Seyfert extends Connector<SeyfertClient> {
    /** Starts listening for Seyfert gateway voice events. */
    public listen(): void { this.client.gateway.events.on('packet', (packet) => { if (packet.t === 'VOICE_STATE_UPDATE') this.manager?.voiceStateUpdate(packet.d as VoiceStateUpdate); else if (packet.t === 'VOICE_SERVER_UPDATE') void this.manager?.voiceServerUpdate(packet.d as VoiceServerUpdate); }); }
    /** Sends a gateway packet through Seyfert. */
    public sendPacket(shardId: number, payload: GatewayPacket, _important: boolean): void { this.client.gateway.send(shardId, payload); }
    /** Returns the Discord application user ID. */
    public getId(): string | null { return this.client.botId ?? this.client.me?.id ?? null; }
}
export default Seyfert;
