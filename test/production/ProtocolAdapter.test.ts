import { describe, expect, test } from 'bun:test';
import { resolveProtocol, resolveProtocolFromServerVersion } from '../../packages/core/src/protocol/ProtocolAdapter';

describe('Lavalink protocol adapters', () => {
    test('builds version-aware URLs', () => {
        expect(resolveProtocol(4).restUrl('http://localhost:2333')).toBe('http://localhost:2333/v4');
        expect(resolveProtocol(5).websocketUrl('ws://localhost:2333')).toBe('ws://localhost:2333/v5/websocket');
    });

    test('resolves adapters from a server version', () => {
        expect(resolveProtocolFromServerVersion('4.1.1').version).toBe(4);
        expect(resolveProtocolFromServerVersion('5.0.0').capabilities.dave).toBe(true);
        expect(() => resolveProtocolFromServerVersion('6.0.0')).toThrow('Unsupported Lavalink major version: 6.0.0');
    });

    test('adds the resume header only when a session exists', () => {
        const handshake = { password: 'pw', clientName: 'Rythra/1', userId: '1' };
        expect(resolveProtocol(4).handshakeHeaders(handshake)['Session-Id']).toBeUndefined();
        expect(resolveProtocol(4).handshakeHeaders({ ...handshake, sessionId: 'abc' })['Session-Id']).toBe('abc');
    });

    test('decodes only opcode-bearing payloads', () => {
        expect(resolveProtocol(4).decode({ op: 'stats', players: 2 })?.op).toBe('stats');
        expect(resolveProtocol(4).decode('stats')).toBeUndefined();
        expect(resolveProtocol(4).decode(null)).toBeUndefined();
    });
});
