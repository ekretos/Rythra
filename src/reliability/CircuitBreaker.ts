/** Runtime states of a node circuit breaker. */
export type CircuitState = 'closed' | 'open' | 'half-open';

/** Configuration for a node circuit breaker. */
export interface CircuitBreakerOptions {
    /** Number of consecutive failures required to open the circuit. */
    failureThreshold?: number;
    /** Time in milliseconds before an open circuit may probe the node again. */
    resetTimeout?: number;
}

/**
 * Small dependency-free circuit breaker for unreliable Lavalink nodes.
 *
 * @remarks
 * An open circuit prevents new work from being sent to a failing node. After
 * the reset timeout one probe is permitted; a successful probe closes the
 * circuit while another failure opens it again.
 */
export class CircuitBreaker {
    /** Current circuit state. */
    public state: CircuitState = 'closed';
    /** Number of consecutive failures in the current window. */
    public failures = 0;
    /** Time at which the circuit was opened. */
    public openedAt = 0;

    private readonly failureThreshold: number;
    private readonly resetTimeout: number;

    /** Creates a circuit breaker. */
    public constructor(options: CircuitBreakerOptions = {}) {
        this.failureThreshold = Math.max(1, options.failureThreshold ?? 5);
        this.resetTimeout = Math.max(100, options.resetTimeout ?? 30_000);
    }

    /**
     * Determines whether a request may currently be attempted.
     *
     * @returns `true` when the circuit allows an attempt.
     */
    public canRequest(): boolean {
        if (this.state === 'closed') return true;
        if (this.state === 'open' && Date.now() - this.openedAt >= this.resetTimeout) {
            this.state = 'half-open';
            return true;
        }
        return this.state === 'half-open';
    }

    /** Records a successful request and closes the circuit. */
    public success(): void {
        this.failures = 0;
        this.state = 'closed';
        this.openedAt = 0;
    }

    /** Records a failed request and opens the circuit at the configured threshold. */
    public failure(): void {
        this.failures++;
        if (this.state === 'half-open' || this.failures >= this.failureThreshold) {
            this.state = 'open';
            this.openedAt = Date.now();
        }
    }
}
