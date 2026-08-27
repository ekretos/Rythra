/**
 * Pluggable storage contract for pending playback tracks.
 *
 * @typeParam Track The track representation stored by the queue.
 */
export interface QueueStore<Track = unknown> {
    /** Number of pending tracks. */
    readonly size: number;

    /**
     * Appends one track.
     * @param track Track to append.
     */
    add(track: Track): void;

    /**
     * Appends multiple tracks in order.
     * @param tracks Tracks to append.
     */
    addMany(tracks: readonly Track[]): void;

    /**
     * Removes and returns the first pending track.
     * @returns The next track, or `undefined` when empty.
     */
    shift(): Track | undefined;

    /**
     * Removes a track by zero-based index.
     * @param index Queue index.
     * @returns The removed track, if present.
     */
    remove(index: number): Track | undefined;

    /** Removes all pending tracks. */
    clear(): void;

    /** Randomizes pending tracks. */
    shuffle(): void;

    /** Returns a point-in-time array snapshot. */
    snapshot(): Track[];
}

/**
 * In-memory FIFO queue implementation.
 *
 * @typeParam Track The track representation stored by the queue.
 */
export class MemoryQueueStore<Track = unknown> implements QueueStore<Track> {
    /** Backing storage. */
    protected readonly items: Track[] = [];

    /** Number of pending tracks. */
    public get size(): number { return this.items.length; }

    /** @inheritdoc */
    public add(track: Track): void { this.items.push(track); }

    /** @inheritdoc */
    public addMany(tracks: readonly Track[]): void { this.items.push(...tracks); }

    /** @inheritdoc */
    public shift(): Track | undefined { return this.items.shift(); }

    /** @inheritdoc */
    public remove(index: number): Track | undefined { return index >= 0 && index < this.items.length ? this.items.splice(index, 1)[0] : undefined; }

    /** @inheritdoc */
    public clear(): void { this.items.length = 0; }

    /** @inheritdoc */
    public shuffle(): void {
        for (let i = this.items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
        }
    }

    /** @inheritdoc */
    public snapshot(): Track[] { return this.items.slice(); }
}
