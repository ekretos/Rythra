import { describe, expect, test } from 'bun:test';
import { DiscordJS, Eris, Lunibee, OceanicJS, Seyfert } from '../src/index.js';

type Handler = (packet: never) => void;
const voiceState = { t: 'VOICE_STATE_UPDATE', op: 0, d: { guild_id: '1' } };
const voiceServer = { t: 'VOICE_SERVER_UPDATE', op: 0, d: { guild_id: '1' } };
const other = { t: 'MESSAGE_CREATE', op: 0, d: {} };

/** Each fixture builds a fake client and returns a way to emit gateway packets and read what was sent. */
const fixtures = [
    ['DiscordJS', () => {
        const handlers: Handler[] = []; const sent: unknown[] = [];
        const client = { on: (_e: string, h: Handler) => { handlers.push(h); }, ws: { shards: { get: () => ({ send: (p: unknown) => sent.push(p) }) } }, user: { id: 'bot' } };
        return { connector: new DiscordJS(client as never), emit: (p: object) => handlers.forEach((h) => h(p as never)), sent };
    }],
    ['Eris', () => {
        const handlers: Handler[] = []; const sent: unknown[] = [];
        const client = { on: (_e: string, h: Handler) => { handlers.push(h); }, shards: { get: () => ({ sendWS: (op: number, d: unknown) => sent.push({ op, d }) }) }, user: { id: 'bot' } };
        return { connector: new Eris(client as never), emit: (p: object) => handlers.forEach((h) => h(p as never)), sent };
    }],
    ['OceanicJS', () => {
        const handlers: Handler[] = []; const sent: unknown[] = [];
        const client = { on: (_e: string, h: Handler) => { handlers.push(h); }, shards: { get: () => ({ send: (op: number, d: unknown) => sent.push({ op, d }) }) }, user: { id: 'bot' } };
        return { connector: new OceanicJS(client as never), emit: (p: object) => handlers.forEach((h) => h(p as never)), sent };
    }],
    ['Seyfert', () => {
        const handlers: Handler[] = []; const sent: unknown[] = [];
        const client = { gateway: { events: { on: (_e: string, h: Handler) => { handlers.push(h); } }, send: (_s: number, p: unknown) => sent.push(p) }, botId: 'bot' };
        return { connector: new Seyfert(client as never), emit: (p: object) => handlers.forEach((h) => h(p as never)), sent };
    }],
    ['Lunibee', () => {
        const handlers: Array<(data: { event: string; data: unknown }) => void> = []; const sent: unknown[] = [];
        const client = { on: (_e: string, h: typeof handler) => { handlers.push(h); }, ws: { send: (p: unknown) => sent.push(p) }, user: { id: 'bot' } };
        return { connector: new Lunibee(client as never), emit: (p: { t: string; d: unknown }) => handlers.forEach((h) => h({ event: p.t, data: p.d })), sent };
    }],
] as const;

describe.each(fixtures)('%s connector contract', (_name, build) => {
    test('forwards voice events to the manager and ignores others', () => {
        const { connector, emit } = build();
        const calls: string[] = [];
        connector.setManager({ voiceStateUpdate: () => calls.push('state'), voiceServerUpdate: async () => { calls.push('server'); } } as never);
        connector.listen();
        emit(voiceState); emit(voiceServer); emit(other);
        expect(calls).toEqual(['state', 'server']);
    });
    test('does not throw before a manager is attached', () => {
        const { connector, emit } = build();
        connector.listen();
        expect(() => emit(voiceState)).not.toThrow();
    });
    test('listen is idempotent', () => {
        const { connector, emit } = build();
        const calls: string[] = [];
        connector.setManager({ voiceStateUpdate: () => calls.push('state'), voiceServerUpdate: async () => {} } as never);
        connector.listen(); connector.listen();
        emit(voiceState);
        expect(calls).toEqual(['state']);
    });
    test('sends packets through the client', () => {
        const { connector, sent } = build();
        connector.sendPacket(0, { op: 4, d: { guild_id: '1' } } as never, true);
        expect(sent.length).toBe(1);
    });
    test('reports the bot id', () => {
        expect(build().connector.getId()).toBe('bot');
    });
});
