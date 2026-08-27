/**
 * Persistence boundary used by recovery and application integrations.
 *
 * Implementations may back this contract with Redis, SQL, a document store,
 * or an in-memory implementation for tests. The core does not depend on any
 * particular storage engine.
 */
export interface RythraPersistenceAdapter<T = unknown> {
    /** Read a previously stored value. */
    get(key: string): Promise<T | undefined>;

    /** Store or replace a value. */
    set(key: string, value: T): Promise<void>;

    /** Remove a value. */
    delete(key: string): Promise<void>;

    /** Flush pending writes before shutdown. */
    flush?(): Promise<void>;
}
