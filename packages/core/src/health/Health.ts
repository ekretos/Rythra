/** A point-in-time health snapshot for a Rythra manager. */
export interface HealthSnapshot { /** Whether at least one configured node is healthy. */ healthy: boolean; /** Configured node count. */ nodes: number; /** Connected node count. */ connectedNodes: number; /** Managed player count. */ players: number; /** Playing player count. */ playingPlayers: number; /** Reconnect attempts. */ reconnects: number; /** Player migrations. */ migrations: number; /** Manager uptime. */ uptime: number; }

/** Collects lightweight runtime health information without network I/O. */
export class Health {
    /** Creates a health collector. */
    public constructor(private readonly manager: { nodes: Map<string, { connected: boolean; stats: { players: number; playingPlayers: number } }>; players: Map<string, { playing: boolean }>; startedAt?: number; reconnects?: number; migrations?: number }) {}
    /** Returns a point-in-time health snapshot. */
    public snapshot(): HealthSnapshot {
        const nodes = [...this.manager.nodes.values()]; const connectedNodes = nodes.filter((node) => node.connected).length; const players = [...this.manager.players.values()];
        return { healthy: nodes.length > 0 && connectedNodes > 0, nodes: nodes.length, connectedNodes, players: players.length, playingPlayers: players.filter((player) => player.playing).length, reconnects: this.manager.reconnects ?? 0, migrations: this.manager.migrations ?? 0, uptime: this.manager.startedAt ? Date.now() - this.manager.startedAt : 0 };
    }
}
