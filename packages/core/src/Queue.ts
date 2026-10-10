import type { Track } from '@rythra/types';

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
    /** Maximum number of tracks retained in {@link Queue.previous}. */
    public static maxHistory = 100;

    /** Records a finished track in the bounded history, newest first. */
    public pushHistory(track: Track): void {
        this.previous.unshift(track);
        if (this.previous.length > Queue.maxHistory) this.previous.length = Queue.maxHistory;
    }

    /** Adds one or more tracks to the end of the queue. */
    public add(track: Track | Track[]): void {
        if (Array.isArray(track)) for (const item of track) this.push(item);
        else this.push(track);
    }

    /** Removes a track at a specific queue index. */
    public remove(index: number): Track | undefined { return this.splice(index, 1)[0]; }

    /** Removes every pending track while preserving current/history state. */
    public clear(): void { this.length = 0; }

    /** Randomly reorders pending tracks using Fisher-Yates shuffling. */
    public shuffle(): void {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this[i] as Track;
            this[i] = this[j] as Track;
            this[j] = temp;
        }
    }
}
