/** Public configuration and data types used throughout Rythra. */
import { Connector } from './Connector';
import type { Node } from './Node';
import type { LavalinkApiVersionMode } from './protocol/LavalinkProtocol';

/** Configuration used to create a Rythra manager. */
export interface RythraOptions {
    /** Discord library connector used by the manager. */ connector: Connector;
    /** Rythra client version included in Lavalink identification headers. */ version?: string;
    /** Lavalink nodes to register during manager initialization. */ nodes?: NodeOptions[];
    /** Discord application/client ID sent to Lavalink. */ clientId?: string;
    /** Custom client name sent in the Lavalink `Client-Name` header. */ clientName?: string;
    /** Number of Discord shards used by the bot. */ shards?: number;
    /** Whether players should automatically advance to the next track. */ autoPlay?: boolean;
    /** Track properties retained by integrations. */ trackPartial?: string[];
    /** Default search platform. */ defaultSearchPlatform?: SearchPlatform;
    /** Custom User-Agent used for REST requests. */ userAgent?: string;
    /** REST request timeout in seconds. */ restTimeout?: number;
    /** Default Lavalink API generation. */ lavalinkVersion?: LavalinkApiVersionMode;
}
/** Search source identifiers understood directly by Lavalink. */
export type LavalinkSearchPlatform = 'ytsearch' | 'ytmsearch' | 'scsearch' | 'spsearch' | 'sprec' | 'amsearch' | 'dzsearch' | 'dzisrc' | 'ymsearch' | 'speak' | 'tts';
/** Friendly Rythra search source aliases. */
export type RythraSearchPlatform = 'youtube' | 'youtube music' | 'soundcloud' | 'ytm' | 'yt' | 'sc' | 'am' | 'sp' | 'sprec' | 'spsuggestion' | 'ds' | 'dz' | 'deezer' | 'yandex' | 'yandexmusic';
/** All supported search source identifiers. */ export type SearchPlatform = LavalinkSearchPlatform | RythraSearchPlatform;
/** Result category returned by Lavalink. */ export type LoadType = 'track' | 'playlist' | 'search' | 'empty' | 'error';
/** Metadata describing a resolved audio track. */
export interface TrackInfo { /** Source-specific identifier. */ identifier: string; /** Whether seeking is supported. */ isSeekable: boolean; /** Author or artist. */ author: string; /** Duration in milliseconds. */ length: number; /** Whether source is a stream. */ isStream: boolean; /** Current position. */ position: number; /** Track title. */ title: string; /** Source URL. */ uri?: string; /** Artwork URL. */ artworkUrl?: string; /** ISRC. */ isrc?: string; /** Source manager name. */ sourceName: string; }
/** A Lavalink encoded track. */ export interface Track { /** Encoded track. */ encoded: string; /** Track metadata. */ info: TrackInfo; /** Plugin metadata. */ pluginInfo: Record<string, unknown>; /** Application metadata. */ userData: Record<string, unknown>; }
/** Playlist metadata. */ export interface PlaylistInfo { /** Playlist name. */ name: string; /** Selected track index. */ selectedTrack: number; }
/** Playlist response data. */ export interface PlaylistData { /** Playlist metadata. */ info: PlaylistInfo; /** Plugin metadata. */ pluginInfo: Record<string, unknown>; /** Tracks. */ tracks: Track[]; }
/** Search result data. */ export interface SearchResultData { /** Matching tracks. */ tracks: Track[]; }
/** Discriminated Lavalink response. */ export type SearchResponse = | { loadType: 'track'; data: Track } | { loadType: 'playlist'; data: PlaylistData } | { loadType: 'search'; data: SearchResultData } | { loadType: 'empty'; data: Record<string, never> } | { loadType: 'error'; data: LavalinkRestError };
/** Node selection metric. */ export type leastUsedNodeSortType = 'memory' | 'calls' | 'players';
/** Node load metric. */ export type leastLoadNodeSortType = 'cpu' | 'memory';
/** Discord gateway packet. */ export interface Payload { /** Opcode. */ op: number; /** Voice state. */ d: { /** Guild ID. */ guild_id: string; /** Voice channel ID. */ channel_id: string | null; /** Self mute. */ self_mute: boolean; /** Self deaf. */ self_deaf: boolean; }; }
/** Lavalink node configuration. */
export interface NodeOptions { /** Hostname. */ host: string; /** Port. */ port?: number; /** Password. */ password?: string; /** HTTPS/WSS. */ secure?: boolean; /** Validate TLS certificates. */ rejectUnauthorized?: boolean; /** Node identifier. */ identifier?: string; /** Retry interval. */ retryInterval?: number; /** Retry count. */ retryAmount?: number; /** API version or auto. */ lavalinkVersion?: LavalinkApiVersionMode; /** Retry jitter fraction. */ retryJitter?: number; /** Maximum retry interval. */ maxRetryInterval?: number; }
/** Guild player configuration. */ export interface PlayerOptions { /** Guild ID. */ guild: string; /** Voice channel ID. */ voiceChannel: string; /** Text channel ID. */ textChannel: string; /** Self mute. */ selfMute?: boolean; /** Self deaf. */ selfDeaf?: boolean; }
/** Minimal Rythra manager contract. */ export interface IRythra { /** Registers node creation listener. */ on(event: 'nodeCreate', listener: (node: Node) => void): this; }
/** Lavalink versions represented by Rythra. */ export enum Versions { /** REST version constant. */ REST_VERSION = 4 }
/** Alias for Lavalink responses. */ export type LavalinkResponse = SearchResponse;
/** Equalizer filter. */ export interface Equalizer { /** Band index. */ band: number; /** Gain. */ gain: number; }
/** Karaoke filter. */ export interface Karaoke { /** Level. */ level?: number; /** Mono level. */ monoLevel?: number; /** Filter band. */ filterBand?: number; /** Filter width. */ filterWidth?: number; }
/** Timescale filter. */ export interface Timescale { /** Speed. */ speed?: number; /** Pitch. */ pitch?: number; /** Rate. */ rate?: number; }
/** Tremolo filter. */ export interface Tremolo { /** Frequency. */ frequency?: number; /** Depth. */ depth?: number; }
/** Vibrato filter. */ export interface Vibrato { /** Frequency. */ frequency?: number; /** Depth. */ depth?: number; }
/** Rotation filter. */ export interface Rotation { /** Frequency. */ rotationHz?: number; }
/** Distortion filter. */ export interface Distortion { /** Sine offset. */ sinOffset?: number; /** Sine scale. */ sinScale?: number; /** Cosine offset. */ cosOffset?: number; /** Cosine scale. */ cosScale?: number; /** Tangent offset. */ tanOffset?: number; /** Tangent scale. */ tanScale?: number; /** Second cosine offset. */ cos2Offset?: number; /** Second cosine scale. */ cos2Scale?: number; /** Second tangent offset. */ tan2Offset?: number; /** Second tangent scale. */ tan2Scale?: number; }
/** Channel mix filter. */ export interface ChannelMix { /** Left-to-left. */ leftToLeft?: number; /** Left-to-right. */ leftToRight?: number; /** Right-to-left. */ rightToLeft?: number; /** Right-to-right. */ rightToRight?: number; }
/** Low-pass filter. */ export interface LowPass { /** Smoothing. */ smoothing?: number; }
/** Lavalink filter collection. */ export interface Filters { /** Volume. */ volume?: number; /** Equalizer. */ equalizer?: Equalizer[]; /** Karaoke. */ karaoke?: Karaoke; /** Timescale. */ timescale?: Timescale; /** Tremolo. */ tremolo?: Tremolo; /** Vibrato. */ vibrato?: Vibrato; /** Rotation. */ rotation?: Rotation; /** Distortion. */ distortion?: Distortion; /** Channel mix. */ channelMix?: ChannelMix; /** Low pass. */ lowPass?: LowPass; /** Plugin filters. */ pluginFilters?: Record<string, unknown>; }
/** Runtime player state. */ export interface PlayerState { /** Server time. */ time: number; /** Position. */ position: number; /** Connection state. */ connected: boolean; /** Ping. */ ping: number; }
/** Lavalink player state. */ export interface LavalinkPlayer { /** Guild ID. */ guildId: string; /** Current track. */ track: Track | null; /** Volume. */ volume: number; /** Pause state. */ paused: boolean; /** Voice state. */ voice: { /** Token. */ token: string; /** Endpoint. */ endpoint: string; /** Session ID. */ sessionId: string; }; /** Filters. */ filters: Filters; /** Runtime state. */ state: PlayerState; }
/** Player update request. */ export interface UpdatePlayerInfo { /** Guild ID. */ guildId: string; /** Do not replace current track. */ noReplace?: boolean; /** Player options. */ playerOptions: { /** Track. */ track?: { /** Encoded track. */ encoded?: string | null; /** Identifier. */ identifier?: string; /** Metadata. */ userData?: Record<string, unknown>; }; /** Position. */ position?: number; /** Volume. */ volume?: number; /** Paused. */ paused?: boolean; /** Filters. */ filters?: Filters; /** Voice. */ voice?: { /** Token. */ token: string; /** Endpoint. */ endpoint: string; /** Session ID. */ sessionId: string; /** Channel ID. */ channelId?: string; }; }; }
/** Lavalink session settings. */ export interface SessionInfo { /** Resuming enabled. */ resuming: boolean; /** Timeout seconds. */ timeout: number; }
/** Lavalink node statistics. */ export interface Stats { /** Players. */ players: number; /** Playing players. */ playingPlayers: number; /** Uptime. */ uptime: number; /** Memory. */ memory: { /** Free. */ free: number; /** Used. */ used: number; /** Allocated. */ allocated: number; /** Reservable. */ reservable: number; }; /** CPU. */ cpu: { /** Cores. */ cores: number; /** System load. */ systemLoad: number; /** Lavalink load. */ lavalinkLoad: number; }; /** Frame stats. */ frameStats?: { /** Sent. */ sent: number; /** Nulled. */ nulled: number; /** Deficit. */ deficit: number; }; }
/** Route planner status. */ export interface RoutePlanner { /** Planner class. */ class: string | null; /** Planner details. */ details: Record<string, unknown> | null; }
/** Lavalink plugin metadata. */ export interface PluginInfo { /** Plugin name. */ name: string; /** Plugin version. */ version: string; }
/** Lavalink server information. */ export interface NodeInfo { /** Version. */ version: { /** SemVer. */ semver: string; /** Major. */ major: number; /** Minor. */ minor: number; /** Patch. */ patch: number; /** Pre-release. */ preRelease: string | null; /** Build. */ build: string | null; }; /** Build time. */ buildTime: number; /** Git. */ git: { /** Branch. */ branch: string; /** Commit. */ commit: string; /** Commit time. */ commitTime: number; }; /** JVM. */ jvm: string; /** Lavaplayer. */ lavaplayer: string; /** Sources. */ sourceManagers: string[]; /** Filters. */ filters: string[]; /** Plugins. */ plugins: PluginInfo[]; }
/** Internal REST request description. */ export interface FetchOptions { /** Endpoint. */ endpoint: string; /** Request options. */ options: { /** Method. */ method?: string; /** Params. */ params?: Record<string, string>; /** Headers. */ headers?: Record<string, string>; /** Body. */ body?: unknown; }; }
/** Final native fetch options. */ export interface FinalFetchOptions { /** Method. */ method: string; /** Headers. */ headers: Record<string, string>; /** Abort signal. */ signal: AbortSignal; /** Body. */ body?: string; }
/** Structured Lavalink REST error. */ export interface LavalinkRestError { /** Timestamp. */ timestamp: number; /** HTTP status. */ status: number; /** Error type. */ error: string; /** Message. */ message: string; /** Path. */ path: string; /** Trace. */ trace?: string; }
/** Generic Discord gateway packet. */ export interface GatewayPacket { /** Event name. */ t?: string; /** Event data. */ d?: unknown; /** Opcode. */ op?: number; }
/** Discord voice server update. */ export interface VoiceServerUpdate { /** Guild ID. */ guild_id: string; /** Voice token. */ token: string; /** Voice endpoint. */ endpoint: string; }
/** Discord voice state update. */ export interface VoiceStateUpdate { /** Guild ID. */ guild_id: string; /** Session ID. */ session_id: string; /** Voice channel ID. */ channel_id: string | null; }
