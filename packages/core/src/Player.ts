import { EventEmitter } from 'node:events';
import { Node } from './Node';
import { Queue } from './Queue';
import type { PlayerOptions, Track, VoiceStateUpdate } from './Types';

/** Payload shared by Lavalink track lifecycle events. */
interface TrackEventPayload {
    /** Decoded track information when supplied by Lavalink. */ track?: Track | null;
    /** Encoded track identifier when supplied by Lavalink. */ encodedTrack?: string | null;
    /** Lavalink end reason, when applicable. */ reason?: string;
    /** Exception information for failed playback. */ exception?: unknown;
}

/**
 * Manages audio playback for a single Discord guild.
 *
 * @remarks
 * A player owns its queue and delegates playback state to its assigned
 * Lavalink node. Player events are emitted both for local actions and for
 * events received from Lavalink.
 *
 * @extends EventEmitter
 */
export class RythraPlayer extends EventEmitter {
    /** The Lavalink node currently assigned to this player. */ public readonly node: Node;
    /** The Discord guild ID associated with this player. */ public readonly guild: string;
    /** The Discord voice channel ID currently used by the player. */ public voiceChannel: string;
    /** The Discord text channel ID associated with player interactions. */ public textChannel: string;
    /** Whether a track is currently considered active. */ public playing = false;
    /** Whether playback is currently paused. */ public paused = false;
    /** Current player volume, from 0 to 1000. */ public volume = 100;
    /** Latest Discord voice state received for this guild. */ public voiceState: Partial<VoiceStateUpdate> = {};
    /** Queue containing upcoming and previously played tracks. */ public readonly queue: Queue = new Queue();

    /** Creates a guild player. */
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
            if (reason !== 'replaced' && reason !== 'stopped' && this.node.manager.options.autoPlay && this.queue.length > 0) await this.play();
            this.emit('trackEnd', data);
        });
        this.on('TrackExceptionEvent', (data: TrackEventPayload) => this.emit('trackException', data));
        this.on('TrackStuckEvent', (data: TrackEventPayload) => this.emit('trackStuck', data));
        this.on('playerUpdate', (data: unknown) => this.emit('update', data));
    }

    /** Starts playback of a track or the next queued track. */
    public async play(track?: string | Track, options?: Record<string, unknown>): Promise<void> {
        if (track) this.queue.add(typeof track === 'string' ? ({ encoded: track } as Track) : track);
        if (!this.queue.current && this.queue.length > 0) this.queue.current = this.queue.shift() ?? null;
        if (!this.queue.current) return;
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { track: { encoded: this.queue.current.encoded }, ...options } });
        this.playing = true;
        this.emit('start', this.queue.current);
    }

    /** Stops current playback without clearing the queue. */
    public async stop(): Promise<void> {
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { track: { encoded: null } } });
        this.playing = false;
        this.emit('stop');
    }

    /** Skips the current track and advances to the next queued track. */
    public async skip(): Promise<void> {
        this.emit('trackSkip', this.queue.current);
        if (this.queue.current) this.queue.previous.unshift(this.queue.current);
        this.queue.current = null;
        if (this.queue.length > 0) await this.play();
        else await this.stop();
    }

    /** Pauses or resumes playback. */
    public async pause(pause: boolean): Promise<void> {
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { paused: pause } });
        this.paused = pause;
        this.emit('pause', pause);
    }

    /** Changes Lavalink player volume. */
    public async setVolume(volume: number): Promise<void> {
        if (!Number.isFinite(volume) || volume < 0 || volume > 1000) throw new RangeError('Volume must be between 0 and 1000.');
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { volume } });
        this.volume = volume;
        this.emit('volume', volume);
    }

    /** Requests a Discord voice connection through the configured connector. */
    public connect(options?: { voiceChannel?: string; selfMute?: boolean; selfDeaf?: boolean }): void {
        this.voiceChannel = options?.voiceChannel ?? this.voiceChannel;
        this.node.manager.options.connector.sendPacket(0, { op: 4, d: { guild_id: this.guild, channel_id: this.voiceChannel, self_mute: options?.selfMute ?? false, self_deaf: options?.selfDeaf ?? false } }, false);
    }
}
