import { Connector } from './Connector';
import type { Node } from './Node';
import type { LavalinkApiVersionMode } from './protocol/LavalinkProtocol';

export interface RythraOptions {
    connector: Connector;
    version?: string;
    nodes?: NodeOptions[];
    clientId?: string;
    clientName?: string;
    shards?: number;
    autoPlay?: boolean;
    trackPartial?: string[];
    defaultSearchPlatform?: SearchPlatform;
    userAgent?: string;
    restTimeout?: number;
    /** Default Lavalink API generation for nodes that do not override it. */
    lavalinkVersion?: LavalinkApiVersionMode;
}

export type LavalinkSearchPlatform = 'ytsearch' | 'ytmsearch' | 'scsearch' | 'spsearch' | 'sprec' | 'amsearch' | 'dzsearch' | 'dzisrc' | 'ymsearch' | 'speak' | 'tts';
export type RythraSearchPlatform = 'youtube' | 'youtube music' | 'soundcloud' | 'ytm' | 'yt' | 'sc' | 'am' | 'sp' | 'sprec' | 'spsuggestion' | 'ds' | 'dz' | 'deezer' | 'yandex' | 'yandexmusic';
export type SearchPlatform = LavalinkSearchPlatform | RythraSearchPlatform;
export type LoadType = 'track' | 'playlist' | 'search' | 'empty' | 'error';

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
    pluginInfo: Record<string, unknown>;
    userData: Record<string, unknown>;
}

export interface PlaylistInfo { name: string; selectedTrack: number; }
export interface PlaylistData { info: PlaylistInfo; pluginInfo: Record<string, unknown>; tracks: Track[]; }
export interface SearchResultData { tracks: Track[]; }
export type SearchResponse =
    | { loadType: 'track'; data: Track }
    | { loadType: 'playlist'; data: PlaylistData }
    | { loadType: 'search'; data: SearchResultData }
    | { loadType: 'empty'; data: Record<string, never> }
    | { loadType: 'error'; data: LavalinkRestError };

export type leastUsedNodeSortType = 'memory' | 'calls' | 'players';
export type leastLoadNodeSortType = 'cpu' | 'memory';

export interface Payload { op: number; d: { guild_id: string; channel_id: string | null; self_mute: boolean; self_deaf: boolean; }; }

export interface NodeOptions {
    host: string;
    port?: number;
    password?: string;
    secure?: boolean;
    rejectUnauthorized?: boolean;
    identifier?: string;
    retryInterval?: number;
    retryAmount?: number;
    /** Lavalink API generation for this node. `auto` discovers it from /version. */
    lavalinkVersion?: LavalinkApiVersionMode;
}

export interface PlayerOptions { guild: string; voiceChannel: string; textChannel: string; selfMute?: boolean; selfDeaf?: boolean; }
export interface IRythra { on(event: 'nodeCreate', listener: (node: Node) => void): this; }
export enum Versions { REST_VERSION = 4 }
export type LavalinkResponse = SearchResponse;

export interface Equalizer { band: number; gain: number; }
export interface Karaoke { level?: number; monoLevel?: number; filterBand?: number; filterWidth?: number; }
export interface Timescale { speed?: number; pitch?: number; rate?: number; }
export interface Tremolo { frequency?: number; depth?: number; }
export interface Vibrato { frequency?: number; depth?: number; }
export interface Rotation { rotationHz?: number; }
export interface Distortion { sinOffset?: number; sinScale?: number; cosOffset?: number; cosScale?: number; tanOffset?: number; tanScale?: number; cos2Offset?: number; cos2Scale?: number; tan2Offset?: number; tan2Scale?: number; }
export interface ChannelMix { leftToLeft?: number; leftToRight?: number; rightToLeft?: number; rightToRight?: number; }
export interface LowPass { smoothing?: number; }
export interface Filters { volume?: number; equalizer?: Equalizer[]; karaoke?: Karaoke; timescale?: Timescale; tremolo?: Tremolo; vibrato?: Vibrato; rotation?: Rotation; distortion?: Distortion; channelMix?: ChannelMix; lowPass?: LowPass; pluginFilters?: Record<string, unknown>; }
export interface PlayerState { time: number; position: number; connected: boolean; ping: number; }
export interface LavalinkPlayer { guildId: string; track: Track | null; volume: number; paused: boolean; voice: { token: string; endpoint: string; sessionId: string; }; filters: Filters; state: PlayerState; }
export interface UpdatePlayerInfo { guildId: string; noReplace?: boolean; playerOptions: { track?: { encoded?: string | null; identifier?: string; userData?: Record<string, unknown>; }; position?: number; volume?: number; paused?: boolean; filters?: Filters; voice?: { token: string; endpoint: string; sessionId: string; channelId?: string; }; }; }
export interface SessionInfo { resuming: boolean; timeout: number; }
export interface Stats { players: number; playingPlayers: number; uptime: number; memory: { free: number; used: number; allocated: number; reservable: number; }; cpu: { cores: number; systemLoad: number; lavalinkLoad: number; }; frameStats?: { sent: number; nulled: number; deficit: number; }; }
export interface RoutePlanner { class: string | null; details: Record<string, unknown> | null; }
export interface PluginInfo { name: string; version: string; }
export interface NodeInfo { version: { semver: string; major: number; minor: number; patch: number; preRelease: string | null; build: string | null; }; buildTime: number; git: { branch: string; commit: string; commitTime: number; }; jvm: string; lavaplayer: string; sourceManagers: string[]; filters: string[]; plugins: PluginInfo[]; }
export interface FetchOptions { endpoint: string; options: { method?: string; params?: Record<string, string>; headers?: Record<string, string>; body?: unknown; }; }
export interface FinalFetchOptions { method: string; headers: Record<string, string>; signal: AbortSignal; body?: string; }
export interface LavalinkRestError { timestamp: number; status: number; error: string; message: string; path: string; trace?: string; }
export interface GatewayPacket { t?: string; d?: unknown; op?: number; }
export interface VoiceServerUpdate { guild_id: string; token: string; endpoint: string; }
export interface VoiceStateUpdate { guild_id: string; session_id: string; channel_id: string | null; }
