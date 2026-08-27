import { EventEmitter } from 'node:events';
import { Node } from './Node';
import { Queue } from './Queue';
import type { PlayerOptions, Track, VoiceStateUpdate } from './Types';

/** Payload shared by Lavalink track lifecycle events. */
interface TrackEventPayload {
    track?: Track | null;
    encodedTrack?: string | null;
    reason?: string;
    exception?: unknown;
}

type IntegrationTrack = Track & Record<string, any>;

/**
 * Manages audio playback for a single Discord guild.
 *
 * @remarks
 * A player owns its queue and delegates playback state to its assigned
 * Lavalink node. Discord-specific gateway operations remain delegated to
 * the configured connector.
 */
export class RythraPlayer extends EventEmitter {
    /** The Lavalink node currently assigned to this player. */ public readonly node: Node;
    /** The Discord guild ID associated with the player. */ public readonly guild: string;
    /** The Discord voice channel ID currently used by the player. */ public voiceChannel: string;
    /** The Discord text channel ID associated with player interactions. */ public textChannel: string;
    /** Whether a track is currently considered active. */ public playing = false;
    /** Whether playback is currently paused. */ public paused = false;
    /** Current player volume, from 0 to 1000. */ public volume = 100;
    /** Latest Discord voice state received for this guild. */ public voiceState: Partial<VoiceStateUpdate> = {};
    /** Application metadata associated with this player. */ public readonly data = new Map<string, unknown>();
    /** Queue containing upcoming and previously played tracks. */ public readonly queue: Queue = new Queue();

    /** Stable aliases useful to integrations without introducing framework-specific dependencies. */
    public get guildId(): string { return this.guild; }
    public get voiceId(): string { return this.voiceChannel; }
    public get textId(): string { return this.textChannel; }

    /** Creates a guild player. */
    constructor(node: Node, options: PlayerOptions) {
        super();
        this.node = node;
        this.guild = options.guild;
        this.voiceChannel = options.voiceChannel;
        this.textChannel = options.textChannel;
        this.on('TrackStartEvent', (data: TrackEventPayload) => {
            this.playing = true;
            const track = data.track ? this.decorateTrack(data.track) : this.queue.current;
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

    /** Decorates native Lavalink metadata with convenient integration fields. */
    private decorateTrack(track: Track, requester?: unknown): IntegrationTrack {
        const value = track as IntegrationTrack;
        const info = track.info;
        value.title = info?.title;
        value.author = info?.author;
        value.length = info?.length;
        value.isStream = info?.isStream;
        value.position = info?.position;
        value.identifier = info?.identifier;
        value.sourceName = info?.sourceName;
        value.uri = info?.uri;
        value.thumbnail = info?.artworkUrl;
        value.raw = { info };
        if (requester !== undefined) value.requester = requester;
        return value;
    }

    /** Searches through the Lavalink node selected for this player. */
    public async search(query: string, options: { requester?: unknown; source?: string } = {}): Promise<any> {
        const source = options.source ? String(options.source).replace(/:$/, '') : undefined;
        const response = await this.node.manager.search(query, options.requester, source as any);
        if (response.loadType === 'error') throw new Error(response.data.message || 'Lavalink search failed.');
        if (response.loadType === 'empty') return { type: 'EMPTY', tracks: [] };
        if (response.loadType === 'playlist') {
            return {
                type: 'PLAYLIST',
                playlistName: response.data.info?.name,
                tracks: (response.data.tracks || []).map((track: Track) => this.decorateTrack(track, options.requester)),
            };
        }
        const tracks = response.loadType === 'track' ? [response.data] : (response.data.tracks || []);
        return { type: 'SEARCH', tracks: tracks.map((track: Track) => this.decorateTrack(track, options.requester)) };
    }

    /** Starts playback of a track or the next queued track. */
    public async play(track?: string | Track, options?: Record<string, unknown>): Promise<void> {
        if (track) {
            const value = typeof track === 'string' ? ({ encoded: track } as Track) : this.decorateTrack(track);
            this.queue.add(value);
        }
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

    /** Destroys this guild player through its manager. */
    public async destroy(): Promise<void> {
        await this.node.manager.destroyPlayer(this.guild);
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

    /** Seeks the current track to a position in milliseconds. */
    public async seek(position: number): Promise<void> {
        if (!Number.isFinite(position) || position < 0) throw new RangeError('Position must be a non-negative number.');
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { position } });
        this.emit('seek', position);
    }

    /** Requests a Discord voice connection through the configured connector. */
    public connect(options?: { voiceChannel?: string; selfMute?: boolean; selfDeaf?: boolean }): void {
        this.voiceChannel = options?.voiceChannel ?? this.voiceChannel;
        this.node.manager.options.connector.sendPacket(0, { op: 4, d: { guild_id: this.guild, channel_id: this.voiceChannel, self_mute: options?.selfMute ?? false, self_deaf: options?.selfDeaf ?? false } }, false);
    }
}
