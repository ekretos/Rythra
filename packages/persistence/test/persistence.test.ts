import { describe, expect, test } from 'bun:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { FilePersistenceAdapter, MemoryPersistenceAdapter } from '../src/index.js';

const snap = { guildId: '1', position: 10, paused: false, volume: 100, queue: [], updatedAt: 1 };

describe('persistence adapters', () => {
    test('memory adapter round-trips', async () => {
        const a = new MemoryPersistenceAdapter();
        await a.save('1', snap);
        expect(await a.load('1')).toEqual(snap);
        expect(await a.keys()).toEqual(['1']);
        await a.delete('1');
        expect(await a.load('1')).toBeUndefined();
    });
    test('file adapter persists across instances', async () => {
        const dir = await mkdtemp(join(tmpdir(), 'rythra-'));
        try {
            const path = join(dir, 'nested', 'state.json');
            await Promise.all([new FilePersistenceAdapter(path).save('1', snap)]);
            const b = new FilePersistenceAdapter(path);
            expect(await b.load('1')).toEqual(snap);
            await b.delete('1');
            expect(await b.keys()).toEqual([]);
        } finally { await rm(dir, { recursive: true, force: true }); }
    });
});

describe('FilePersistenceAdapter recovery', () => {
    test('recovers from a corrupt file and keeps it aside', async () => {
        const dir = await mkdtemp(join(tmpdir(), 'rythra-'));
        try {
            const path = join(dir, 'state.json');
            await Bun.write(path, '{not json');
            const adapter = new FilePersistenceAdapter(path);
            expect(await adapter.keys()).toEqual([]);
            await adapter.save('1', snap);
            expect(await adapter.load('1')).toEqual(snap);
            expect(await Bun.file(`${path}.corrupt`).text()).toBe('{not json');
        } finally { await rm(dir, { recursive: true, force: true }); }
    });
});
