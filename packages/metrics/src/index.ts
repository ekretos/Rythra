import type { MetricsSnapshot, RythraMetricsAdapter } from '@rythra/core';

const sanitize = (name: string): string => name.replace(/[^a-zA-Z0-9_:]/g, '_');

const FIELDS: ReadonlyArray<readonly [keyof MetricsSnapshot, string, string]> = [
    ['connectedNodes', 'connected_nodes', 'Number of connected Lavalink nodes'],
    ['players', 'players', 'Number of active players'],
    ['playingPlayers', 'playing_players', 'Number of players currently playing'],
    ['reconnects', 'reconnects_total', 'Total node reconnect attempts'],
    ['migrations', 'migrations_total', 'Total player migrations'],
    ['restErrors', 'rest_errors_total', 'Total failed REST requests'],
    ['averageRestLatencyMs', 'rest_latency_avg_ms', 'Average REST latency in milliseconds'],
];

/** Renders a core metrics snapshot in the Prometheus text exposition format. */
export function toPrometheus(snapshot: MetricsSnapshot, prefix = 'rythra'): string {
    const lines: string[] = [];
    for (const [key, name, help] of FIELDS) {
        const metric = `${sanitize(prefix)}_${name}`;
        lines.push(`# HELP ${metric} ${help}`, `# TYPE ${metric} ${name.endsWith('_total') ? 'counter' : 'gauge'}`, `${metric} ${snapshot[key]}`);
    }
    return lines.join('\n') + '\n';
}

/** Renders a core metrics snapshot as StatsD lines. */
export function toStatsD(snapshot: MetricsSnapshot, prefix = 'rythra'): string[] {
    return FIELDS.map(([key, name]) => `${prefix}.${name}:${snapshot[key]}|g`);
}

/** In-memory {@link RythraMetricsAdapter} that can render its values for Prometheus. */
export class PrometheusMetricsAdapter implements RythraMetricsAdapter {
    private readonly counters = new Map<string, number>();
    private readonly gauges = new Map<string, number>();
    private readonly histograms = new Map<string, { sum: number; count: number }>();

    /** @param prefix Metric name prefix. */
    constructor(private readonly prefix = 'rythra') {}

    /** @inheritdoc */
    public counter(name: string, value = 1): void { this.counters.set(name, (this.counters.get(name) ?? 0) + value); }
    /** @inheritdoc */
    public gauge(name: string, value: number): void { this.gauges.set(name, value); }
    /** @inheritdoc */
    public histogram(name: string, value: number): void {
        const entry = this.histograms.get(name) ?? { sum: 0, count: 0 };
        entry.sum += value;
        entry.count++;
        this.histograms.set(name, entry);
    }

    /** Renders all recorded values in the Prometheus text exposition format. */
    public render(): string {
        const p = sanitize(this.prefix);
        const lines: string[] = [];
        for (const [name, value] of this.counters) {
            const metric = `${p}_${sanitize(name)}${name.endsWith('_total') ? '' : '_total'}`;
            lines.push(`# TYPE ${metric} counter`, `${metric} ${value}`);
        }
        for (const [name, value] of this.gauges) lines.push(`# TYPE ${p}_${sanitize(name)} gauge`, `${p}_${sanitize(name)} ${value}`);
        for (const [name, { sum, count }] of this.histograms) {
            const metric = `${p}_${sanitize(name)}`;
            lines.push(`# TYPE ${metric} summary`, `${metric}_sum ${sum}`, `${metric}_count ${count}`);
        }
        return lines.length ? lines.join('\n') + '\n' : '';
    }
}
