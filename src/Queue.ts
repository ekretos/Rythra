import type { Track } from "./Types";

/**
 * A queue of tracks to be played.
 * @extends Array
 */
export class Queue extends Array<Track> {
    /** The currently playing track. */
    public current: Track | null = null;
    /** An array of previously played tracks. */
    public previous: Track[] = [];

    /**
     * Adds tracks to the queue.
     * @param track A single track or an array of tracks to add.
     */
    public add(track: Track | Track[]): void {
        if (Array.isArray(track)) {
            this.push(...track);
        } else {
            this.push(track);
        }
    }

    /**
     * Removes a track from the queue at the specified index.
     * @param index The index of the track to remove.
     * @returns The removed track, or undefined if the index is out of bounds.
     */
    public remove(index: number): Track | undefined {
        return this.splice(index, 1)[0];
    }

    /**
     * Clears all tracks from the queue.
     */
    public clear(): void {
        this.length = 0;
    }

    /**
     * Randomly shuffles the tracks in the queue.
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
