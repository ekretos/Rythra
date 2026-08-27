import { describe, expect, it } from 'bun:test';
import { CircuitBreaker } from '../../src/reliability/CircuitBreaker';

describe('CircuitBreaker', () => {
    it('opens after the configured failure threshold', () => {
        const breaker = new CircuitBreaker({ failureThreshold: 2 });

        expect(breaker.canRequest()).toBe(true);
        breaker.failure();
        expect(breaker.state).toBe('closed');
        breaker.failure();

        expect(breaker.state).toBe('open');
        expect(breaker.canRequest()).toBe(false);
    });

    it('closes after a successful half-open probe', async () => {
        const breaker = new CircuitBreaker({ failureThreshold: 1, resetTimeout: 1 });
        breaker.failure();

        await Bun.sleep(5);
        expect(breaker.canRequest()).toBe(true);
        expect(breaker.state).toBe('half-open');

        breaker.success();
        expect(breaker.state).toBe('closed');
        expect(breaker.failures).toBe(0);
    });
});
