/**
 * Minimal metrics boundary for Rythra observability.
 *
 * Keeping metrics behind an adapter allows applications to connect Prometheus,
 * OpenTelemetry, StatsD, or a custom telemetry backend without adding those
 * dependencies to the core package.
 */
export interface RythraMetricsAdapter {
    /** Increment a counter by the supplied amount. */
    counter(name: string, value?: number): void;

    /** Record the current value of a gauge. */
    gauge(name: string, value: number): void;

    /** Record an observation in a histogram. */
    histogram(name: string, value: number): void;
}
