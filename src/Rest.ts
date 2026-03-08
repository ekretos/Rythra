import type { Node } from './Node';
import type {
    SearchResponse,
    LavalinkPlayer,
    Track,
    UpdatePlayerInfo,
    SessionInfo,
    Stats,
    RoutePlanner,
    NodeInfo,
    FetchOptions,
    FinalFetchOptions,
    LavalinkRestError,
    LavalinkResponse,
} from './Types';

export class RestError extends Error {
    public readonly timestamp: number;
    public readonly status: number;
    public readonly error: string;
    public readonly path: string;
    public readonly trace?: string;

    constructor(data: LavalinkRestError) {
        super(data.message);
        this.timestamp = data.timestamp;
        this.status = data.status;
        this.error = data.error;
        this.path = data.path;
        this.trace = data.trace;
    }
}

/**
 * Wrapper around Lavalink REST API
 */
/**
 * A wrapper around the Lavalink REST API.
 */
export class Rest {
    /** The node this REST client is associated with. */
    protected readonly node: Node;
    /** The base URL for the Lavalink REST API. */
    protected readonly url: string;
    /** The authorization header value. */
    protected readonly auth: string;

    /**
     * Creates a new Rest instance.
     * @param node The node this REST client will use.
     */
    constructor(node: Node) {
        this.node = node;
        this.url = node.restUrl;
        this.auth = node.options.password || 'youshallnotpass';
    }

    /**
     * Gets the current session ID from the node.
     * @throws Error if no session ID is available.
     */
    protected get sessionId(): string {
        return this.node.sessionId!;
    }

    /**
     * Resolves a track identifier or search query.
     * @param identifier The identifier or query to resolve.
     * @returns A promise that resolves to the Lavalink response.
     */
    public resolve(identifier: string): Promise<LavalinkResponse | undefined> {
        const options = {
            endpoint: '/loadtracks',
            options: { params: { identifier } },
        };
        return this.fetch(options);
    }

    /**
     * Searches for tracks using the given identifier.
     * @param identifier The search query (e.g., 'ytsearch:song name').
     * @returns A promise that resolves to the search response.
     * @throws Error if the search returns no response.
     */
    public async search(identifier: string): Promise<SearchResponse> {
        const res = await this.resolve(identifier);
        if (!res) throw new Error('Search returned no response');
        return res;
    }

    /**
     * Decodes a base64 encoded track string into a Track object.
     * @param track The encoded track string.
     * @returns A promise that resolves to the Track object.
     */
    public decode(track: string): Promise<Track | undefined> {
        const options = {
            endpoint: '/decodetrack',
            options: { params: { track } },
        };
        return this.fetch<Track>(options);
    }

    /**
     * Retrieves a list of all players on the current session.
     * @returns A promise that resolves to an array of Lavalink players.
     */
    public async getPlayers(): Promise<LavalinkPlayer[]> {
        const options = {
            endpoint: `/sessions/${this.sessionId}/players`,
            options: {},
        };
        return (await this.fetch<LavalinkPlayer[]>(options)) ?? [];
    }

    /**
     * Retrieves the state of a specific player.
     * @param guildId The guild ID of the player.
     * @returns A promise that resolves to the Lavalink player state.
     */
    public getPlayer(guildId: string): Promise<LavalinkPlayer | undefined> {
        const options = {
            endpoint: `/sessions/${this.sessionId}/players/${guildId}`,
            options: {},
        };
        return this.fetch(options);
    }

    /**
     * Updates the state of a player (e.g., play, stop, pause, volume, voice).
     * @param data The player update information.
     * @returns A promise that resolves to the updated Lavalink player state.
     */
    public updatePlayer(data: UpdatePlayerInfo): Promise<LavalinkPlayer | undefined> {
        const options = {
            endpoint: `/sessions/${this.sessionId}/players/${data.guildId}`,
            options: {
                method: 'PATCH',
                params: { noReplace: data.noReplace?.toString() ?? 'false' },
                headers: { 'Content-Type': 'application/json' },
                body: data.playerOptions as Record<string, unknown>,
            },
        };
        return this.fetch<LavalinkPlayer>(options);
    }

    public async destroyPlayer(guildId: string): Promise<void> {
        const options = {
            endpoint: `/sessions/${this.sessionId}/players/${guildId}`,
            options: { method: 'DELETE' },
        };
        await this.fetch(options);
    }

    public updateSession(resuming?: boolean, timeout?: number): Promise<SessionInfo | undefined> {
        const options = {
            endpoint: `/sessions/${this.sessionId}`,
            options: {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: { resuming, timeout },
            },
        };
        return this.fetch(options);
    }

    public stats(): Promise<Stats | undefined> {
        const options = {
            endpoint: '/stats',
            options: {},
        };
        return this.fetch(options);
    }

    public getRoutePlannerStatus(): Promise<RoutePlanner | undefined> {
        const options = {
            endpoint: '/routeplanner/status',
            options: {},
        };
        return this.fetch(options);
    }

    public async unmarkFailedAddress(address: string): Promise<void> {
        const options = {
            endpoint: '/routeplanner/free/address',
            options: {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { address },
            },
        };
        await this.fetch(options);
    }

    public getLavalinkInfo(): Promise<NodeInfo | undefined> {
        const options = {
            endpoint: '/info',
            options: {
                headers: { 'Content-Type': 'application/json' },
            },
        };
        return this.fetch(options);
    }

    protected async fetch<T = unknown>(fetchOptions: FetchOptions) {
        const { endpoint, options } = fetchOptions;
        let headers: Record<string, string> = {
            Authorization: this.auth,
            'User-Agent': this.node.manager.options.userAgent || 'Rythra',
        };

        if (options.headers) headers = { ...headers, ...options.headers };

        const url = new URL(`${this.url}${endpoint}`);

        if (options.params) url.search = new URLSearchParams(options.params).toString();

        const abortController = new AbortController();
        const restTimeout = this.node.manager.options.restTimeout || 10;
        const timeout = setTimeout(() => abortController.abort(), restTimeout * 1000);

        const method = options.method?.toUpperCase() ?? 'GET';

        const finalFetchOptions: FinalFetchOptions = {
            method,
            headers,
            signal: abortController.signal,
        };

        if (!['GET', 'HEAD'].includes(method) && options.body) finalFetchOptions.body = JSON.stringify(options.body);

        try {
            const request = await fetch(url.toString(), finalFetchOptions);

            if (!request.ok) {
                const response = (await request.json().catch(() => null)) as LavalinkRestError | null;
                throw new RestError(
                    response ?? {
                        timestamp: Date.now(),
                        status: request.status,
                        error: 'Unknown Error',
                        message: 'Unexpected error response from Lavalink server',
                        path: endpoint,
                    }
                );
            }
            try {
                return (await request.json()) as T;
            } catch {
                return;
            }
        } finally {
            clearTimeout(timeout);
        }
    }
}
