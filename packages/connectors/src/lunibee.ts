import { Connector } from '@rythra/core';
import type { GatewayPacket, VoiceStateUpdate, VoiceServerUpdate } from '@rythra/core';
interface LunibeeClient { on(event: 'raw', listener: (data: { event: string; data: unknown }) => void): this; ws: { send(payload: GatewayPacket): boolean }; user?: { id: string }; }
/** Connector for Lunibee. */
export class Lunibee extends Connector<LunibeeClient> {
    /** Starts listening for Lunibee gateway voice events. */
    public listen(): void {
        if (this.listening) return;
        this.listening = true; this.client.on('raw', ({ event, data }) => { if (event === 'VOICE_STATE_UPDATE') this.manager?.voiceStateUpdate(data as VoiceStateUpdate); else if (event === 'VOICE_SERVER_UPDATE') void this.manager?.voiceServerUpdate(data as VoiceServerUpdate); }); }
    /** Sends a gateway packet through Lunibee (single gateway connection). */
    public sendPacket(_shardId: number, payload: GatewayPacket, _important: boolean): void { this.client.ws.send(payload); }
    /** Returns the Discord application user ID. */
    public getId(): string | null { return this.client.user?.id ?? null; }
}
export default Lunibee;
