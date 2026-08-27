import { EventEmitter } from 'node:events';
import { Node } from './Node';
import { Queue } from './Queue';
import type { PlayerOptions, Track, VoiceStateUpdate } from './Types';

interface TrackEventPayload {
    track?: Track | null;
    encodedTrack?: string | null;
    reason?: string;
    exception?: unknown;
}

export class RythraPlayer extends EventEmitter {
    public readonly node: Node;
    public readonly guild: string;
    public voiceChannel: string;
    public textChannel: string;
    public playing = false;
    public paused = false;
    public volume = 100;
    public voiceState: Partial<VoiceStateUpdate> = {};
    public readonly queue: Queue = new Queue();

    constructor(node: Node, options: PlayerOptions) {
        super();
        this.node = node;
        this.guild = options.guild;
        this.voiceChannel = options.voiceChannel;
        this.textChannel = options.textChannel;

        this.on('TrackStartEvent', (data: TrackEventPayload) => {
            this.playing = true;
            const track = data.track ?? this.queue.current;
            this.emit('trackStart', track, data);
        });

        this.on('TrackEndEvent', async (data: TrackEventPayload) => {
            this.playing = false;

            const endedEncoded = data.encodedTrack ?? data.track?.encoded;
            if (this.queue.current && (!endedEncoded || endedEncoded === this.queue.current.encoded)) {
                this.queue.previous.unshift(this.queue.current);
                this.queue.current = null;
            }

            const reason = data.reason?.toLowerCase();
            if (reason !== 'replaced' && reason !== 'stopped' && this.node.manager.options.autoPlay && this.queue.length > 0) {
                await this.play();
            }

            this.emit('trackEnd', data);
        });

        this.on('TrackExceptionEvent', (data: TrackEventPayload) => {
            this.emit('trackException', data);
        });

        this.on('TrackStuckEvent', (data: TrackEventPayload) => {
            this.emit('trackStuck', data);
        });

        this.on('playerUpdate', (data: unknown) => this.emit('update', data));
    }

    public async play(track?: string | Track, options?: Record<string, unknown>): Promise<void> {
        if (track) this.queue.add(typeof track === 'string' ? ({ encoded: track } as Track) : track);
        if (!this.queue.current && this.queue.length > 0) this.queue.current = this.queue.shift() ?? null;
        if (!this.queue.current) return;

        await this.node.rest.updatePlayer({
            guildId: this.guild,
            playerOptions: {
                track: { encoded: this.queue.current.encoded },
                ...options,
            },
        });

        this.playing = true;
        this.emit('start', this.queue.current);
    }

    public async stop(): Promise<void> {
        await this.node.rest.updatePlayer({
            guildId: this.guild,
            playerOptions: { track: { encoded: null } },
        });
        this.playing = false;
        this.emit('stop');
    }

    public async skip(): Promise<void> {
        this.emit('trackSkip', this.queue.current);
        if (this.queue.current) this.queue.previous.unshift(this.queue.current);
        this.queue.current = null;
        if (this.queue.length > 0) await this.play();
        else await this.stop();
    }

    public async pause(pause: boolean): Promise<void> {
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { paused: pause } });
        this.paused = pause;
        this.emit('pause', pause);
    }

    public async setVolume(volume: number): Promise<void> {
        if (!Number.isFinite(volume) || volume < 0 || volume > 1000) {
            throw new RangeError('Volume must be between 0 and 1000.');
        }
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { volume } });
        this.volume = volume;
        this.emit('volume', volume);
    }

    public connect(options?: { voiceChannel?: string; selfMute?: boolean; selfDeaf?: boolean }): void {
        this.voiceChannel = options?.voiceChannel ?? this.voiceChannel;
        this.node.manager.options.connector.sendPacket(
            0,
            {
                op: 4,
                d: {
                    guild_id: this.guild,
                    channel_id: this.voiceChannel,
                    self_mute: options?.selfMute ?? false,
                    self_deaf: options?.selfDeaf ?? false,
                },
            },
            false
        );
    }
}
