import { EventEmitter } from 'node:events';
import { Node } from './Node';
import { Queue } from './Queue';
import { FilterManager } from './Filters';
import type { PlayerOptions, Track, VoiceStateUpdate, PlayerSnapshot } from './Types';
import { validateTrack } from './Validation';

/** Payload shared by Lavalink track lifecycle events. */
interface TrackEventPayload { track?: Track | null; encodedTrack?: string | null; reason?: string; exception?: unknown; }

/** Manages audio playback for one Discord guild. */
export class RythraPlayer extends EventEmitter {
    /** Lavalink node currently assigned to the player. */
    public node: Node;
    /** Discord guild ID. */
    public readonly guild: string;
    /** Discord voice channel ID. */
    public voiceChannel: string;
    /** Discord text channel ID. */
    public textChannel: string;
    /** Whether playback is active. */
    public playing = false;
    /** Whether playback is paused. */
    public paused = false;
    /** Current volume from 0 to 1000. */
    public volume = 100;
    /** Latest Discord voice state. */
    public voiceState: Partial<VoiceStateUpdate> = {};
    /** Player queue backed by a configurable queue store. */
    public readonly queue: Queue;
    /** Player audio filter state. */
    public readonly filters = new FilterManager();

    /** Creates a guild player. */
    constructor(node: Node, options: PlayerOptions) {
        super();
        this.node = node;
        this.guild = options.guild;
        this.voiceChannel = options.voiceChannel;
        this.textChannel = options.textChannel;
        this.queue = new Queue();
        this.on('TrackStartEvent', (data: TrackEventPayload) => {
            this.playing = true;
            this.node.manager.metrics.trackStart();
            this.emit('trackStart', data.track ?? this.queue.current, data);
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
        this.on('TrackExceptionEvent', (data: TrackEventPayload) => { this.node.manager.metrics.trackException(); this.emit('trackException', data); });
        this.on('TrackStuckEvent', (data: TrackEventPayload) => this.emit('trackStuck', data));
        this.on('playerUpdate', (data: unknown) => this.emit('update', data));
    }

    /** Starts playback of a supplied or queued track. */
    public async play(track?: string | Track, options?: Record<string, unknown>): Promise<void> {
        if (track) {
            const resolved = typeof track === 'string' ? ({ encoded: track } as Track) : track;
            validateTrack(resolved);
            await this.queue.add(resolved);
        }
        if (!this.queue.current && this.queue.length > 0) this.queue.current = await this.queue.shift() ?? null;
        if (!this.queue.current) return;
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { track: { encoded: this.queue.current.encoded }, filters: this.filters.get(), ...options } });
        this.playing = true;
        await this.persist();
        this.emit('start', this.queue.current);
    }

    /** Stops the current playback. */
    public async stop(): Promise<void> {
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { track: { encoded: null } } });
        this.playing = false;
        await this.persist();
        this.emit('stop');
    }

    /** Skips the current track and advances the queue. */
    public async skip(): Promise<void> {
        this.emit('trackSkip', this.queue.current);
        if (this.queue.current) this.queue.previous.unshift(this.queue.current);
        this.queue.current = null;
        if (this.queue.length > 0) await this.play(); else await this.stop();
    }

    /** Pauses or resumes playback. */
    public async pause(pause: boolean): Promise<void> {
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { paused: pause } });
        this.paused = pause;
        await this.persist();
        this.emit('pause', pause);
    }

    /** Sets Lavalink volume. */
    public async setVolume(volume: number): Promise<void> {
        if (!Number.isFinite(volume) || volume < 0 || volume > 1000) throw new RangeError('Volume must be between 0 and 1000.');
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { volume } });
        this.volume = volume;
        await this.persist();
        this.emit('volume', volume);
    }

    /** Replaces all player filters and applies them to Lavalink. */
    public async setFilters(filters: import('./Types').Filters): Promise<void> {
        const value = this.filters.set(filters);
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { filters: value } });
        await this.persist();
        this.emit('filters', value);
    }

    /** Creates a serializable recovery snapshot. */
    public snapshot(): PlayerSnapshot {
        const current = this.queue.current;
        return { guildId: this.guild, voiceChannel: this.voiceChannel, textChannel: this.textChannel, current, queue: this.queue.toArray() as Track[], position: current?.info.position ?? 0, paused: this.paused, volume: this.volume, filters: this.filters.get() };
    }

    /** Persists the current recovery state. */
    private async persist(): Promise<void> { await this.node.manager.persistence.save(this.guild, this.snapshot()); }

    /** Requests a Discord voice connection through the configured connector. */
    public connect(options?: { voiceChannel?: string; selfMute?: boolean; selfDeaf?: boolean }): void {
        this.voiceChannel = options?.voiceChannel ?? this.voiceChannel;
        this.node.manager.options.connector.sendPacket(0, { op: 4, d: { guild_id: this.guild, channel_id: this.voiceChannel, self_mute: options?.selfMute ?? false, self_deaf: options?.selfDeaf ?? false } }, false);
    }
}
