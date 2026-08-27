/** Serializable player recovery snapshot. */
export interface PlayerSnapshot {
    /** Guild identifier. */
    guildId: string;
    /** Node identifier, when known. */
    nodeId?: string;
    /** Encoded current track, when playing. */
    track?: string;
    /** Playback position in milliseconds. */
    position: number;
    /** Pause state. */
    paused: boolean;
    /** Volume. */
    volume: number;
    /** Serialized queue. */
    queue: unknown[];
    /** Unix timestamp at which the snapshot was produced. */
    updatedAt: number;
}

/**
 * Storage adapter used for crash recovery and optional long-lived player state.
 *
 * @typeParam Snapshot Snapshot representation persisted by the adapter.
 */
export interface PersistenceAdapter<Snapshot = PlayerSnapshot> {
    /** Saves or replaces a snapshot. */
    save(key: string, snapshot: Snapshot): Promise<void>;
    /** Loads a snapshot by key. */
    load(key: string): Promise<Snapshot | undefined>;
    /** Deletes a snapshot. */
    delete(key: string): Promise<void>;
    /** Lists stored snapshot keys. */
    keys(): Promise<string[]>;
}

/**
 * No-op persistence adapter for applications that do not need durable state.
 */
export class NoopPersistenceAdapter implements PersistenceAdapter {
    /** @inheritdoc */
    public async save(): Promise<void> {}
    /** @inheritdoc */
    public async load(): Promise<undefined> { return undefined; }
    /** @inheritdoc */
    public async delete(): Promise<void> {}
    /** @inheritdoc */
    public async keys(): Promise<string[]> { return []; }
}
