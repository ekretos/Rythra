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

type IntegrationTrack = Track & Record<string, any>;
type LoopMode = 'none' | 'track' | 'queue';

export class RythraPlayer extends EventEmitter {
    public readonly node: Node;
    public readonly guild: string;
    public voiceChannel: string;
    public textChannel: string;
    public playing = false;
    public paused = false;
    public volume = 100;
    public loop: LoopMode = 'none';
    public voiceState: Partial<VoiceStateUpdate> = {};
    public readonly data = new Map<string, unknown>();
    public readonly queue: Queue = new Queue();

    public get guildId(): string { return this.guild; }
    public get voiceId(): string { return this.voiceChannel; }
    public get textId(): string { return this.textChannel; }

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
            const current = this.queue.current;
            const endedEncoded = data.encodedTrack ?? data.track?.encoded;
            if (current && (!endedEncoded || endedEncoded === current.encoded)) {
                this.queue.previous.unshift(current);
                this.queue.current = null;
                if (this.loop === 'track') this.queue.unshift(current);
                else if (this.loop === 'queue') this.queue.add(current);
            }
            const reason = data.reason?.toLowerCase();
            if (reason !== 'replaced' && reason !== 'stopped' && this.node.manager.options.autoPlay && this.queue.length > 0) await this.play();
            this.emit('trackEnd', data);
        });
        this.on('TrackExceptionEvent', (data: TrackEventPayload) => this.emit('trackException', data));
        this.on('TrackStuckEvent', (data: TrackEventPayload) => this.emit('trackStuck', data));
        this.on('playerUpdate', (data: unknown) => this.emit('update', data));
    }

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

    public async search(query: string, options: { requester?: unknown; source?: string } = {}): Promise<any> {
        const source = options.source ? String(options.source).replace(/:$/, '') : undefined;
        const response = await this.node.manager.search(query, options.requester, source as any);
        if (response.loadType === 'error') throw new Error(response.data.message || 'Lavalink search failed.');
        if (response.loadType === 'empty') return { type: 'EMPTY', tracks: [] };
        if (response.loadType === 'playlist') return { type: 'PLAYLIST', playlistName: response.data.info?.name, tracks: (response.data.tracks || []).map((track: Track) => this.decorateTrack(track, options.requester)) };
        const tracks = response.loadType === 'track' ? [response.data] : (response.data.tracks || []);
        return { type: 'SEARCH', tracks: tracks.map((track: Track) => this.decorateTrack(track, options.requester)) };
    }

    public async play(track?: string | Track, options?: Record<string, unknown>): Promise<void> {
        if (track) this.queue.add(typeof track === 'string' ? ({ encoded: track } as Track) : this.decorateTrack(track));
        if (!this.queue.current && this.queue.length > 0) this.queue.current = this.queue.shift() ?? null;
        if (!this.queue.current) return;
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { track: { encoded: this.queue.current.encoded }, ...options } });
        this.playing = true;
        this.emit('start', this.queue.current);
    }

    public async stop(): Promise<void> {
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { track: { encoded: null } } });
        this.playing = false;
        this.emit('stop');
    }

    public async destroy(): Promise<void> { await this.node.manager.destroyPlayer(this.guild); }

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
        if (!Number.isFinite(volume) || volume < 0 || volume > 1000) throw new RangeError('Volume must be between 0 and 1000.');
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { volume } });
        this.volume = volume;
        this.emit('volume', volume);
    }

    public async setLoop(mode: LoopMode): Promise<void> {
        if (!['none', 'track', 'queue'].includes(mode)) throw new RangeError('Loop mode must be none, track, or queue.');
        this.loop = mode;
        this.emit('loop', mode);
    }

    public async seek(position: number): Promise<void> {
        if (!Number.isFinite(position) || position < 0) throw new RangeError('Position must be a non-negative number.');
        await this.node.rest.updatePlayer({ guildId: this.guild, playerOptions: { position } });
        this.emit('seek', position);
    }

    public connect(options?: { voiceChannel?: string; selfMute?: boolean; selfDeaf?: boolean }): void {
        this.voiceChannel = options?.voiceChannel ?? this.voiceChannel;
        this.node.manager.options.connector.sendPacket(0, { op: 4, d: { guild_id: this.guild, channel_id: this.voiceChannel, self_mute: options?.selfMute ?? false, self_deaf: options?.selfDeaf ?? false } }, false);
    }
}
