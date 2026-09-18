import type { Node } from '../node/Node';
import type { RythraPlayer } from '../player/Player';

/**
 * Keyed registry of runtime entities owned by the Rythra kernel.
 *
 * @remarks
 * The registry extends {@link Map} so existing consumers keep the familiar
 * `get`/`set`/`values` surface while the kernel gains domain-aware lookups.
 *
 * @typeParam V The registered entity type.
 */
export class Registry<V> extends Map<string, V> {
    /** Returns every registered entry. */
    public list(): V[] { return [...this.values()]; }
    /** Returns the registered entries matching a predicate. */
    public filter(predicate: (value: V) => boolean): V[] { return this.list().filter(predicate); }
}

/** Registry of Lavalink nodes managed by a Rythra runtime. */
export class NodeRegistry extends Registry<Node> {
    /** Returns the nodes whose transport is currently connected. */
    public connected(): Node[] { return this.filter((node) => node.connected); }
    /** Returns the nodes eligible to receive work, preferring connected nodes. */
    public available(): Node[] { const connected = this.connected(); return connected.length ? connected : this.list(); }
}

/** Registry of guild players managed by a Rythra runtime. */
export class PlayerRegistry extends Registry<RythraPlayer> {
    /** Returns the players that currently have a track playing. */
    public playing(): RythraPlayer[] { return this.filter((player) => player.playing); }
}
