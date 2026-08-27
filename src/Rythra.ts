import { EventEmitter } from 'node:events';
import { Node } from './Node';
import { RythraPlayer } from './Player';
import { Metrics } from './Metrics';
import { MemoryPersistence, type PersistenceAdapter } from './Persistence';
import type { RythraPlugin } from './Plugin';
import { getDAVECapabilities, type DaveCapabilities } from './voice/DAVE';
import { validateNodeOptions, validatePlayerOptions } from './Validation';
import type { RythraOptions, NodeOptions, PlayerOptions, SearchPlatform, SearchResponse, IRythra, VoiceStateUpdate, VoiceServerUpdate } from './Types';

/** Main Rythra manager responsible for nodes, players, plugins and recovery. */
export class Rythra extends EventEmitter implements IRythra {
    /** All managed Lavalink nodes. */ public readonly nodes: Map<string, Node> = new Map();
    /** All managed guild players. */ public readonly players: Map<string, RythraPlayer> = new Map();
    /** Manager configuration. */ public readonly options: RythraOptions;
    /** Rythra client version. */ public readonly version: string;
    /** Runtime metrics collector. */ public readonly metrics: Metrics;
    /** Player persistence adapter. */ public readonly persistence: PersistenceAdapter;
    /** Installed plugins keyed by name. */ public readonly plugins: Map<string, RythraPlugin> = new Map();

    /** Creates a new Rythra manager. */
    constructor(options: RythraOptions) {
        super();
        this.options = options;
        this.version = options.version || '0.0.2';
        this.metrics = options.metrics ?? new Metrics();
        this.persistence = options.persistence ?? new MemoryPersistence();
        this.options.connector.setManager(this);
        this.options.connector.listen();
        for (const node of options.nodes ?? []) this.createNode(node);
        for (const plugin of options.plugins ?? []) void this.use(plugin);
    }

    /** Creates and registers a validated Lavalink node. */
    public createNode(options: NodeOptions): Node {
        validateNodeOptions(options);
        const node = new Node(this, options);
        this.nodes.set(options.identifier || options.host, node);
        node.on('error', (error) => this.emit('nodeError', node, error));
        node.on('version', (version, serverVersion) => this.emit('nodeVersion', node, version, serverVersion));
        node.on('ready', (data) => this.emit('nodeReady', node, data));
        node.on('disconnect', () => {
            this.emit('nodeDisconnect', node);
            for (const player of this.players.values()) if (player.node === node) {
                const destination = this.getBestNode();
                if (destination && destination !== node) void this.migratePlayer(player.guild, destination).catch((error) => this.emit('playerMigrationError', player, error));
            }
        });
        node.on('reconnectFailed', () => this.emit('nodeReconnectFailed', node));
        this.emit('nodeCreate', node);
        return node;
    }

    /** Selects a connected node with the lowest player load. */
    public getBestNode(): Node | undefined {
        const nodes = Array.from(this.nodes.values());
        if (!nodes.length) return undefined;
        const connected = nodes.filter((node) => node.connected);
        const candidates = connected.length ? connected : nodes;
        return candidates.reduce((best, node) => !best || node.stats.players < best.stats.players || (node.stats.players === best.stats.players && node.stats.playingPlayers < best.stats.playingPlayers) ? node : best, undefined as Node | undefined);
    }

    /** Creates or returns a guild player on the best available node. */
    public createPlayer(options: PlayerOptions): RythraPlayer {
        validatePlayerOptions(options);
        const existing = this.players.get(options.guild);
        if (existing) return existing;
        const node = this.getBestNode();
        if (!node) throw new Error('No nodes available.');
        const player = new RythraPlayer(node, options);
        this.players.set(options.guild, player);
        this.emit('playerCreate', player);
        return player;
    }

