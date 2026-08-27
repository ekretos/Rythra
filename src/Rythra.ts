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

/**
 * The main Rythra manager responsible for nodes, players and gateway events.
 *
 * @extends EventEmitter
 * @implements IRythra
 */
export class Rythra extends EventEmitter implements IRythra {
    /** All Lavalink nodes currently managed by this instance. */
    public readonly nodes: Map<string, Node> = new Map();
    /** All guild players currently managed by this instance. */
    public readonly players: Map<string, RythraPlayer> = new Map();
    /** Configuration used to initialize the manager. */
    public readonly options: RythraOptions;
    /** The version string reported as the Rythra client name. */
    public readonly version: string;

    /**
     * Creates a new Rythra manager.
     *
     * @param options Manager, connector and Lavalink node configuration.
     */
    constructor(options: RythraOptions) {
        super();
        this.options = options;
        this.version = options.version || '0.0.2';
        this.options.connector.setManager(this);
        this.options.connector.listen();

        for (const node of options.nodes ?? []) this.createNode(node);
    }

    /**
     * Creates and registers a Lavalink node.
     *
     * @param options Configuration for the new node.
     * @returns The newly created node.
     */
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

    /**
     * Selects the healthiest available node using player load as the primary metric.
     *
     * @returns The preferred node, or `undefined` when no nodes exist.
     */
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

    /**
     * Gets an existing guild player or creates one on the best available node.
     *
     * @param options Guild, voice and text channel configuration.
     * @returns The existing or newly created player.
     * @throws {Error} If no Lavalink nodes are configured.
     */
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

    /**
     * Destroys a guild player and removes it from the manager.
     *
     * @param guild The guild ID whose player should be destroyed.
     */
    public destroyPlayer(guild: string): void {
        const player = this.players.get(guild);
        if (player) {
            player.stop();
            this.players.delete(guild);
            this.emit('playerDestroy', player);
        }
    }

    /**
     * Searches Lavalink for a track, playlist or search result.
     *
     * @param query Search query or direct track identifier.
     * @param _requester Requester identifier retained for API compatibility.
     * @param source Optional search platform override.
     * @returns The Lavalink search response.
     * @throws {Error} If no Lavalink node is available.
     */
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

    /**
     * Updates the stored Discord voice state for a guild player.
     *
     * @param data Discord voice state update payload.
     */
    public voiceStateUpdate(data: VoiceStateUpdate): void {
        if (!data.guild_id) return;
        const player = this.players.get(data.guild_id);
        if (player) player.voiceState = { ...player.voiceState, ...data };
    }

    /**
     * Forwards a Discord voice server update to Lavalink.
     *
     * @param data Discord voice server update payload.
     * @returns A promise that resolves when the voice state has been sent to Lavalink.
     * @throws {Error} If the player's Discord voice session is incomplete.
     */
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

    /**
     * Connects all configured Lavalink nodes concurrently.
     *
     * @returns A promise that resolves after all connection attempts have started/completed.
     */
    public async connect(): Promise<void> {
        await Promise.all(Array.from(this.nodes.values(), (node) => node.connect()));
    }
}
