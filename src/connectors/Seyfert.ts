import { Connector } from "../Connector";

export class Seyfert extends Connector {
    public listen(): void {
        this.client.gateway.events.on("packet", (packet: any) => {
            if (packet.t === "VOICE_STATE_UPDATE") {
                this.manager?.voiceStateUpdate(packet.d);
            } else if (packet.t === "VOICE_SERVER_UPDATE") {
                this.manager?.voiceServerUpdate(packet.d);
            }
        });
    }

    public sendPacket(shardId: number, payload: any, important: boolean): void {
        this.client.gateway.send(shardId, payload);
    }

    public getId(): string | null {
        return this.client.botId ?? this.client.me?.id ?? null;
    }
}