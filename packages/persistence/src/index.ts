import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import type { PersistenceAdapter, PlayerSnapshot } from '@rythra/core';

/** In-memory persistence adapter, useful for tests and single-process setups. */
export class MemoryPersistenceAdapter<Snapshot = PlayerSnapshot> implements PersistenceAdapter<Snapshot> {
    private readonly store = new Map<string, Snapshot>();

    /** @inheritdoc */
    public async save(key: string, snapshot: Snapshot): Promise<void> { this.store.set(key, structuredClone(snapshot)); }
    /** @inheritdoc */
    public async load(key: string): Promise<Snapshot | undefined> {
        const value = this.store.get(key);
        return value === undefined ? undefined : structuredClone(value);
    }
    /** @inheritdoc */
    public async delete(key: string): Promise<void> { this.store.delete(key); }
    /** @inheritdoc */
    public async keys(): Promise<string[]> { return [...this.store.keys()]; }
}

/** Persistence adapter that stores all snapshots in a single JSON file. */
export class FilePersistenceAdapter<Snapshot = PlayerSnapshot> implements PersistenceAdapter<Snapshot> {
    private queue: Promise<unknown> = Promise.resolve();

    /** @param path JSON file used for storage. */
    constructor(private readonly path: string) {}

    private async read(): Promise<Record<string, Snapshot>> {
        try {
            return JSON.parse(await readFile(this.path, 'utf8')) as Record<string, Snapshot>;
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') return {};
            if (error instanceof SyntaxError) {
                // Corrupt state must not brick persistence: keep the bad file for inspection and start empty.
                await rename(this.path, `${this.path}.corrupt`).catch(() => undefined);
                return {};
            }
            throw error;
        }
    }

    private update<T>(task: () => Promise<T>): Promise<T> {
        const run = this.queue.then(task, task);
        this.queue = run.catch(() => undefined);
        return run;
    }

    private async mutate(change: (data: Record<string, Snapshot>) => void): Promise<void> {
        await this.update(async () => {
            const data = await this.read();
            change(data);
            await mkdir(dirname(this.path), { recursive: true });
            const temp = `${this.path}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`;
            await writeFile(temp, JSON.stringify(data));
            await rename(temp, this.path);
        });
    }

    /** @inheritdoc */
    public save(key: string, snapshot: Snapshot): Promise<void> { return this.mutate((data) => { data[key] = snapshot; }); }
    /** @inheritdoc */
    public load(key: string): Promise<Snapshot | undefined> { return this.update(async () => (await this.read())[key]); }
    /** @inheritdoc */
    public delete(key: string): Promise<void> { return this.mutate((data) => { delete data[key]; }); }
    /** @inheritdoc */
    public keys(): Promise<string[]> { return this.update(async () => Object.keys(await this.read())); }
}
