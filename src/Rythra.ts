import { EventEmitter } from 'node:events';
import { Node } from './Node';
import { RythraPlayer } from './Player';
import { Health, type HealthSnapshot } from './health/Health';
import { ConfigurationError } from './errors/RythraError';
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
 * @remarks
 * The manager is intentionally framework-agnostic. Discord-specific gateway
 * operations are delegated to the configured connector while Lavalink state
 * remains owned by Rythra.
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
    /** Timestamp at which this manager was created. */
    public readonly startedAt = Date.now();
    /** Number of reconnect attempts observed across managed nodes. */
    public reconnects = 0;
    /** Number of player migrations performed by this manager. */
    public migrations = 0;
    /** Local health collector for operational integrations. */
    public readonly healthMonitor: Health;
    /** Whether the manager has begun shutting down. */
    public shuttingDown = false;

    /**
     * Creates a new Rythra manager.
     *
     * @param options Manager, connector and Lavalink node configuration.
     * @throws {ConfigurationError} If the connector or node configuration is invalid.
     */
    constructor(options: RythraOptions) {
        super();
        this.validateOptions(options);
        this.options = options;
        this.version = options.version || '0.0.2';
        this.options.connector.setManager(this);
        this.options.connector.listen();
        this.healthMonitor = new Health(this);

        for (const node of options.nodes ?? []) this.createNode(node);
    }

    /**
     * Validates manager configuration before any network resources are created.
     *
     * @param options Configuration to validate.
     * @throws {ConfigurationError} When required options are missing or malformed.
     */
    private validateOptions(options: RythraOptions): void {
        if (!options || typeof options !== 'object') throw new ConfigurationError('Rythra options are required.');
        if (!options.connector || typeof options.connector.listen !== 'function') {
            throw new ConfigurationError('A valid connector instance is required.');
        }

        for (const node of options.nodes ?? []) {
            if (!node.host?.trim()) throw new ConfigurationError('Every Lavalink node requires a host.');
            if (node.port !== undefined && (!Number.isInteger(node.port) || node.port < 1 || node.port > 65535)) {
                throw new ConfigurationError(`Invalid Lavalink port: ${node.port}`);
            }
            if (node.retryAmount !== undefined && (!Number.isInteger(node.retryAmount) || node.retryAmount < 0)) {
                throw new ConfigurationError(`Invalid retryAmount: ${node.retryAmount}`);
            }
            if (node.retryInterval !== undefined && (!Number.isFinite(node.retryInterval) || node.retryInterval < 0)) {
                throw new ConfigurationError(`Invalid retryInterval: ${node.retryInterval}`);
            }
            if (node.lavalinkVersion !== undefined && node.lavalinkVersion !== 'auto' && node.lavalinkVersion !== 4 && node.lavalinkVersion !== 5) {
                throw new ConfigurationError(`Unsupported Lavalink API version: ${String(node.lavalinkVersion)}`);
            }
        }
    }

    /**
     * Creates and registers a Lavalink node.
     *
     * @param options Configuration for the new node.
     * @returns The newly created node.
     * @throws {ConfigurationError} If the node configuration is invalid.
     */
    public createNode(options: NodeOptions): Node {
        this.validateOptions({ ...this.options, nodes: [options] });
        const node = new Node(this, options);
        const identifier = options.identifier || `${options.host}:${options.port ?? 2333}`;
        if (this.nodes.has(identifier)) throw new ConfigurationError(`A node with identifier "${identifier}" already exists.`);

        this.nodes.set(identifier, node);
        node.on('error', (err) => this.emit('nodeError', node, err));
        node.on('version', (version, serverVersion) => this.emit('nodeVersion', node, version, serverVersion));
        node.on('ready', (data) => this.emit('nodeReady', node, data));
        node.on('disconnect', () => {
            this.reconnects++;
            this.emit('nodeDisconnect', node);
        });
        node.on('reconnectFailed', () => this.emit('nodeReconnectFailed', node));
        this.emit('nodeCreate', node);
        return node;
    }

    /**
     * Selects the healthiest available node using connection state and player load.
     *
     * @returns The preferred node, or `undefined` when no nodes exist.
     */
    public getBestNode(): Node | undefined {
        const nodes = Array.from(this.nodes.values()).filter((node) => !this.shuttingDown);
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
        if (!options.guild?.trim()) throw new ConfigurationError('Player guild ID is required.');
        if (!options.voiceChannel?.trim()) throw new ConfigurationError('Player voice channel ID is required.');

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
     * @returns A promise that resolves after the player has stopped.
     */
    public async destroyPlayer(guild: string): Promise<void> {
        const player = this.players.get(guild);
        if (!player) return;
        await player.stop();
        this.players.delete(guild);
        this.emit('playerDestroy', player);
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
        if (!query?.trim()) throw new ConfigurationError('Search query cannot be empty.');
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
            throw new ConfigurationError(`Missing Discord voice state for guild ${data.guild_id}`);
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
     * Returns the current local health snapshot without performing network I/O.
     *
     * @returns Operational health information suitable for a health endpoint.
     */
    public health(): HealthSnapshot {
        return this.healthMonitor.snapshot();
    }

    /**
     * Gracefully shuts down Rythra and all managed Lavalink nodes.
     *
     * @param timeout Maximum time in milliseconds to allow shutdown work to finish.
     * @returns A promise that resolves after resources have been released.
     */
    public async destroy(timeout = 10_000): Promise<void> {
        if (this.shuttingDown) return;
        this.shuttingDown = true;

        const shutdown = async (): Promise<void> => {
            await Promise.allSettled(Array.from(this.players.keys(), (guild) => this.destroyPlayer(guild)));
            for (const node of this.nodes.values()) node.disconnect();
            this.nodes.clear();
            this.emit('destroy');
            this.removeAllListeners();
        };

        await Promise.race([
            shutdown(),
            new Promise<void>((resolve) => setTimeout(resolve, Math.max(0, timeout))),
        ]);
    }

    /**
     * Connects all configured Lavalink nodes concurrently.
     *
     * @returns A promise that resolves after all connection attempts have completed.
     */
    public async connect(): Promise<void> {
        if (this.shuttingDown) throw new Error('Rythra is shutting down.');
        await Promise.all(Array.from(this.nodes.values(), (node) => node.connect()));
    }
}
