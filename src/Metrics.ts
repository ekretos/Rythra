import { EventEmitter } from 'node:events';

/** Snapshot of Rythra runtime counters. */
export interface MetricsSnapshot {
    /** Current node count. */ nodes: number;
    /** Current player count. */ players: number;
    /** Current playing player count. */ playingPlayers: number;
    /** Node reconnect count. */ reconnects: number;
    /** Player failover count. */ failovers: number;
    /** Track start count. */ trackStarts: number;
    /** Track exception count. */ trackExceptions: number;
    /** REST error count. */ restErrors: number;
    /** Metrics start timestamp. */ startedAt: number;
}

/** Lightweight dependency-free metrics collector. */
export class Metrics extends EventEmitter {
    /** Mutable runtime counters. */
    private readonly counters = { reconnects: 0, failovers: 0, trackStarts: 0, trackExceptions: 0, restErrors: 0 };
    /** Timestamp at which collection started. */
    public readonly startedAt = Date.now();
    /** Increments a named counter. */
    public increment(counter: keyof typeof this.counters): void { this.counters[counter]++; this.emit('metric', counter, this.counters[counter]); }
    /** Records a reconnect. */ public reconnect(): void { this.increment('reconnects'); }
    /** Records a player failover. */ public failover(): void { this.increment('failovers'); }
    /** Records a track start. */ public trackStart(): void { this.increment('trackStarts'); }
    /** Records a track exception. */ public trackException(): void { this.increment('trackExceptions'); }
    /** Records a REST error. */ public restError(): void { this.increment('restErrors'); }
    /** Returns a point-in-time snapshot. */
    public snapshot(nodes = 0, players = 0, playingPlayers = 0): MetricsSnapshot { return { nodes, players, playingPlayers, ...this.counters, startedAt: this.startedAt }; }
}
