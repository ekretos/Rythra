import { Connector } from './Connector';
import type { Node } from './Node';
import type { LavalinkApiVersionMode } from './protocol/LavalinkProtocol';
import type { PersistenceAdapter } from './Persistence';
import type { Metrics } from './Metrics';
import type { RythraPlugin } from './Plugin';

/** Public configuration and data types used throughout Rythra. */
export interface RythraOptions {
    /** Discord library connector used by the manager. */ connector: Connector;
    /** Rythra client version. */ version?: string;
    /** Lavalink nodes registered at startup. */ nodes?: NodeOptions[];
    /** Discord application/client ID. */ clientId?: string;
    /** Client name sent to Lavalink. */ clientName?: string;
    /** Discord shard count. */ shards?: number;
    /** Automatically advance to queued tracks. */ autoPlay?: boolean;
    /** Track partial fields retained by integrations. */ trackPartial?: string[];
    /** Default search platform. */ defaultSearchPlatform?: SearchPlatform;
    /** User-Agent for REST requests. */ userAgent?: string;
    /** REST timeout in seconds. */ restTimeout?: number;
    /** Default Lavalink API generation. */ lavalinkVersion?: LavalinkApiVersionMode;
    /** Optional durable player persistence adapter. */ persistence?: PersistenceAdapter;
    /** Optional metrics collector. */ metrics?: Metrics;
    /** Plugins installed during manager initialization. */ plugins?: RythraPlugin[];
}

/** Lavalink-native search source identifiers. */
export type LavalinkSearchPlatform = 'ytsearch' | 'ytmsearch' | 'scsearch' | 'spsearch' | 'sprec' | 'amsearch' | 'dzsearch' | 'dzisrc' | 'ymsearch' | 'speak' | 'tts';
/** Rythra-friendly search source aliases. */
export type RythraSearchPlatform = 'youtube' | 'youtube music' | 'soundcloud' | 'ytm' | 'yt' | 'sc' | 'am' | 'sp' | 'sprec' | 'spsuggestion' | 'ds' | 'dz' | 'deezer' | 'yandex' | 'yandexmusic';
/** All supported search source identifiers. */
export type SearchPlatform = LavalinkSearchPlatform | RythraSearchPlatform;
/** Lavalink load result category. */
export type LoadType = 'track' | 'playlist' | 'search' | 'empty' | 'error';

