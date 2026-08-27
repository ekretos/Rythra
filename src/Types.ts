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
    /** Discord library connector used by the manager. */
    connector: Connector;
    /** Rythra client version included in Lavalink identification headers. */
    version?: string;
    /** Lavalink nodes to register during manager initialization. */
    nodes?: NodeOptions[];
    /** Discord application/client ID sent to Lavalink. */
    clientId?: string;
    /** Custom client name sent in the Lavalink `Client-Name` header. */
    clientName?: string;
    /** Number of Discord shards used by the bot. */
    shards?: number;
    /** Whether players should automatically advance to the next track. */
    autoPlay?: boolean;
    /** Track properties that should be retained by integrations. */
    trackPartial?: string[];
    /** Default platform used when a search source is not explicitly supplied. */
    defaultSearchPlatform?: SearchPlatform;
    /** Custom User-Agent used for Lavalink REST requests. */
    userAgent?: string;
    /** REST request timeout in seconds. */
    restTimeout?: number;
    /** Default Lavalink API generation for nodes without an override. */
    lavalinkVersion?: LavalinkApiVersionMode;
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
export interface TrackInfo {
    /** Source-specific track identifier. */ identifier: string;
    /** Whether seeking is supported for the track. */ isSeekable: boolean;
    /** Track author or artist. */ author: string;
    /** Track duration in milliseconds. */ length: number;
    /** Whether the source is a live stream. */ isStream: boolean;
    /** Current track position in milliseconds. */ position: number;
    /** Track title. */ title: string;
    /** Source URL, when available. */ uri?: string;
    /** Artwork URL, when available. */ artworkUrl?: string;
    /** ISRC identifier, when available. */ isrc?: string;
    /** Name of the source manager that resolved the track. */ sourceName: string;
}

/** A Lavalink encoded track together with its metadata. */
export interface Track {
    /** Base64-encoded Lavalink track payload. */ encoded: string;
    /** Resolved track metadata. */ info: TrackInfo;
    /** Source/plugin-specific metadata. */ pluginInfo: Record<string, unknown>;
    /** Arbitrary application-owned metadata. */ userData: Record<string, unknown>;
}

/** Metadata describing a Lavalink playlist. */
export interface PlaylistInfo { /** Playlist name. */ name: string; /** Index of the selected track. */ selectedTrack: number; }
/** Complete playlist response returned by Lavalink. */
export interface PlaylistData { /** Playlist metadata. */ info: PlaylistInfo; /** Plugin-specific metadata. */ pluginInfo: Record<string, unknown>; /** Tracks contained in the playlist. */ tracks: Track[]; }
/** Track collection returned from a search result. */
export interface SearchResultData { /** Matching tracks. */ tracks: Track[]; }
/** Discriminated Lavalink loadtracks response. */
export type SearchResponse =
    | { loadType: 'track'; data: Track }
    | { loadType: 'playlist'; data: PlaylistData }
    | { loadType: 'search'; data: SearchResultData }
    | { loadType: 'empty'; data: Record<string, never> }
    | { loadType: 'error'; data: LavalinkRestError };

/** Supported node selection metrics based on resource usage. */
export type leastUsedNodeSortType = 'memory' | 'calls' | 'players';
/** Supported node selection metrics based on system load. */
export type leastLoadNodeSortType = 'cpu' | 'memory';

/** Discord gateway voice-state packet sent by a connector. */
export interface Payload { /** Gateway opcode. */ op: number; /** Voice state payload. */ d: { /** Guild ID. */ guild_id: string; /** Voice channel ID, or null to disconnect. */ channel_id: string | null; /** Whether the bot should self-mute. */ self_mute: boolean; /** Whether the bot should self-deafen. */ self_deaf: boolean; }; }

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
}

/** Configuration for a guild-specific Rythra player. */
export interface PlayerOptions {
    /** Discord guild ID. */ guild: string;
    /** Discord voice channel ID. */ voiceChannel: string;
    /** Discord text channel ID. */ textChannel: string;
    /** Initial self-mute preference. */ selfMute?: boolean;
    /** Initial self-deaf preference. */ selfDeaf?: boolean;
}

