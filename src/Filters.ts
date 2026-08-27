import type { Filters } from './Types';

/** Validated filter state manager for a Lavalink player. */
export class FilterManager {
    /** Current filter state. */
    private state: Filters = {};

    /** Returns a defensive copy of active filters. */
    public get(): Filters { return structuredClone(this.state); }
    /** Replaces the complete filter state after validation. */
    public set(filters: Filters): Filters { validateFilters(filters); this.state = structuredClone(filters); return this.get(); }
    /** Merges filter fields into the current state after validation. */
    public patch(filters: Filters): Filters { validateFilters(filters); this.state = { ...this.state, ...structuredClone(filters) }; return this.get(); }
    /** Clears all active filters. */
    public clear(): Filters { this.state = {}; return this.get(); }
}

/** Validates Lavalink filter ranges before a request is sent. */
export function validateFilters(filters: Filters): void {
    if (filters.volume !== undefined && (!Number.isFinite(filters.volume) || filters.volume < 0 || filters.volume > 5)) throw new RangeError('Filter volume must be between 0 and 5.');
    for (const band of filters.equalizer ?? []) {
        if (!Number.isInteger(band.band) || band.band < 0 || band.band > 14) throw new RangeError('Equalizer band must be between 0 and 14.');
        if (!Number.isFinite(band.gain) || band.gain < -0.25 || band.gain > 1) throw new RangeError('Equalizer gain must be between -0.25 and 1.');
    }
    const groups: Array<[keyof Filters, string[]]> = [['timescale', ['speed', 'pitch', 'rate']], ['tremolo', ['frequency', 'depth']], ['vibrato', ['frequency', 'depth']], ['rotation', ['rotationHz']], ['lowPass', ['smoothing']]];
    for (const [group, keys] of groups) {
        const value = filters[group] as Record<string, unknown> | undefined;
        if (!value) continue;
        for (const key of keys) if (value[key] !== undefined && typeof value[key] !== 'number') throw new TypeError(`${group}.${key} must be a number.`);
        for (const key of keys) if (value[key] !== undefined && !Number.isFinite(value[key] as number)) throw new TypeError(`${group}.${key} must be finite.`);
    }
}
