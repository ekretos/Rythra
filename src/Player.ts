import { EventEmitter } from "node:events";
import { Node } from "./Node";
import { Queue } from "./Queue";
import type { PlayerOptions, Track } from "./Types";

/**
 * Manages audio playback for a specific guild.
 * @extends EventEmitter
 */
export class RythraPlayer extends EventEmitter {
    /** The node this player is connected to. */
    public readonly node: Node;
    /** The ID of the guild this player belongs to. */
    public readonly guild: string;
    /** The ID of the voice channel the player is currently in. */
    public voiceChannel: string;
    /** The ID of the text channel used for player updates. */
    public textChannel: string;
    /** Whether the player is currently playing a track. */
    public playing = false;
    /** Whether the player is currently paused. */
    public paused = false;
    /** The current volume of the player (0-1000). */
    public volume = 100;
    /** The current voice state of the player. */
    public voiceState: any = {};
    /** The track queue for this player. */
    public readonly queue: Queue = new Queue();

    /**
     * Creates a new RythraPlayer instance.
     * @param node The node this player will use.
     * @param options The options for the player.
     */
    constructor(node: Node, options: PlayerOptions) {
        super();
        this.node = node;
        this.guild = options.guild;
        this.voiceChannel = options.voiceChannel;
        this.textChannel = options.textChannel;

        this.on("TrackStartEvent", (data) => {
            this.playing = true;
            this.emit("trackStart", this.queue.current, data);
        });

        this.on("TrackEndEvent", (data) => {
            this.playing = false;

            // Only add to previous and clear if it's the track that actually ended
            if (this.queue.current && data.track === this.queue.current.encoded) {
                this.queue.previous.unshift(this.queue.current);
                this.queue.current = null;
            }

            if (data.reason !== "replaced" && data.reason !== "stopped") {
                if (this.node.manager.options.autoPlay && this.queue.length > 0) {
                    this.play();
                }
            }
            this.emit("trackEnd", data);
        });
    }

    /**
     * Starts playback of a track.
     * @param track The track to play (encoded string or Track object).
     * @param options Additional playback options.
     */
    public async play(track?: string | Track, options?: any): Promise<void> {
        if (track) {
            this.queue.add(typeof track === "string" ? { encoded: track } as Track : track);
        }

        if (!this.queue.current && this.queue.length > 0) {
            this.queue.current = this.queue.shift() ?? null;
        }

        if (!this.queue.current) {
            return;
        }

        const encoded = this.queue.current.encoded;
        await this.node.rest.updatePlayer({
            guildId: this.guild,
            playerOptions: {
                track: {
                    encoded,
                },
                ...options,
            },
        });

        this.playing = true;
        this.emit("start", this.queue.current);
    }

    /**
     * Stops audio playback.
     */
    public async stop(): Promise<void> {
        await this.node.rest.updatePlayer({
            guildId: this.guild,
            playerOptions: {
                track: {
                    encoded: null,
                },
            },
        });

        this.playing = false;
        this.emit("stop");
    }

    /**
     * Skips the current track and plays the next one in the queue.
     */
    public async skip(): Promise<void> {
        this.emit("trackSkip", this.queue.current);
        if (this.queue.current) this.queue.previous.unshift(this.queue.current);
        this.queue.current = null;

        if (this.queue.length > 0) {
            await this.play();
        } else {
            await this.stop();
        }
    }

    /**
     * Pauses or resumes audio playback.
     * @param pause Whether to pause the player.
     */
    public async pause(pause: boolean): Promise<void> {
        await this.node.rest.updatePlayer({
            guildId: this.guild,
            playerOptions: {
                paused: pause,
            },
        });

        this.paused = pause;
        this.emit("pause", pause);
    }

    /**
     * Sets the volume of the player.
     * @param volume The volume level (0-1000).
     */
    public async setVolume(volume: number): Promise<void> {
        await this.node.rest.updatePlayer({
            guildId: this.guild,
            playerOptions: {
                volume,
            },
        });

        this.volume = volume;
        this.emit("volume", volume);
    }

    /**
     * Connects the player to a voice channel.
     * @param options The connection options.
     */
    public connect(options?: { voiceChannel?: string, selfMute?: boolean, selfDeaf?: boolean }): void {
        this.voiceChannel = options?.voiceChannel ?? this.voiceChannel;
        this.node.manager.options.connector.sendPacket(0, { // Assuming shard 0
            op: 4,
            d: {
                guild_id: this.guild,
                channel_id: this.voiceChannel,
                self_mute: options?.selfMute ?? false,
                self_deaf: options?.selfDeaf ?? false,
            }
        }, false);
    }
}
