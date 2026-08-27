import type { PlayerSnapshot } from './Types';

/** Persistence adapter for player recovery state. */
export interface PersistenceAdapter {
    /** Saves a guild player snapshot. */
    save(guildId: string, snapshot: PlayerSnapshot): void | Promise<void>;
    /** Loads a guild player snapshot. */
    load(guildId: string): PlayerSnapshot | undefined | Promise<PlayerSnapshot | undefined>;
    /** Removes a guild player snapshot. */
    remove(guildId: string): void | Promise<void>;
}

/** Dependency-free persistence adapter for tests and single-process applications. */
export class MemoryPersistence implements PersistenceAdapter {
    /** Stored snapshots keyed by guild ID. */
    private readonly snapshots = new Map<string, PlayerSnapshot>();
    /** Saves a defensive copy of a player snapshot. */
    public save(guildId: string, snapshot: PlayerSnapshot): void { this.snapshots.set(guildId, structuredClone(snapshot)); }
    /** Loads a defensive copy of a player snapshot. */
    public load(guildId: string): PlayerSnapshot | undefined { const value = this.snapshots.get(guildId); return value ? structuredClone(value) : undefined; }
    /** Removes a persisted player snapshot. */
    public remove(guildId: string): void { this.snapshots.delete(guildId); }
}