/** Metadata describing a resolved audio track. */
export interface TrackInfo { identifier: string; isSeekable: boolean; author: string; length: number; isStream: boolean; position: number; title: string; uri?: string; artworkUrl?: string; isrc?: string; sourceName: string; }
/** Encoded Lavalink track and metadata. */
export interface Track { encoded: string; info: TrackInfo; pluginInfo: Record<string, unknown>; userData: Record<string, unknown>; }
/** Lavalink playlist metadata. */
export interface PlaylistInfo { name: string; selectedTrack: number; }
/** Lavalink playlist result. */
export interface PlaylistData { info: PlaylistInfo; pluginInfo: Record<string, unknown>; tracks: Track[]; }
/** Lavalink search result tracks. */
export interface SearchResultData { tracks: Track[]; }
/** Discriminated Lavalink loadtracks response. */
export type SearchResponse = { loadType: 'track'; data: Track } | { loadType: 'playlist'; data: PlaylistData } | { loadType: 'search'; data: SearchResultData } | { loadType: 'empty'; data: Record<string, never> } | { loadType: 'error'; data: LavalinkRestError };
/** Node selection metrics based on resource usage. */
export type leastUsedNodeSortType = 'memory' | 'calls' | 'players';
/** Node selection metrics based on system load. */
export type leastLoadNodeSortType = 'cpu' | 'memory';
/** Discord voice gateway packet. */
export interface Payload { op: number; d: { guild_id: string; channel_id: string | null; self_mute: boolean; self_deaf: boolean; }; }
/** Lavalink node configuration. */
export interface NodeOptions { host: string; port?: number; password?: string; secure?: boolean; rejectUnauthorized?: boolean; identifier?: string; retryInterval?: number; retryAmount?: number; lavalinkVersion?: LavalinkApiVersionMode; }
/** Guild player configuration. */
export interface PlayerOptions { guild: string; voiceChannel: string; textChannel: string; selfMute?: boolean; selfDeaf?: boolean; }
/** Minimal manager event interface. */
export interface IRythra { on(event: 'nodeCreate', listener: (node: Node) => void): this; }
/** Legacy Lavalink version constants. */
export enum Versions { REST_VERSION = 4 }
/** Alias for Lavalink responses. */
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
/** Lavalink audio filter collection. */
export interface Filters { volume?: number; equalizer?: Equalizer[]; karaoke?: Karaoke; timescale?: Timescale; tremolo?: Tremolo; vibrato?: Vibrato; rotation?: Rotation; distortion?: Distortion; channelMix?: ChannelMix; lowPass?: LowPass; pluginFilters?: Record<string, unknown>; }
/** Runtime player state. */
export interface PlayerState { time: number; position: number; connected: boolean; ping: number; }
/** Player state returned by Lavalink. */
export interface LavalinkPlayer { guildId: string; track: Track | null; volume: number; paused: boolean; voice: { token: string; endpoint: string; sessionId: string; }; filters: Filters; state: PlayerState; }
/** Lavalink player update payload. */
export interface UpdatePlayerInfo { guildId: string; noReplace?: boolean; playerOptions: { track?: { encoded?: string | null; identifier?: string; userData?: Record<string, unknown>; }; position?: number; volume?: number; paused?: boolean; filters?: Filters; voice?: { token: string; endpoint: string; sessionId: string; channelId?: string; }; }; }
/** Lavalink session configuration. */
export interface SessionInfo { resuming: boolean; timeout: number; }
/** Lavalink node statistics. */
export interface Stats { players: number; playingPlayers: number; uptime: number; memory: { free: number; used: number; allocated: number; reservable: number; }; cpu: { cores: number; systemLoad: number; lavalinkLoad: number; }; frameStats?: { sent: number; nulled: number; deficit: number; }; }
/** Route planner status. */
export interface RoutePlanner { class: string | null; details: Record<string, unknown> | null; }
/** Lavalink plugin metadata. */
export interface PluginInfo { name: string; version: string; }
/** Lavalink server information. */
export interface NodeInfo { version: { semver: string; major: number; minor: number; patch: number; preRelease: string | null; build: string | null; }; buildTime: number; git: { branch: string; commit: string; commitTime: number; }; jvm: string; lavaplayer: string; sourceManagers: string[]; filters: string[]; plugins: PluginInfo[]; }
/** Internal REST request description. */
export interface FetchOptions { endpoint: string; options: { method?: string; params?: Record<string, string>; headers?: Record<string, string>; body?: unknown; }; }
/** Native fetch options generated by Rythra. */
export interface FinalFetchOptions { method: string; headers: Record<string, string>; signal: AbortSignal; body?: string; }
/** Structured Lavalink REST error. */
export interface LavalinkRestError { timestamp: number; status: number; error: string; message: string; path: string; trace?: string; }
/** Generic Discord gateway packet. */
export interface GatewayPacket { t?: string; d?: unknown; op?: number; }
/** Discord voice server update payload. */
export interface VoiceServerUpdate { guild_id: string; token: string; endpoint: string; }
/** Discord voice state update payload. */
export interface VoiceStateUpdate { guild_id: string; session_id: string; channel_id: string | null; }
/** Serializable state used for player recovery and persistence. */
export interface PlayerSnapshot { guildId: string; voiceChannel: string; textChannel: string; current: Track | null; queue: Track[]; position: number; paused: boolean; volume: number; filters: Filters; }
