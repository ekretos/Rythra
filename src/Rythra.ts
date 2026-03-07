import { EventEmitter } from "node:events";
import { Node } from "./Node";
import { RythraPlayer } from "./Player";
import type {
    RythraOptions,
    NodeOptions,
    PlayerOptions,
    SearchPlatform,
    SearchResponse,
    IRythra
} from "./Types";

/**
 * The main manager class for nodes and players.
 * @extends EventEmitter
 * @implements IRythra
 */
export class Rythra extends EventEmitter implements IRythra {
    /**
     * A map of nodes currently managed by this instance.
     * The key is the node identifier or host.
     */
    public readonly nodes: Map<string, Node> = new Map();

    /**
     * A map of players currently managed by this instance.
     * The key is the guild ID.
     */
    public readonly players: Map<string, RythraPlayer> = new Map();

    /**
     * The options used to initialize this instance.
     */
    public readonly options: RythraOptions;

    /**
     * The version of the Rythra library.
     */
    public readonly version: string;

    /**
     * Creates a new Rythra instance.
     * @param options The options for the Rythra manager.
     */
    constructor(options: RythraOptions) {
        super();
        this.options = options;
        this.version = options.version || "0.0.1";
        this.options.connector.setManager(this);
        this.options.connector.listen();

        if (this.options.nodes) {
            for (const node of this.options.nodes) {
                this.createNode(node);
            }
        }
    }

    /**
     * Creates a new node and adds it to the manager.
     * @param options The options for the new node.
     * @returns The newly created node.
     */
    public createNode(options: NodeOptions): Node {
        const node = new Node(this, options);
        this.nodes.set(options.identifier || options.host, node);
        node.on("error", (err) => this.emit("nodeError", node, err));
        this.emit("nodeCreate", node);
        return node;
    }

    /**
     * Gets or creates a player for a specific guild.
     * @param options The options for the player.
     * @returns The existing or newly created player.
     * @throws Error if no nodes are available.
     */
    public createPlayer(options: PlayerOptions): RythraPlayer {
        const existing = this.players.get(options.guild);
        if (existing) return existing;

        const node = Array.from(this.nodes.values())[0]; // Simple selection for now
        if (!node) throw new Error("No nodes available.");

        const player = new RythraPlayer(node, options);
        this.players.set(options.guild, player);
        this.emit("playerCreate", player);
        return player;
    }

    /**
     * Destroys a player and stops its playback.
     * @param guild The guild ID of the player to destroy.
     */
    public destroyPlayer(guild: string): void {
        const player = this.players.get(guild);
        if (player) {
            player.stop();
            this.players.delete(guild);
        }
    }

    /**
     * Searches for tracks using the Lavalink REST API.
     * @param query The search query or track identifier.
     * @param requester The ID of the user who requested the search.
     * @param source The search platform to use (e.g., 'youtube', 'soundcloud').
     * @returns A promise that resolves to the search response.
     * @throws Error if no nodes are available.
     */
    public async search(query: string, requester: any, source?: SearchPlatform): Promise<SearchResponse> {
        const node = Array.from(this.nodes.values())[0];
        if (!node) throw new Error("No nodes available.");

        const sources: Record<string, string> = {
            youtube: "ytsearch",
            "youtube music": "ytmsearch",
            soundcloud: "scsearch",
            deezer: "dzsearch",
            spotify: "spsearch",
            yandex: "ymsearch",
        };

        let identifier = query;
        const isUrl = /^https?:\/\//.test(query);

        if (!isUrl && !Object.values(sources).some(s => query.startsWith(`${s}:`))) {
            const platform = (source || this.options.defaultSearchPlatform || "youtube") as string;
            identifier = `${sources[platform] || platform}:${query}`;
        }

        return await node.rest.search(identifier);
    }

    /**
     * Handles voice state updates from the Discord gateway.
     * @param data The voice state update data.
     */
    public voiceStateUpdate(data: any): void {
        if (!data.guild_id) return;
        const player = this.players.get(data.guild_id);
        if (player) {
            player.voiceState = { ...player.voiceState, ...data };
        }
    }

    /**
     * Handles voice server updates from the Discord gateway.
     * @param data The voice server update data.
     */
    public async voiceServerUpdate(data: any): Promise<void> {
        const player = this.players.get(data.guild_id);
        if (player) {
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
    }

    /**
     * Connects to all configured Lavalink nodes.
     */
    public connect(): void {
        // Connect to all nodes
        for (const node of this.nodes.values()) {
            node.connect();
        }
    }
}