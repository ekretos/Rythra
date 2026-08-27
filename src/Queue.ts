import type { Track } from './Types';
import { MemoryQueueStore, type QueueStore } from './QueueStore';

/** Queue facade backed by a pluggable {@link QueueStore}. */
export class Queue implements Iterable<Track> {
    /** Storage implementation used by this queue. */
    public readonly store: QueueStore;
    /** The currently playing track. */
    public current: Track | null = null;
    /** Previously played tracks, newest first. */
    public previous: Track[] = [];

    /** Creates a queue using the supplied store or an in-memory store. */
    constructor(store: QueueStore = new MemoryQueueStore()) { this.store = store; }
    /** Number of pending tracks. */
    public get length(): number { return this.store.size; }
    /** Adds one or more tracks. */
    public add(track: Track | Track[]): void | Promise<void> { return this.store.add(track); }
    /** Removes and returns the next pending track. */
    public shift(): Track | undefined | Promise<Track | undefined> { return this.store.shift(); }
    /** Removes a pending track by index. */
    public remove(index: number): Track | undefined | Promise<Track | undefined> { return this.store.remove(index); }
    /** Returns a pending track by index. */
    public get(index: number): Track | undefined | Promise<Track | undefined> { return this.store.get(index); }
    /** Returns all pending tracks. */
    public toArray(): Track[] | Promise<Track[]> { return this.store.all(); }
    /** Removes all pending tracks. */
    public clear(): void | Promise<void> { return this.store.clear(); }
    /** Shuffles all pending tracks. */
    public shuffle(): void | Promise<void> { return this.store.shuffle(); }

    /** Iterates synchronously when the built-in memory store is used. */
    public *[Symbol.iterator](): Iterator<Track> {
        if (this.store instanceof MemoryQueueStore) yield* this.store.all();
    }
}
