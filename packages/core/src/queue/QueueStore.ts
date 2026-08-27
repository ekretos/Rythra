/**
 * Pluggable storage contract for pending playback tracks.
 *
 * @typeParam Track The track representation stored by the queue.
 */
export interface QueueStore<Track = unknown> {
    /** Number of pending tracks. */
    readonly size: number;
    /** Appends one track. */ add(track: Track): void;
    /** Appends multiple tracks in order. */ addMany(tracks: readonly Track[]): void;
    /** Removes and returns the first pending track. */ shift(): Track | undefined;
    /** Removes a track by zero-based index. */ remove(index: number): Track | undefined;
    /** Removes all pending tracks. */ clear(): void;
    /** Randomizes pending tracks. */ shuffle(): void;
    /** Returns a point-in-time array snapshot. */ snapshot(): Track[];
}

/** In-memory FIFO queue implementation. */
export class MemoryQueueStore<Track = unknown> implements QueueStore<Track> {
    protected readonly items: Track[] = [];
    public get size(): number { return this.items.length; }
    public add(track: Track): void { this.items.push(track); }
    public addMany(tracks: readonly Track[]): void { this.items.push(...tracks); }
    public shift(): Track | undefined { return this.items.shift(); }
    public remove(index: number): Track | undefined {
        if (index < 0 || index >= this.items.length) return undefined;
        return this.items.splice(index, 1)[0];
    }
    public clear(): void { this.items.length = 0; }
    public shuffle(): void {
        for (let i = this.items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const current = this.items[i]!;
            const replacement = this.items[j]!;
            this.items[i] = replacement;
            this.items[j] = current;
        }
    }
    public snapshot(): Track[] { return this.items.slice(); }
}
