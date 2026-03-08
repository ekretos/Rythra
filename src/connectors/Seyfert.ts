import { Connector } from '../Connector';
import type { GatewayPacket, VoiceStateUpdate, VoiceServerUpdate } from '../Types';

interface SeyfertClient {
    gateway: {
        events: {
            on(event: 'packet', listener: (packet: GatewayPacket) => void): void;
        };
        send(shardId: number, payload: GatewayPacket): void;
    };
    botId?: string;
    me?: { id: string };
}

export class Seyfert extends Connector<SeyfertClient> {
    public listen(): void {
        this.client.gateway.events.on('packet', (packet: GatewayPacket) => {
            if (packet.t === 'VOICE_STATE_UPDATE') {
                this.manager?.voiceStateUpdate(packet.d as VoiceStateUpdate);
            } else if (packet.t === 'VOICE_SERVER_UPDATE') {
                this.manager?.voiceServerUpdate(packet.d as VoiceServerUpdate);
            }
        });
    }

    public sendPacket(shardId: number, payload: GatewayPacket, _important: boolean): void {
        this.client.gateway.send(shardId, payload);
    }

    public getId(): string | null {
        return this.client.botId ?? this.client.me?.id ?? null;
    }
}