/** Minimal interface implemented by the Rythra manager for typed event consumers. */
export interface IRythra { /** Registers a node creation listener. */ on(event: 'nodeCreate', listener: (node: Node) => void): this; }
/** Lavalink protocol versions represented by the public Rythra API. */
export enum Versions { /** Lavalink REST API version currently represented by the legacy constant. */ REST_VERSION = 4 }
/** Alias for Lavalink loadtrack responses. */
export type LavalinkResponse = SearchResponse;

/** Equalizer band configuration. */
export interface Equalizer { /** Equalizer band index. */ band: number; /** Gain adjustment for the band. */ gain: number; }
/** Karaoke filter configuration. */
export interface Karaoke { /** Filter level. */ level?: number; /** Mono level. */ monoLevel?: number; /** Filter band. */ filterBand?: number; /** Filter width. */ filterWidth?: number; }
/** Timescale filter configuration. */
export interface Timescale { /** Playback speed. */ speed?: number; /** Playback pitch. */ pitch?: number; /** Playback rate. */ rate?: number; }
/** Tremolo filter configuration. */
export interface Tremolo { /** Oscillation frequency. */ frequency?: number; /** Oscillation depth. */ depth?: number; }
/** Vibrato filter configuration. */
export interface Vibrato { /** Oscillation frequency. */ frequency?: number; /** Oscillation depth. */ depth?: number; }
/** Rotation filter configuration. */
export interface Rotation { /** Rotation frequency in Hz. */ rotationHz?: number; }
/** Distortion filter configuration. */
export interface Distortion { /** Sine offset. */ sinOffset?: number; /** Sine scale. */ sinScale?: number; /** Cosine offset. */ cosOffset?: number; /** Cosine scale. */ cosScale?: number; /** Tangent offset. */ tanOffset?: number; /** Tangent scale. */ tanScale?: number; /** Second cosine offset. */ cos2Offset?: number; /** Second cosine scale. */ cos2Scale?: number; /** Second tangent offset. */ tan2Offset?: number; /** Second tangent scale. */ tan2Scale?: number; }
/** Channel mixing filter configuration. */
export interface ChannelMix { /** Left-to-left gain. */ leftToLeft?: number; /** Left-to-right gain. */ leftToRight?: number; /** Right-to-left gain. */ rightToLeft?: number; /** Right-to-right gain. */ rightToRight?: number; }
/** Low-pass filter configuration. */
export interface LowPass { /** Smoothing value. */ smoothing?: number; }
/** Collection of Lavalink audio filters. */
export interface Filters { /** Global volume multiplier. */ volume?: number; /** Equalizer bands. */ equalizer?: Equalizer[]; /** Karaoke configuration. */ karaoke?: Karaoke; /** Timescale configuration. */ timescale?: Timescale; /** Tremolo configuration. */ tremolo?: Tremolo; /** Vibrato configuration. */ vibrato?: Vibrato; /** Rotation configuration. */ rotation?: Rotation; /** Distortion configuration. */ distortion?: Distortion; /** Channel mixing configuration. */ channelMix?: ChannelMix; /** Low-pass configuration. */ lowPass?: LowPass; /** Plugin-defined filters. */ pluginFilters?: Record<string, unknown>; }
/** Runtime Lavalink player state. */
export interface PlayerState { /** Server-reported time. */ time: number; /** Current playback position. */ position: number; /** Whether the voice connection is active. */ connected: boolean; /** Voice connection ping. */ ping: number; }
/** Player state returned by Lavalink. */
export interface LavalinkPlayer { /** Guild ID. */ guildId: string; /** Current track. */ track: Track | null; /** Player volume. */ volume: number; /** Whether playback is paused. */ paused: boolean; /** Lavalink voice connection state. */ voice: { /** Voice token. */ token: string; /** Voice endpoint. */ endpoint: string; /** Discord session ID. */ sessionId: string; }; /** Active filters. */ filters: Filters; /** Runtime player state. */ state: PlayerState; }
/** Payload used to update a Lavalink player. */
export interface UpdatePlayerInfo { /** Guild whose player should be updated. */ guildId: string; /** Whether Lavalink should avoid replacing the active track. */ noReplace?: boolean; /** Player state changes to apply. */ playerOptions: { /** Track operation. */ track?: { /** Encoded track to play, or null to stop. */ encoded?: string | null; /** Direct track identifier. */ identifier?: string; /** Application metadata. */ userData?: Record<string, unknown>; }; /** Playback position in milliseconds. */ position?: number; /** Volume from 0 to 1000. */ volume?: number; /** Pause state. */ paused?: boolean; /** Audio filters. */ filters?: Filters; /** Discord voice connection information. */ voice?: { /** Voice token. */ token: string; /** Voice endpoint. */ endpoint: string; /** Discord session ID. */ sessionId: string; /** Discord channel ID. */ channelId?: string; }; }; }
/** Lavalink session configuration. */
export interface SessionInfo { /** Whether session resumption is enabled. */ resuming: boolean; /** Session timeout in seconds. */ timeout: number; }
/** Lavalink node statistics. */
export interface Stats { /** Number of active players. */ players: number; /** Number of actively playing players. */ playingPlayers: number; /** Node uptime in milliseconds. */ uptime: number; /** JVM memory statistics. */ memory: { /** Free memory. */ free: number; /** Used memory. */ used: number; /** Allocated memory. */ allocated: number; /** Reservable memory. */ reservable: number; }; /** CPU statistics. */ cpu: { /** CPU core count. */ cores: number; /** System load. */ systemLoad: number; /** Lavalink load. */ lavalinkLoad: number; }; /** Optional frame statistics. */ frameStats?: { /** Sent frames. */ sent: number; /** Nulled frames. */ nulled: number; /** Deficit frames. */ deficit: number; }; }
/** Route planner status returned by Lavalink. */
export interface RoutePlanner { /** Route planner class. */ class: string | null; /** Route planner implementation details. */ details: Record<string, unknown> | null; }
/** Lavalink plugin metadata. */
export interface PluginInfo { /** Plugin name. */ name: string; /** Plugin version. */ version: string; }
/** Lavalink server information returned by `/info`. */
export interface NodeInfo { /** Lavalink version information. */ version: { /** Full semantic version. */ semver: string; /** Major version. */ major: number; /** Minor version. */ minor: number; /** Patch version. */ patch: number; /** Pre-release identifier. */ preRelease: string | null; /** Build metadata. */ build: string | null; }; /** Server build timestamp. */ buildTime: number; /** Git build information. */ git: { /** Git branch. */ branch: string; /** Git commit. */ commit: string; /** Commit timestamp. */ commitTime: number; }; /** JVM version. */ jvm: string; /** Lavaplayer version. */ lavaplayer: string; /** Enabled source managers. */ sourceManagers: string[]; /** Enabled filters. */ filters: string[]; /** Installed plugins. */ plugins: PluginInfo[]; }
/** Internal REST request description. */
export interface FetchOptions { /** API endpoint relative to the versioned base URL. */ endpoint: string; /** HTTP request options. */ options: { /** HTTP method. */ method?: string; /** Query parameters. */ params?: Record<string, string>; /** Additional HTTP headers. */ headers?: Record<string, string>; /** Request body. */ body?: unknown; }; }
/** Final native fetch options generated by Rythra. */
export interface FinalFetchOptions { /** HTTP method. */ method: string; /** HTTP headers. */ headers: Record<string, string>; /** Abort signal used for timeouts. */ signal: AbortSignal; /** Serialized request body. */ body?: string; }
/** Structured Lavalink REST error payload. */
export interface LavalinkRestError { /** Error timestamp. */ timestamp: number; /** HTTP status. */ status: number; /** Error category. */ error: string; /** Human-readable error message. */ message: string; /** Request path. */ path: string; /** Optional server trace. */ trace?: string; }
/** Generic Discord gateway packet. */
export interface GatewayPacket { /** Optional gateway event name. */ t?: string; /** Event data. */ d?: unknown; /** Gateway opcode. */ op?: number; }
/** Discord voice server update payload. */
export interface VoiceServerUpdate { /** Guild ID. */ guild_id: string; /** Voice token. */ token: string; /** Voice endpoint. */ endpoint: string; }
/** Discord voice state update payload. */
export interface VoiceStateUpdate { /** Guild ID. */ guild_id: string; /** Discord voice session ID. */ session_id: string; /** Voice channel ID, or null when disconnected. */ channel_id: string | null; }
