/**
 * Lavalink filter configuration.
 *
 * @remarks
 * The core package deliberately keeps this type framework-agnostic so filter
 * state can be persisted, inspected and transported without a Discord dependency.
 */
export interface Filters {
    /** Global volume multiplier. */
    volume?: number;
    /** Equalizer band gains. */
    equalizer?: readonly { band: number; gain: number }[];
    /** Karaoke settings. */
    karaoke?: Record<string, number>;
    /** Timescale settings. */
    timescale?: Record<string, number>;
    /** Tremolo settings. */
    tremolo?: Record<string, number>;
    /** Vibrato settings. */
    vibrato?: Record<string, number>;
    /** Rotation settings. */
    rotation?: { rotationHz?: number };
    /** Distortion settings. */
    distortion?: Record<string, number>;
    /** Channel mix settings. */
    channelMix?: Record<string, number>;
    /** Low-pass settings. */
    lowPass?: { smoothing?: number };
    /** Plugin-defined filter payloads. */
    pluginFilters?: Record<string, unknown>;
}

/**
 * Validates and manages a player's filter state.
 */
export class FilterManager {
    /** Current immutable filter state. */
    private state: Filters = {};

    /** Returns a defensive copy of the current filters. */
    public get current(): Filters { return structuredClone(this.state); }

    /**
     * Replaces the complete filter state after validation.
     * @param filters New filter configuration.
     * @throws {RangeError} When a numeric filter value is outside a valid finite range.
     */
    public set(filters: Filters): Filters {
        this.validate(filters);
        this.state = structuredClone(filters);
        return this.current;
    }

    /** Removes every active filter. */
    public clear(): void { this.state = {}; }

    /**
     * Validates Lavalink filter input without mutating state.
     * @param filters Filter configuration to validate.
     */
    public validate(filters: Filters): void {
        if (filters.volume !== undefined && (!Number.isFinite(filters.volume) || filters.volume < 0)) {
            throw new RangeError('Filter volume must be a finite non-negative number.');
        }
        for (const band of filters.equalizer ?? []) {
            if (!Number.isInteger(band.band) || band.band < 0 || band.band > 14) throw new RangeError(`Invalid equalizer band: ${band.band}`);
            if (!Number.isFinite(band.gain) || band.gain < -0.25 || band.gain > 1) throw new RangeError(`Invalid equalizer gain: ${band.gain}`);
        }
    }
}
