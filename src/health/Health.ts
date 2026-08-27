/** A point-in-time health snapshot for a Rythra manager. */
export interface HealthSnapshot {
    /** Whether every configured node is healthy enough to serve traffic. */
    healthy: boolean;
    /** Number of configured nodes. */
    nodes: number;
    /** Number of connected nodes. */
    connectedNodes: number;
    /** Number of managed players. */
    players: number;
    /** Number of players currently playing. */
    playingPlayers: number;
    /** Number of reconnect attempts recorded by the manager. */
    reconnects: number;
    /** Number of player migrations recorded by the manager. */
    migrations: number;
    /** Manager uptime in milliseconds. */
    uptime: number;
}

/**
 * Collects lightweight runtime health information without performing network I/O.
 *
 * @remarks
 * Health checks intentionally read local state only. Applications can expose
 * this object from their own HTTP health endpoint without making Rythra's core
 * depend on a web framework.
 */
export class Health {
    /**
     * Creates a health collector.
     *
     * @param manager Manager-like object containing node and player collections.
     */
    public constructor(private readonly manager: {
        nodes: Map<string, { connected: boolean; stats: { players: number; playingPlayers: number } }>;
        players: Map<string, { playing: boolean }>;
        startedAt?: number;
        reconnects?: number;
        migrations?: number;
    }) {}

    /**
     * Returns a point-in-time health snapshot.
     *
     * @returns Current local health information.
     */
    public snapshot(): HealthSnapshot {
        const nodes = [...this.manager.nodes.values()];
        const connectedNodes = nodes.filter((node) => node.connected).length;
        const players = [...this.manager.players.values()];

        return {
            healthy: nodes.length > 0 && connectedNodes > 0,
            nodes: nodes.length,
            connectedNodes,
            players: players.length,
            playingPlayers: players.filter((player) => player.playing).length,
            reconnects: this.manager.reconnects ?? 0,
            migrations: this.manager.migrations ?? 0,
            uptime: this.manager.startedAt ? Date.now() - this.manager.startedAt : 0,
        };
    }
}
