import { EventEmitter } from 'node:events';
import { Node } from './Node';
import { RythraPlayer } from './Player';
import type {
    RythraOptions,
    NodeOptions,
    PlayerOptions,
    SearchPlatform,
    SearchResponse,
    IRythra,
    VoiceStateUpdate,
    VoiceServerUpdate,
} from './Types';

export class Rythra extends EventEmitter implements IRythra {
    public readonly nodes: Map<string, Node> = new Map();
    public readonly players: Map<string, RythraPlayer> = new Map();
    public readonly options: RythraOptions;
    public readonly version: string;

    constructor(options: RythraOptions) {
        super();
        this.options = options;
        this.version = options.version || '0.0.2';
        this.options.connector.setManager(this);
        this.options.connector.listen();

        for (const node of options.nodes ?? []) this.createNode(node);
    }

    public createNode(options: NodeOptions): Node {
        const node = new Node(this, options);
        this.nodes.set(options.identifier || options.host, node);
        node.on('error', (err) => this.emit('nodeError', node, err));
        node.on('version', (version, serverVersion) => this.emit('nodeVersion', node, version, serverVersion));
        node.on('ready', (data) => this.emit('nodeReady', node, data));
        node.on('disconnect', () => this.emit('nodeDisconnect', node));
        node.on('reconnectFailed', () => this.emit('nodeReconnectFailed', node));
        this.emit('nodeCreate', node);
        return node;
    }

    /** Returns the healthiest currently connected node with the lowest player load. */
    public getBestNode(): Node | undefined {
        const nodes = Array.from(this.nodes.values());
        if (!nodes.length) return undefined;

        const connected = nodes.filter((node) => node.connected);
        const candidates = connected.length ? connected : nodes;

        return candidates.reduce((best, node) => {
            if (!best) return node;
            if (node.stats.players < best.stats.players) return node;
            if (node.stats.players === best.stats.players && node.stats.playingPlayers < best.stats.playingPlayers) return node;
            return best;
        }, undefined as Node | undefined);
    }

    public createPlayer(options: PlayerOptions): RythraPlayer {
        const existing = this.players.get(options.guild);
        if (existing) return existing;

        const node = this.getBestNode();
        if (!node) throw new Error('No nodes available.');

        const player = new RythraPlayer(node, options);
        this.players.set(options.guild, player);
        this.emit('playerCreate', player);
        return player;
    }

    public destroyPlayer(guild: string): void {
        const player = this.players.get(guild);
        if (player) {
            player.stop();
            this.players.delete(guild);
            this.emit('playerDestroy', player);
        }
    }

    public async search(query: string, _requester: unknown, source?: SearchPlatform): Promise<SearchResponse> {
        const node = this.getBestNode();
        if (!node) throw new Error('No nodes available.');

        const sources: Record<string, string> = {
            youtube: 'ytsearch',
            'youtube music': 'ytmsearch',
            soundcloud: 'scsearch',
            deezer: 'dzsearch',
            spotify: 'spsearch',
            yandex: 'ymsearch',
        };

        let identifier = query;
        const isUrl = /^https?:\/\//.test(query);
        if (!isUrl && !Object.values(sources).some((s) => query.startsWith(`${s}:`))) {
            const platform = (source || this.options.defaultSearchPlatform || 'youtube') as string;
            identifier = `${sources[platform] || platform}:${query}`;
        }

        return node.rest.search(identifier);
    }

    public voiceStateUpdate(data: VoiceStateUpdate): void {
        if (!data.guild_id) return;
        const player = this.players.get(data.guild_id);
        if (player) player.voiceState = { ...player.voiceState, ...data };
    }

    public async voiceServerUpdate(data: VoiceServerUpdate): Promise<void> {
        const player = this.players.get(data.guild_id);
        if (!player) return;

        if (!player.voiceState.session_id || !player.voiceState.channel_id) {
            throw new Error(`Missing Discord voice state for guild ${data.guild_id}`);
        }

        await player.node.rest.updatePlayer({
            guildId: data.guild_id,
            playerOptions: {
                voice: {
                    token: data.token,
                    endpoint: data.endpoint,
                    sessionId: player.voiceState.session_id,
                    channelId: player.voiceState.channel_id,
                },
            },
        });
    }

    public async connect(): Promise<void> {
        await Promise.all(Array.from(this.nodes.values(), (node) => node.connect()));
    }
}
