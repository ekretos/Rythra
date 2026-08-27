import type { Track } from './Types';

/**
 * Ordered collection of tracks waiting for playback.
 *
 * @remarks
 * Queue extends the native array API while providing Rythra-specific state
 * for the current track and playback history.
 *
 * @extends Array<Track>
 */
export class Queue extends Array<Track> {
    /** The track currently selected for playback. */
    public current: Track | null = null;
    /** Tracks that have already completed or been skipped, newest first. */
    public previous: Track[] = [];

    /**
     * Adds one or more tracks to the end of the queue.
     *
     * @param track Track or tracks to append.
     */
    public add(track: Track | Track[]): void {
        if (Array.isArray(track)) this.push(...track);
        else this.push(track);
    }

    /**
     * Removes a track at a specific queue index.
     *
     * @param index Zero-based index of the track to remove.
     * @returns The removed track, or `undefined` when no track exists at the index.
     */
    public remove(index: number): Track | undefined {
        return this.splice(index, 1)[0];
    }

    /**
     * Removes every pending track from the queue.
     *
     * @remarks
     * The current track and playback history are intentionally preserved.
     */
    public clear(): void {
        this.length = 0;
    }

    /**
     * Randomly reorders all pending tracks using Fisher-Yates shuffling.
     */
    public shuffle(): void {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this[i] as Track;
            this[i] = this[j] as Track;
            this[j] = temp;
        }
    }
}
