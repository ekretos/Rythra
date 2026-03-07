import { EventEmitter } from "node:events";
import { Rythra } from "./Rythra";
import type { NodeOptions } from "./Types";
import { Rest } from "./Rest";

/**
 * Represents a single Lavalink node connection.
 * @extends EventEmitter
 */
export class Node extends EventEmitter {
    /** The manager that created this node. */
    public readonly manager: Rythra;
    /** The configuration options for this node. */
    public readonly options: NodeOptions;
    /** The REST client used to interact with this node's API. */
    public readonly rest: Rest;
    /** The WebSocket instance for this node. */
    public ws: any | null = null;
    /** Real-time statistics received from the Lavalink node. */
    public stats: any = {
        players: 0,
        playingPlayers: 0,
        uptime: 0,
        memory: {
            free: 0,
            used: 0,
            allocated: 0,
            reservable: 0,
        },
        cpu: {
            cores: 0,
            systemLoad: 0,
            lavalinkLoad: 0,
        },
        frameStats: {
            sent: 0,
            nulled: 0,
            deficit: 0,
        },
    };
    /** The session ID assigned by the Lavalink node upon connection. */
    public sessionId: string | null = null;
    /** Whether the node is currently connected via WebSocket. */
    public connected = false;

    /**
     * Creates a new Node instance.
     * @param manager The Rythra manager instance.
     * @param options The configuration options for the node.
     */
    constructor(manager: Rythra, options: NodeOptions) {
        super();
        this.manager = manager;
        this.options = options;
        this.rest = new Rest(this);
    }

    /**
     * Gets the full REST API URL for this node.
     */
    public get restUrl(): string {
        const protocol = this.options.secure ? "https" : "http";
        const host = this.options.host;
        const port = this.options.port ? `:${this.options.port}` : "";
        return `${protocol}://${host}${port}/v4`;
    }

    /**
     * Establishes a WebSocket connection to the Lavalink node.
     */
    public connect(): void {
        if (this.connected) return;

        const protocol = this.options.secure ? "wss" : "ws";
        const host = this.options.host;
        const port = this.options.port ? `:${this.options.port}` : "";
        const url = `${protocol}://${host}${port}/v4/websocket`;
        this.ws = new WebSocket(url, {
            headers: {
                Authorization: this.options.password || "youshallnotpass",
                "Client-Name": `${this.manager.options.clientName || "Rythra"}/${this.manager.version}`,
                "User-Id": this.manager.options.clientId || this.manager.options.connector.getId() || "",
            },
            // @ts-ignore
            rejectUnauthorized: this.options.rejectUnauthorized ?? true,
        } as any);

        this.ws.onopen = () => {
            this.connected = true;
            this.emit("connect");
        };

        this.ws.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.op === "ready") {
                this.sessionId = data.sessionId;
                this.emit("ready");
            } else if (data.op === "stats") {
                this.stats = data;
                this.emit("stats", data);
            } else if (data.op === "event") {
                // Handle player events (TrackStartEvent, etc.)
                const player = this.manager.players.get(data.guildId);
                if (player) {
                    player.emit(data.type, data);
                }
            }
        };

        this.ws.onclose = () => {
            this.connected = false;
            this.emit("disconnect");
            // Basic reconnection logic
            setTimeout(() => this.connect(), this.options.retryInterval || 5000);
        };

        this.ws.onerror = (err: any) => {
            console.error(`WebSocket Error [${this.options.identifier}]:`, err.message || err);
            this.emit("error", err);
        };
    }

    /**
     * Disconnects the WebSocket from the Lavalink node.
     */
    public disconnect(): void {
        if (!this.connected) return;
        this.connected = false;
        this.emit("disconnect");
    }
}
