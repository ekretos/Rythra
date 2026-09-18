import { describe, expect, test } from 'bun:test';
import { NodeStateMachine } from '../../packages/core/src/node/NodeState';

describe('Node state machine', () => {
    test('starts disconnected', () => {
        expect(new NodeStateMachine().state).toBe('disconnected');
    });

    test('follows the connect lifecycle and reports transitions', () => {
        const seen: string[] = [];
        const machine = new NodeStateMachine((to, from) => seen.push(`${from}->${to}`));
        expect(machine.transition('connecting')).toBe(true);
        expect(machine.transition('ready')).toBe(true);
        expect(machine.transition('degraded')).toBe(true);
        expect(machine.transition('connecting')).toBe(true);
        expect(seen).toEqual(['disconnected->connecting', 'connecting->ready', 'ready->degraded', 'degraded->connecting']);
    });

    test('ignores repeated and illegal transitions', () => {
        const machine = new NodeStateMachine();
        expect(machine.transition('disconnected')).toBe(false);
        expect(machine.transition('ready')).toBe(false);
        expect(machine.state).toBe('disconnected');
        machine.transition('draining');
        expect(machine.can('connecting')).toBe(false);
        expect(machine.transition('disconnected')).toBe(true);
    });
});
