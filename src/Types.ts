/**
 * Public configuration and data types used throughout Rythra.
 *
 * @remarks
 * These interfaces intentionally describe the public API. Keep JSDoc on
 * exported types and properties so generated TypeDoc documentation remains useful.
 */
import { Connector } from './Connector';
import type { Node } from './Node';
import type { LavalinkApiVersionMode } from './protocol/LavalinkProtocol';

/** Configuration used to create a {@link Rythra} manager. */
export interface RythraOptions {
    /** Discord library connector used by the manager. */ connector: Connector;
    /** Rythra client version included in Lavalink identification headers. */ version?: string;
    /** Lavalink nodes to register during manager initialization. */ nodes?: NodeOptions[];
    /** Discord application/client ID sent to Lavalink. */ clientId?: string;
    /** Custom client name sent in the Lavalink `Client-Name` header. */ clientName?: string;
    /** Number of Discord shards used by the bot. */ shards?: number;
    /** Whether players should automatically advance to the next track. */ autoPlay?: boolean;
    /** Track properties that should be retained by integrations. */ trackPartial?: string[];
    /** Default platform used when a search source is not explicitly supplied. */ defaultSearchPlatform?: SearchPlatform;
    /** Custom User-Agent used for Lavalink REST requests. */ userAgent?: string;
    /** REST request timeout in seconds. */ restTimeout?: number;
    /** Default Lavalink API generation for nodes without an override. */ lavalinkVersion?: LavalinkApiVersionMode;
}

/** Search source identifiers understood directly by Lavalink. */
export type LavalinkSearchPlatform = 'ytsearch' | 'ytmsearch' | 'scsearch' | 'spsearch' | 'sprec' | 'amsearch' | 'dzsearch' | 'dzisrc' | 'ymsearch' | 'speak' | 'tts';
/** Friendly search source aliases exposed by Rythra. */
export type RythraSearchPlatform = 'youtube' | 'youtube music' | 'soundcloud' | 'ytm' | 'yt' | 'sc' | 'am' | 'sp' | 'sprec' | 'spsuggestion' | 'ds' | 'dz' | 'deezer' | 'yandex' | 'yandexmusic';
/** All supported Rythra and Lavalink search source identifiers. */
export type SearchPlatform = LavalinkSearchPlatform | RythraSearchPlatform;
/** Result category returned by Lavalink's loadtracks endpoint. */
export type LoadType = 'track' | 'playlist' | 'search' | 'empty' | 'error';

/** Metadata describing a resolved audio track. */
export interface TrackInfo { identifier: string; isSeekable: boolean; author: string; length: number; isStream: boolean; position: number; title: string; uri?: string; artworkUrl?: string; isrc?: string; sourceName: string; }
/** A Lavalink encoded track together with its metadata. */
export interface Track { encoded: string; info: TrackInfo; pluginInfo: Record<string, unknown>; userData: Record<string, unknown>; }
/** Metadata describing a Lavalink playlist. */
export interface PlaylistInfo { name: string; selectedTrack: number; }
/** Complete playlist response returned by Lavalink. */
export interface PlaylistData { info: PlaylistInfo; pluginInfo: Record<string, unknown>; tracks: Track[]; }
/** Track collection returned from a search result. */
export interface SearchResultData { tracks: Track[]; }
/** Discriminated Lavalink loadtracks response. */
export type SearchResponse = { loadType: 'track'; data: Track } | { loadType: 'playlist'; data: PlaylistData } | { loadType: 'search'; data: SearchResultData } | { loadType: 'empty'; data: Record<string, never> } | { loadType: 'error'; data: LavalinkRestError };
/** Supported node selection metrics based on resource usage. */
export type leastUsedNodeSortType = 'memory' | 'calls' | 'players';
/** Supported node selection metrics based on system load. */
export type leastLoadNodeSortType = 'cpu' | 'memory';
/** Discord gateway voice-state packet sent by a connector. */
export interface Payload { op: number; d: { guild_id: string; channel_id: string | null; self_mute: boolean; self_deaf: boolean; }; }

/** Configuration for a Lavalink node. */
export interface NodeOptions {
    /** Lavalink hostname or IP address. */ host: string;
    /** Lavalink port. */ port?: number;
    /** Lavalink authorization password. */ password?: string;
    /** Whether HTTPS/WSS should be used. */ secure?: boolean;
    /** Whether TLS certificates should be validated. */ rejectUnauthorized?: boolean;
    /** Stable identifier used when storing the node in the manager. */ identifier?: string;
    /** Delay between automatic reconnect attempts in milliseconds. */ retryInterval?: number;
    /** Maximum number of automatic reconnect attempts. */ retryAmount?: number;
    /** Lavalink API generation used by this node, or `auto` for detection. */ lavalinkVersion?: LavalinkApiVersionMode;
    /**
     * Enables bounded random jitter around reconnect delays.
     *
     * @remarks
     * A value of `0.2` allows the delay to vary by up to 20%, reducing a
     * thundering-herd effect when many nodes reconnect simultaneously.
     */
    retryJitter?: number;
    /** Maximum reconnect delay in milliseconds when exponential backoff is enabled. */
    maxRetryInterval?: number;
}

