/** Runtime states of a node circuit breaker. */
export type CircuitState = 'closed' | 'open' | 'half-open';
/** Configuration for a node circuit breaker. */
export interface CircuitBreakerOptions { /** Consecutive failures required to open. */ failureThreshold?: number; /** Reset timeout in milliseconds. */ resetTimeout?: number; }
/** Small dependency-free circuit breaker for unreliable Lavalink nodes. */
export class CircuitBreaker {
    /** Current circuit state. */ public state: CircuitState = 'closed';
    /** Consecutive failures. */ public failures = 0;
    /** Time at which circuit opened. */ public openedAt = 0;
    private readonly failureThreshold: number; private readonly resetTimeout: number;
    /** Creates a circuit breaker. */
    public constructor(options: CircuitBreakerOptions = {}) { this.failureThreshold = Math.max(1, options.failureThreshold ?? 5); this.resetTimeout = Math.max(0, options.resetTimeout ?? 30_000); }
    /** Determines whether a request may currently be attempted. */
    public canRequest(): boolean { if (this.state === 'closed') return true; if (this.state === 'open' && Date.now() - this.openedAt >= this.resetTimeout) { this.state = 'half-open'; return true; } return this.state === 'half-open'; }
    /** Records success and closes the circuit. */
    public success(): void { this.failures = 0; this.state = 'closed'; this.openedAt = 0; }
    /** Records failure and opens the circuit at the configured threshold. */
    public failure(): void { this.failures++; if (this.state === 'half-open' || this.failures >= this.failureThreshold) { this.state = 'open'; this.openedAt = Date.now(); } }
}
