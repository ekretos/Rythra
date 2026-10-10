import { Connector } from '@rythra/core';
import type { GatewayPacket, VoiceStateUpdate, VoiceServerUpdate } from '@rythra/core';

/** Voice state dispatch as emitted by Lunibee's `voiceStateUpdate` event. */
interface LunibeeVoiceState {
    guild_id?: string | null;
    channel_id: string | null;
    session_id: string;
    user_id: string;
}
/** Voice server dispatch as emitted by Lunibee's `voiceServerUpdate` event; `endpoint` is null while Discord reallocates the server. */
interface LunibeeVoiceServer {
    guild_id: string;
    token: string;
    endpoint?: string | null;
}
interface LunibeePayload {
    op: number;
    d: unknown;
    s: number | null;
    t: string | null;
}
/** Structural subset of a Lunibee `Client` (the stable voice interface, Lunibee >= 0.3.0 for `sendVoiceState`). */
interface LunibeeClient {
    on(event: 'voiceStateUpdate', listener: (data: LunibeeVoiceState) => void): unknown;
    on(event: 'voiceServerUpdate', listener: (data: LunibeeVoiceServer) => void): unknown;
    /** Routes an op 4 voice state update to the owning shard; present from Lunibee 0.3.0. */
    sendVoiceState?(guildId: string, channelId: string | null, options?: { selfMute?: boolean; selfDeaf?: boolean }): boolean;
    ws: { send(payload: LunibeePayload): boolean };
    user?: { id: string };
}

/** Connector for Lunibee. */
export class Lunibee extends Connector<LunibeeClient> {
    /** Starts listening for Lunibee voice events. */
    public listen(): void {
        if (this.listening) return;
        this.listening = true;
        this.client.on('voiceStateUpdate', (data) => {
            if (data.guild_id) this.manager?.voiceStateUpdate(data as VoiceStateUpdate & { guild_id: string });
        });
        this.client.on('voiceServerUpdate', (data) => {
            // A null endpoint means Discord is reallocating the voice server; a new update follows.
            if (data.endpoint) void this.manager?.voiceServerUpdate(data as VoiceServerUpdate);
        });
    }
    /** Sends a gateway packet through Lunibee, using its shard-aware voice API for voice state updates. */
    public sendPacket(_shardId: number, payload: GatewayPacket, _important: boolean): void {
        const d = payload.d as { guild_id?: string; channel_id?: string | null; self_mute?: boolean; self_deaf?: boolean } | undefined;
        if (payload.op === 4 && d?.guild_id && this.client.sendVoiceState) {
            this.client.sendVoiceState(d.guild_id, d.channel_id ?? null, { selfMute: d.self_mute, selfDeaf: d.self_deaf });
            return;
        }
        this.client.ws.send({ op: payload.op ?? 0, d: payload.d ?? null, s: null, t: payload.t ?? null });
    }
    /** Returns the Discord application user ID. */
    public getId(): string | null {
        return this.client.user?.id ?? null;
    }
}
export default Lunibee;