    /** Moves a player to another node and restores playback state. */
    public async migratePlayer(guild: string, target?: Node): Promise<RythraPlayer> {
        const player = this.players.get(guild);
        if (!player) throw new Error(`No player exists for guild ${guild}.`);
        const destination = target ?? this.getBestNode();
        if (!destination || destination === player.node) return player;
        const snapshot = player.snapshot();
        await this.persistence.save(guild, snapshot);
        player.node = destination;
        if (snapshot.current) await destination.rest.updatePlayer({ guildId: guild, playerOptions: { track: { encoded: snapshot.current.encoded }, position: snapshot.position, paused: snapshot.paused, volume: snapshot.volume, filters: snapshot.filters } });
        this.metrics.failover();
        this.emit('playerMigrate', player, destination);
        return player;
    }

    /** Destroys a guild player and removes its recovery state. */
    public async destroyPlayer(guild: string): Promise<void> {
        const player = this.players.get(guild);
        if (!player) return;
        await player.stop();
        this.players.delete(guild);
        await this.persistence.remove(guild);
        this.emit('playerDestroy', player);
    }

    /** Installs a plugin exactly once. */
    public async use(plugin: RythraPlugin): Promise<void> {
        if (!plugin.name.trim()) throw new TypeError('Plugin name is required.');
        if (this.plugins.has(plugin.name)) throw new Error(`Plugin already installed: ${plugin.name}`);
        await plugin.setup({ manager: this });
        this.plugins.set(plugin.name, plugin);
        this.emit('pluginInstall', plugin);
    }

    /** Removes an installed plugin and invokes its cleanup hook. */
    public async unuse(name: string): Promise<void> {
        const plugin = this.plugins.get(name);
        if (!plugin) return;
        await plugin.destroy?.({ manager: this });
        this.plugins.delete(name);
        this.emit('pluginUninstall', plugin);
    }

    /** Returns connector-side DAVE capability information. */
    public getDAVECapabilities(): DaveCapabilities { return getDAVECapabilities(this.options.connector); }
    /** Returns current runtime metrics. */
    public getMetrics() { return this.metrics.snapshot(this.nodes.size, this.players.size, Array.from(this.players.values()).filter((player) => player.playing).length); }

    /** Searches Lavalink for a track, playlist or search result. */
    public async search(query: string, _requester: unknown, source?: SearchPlatform): Promise<SearchResponse> {
        const node = this.getBestNode();
        if (!node) throw new Error('No nodes available.');
        const sources: Record<string, string> = { youtube: 'ytsearch', 'youtube music': 'ytmsearch', soundcloud: 'scsearch', deezer: 'dzsearch', spotify: 'spsearch', yandex: 'ymsearch' };
        let identifier = query;
        const isUrl = /^https?:\/\//.test(query);
        if (!isUrl && !Object.values(sources).some((value) => query.startsWith(`${value}:`))) {
            const platform = (source || this.options.defaultSearchPlatform || 'youtube') as string;
            identifier = `${sources[platform] || platform}:${query}`;
        }
        return node.rest.search(identifier);
    }

    /** Updates stored Discord voice state for a guild player. */
    public voiceStateUpdate(data: VoiceStateUpdate): void { if (!data.guild_id) return; const player = this.players.get(data.guild_id); if (player) player.voiceState = { ...player.voiceState, ...data }; }

    /** Forwards a Discord voice server update to Lavalink. */
    public async voiceServerUpdate(data: VoiceServerUpdate): Promise<void> {
        const player = this.players.get(data.guild_id);
        if (!player) return;
        if (!player.voiceState.session_id || !player.voiceState.channel_id) throw new Error(`Missing Discord voice state for guild ${data.guild_id}`);
        await player.node.rest.updatePlayer({ guildId: data.guild_id, playerOptions: { voice: { token: data.token, endpoint: data.endpoint, sessionId: player.voiceState.session_id, channelId: player.voiceState.channel_id } } });
    }

    /** Connects all configured Lavalink nodes concurrently. */
    public async connect(): Promise<void> { await Promise.all(Array.from(this.nodes.values(), (node) => node.connect())); }
}
