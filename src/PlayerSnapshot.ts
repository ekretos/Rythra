import type { Filters, Track } from './Types';

/** Durable state required to restore a player after node migration/restart. */
export interface PlayerSnapshot {
    /** Guild ID. */ guildId: string;
    /** Assigned voice channel ID. */ voiceChannel: string;
    /** Text channel ID. */ textChannel: string;
    /** Current track, if any. */ current: Track | null;
    /** Pending queue. */ queue: Track[];
    /** Playback position in milliseconds. */ position: number;
    /** Pause state. */ paused: boolean;
    /** Volume. */ volume: number;
    /** Active filters. */ filters: Filters;
}
