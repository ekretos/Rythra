import { describe, expect, test } from 'bun:test';
import { getLavalinkApiPath, getLavalinkApiVersion } from '../src/protocol/LavalinkProtocol';

describe('Lavalink protocol versioning', () => {
    test('supports Lavalink v4', () => {
        expect(getLavalinkApiVersion('4.2.2')).toBe(4);
        expect(getLavalinkApiPath(4)).toBe('/v4');
    });

    test('supports Lavalink v5 protocol selection', () => {
        expect(getLavalinkApiVersion('5.0.0')).toBe(5);
        expect(getLavalinkApiPath(5)).toBe('/v5');
    });

    test('rejects unknown major versions', () => {
        expect(() => getLavalinkApiVersion('6.0.0')).toThrow('Unsupported Lavalink major version: 6.0.0');
    });
});
