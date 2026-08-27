import type { Track } from './Types';

/**
 * Storage contract used by a Rythra player queue.
 *
 * @remarks
 * Implementations may keep data in memory, Redis, a database, or any custom
 * storage system. The player only depends on this contract.
 */
export interface QueueStore {
    /** Number of pending tracks. */
    readonly size: number;
    /** Adds one or more tracks to the queue. */
    add(tracks: Track | Track[]): void | Promise<void>;
    /** Removes and returns the next pending track. */
    shift(): Track | undefined | Promise<Track | undefined>;
    /** Removes a track by zero-based index. */
    remove(index: number): Track | undefined | Promise<Track | undefined>;
    /** Returns a track without removing it. */
    get(index: number): Track | undefined | Promise<Track | undefined>;
    /** Returns a snapshot of all pending tracks. */
    all(): Track[] | Promise<Track[]>;
    /** Removes every pending track. */
    clear(): void | Promise<void>;
    /** Randomizes the pending tracks. */
    shuffle(): void | Promise<void>;
}

/** Default dependency-free in-memory queue store. */
export class MemoryQueueStore implements QueueStore {
    /** Internal pending track collection. */
    protected readonly tracks: Track[] = [];

    /** Number of pending tracks. */
    public get size(): number { return this.tracks.length; }
    /** Adds one or more tracks to the queue. */
    public add(tracks: Track | Track[]): void { this.tracks.push(...(Array.isArray(tracks) ? tracks : [tracks])); }
    /** Removes and returns the next pending track. */
    public shift(): Track | undefined { return this.tracks.shift(); }
    /** Removes a track by index. */
    public remove(index: number): Track | undefined { return this.tracks.splice(index, 1)[0]; }
    /** Returns a track without removing it. */
    public get(index: number): Track | undefined { return this.tracks[index]; }
    /** Returns a copy of the pending tracks. */
    public all(): Track[] { return [...this.tracks]; }
    /** Removes every pending track. */
    public clear(): void { this.tracks.length = 0; }
    /** Randomizes pending tracks using Fisher-Yates. */
    public shuffle(): void {
        for (let i = this.tracks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tracks[i], this.tracks[j]] = [this.tracks[j], this.tracks[i]];
        }
    }
}
