import { describe, expect, it } from 'bun:test';
import { Health } from '../../src/health/Health';

describe('Health', () => {
    it('reports local node and player health', () => {
        const health = new Health({
            startedAt: Date.now() - 1000,
            reconnects: 2,
            migrations: 1,
            nodes: new Map([
                ['a', { connected: true, stats: { players: 3, playingPlayers: 2 } }],
                ['b', { connected: false, stats: { players: 0, playingPlayers: 0 } }],
            ]),
            players: new Map([
                ['one', { playing: true }],
                ['two', { playing: false }],
            ]),
        });

        const snapshot = health.snapshot();

        expect(snapshot.healthy).toBe(true);
        expect(snapshot.nodes).toBe(2);
        expect(snapshot.connectedNodes).toBe(1);
        expect(snapshot.players).toBe(2);
        expect(snapshot.playingPlayers).toBe(1);
        expect(snapshot.reconnects).toBe(2);
        expect(snapshot.migrations).toBe(1);
        expect(snapshot.uptime).toBeGreaterThanOrEqual(1000);
    });
});
