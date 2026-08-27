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
        this.name = 'RestError';
        this.timestamp = data.timestamp;
        this.status = data.status;
        this.error = data.error;
        this.path = data.path;
        this.trace = data.trace;
    }
}

/** Version-aware wrapper around the Lavalink REST API. */
export class Rest {
    protected readonly node: Node;
    protected readonly auth: string;

    constructor(node: Node) {
        this.node = node;
        this.auth = node.options.password || 'youshallnotpass';
    }

    /** The URL is resolved lazily so `lavalinkVersion: 'auto'` works correctly. */
    protected get url(): string {
        return this.node.restUrl;
    }

    protected get sessionId(): string {
        if (!this.node.sessionId) throw new Error('Lavalink session is not ready. Connect the node first.');
        return this.node.sessionId;
    }

    public resolve(identifier: string): Promise<LavalinkResponse | undefined> {
        return this.fetch({ endpoint: '/loadtracks', options: { params: { identifier } } });
    }

    public async search(identifier: string): Promise<SearchResponse> {
        const res = await this.resolve(identifier);
        if (!res) throw new Error('Search returned no response');
        return res;
    }

    public decode(track: string): Promise<Track | undefined> {
        return this.fetch({ endpoint: '/decodetrack', options: { params: { track } } });
    }

    public async getPlayers(): Promise<LavalinkPlayer[]> {
        return (await this.fetch<LavalinkPlayer[]>({
            endpoint: `/sessions/${this.sessionId}/players`,
            options: {},
        })) ?? [];
    }

    public getPlayer(guildId: string): Promise<LavalinkPlayer | undefined> {
        return this.fetch({
            endpoint: `/sessions/${this.sessionId}/players/${guildId}`,
            options: {},
        });
    }

    public updatePlayer(data: UpdatePlayerInfo): Promise<LavalinkPlayer | undefined> {
        return this.fetch<LavalinkPlayer>({
            endpoint: `/sessions/${this.sessionId}/players/${data.guildId}`,
            options: {
                method: 'PATCH',
                params: { noReplace: data.noReplace?.toString() ?? 'false' },
                headers: { 'Content-Type': 'application/json' },
                body: data.playerOptions,
            },
        });
    }

    public async destroyPlayer(guildId: string): Promise<void> {
        await this.fetch({
            endpoint: `/sessions/${this.sessionId}/players/${guildId}`,
            options: { method: 'DELETE' },
        });
    }

    public updateSession(resuming?: boolean, timeout?: number): Promise<SessionInfo | undefined> {
        return this.fetch({
            endpoint: `/sessions/${this.sessionId}`,
            options: {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: { resuming, timeout },
            },
        });
    }

    public stats(): Promise<Stats | undefined> {
        return this.fetch({ endpoint: '/stats', options: {} });
    }

    public getRoutePlannerStatus(): Promise<RoutePlanner | undefined> {
        return this.fetch({ endpoint: '/routeplanner/status', options: {} });
    }

    public async unmarkFailedAddress(address: string): Promise<void> {
        await this.fetch({
            endpoint: '/routeplanner/free/address',
            options: {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { address },
            },
        });
    }

    public getLavalinkInfo(): Promise<NodeInfo | undefined> {
        return this.fetch({ endpoint: '/info', options: {} });
    }

    protected async fetch<T = unknown>(fetchOptions: FetchOptions): Promise<T | undefined> {
        const { endpoint, options } = fetchOptions;
        const headers: Record<string, string> = {
            Authorization: this.auth,
            'User-Agent': this.node.manager.options.userAgent || 'Rythra',
            ...options.headers,
        };

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

        if (!['GET', 'HEAD'].includes(method) && options.body !== undefined) {
            finalFetchOptions.body = JSON.stringify(options.body);
        }

        try {
            const request = await fetch(url.toString(), finalFetchOptions);

            if (!request.ok) {
                const response = (await request.json().catch(() => null)) as LavalinkRestError | null;
                throw new RestError(response ?? {
                    timestamp: Date.now(),
                    status: request.status,
                    error: 'Unknown Error',
                    message: 'Unexpected error response from Lavalink server',
                    path: endpoint,
                });
            }

            if (request.status === 204) return;

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
