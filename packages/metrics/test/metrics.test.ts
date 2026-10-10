import { describe, expect, test } from 'bun:test';
import { PrometheusMetricsAdapter, toPrometheus, toStatsD } from '../src/index.js';

const snapshot = { connectedNodes: 2, players: 3, playingPlayers: 1, reconnects: 4, migrations: 0, restErrors: 5, averageRestLatencyMs: 12.5 };

describe('metrics exporters', () => {
    test('renders prometheus text', () => {
        const text = toPrometheus(snapshot);
        expect(text).toContain('rythra_players 3');
        expect(text).toContain('# TYPE rythra_reconnects_total counter');
    });
    test('renders statsd lines', () => {
        expect(toStatsD(snapshot)).toContain('rythra.connected_nodes:2|g');
    });
    test('adapter aggregates values', () => {
        const adapter = new PrometheusMetricsAdapter();
        adapter.counter('hits');
        adapter.counter('hits', 2);
        adapter.gauge('g', 7);
        adapter.histogram('h', 4);
        adapter.histogram('h', 6);
        const text = adapter.render();
        expect(text).toContain('rythra_hits_total 3');
        expect(text).toContain('rythra_g 7');
        expect(text).toContain('rythra_h_sum 10');
        expect(text).toContain('rythra_h_count 2');
    });
});
