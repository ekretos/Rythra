/** Lifecycle states of a Lavalink node runtime. */
export type NodeState = 'disconnected' | 'connecting' | 'ready' | 'degraded' | 'draining';

/** Transitions accepted by {@link NodeStateMachine} for every node state. */
export const NODE_STATE_TRANSITIONS: Readonly<Record<NodeState, readonly NodeState[]>> = {
    disconnected: ['connecting', 'draining'],
    connecting: ['ready', 'degraded', 'disconnected', 'draining'],
    ready: ['degraded', 'disconnected', 'draining'],
    degraded: ['connecting', 'ready', 'disconnected', 'draining'],
    draining: ['disconnected'],
};

/** Callback invoked whenever a node state machine changes state. */
export type NodeStateListener = (to: NodeState, from: NodeState) => void;

/**
 * Small state machine describing the lifecycle of a Lavalink node.
 *
 * @remarks
 * Node lifecycle used to be tracked with ad-hoc boolean flags. Routing every
 * change through a single machine keeps reconnects, draining and health
 * reporting consistent, and makes illegal transitions observable instead of
 * silently corrupting state.
 */
export class NodeStateMachine {
    /** The current node state. */
    private current: NodeState = 'disconnected';

    /** Creates a state machine, optionally observing every accepted transition. */
    public constructor(private readonly onTransition?: NodeStateListener) {}

    /** The current node state. */
    public get state(): NodeState { return this.current; }

    /** Determines whether a transition to the given state is accepted. */
    public can(to: NodeState): boolean { return NODE_STATE_TRANSITIONS[this.current].includes(to); }

    /**
     * Moves the machine to a new state.
     *
     * @param to The requested state.
     * @returns `true` when the state changed, `false` for a repeated or illegal transition.
     */
    public transition(to: NodeState): boolean {
        if (to === this.current || !this.can(to)) return false;
        const from = this.current;
        this.current = to;
        this.onTransition?.(to, from);
        return true;
    }
}
