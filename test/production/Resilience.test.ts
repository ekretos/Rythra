import { afterEach, describe, expect, test } from 'bun:test';
import { FetchRestTransport, RestError } from '../../packages/core/src/transport/RestTransport';
import { PluginRegistry } from '../../packages/core/src/plugins/Plugin';

const realFetch = globalThis.fetch;
afterEach(() => {
    globalThis.fetch = realFetch;
});
const mockFetch = (impl: (url: string, init?: RequestInit) => Promise<Response>) => {
    globalThis.fetch = impl as never;
};
const req = { url: 'http://localhost:2333/v4/info' };

describe('FetchRestTransport', () => {
    test('throws RestError with status for error payloads', async () => {
        mockFetch(async () => Response.json({ timestamp: 1, status: 404, error: 'Not Found', message: 'nope', path: '/v4/info' }, { status: 404 }));
        const error = await new FetchRestTransport().request(req).catch((e) => e);
        expect(error).toBeInstanceOf(RestError);
        expect(error.status).toBe(404);
    });
    test('falls back to a RestError when the error body is not JSON', async () => {
        mockFetch(async () => new Response('<html>', { status: 502 }));
        const error = await new FetchRestTransport().request(req).catch((e) => e);
        expect(error).toBeInstanceOf(RestError);
        expect(error.status).toBe(502);
    });
    test('rejects malformed JSON on success instead of returning undefined', async () => {
        mockFetch(async () => new Response('{oops', { status: 200 }));
        await expect(new FetchRestTransport().request(req)).rejects.toThrow('Malformed JSON');
    });
    test('empty and 204 bodies resolve undefined', async () => {
        mockFetch(async () => new Response(null, { status: 204 }));
        expect(await new FetchRestTransport().request(req)).toBeUndefined();
        mockFetch(async () => new Response('', { status: 200 }));
        expect(await new FetchRestTransport().request(req)).toBeUndefined();
    });
    test('wraps network failures and timeouts with context', async () => {
        mockFetch(async () => {
            throw new TypeError('fetch failed');
        });
        const net = await new FetchRestTransport().request(req).catch((e) => e);
        expect(net.message).toContain('failed: GET /v4/info');
        expect(net.cause).toBeInstanceOf(TypeError);
        mockFetch((_u, init) => new Promise((_r, reject) => init!.signal!.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')))));
        const timeout = await new FetchRestTransport().request({ ...req, timeout: 5 }).catch((e) => e);
        expect(timeout.message).toContain('timed out');
    });
});

describe('PluginRegistry resilience', () => {
    test('concurrent registration of the same name runs setup once', async () => {
        const registry = new PluginRegistry();
        let setups = 0;
        const plugin = {
            name: 'a',
            setup: async () => {
                setups++;
                await Promise.resolve();
            },
        };
        const results = await Promise.allSettled([registry.register(plugin, {}), registry.register(plugin, {})]);
        expect(setups).toBe(1);
        expect(results.filter((r) => r.status === 'rejected').length).toBe(1);
    });
    test('failed setup is wrapped and leaves nothing registered', async () => {
        const registry = new PluginRegistry();
        await expect(
            registry.register(
                {
                    name: 'bad',
                    setup: () => {
                        throw new Error('x');
                    },
                },
                {}
            )
        ).rejects.toThrow('bad');
        expect(registry.list().length).toBe(0);
        await registry.register({ name: 'bad' }, {});
    });
    test('clear tears down every plugin even when one fails', async () => {
        const registry = new PluginRegistry();
        const destroyed: string[] = [];
        await registry.register(
            {
                name: 'one',
                destroy: () => {
                    throw new Error('boom');
                },
            },
            {}
        );
        await registry.register(
            {
                name: 'two',
                destroy: () => {
                    destroyed.push('two');
                },
            },
            {}
        );
        await expect(registry.clear({})).rejects.toBeInstanceOf(AggregateError);
        expect(destroyed).toEqual(['two']);
        expect(registry.list().length).toBe(0);
    });
});
