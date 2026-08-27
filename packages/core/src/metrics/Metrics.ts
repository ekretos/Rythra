/** Snapshot of runtime counters and latency measurements. */
export interface MetricsSnapshot {
    /** Number of nodes currently connected. */
    connectedNodes: number;
    /** Number of active players. */
    players: number;
    /** Number of players currently playing. */
    playingPlayers: number;
    /** Total node reconnect attempts. */
    reconnects: number;
    /** Total player migrations. */
    migrations: number;
    /** Total failed REST requests. */
    restErrors: number;
    /** Average recorded REST latency in milliseconds. */
    averageRestLatencyMs: number;
}

/**
 * Lightweight dependency-free metrics collector.
 *
 * @remarks
 * Applications can export snapshots to Prometheus, OpenTelemetry or their own
 * telemetry backend without coupling Rythra to a specific observability stack.
 */
export class Metrics {
    private connectedNodes = 0;
    private players = 0;
    private playingPlayers = 0;
    private reconnects = 0;
    private migrations = 0;
    private restErrors = 0;
    private restLatencyTotal = 0;
    private restRequests = 0;

    /** Sets the current node count. */
    public setConnectedNodes(value: number): void { this.connectedNodes = Math.max(0, value); }
    /** Sets the current player count. */
    public setPlayers(value: number): void { this.players = Math.max(0, value); }
    /** Sets the current playing-player count. */
    public setPlayingPlayers(value: number): void { this.playingPlayers = Math.max(0, value); }
    /** Records a reconnect attempt. */
    public recordReconnect(): void { this.reconnects++; }
    /** Records a player migration. */
    public recordMigration(): void { this.migrations++; }
    /** Records a failed REST request. */
    public recordRestError(): void { this.restErrors++; }
    /** Records one REST request latency sample. */
    public recordRestLatency(milliseconds: number): void {
        if (!Number.isFinite(milliseconds) || milliseconds < 0) return;
        this.restLatencyTotal += milliseconds;
        this.restRequests++;
    }

    /** Returns a point-in-time metrics snapshot. */
    public snapshot(): MetricsSnapshot {
        return {
            connectedNodes: this.connectedNodes,
            players: this.players,
            playingPlayers: this.playingPlayers,
            reconnects: this.reconnects,
            migrations: this.migrations,
            restErrors: this.restErrors,
            averageRestLatencyMs: this.restRequests ? this.restLatencyTotal / this.restRequests : 0,
        };
    }

    /** Resets counters while retaining no historical samples. */
    public reset(): void {
        this.connectedNodes = this.players = this.playingPlayers = this.reconnects = this.migrations = this.restErrors = 0;
        this.restLatencyTotal = this.restRequests = 0;
    }
}
