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

    /** Adds one or more tracks to the end of the queue. */
    public add(track: Track | Track[]): void {
        if (Array.isArray(track)) this.push(...track);
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
