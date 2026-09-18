import type { Node } from './node/Node';
import type { SearchResponse, LavalinkPlayer, Track, UpdatePlayerInfo, SessionInfo, Stats, RoutePlanner, NodeInfo, FetchOptions, LavalinkResponse } from './Types';
import type { RestTransport } from './transport/Transport';
import { FetchRestTransport } from './transport/RestTransport';

/** Version-aware wrapper around the Lavalink REST API. */
export class Rest {
    /** Node that owns this REST client. */ protected readonly node: Node;
    /** Password used for Lavalink authorization. */ protected readonly auth: string;
    /** Transport used to perform the underlying HTTP requests. */ protected readonly transport: RestTransport;
    /** Creates a REST client for a Lavalink node. */
    constructor(node: Node, transport: RestTransport = new FetchRestTransport()) { this.node = node; this.auth = node.options.password || 'youshallnotpass'; this.transport = transport; }
    /** The version-aware base URL for REST requests. */ protected get url(): string { return this.node.restUrl; }
    /** Gets the active Lavalink session ID. */
    protected get sessionId(): string { if (!this.node.sessionId) throw new Error('Lavalink session is not ready. Connect the node first.'); return this.node.sessionId; }
    /** Resolves a Lavalink identifier or search query. */
    public resolve(identifier: string): Promise<LavalinkResponse | undefined> { return this.fetch({ endpoint: '/loadtracks', options: { params: { identifier } } }); }
    /** Searches Lavalink for tracks and normalizes legacy array-shaped search responses. */
    public async search(identifier: string): Promise<SearchResponse> {
        const res = await this.resolve(identifier);
        if (!res) throw new Error('Search returned no response');
        if (res.loadType === 'search' && Array.isArray(res.data)) {
            return { loadType: 'search', data: { tracks: res.data } } as SearchResponse;
        }
        return res;
    }
    /** Decodes an encoded Lavalink track. */
    public decode(track: string): Promise<Track | undefined> { return this.fetch({ endpoint: '/decodetrack', options: { params: { track } } }); }
    /** Gets every player belonging to the current Lavalink session. */
    public async getPlayers(): Promise<LavalinkPlayer[]> { return (await this.fetch<LavalinkPlayer[]>({ endpoint: `/sessions/${this.sessionId}/players`, options: {} })) ?? []; }
    /** Gets the Lavalink player for a guild. */
    public getPlayer(guildId: string): Promise<LavalinkPlayer | undefined> { return this.fetch({ endpoint: `/sessions/${this.sessionId}/players/${guildId}`, options: {} }); }
    /** Updates a Lavalink player. */
    public updatePlayer(data: UpdatePlayerInfo): Promise<LavalinkPlayer | undefined> { return this.fetch<LavalinkPlayer>({ endpoint: `/sessions/${this.sessionId}/players/${data.guildId}`, options: { method: 'PATCH', params: { noReplace: data.noReplace?.toString() ?? 'false' }, headers: { 'Content-Type': 'application/json' }, body: data.playerOptions } }); }
    /** Destroys a Lavalink player. */
    public async destroyPlayer(guildId: string): Promise<void> { await this.fetch({ endpoint: `/sessions/${this.sessionId}/players/${guildId}`, options: { method: 'DELETE' } }); }
    /** Updates Lavalink session resumption settings. */
    public updateSession(resuming?: boolean, timeout?: number): Promise<SessionInfo | undefined> { return this.fetch({ endpoint: `/sessions/${this.sessionId}`, options: { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: { resuming, timeout } } }); }
    /** Gets current Lavalink statistics. */
    public stats(): Promise<Stats | undefined> { return this.fetch({ endpoint: '/stats', options: {} }); }
    /** Gets the current route planner status. */
    public getRoutePlannerStatus(): Promise<RoutePlanner | undefined> { return this.fetch({ endpoint: '/routeplanner/status', options: {} }); }
    /** Releases a failed route-planner address. */
    public async unmarkFailedAddress(address: string): Promise<void> { await this.fetch({ endpoint: '/routeplanner/free/address', options: { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: { address } } }); }
    /** Gets information about the connected Lavalink server. */
    public getLavalinkInfo(): Promise<NodeInfo | undefined> { return this.fetch({ endpoint: '/info', options: {} }); }
    /** Executes an authenticated request against Lavalink. */
    protected fetch<T = unknown>(fetchOptions: FetchOptions): Promise<T | undefined> {
        const { endpoint, options } = fetchOptions;
        return this.transport.request<T>({
            url: `${this.url}${endpoint}`,
            method: options.method,
            params: options.params,
            headers: { Authorization: this.auth, 'User-Agent': this.node.manager.options.userAgent || 'Rythra', ...options.headers },
            body: options.body,
            timeout: (this.node.manager.options.restTimeout || 10) * 1000,
        });
    }
}
