import { describe, expect, test } from 'bun:test';
import { Node } from '../../packages/core/src/node/Node';
import { Queue } from '../../packages/core/src/Queue';
import type { SocketTransport, SocketTransportHandlers } from '../../packages/core/src/transport/Transport';

class FakeTransport implements SocketTransport {
    public connected = false;
    public disconnected = false;
    private pending: { resolve(): void; reject(error: Error): void } | null = null;
    constructor(public readonly handlers: SocketTransportHandlers) {}
    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.pending = { resolve, reject };
        });
    }
    open(): void {
        this.connected = true;
        this.pending?.resolve();
        this.handlers.onOpen();
    }
    fail(error: unknown): void {
        this.handlers.onError(error);
        this.pending?.reject(new Error('failed'));
        this.handlers.onClose(false);
    }
    close(): void {
        this.connected = false;
        this.handlers.onClose(true);
    }
    disconnect(): void {
        this.disconnected = true;
        this.connected = false;
        this.pending?.reject(new Error('disconnected'));
    }
    send(): void {}
}

class TestNode extends Node {
    public transports: FakeTransport[] = [];
    protected override createTransport(handlers: SocketTransportHandlers): SocketTransport {
        const transport = new FakeTransport(handlers);
        this.transports.push(transport);
        return transport;
    }
}

const manager = { options: { connector: { getId: () => '1' } }, version: 'test', players: { get: () => undefined } } as never;
const make = (options: Record<string, unknown> = {}) =>
    new TestNode(manager, { host: 'localhost', password: 'pw', lavalinkVersion: 4, retryInterval: 1_000_000, retryJitter: 0, ...options });
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('Node lifecycle', () => {
    test('requires a password', () => {
        expect(() => new Node(manager, { host: 'h' } as never)).toThrow('password');
    });

    test('connect failure without error listener rejects with the transport error and leaves a retryable state', async () => {
        const node = make();
        const result = node.connect();
        await tick();
        node.transports[0]!.fail(new Error('boom'));
        await expect(result).rejects.toThrow('failed');
        expect(node.state).toBe('degraded');
        node.disconnect();
    });

    test('ignores close events from a replaced transport', async () => {
        const node = make();
        const first = node.connect();
        await tick();
        node.transports[0]!.open();
        await first;
        const stale = node.transports[0]!;
        node.disconnect();
        const second = node.connect();
        await tick();
        node.transports[1]!.open();
        await second;
        stale.close(); // late close from the first socket
        expect(node.state).toBe('ready');
        node.disconnect();
    });

    test('disconnect during connect rejects instead of reporting success and does not reconnect', async () => {
        const node = make();
        const result = node.connect();
        await tick();
        node.disconnect();
        await expect(result).rejects.toThrow();
        expect(node.state).toBe('disconnected');
    });

    test('a second connect() waiting on an in-flight attempt rejects when disconnect() is called', async () => {
        const node = make();
        const first = node.connect().catch((e: Error) => e);
        await tick();
        const second = node.connect().catch((e: Error) => e);
        node.disconnect();
        expect(((await second) as Error).message).toContain('disconnected');
        expect(await first).toBeInstanceOf(Error);
    });

    test('credential rejection stops reconnecting', async () => {
        const node = make();
        let failed = 0;
        node.on('reconnectFailed', () => failed++);
        const result = node.connect();
        await tick();
        node.transports[0]!.fail({ message: 'Unexpected server response: 401' });
        await expect(result).rejects.toThrow();
        expect(failed).toBe(1);
        expect(node.state).toBe('disconnected');
    });
});

describe('Queue', () => {
    test('add accepts very large arrays', () => {
        const queue = new Queue();
        queue.add(Array.from({ length: 200_000 }, (_, i) => ({ encoded: String(i) }) as never));
        expect(queue.length).toBe(200_000);
    });
    test('history is bounded', () => {
        const queue = new Queue();
        for (let i = 0; i < Queue.maxHistory + 20; i++) queue.pushHistory({ encoded: String(i) } as never);
        expect(queue.previous.length).toBe(Queue.maxHistory);
        expect(queue.previous[0]!.encoded).toBe(String(Queue.maxHistory + 19));
    });
});
