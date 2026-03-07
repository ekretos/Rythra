import { Connector } from "./Connector";
import type { Node } from "./Node";

/**
 * Configuration options for the Rythra manager.
 */
export interface RythraOptions {
    /** The connector to use for Discord library integration. */
    connector: Connector;
    /** The library version. */
    version?: string;
    /** The array of Lavalink nodes to connect to. */
    nodes?: NodeOptions[];
    /** The bot's client ID. */
    clientId?: string;
    /** Custom value for the `Client-Name` header sent to Lavalink. */
    clientName?: string;
    /** The number of shards the bot is using. */
    shards?: number;
    /** Whether players should automatically play the next song in the queue. */
    autoPlay?: boolean;
    /** An array of track properties to keep in the track object. */
    trackPartial?: string[];
    /** The default search platform to use (e.g., 'youtube', 'soundcloud'). */
    defaultSearchPlatform?: SearchPlatform;
    /** Custom User-Agent header for REST requests. */
    userAgent?: string;
    /** Timeout for REST requests in seconds. */
    restTimeout?: number;
}

export type LavalinkSearchPlatform = "ytsearch" | "ytmsearch" | "scsearch" | "spsearch" | "sprec" | "amsearch" | "dzsearch" | "dzisrc" | "ymsearch" | "speak" | "tts";
export type RythraSearchPlatform = "youtube" | "youtube music" | "soundcloud" | "ytm" | "yt" | "sc" | "am" | "sp" | "sprec" | "spsuggestion" | "ds" | "dz" | "deezer" | "yandex" | "yandexmusic";
export type SearchPlatform = LavalinkSearchPlatform | RythraSearchPlatform;

export type LoadType = "track" | "playlist" | "search" | "empty" | "error";

export interface TrackInfo {
    identifier: string;
    isSeekable: boolean;
    author: string;
    length: number;
    isStream: boolean;
    position: number;
    title: string;
    uri?: string;
    artworkUrl?: string;
    isrc?: string;
    sourceName: string;
}

export interface Track {
    encoded: string;
    info: TrackInfo;
    pluginInfo: any;
    userData: any;
}

export interface SearchResponse {
    loadType: LoadType;
    data: any;
}

export type leastUsedNodeSortType = "memory" | "calls" | "players";
export type leastLoadNodeSortType = "cpu" | "memory";

export interface Payload {
    /** The OP code */
    op: number;
    d: {
        guild_id: string;
        channel_id: string | null;
        self_mute: boolean;
        self_deaf: boolean;
    };
}

export interface NodeOptions {
    /** The host of the node. */
    host: string;
    /** The port of the node. */
    port?: number;
    /** The password of the node. */
    password?: string;
    /** Whether to use secure connection. */
    secure?: boolean;
    /** Whether to reject unauthorized certificates. */
    rejectUnauthorized?: boolean;
    /** The identifier of the node. */
    identifier?: string;
    /** The retry interval for reconnection. */
    retryInterval?: number;
    /** The retry limit for reconnection. */
    retryAmount?: number;
}

export interface PlayerOptions {
    /** The guild ID. */
    guild: string;
    /** The voice channel ID. */
    voiceChannel: string;
    /** The text channel ID. */
    textChannel: string;
    /** Whether to play the track automatically. */
    selfMute?: boolean;
    /** Whether to play the track automatically. */
    selfDeaf?: boolean;
}

export interface IRythra {
    /**
   * Emitted when a Node is created.
   * @event Manager#nodeCreate
   */
    on(event: "nodeCreate", listener: (node: Node) => void): this;
}

export enum Versions {
    REST_VERSION = 4
}

export interface LavalinkResponse {
    loadType: LoadType;
    data: any;
}

export interface LavalinkPlayer {
    guildId: string;
    track: Track | null;
    volume: number;
    paused: boolean;
    voice: {
        token: string;
        endpoint: string;
        sessionId: string;
    };
    filters: any;
}

export interface UpdatePlayerInfo {
    guildId: string;
    noReplace?: boolean;
    playerOptions: {
        track?: {
            encoded?: string | null;
            identifier?: string;
            userData?: any;
        };
        position?: number;
        volume?: number;
        paused?: boolean;
        filters?: any;
        voice?: {
            token: string;
            endpoint: string;
            sessionId: string;
            channelId?: string;
        };
    };
}

export interface SessionInfo {
    resuming: boolean;
    timeout: number;
}

export interface Stats {
    players: number;
    playingPlayers: number;
    uptime: number;
    memory: {
        free: number;
        used: number;
        allocated: number;
        reservable: number;
    };
    cpu: {
        cores: number;
        systemLoad: number;
        lavalinkLoad: number;
    };
    frameStats?: {
        sent: number;
        nulled: number;
        deficit: number;
    };
}

export interface RoutePlanner {
    class: string | null;
    details: any | null;
}

export interface NodeInfo {
    version: {
        semver: string;
        major: number;
        minor: number;
        patch: number;
        preRelease: string | null;
        build: string | null;
    };
    buildTime: number;
    git: {
        branch: string;
        commit: string;
        commitTime: number;
    };
    jvm: string;
    lavaplayer: string;
    sourceManagers: string[];
    filters: string[];
    plugins: any[];
}

export interface FetchOptions {
    endpoint: string;
    options: {
        method?: string;
        params?: Record<string, string>;
        headers?: Record<string, string>;
        body?: any;
    };
}

export interface FinalFetchOptions {
    method: string;
    headers: Record<string, string>;
    signal: AbortSignal;
    body?: string;
}

export interface LavalinkRestError {
    timestamp: number;
    status: number;
    error: string;
    message: string;
    path: string;
    trace?: string;
}