/** Configuration for a guild-specific Rythra player. */
export interface PlayerOptions { guild: string; voiceChannel: string; textChannel: string; selfMute?: boolean; selfDeaf?: boolean; }
/** Minimal interface implemented by the Rythra manager for typed event consumers. */
export interface IRythra { on(event: 'nodeCreate', listener: (node: Node) => void): this; }
/** Lavalink protocol versions represented by the public Rythra API. */
export enum Versions { REST_VERSION = 4 }
/** Alias for Lavalink loadtrack responses. */
export type LavalinkResponse = SearchResponse;

/** Equalizer band configuration. */
export interface Equalizer { band: number; gain: number; }
/** Karaoke filter configuration. */
export interface Karaoke { level?: number; monoLevel?: number; filterBand?: number; filterWidth?: number; }
/** Timescale filter configuration. */
export interface Timescale { speed?: number; pitch?: number; rate?: number; }
/** Tremolo filter configuration. */
export interface Tremolo { frequency?: number; depth?: number; }
/** Vibrato filter configuration. */
export interface Vibrato { frequency?: number; depth?: number; }
/** Rotation filter configuration. */
export interface Rotation { rotationHz?: number; }
/** Distortion filter configuration. */
export interface Distortion { sinOffset?: number; sinScale?: number; cosOffset?: number; cosScale?: number; tanOffset?: number; tanScale?: number; cos2Offset?: number; cos2Scale?: number; tan2Offset?: number; tan2Scale?: number; }
/** Channel mixing filter configuration. */
export interface ChannelMix { leftToLeft?: number; leftToRight?: number; rightToLeft?: number; rightToRight?: number; }
/** Low-pass filter configuration. */
export interface LowPass { smoothing?: number; }
/** Collection of Lavalink audio filters. */
export interface Filters { volume?: number; equalizer?: Equalizer[]; karaoke?: Karaoke; timescale?: Timescale; tremolo?: Tremolo; vibrato?: Vibrato; rotation?: Rotation; distortion?: Distortion; channelMix?: ChannelMix; lowPass?: LowPass; pluginFilters?: Record<string, unknown>; }
/** Runtime Lavalink player state. */
export interface PlayerState { time: number; position: number; connected: boolean; ping: number; }
/** Player state returned by Lavalink. */
export interface LavalinkPlayer { guildId: string; track: Track | null; volume: number; paused: boolean; voice: { token: string; endpoint: string; sessionId: string; }; filters: Filters; state: PlayerState; }
/** Payload used to update a Lavalink player. */
export interface UpdatePlayerInfo { guildId: string; noReplace?: boolean; playerOptions: { track?: { encoded?: string | null; identifier?: string; userData?: Record<string, unknown>; }; position?: number; volume?: number; paused?: boolean; filters?: Filters; voice?: { token: string; endpoint: string; sessionId: string; channelId?: string; }; }; }
/** Lavalink session configuration. */
export interface SessionInfo { resuming: boolean; timeout: number; }
/** Lavalink node statistics. */
export interface Stats { players: number; playingPlayers: number; uptime: number; memory: { free: number; used: number; allocated: number; reservable: number; }; cpu: { cores: number; systemLoad: number; lavalinkLoad: number; }; frameStats?: { sent: number; nulled: number; deficit: number; }; }
/** Route planner status returned by Lavalink. */
export interface RoutePlanner { class: string | null; details: Record<string, unknown> | null; }
/** Lavalink plugin metadata. */
export interface PluginInfo { name: string; version: string; }
/** Lavalink server information returned by `/info`. */
export interface NodeInfo { version: { semver: string; major: number; minor: number; patch: number; preRelease: string | null; build: string | null; }; buildTime: number; git: { branch: string; commit: string; commitTime: number; }; jvm: string; lavaplayer: string; sourceManagers: string[]; filters: string[]; plugins: PluginInfo[]; }
/** Internal REST request description. */
export interface FetchOptions { endpoint: string; options: { method?: string; params?: Record<string, string>; headers?: Record<string, string>; body?: unknown; }; }
/** Final native fetch options generated by Rythra. */
export interface FinalFetchOptions { method: string; headers: Record<string, string>; signal: AbortSignal; body?: string; }
/** Structured Lavalink REST error payload. */
export interface LavalinkRestError { timestamp: number; status: number; error: string; message: string; path: string; trace?: string; }
/** Generic Discord gateway packet. */
export interface GatewayPacket { t?: string; d?: unknown; op?: number; }
/** Discord voice server update payload. */
export interface VoiceServerUpdate { guild_id: string; token: string; endpoint: string; }
/** Discord voice state update payload. */
export interface VoiceStateUpdate { guild_id: string; session_id: string; channel_id: string | null; }
