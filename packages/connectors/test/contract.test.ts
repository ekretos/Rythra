import { describe, expect, test } from 'bun:test';
import { DiscordJS, Eris, Lunibee, OceanicJS, Seyfert } from '../src/index.js';

type Handler = (packet: never) => void;
const voiceState = { t: 'VOICE_STATE_UPDATE', op: 0, d: { guild_id: '1' } };
const voiceServer = { t: 'VOICE_SERVER_UPDATE', op: 0, d: { guild_id: '1' } };
const other = { t: 'MESSAGE_CREATE', op: 0, d: {} };

/** Each fixture builds a fake client and returns a way to emit gateway packets and read what was sent. */
const fixtures = [
    ['DiscordJS', () => {
        let handler: Handler = () => {}; const sent: unknown[] = [];
        const client = { on: (_e: string, h: Handler) => { handler = h; }, ws: { shards: { get: () => ({ send: (p: unknown) => sent.push(p) }) } }, user: { id: 'bot' } };
        return { connector: new DiscordJS(client as never), emit: (p: object) => handler(p as never), sent };
    }],
    ['Eris', () => {
        let handler: Handler = () => {}; const sent: unknown[] = [];
        const client = { on: (_e: string, h: Handler) => { handler = h; }, shards: { get: () => ({ sendWS: (op: number, d: unknown) => sent.push({ op, d }) }) }, user: { id: 'bot' } };
        return { connector: new Eris(client as never), emit: (p: object) => handler(p as never), sent };
    }],
    ['OceanicJS', () => {
        let handler: Handler = () => {}; const sent: unknown[] = [];
        const client = { on: (_e: string, h: Handler) => { handler = h; }, shards: { get: () => ({ send: (op: number, d: unknown) => sent.push({ op, d }) }) }, user: { id: 'bot' } };
        return { connector: new OceanicJS(client as never), emit: (p: object) => handler(p as never), sent };
    }],
    ['Seyfert', () => {
        let handler: Handler = () => {}; const sent: unknown[] = [];
        const client = { gateway: { events: { on: (_e: string, h: Handler) => { handler = h; } }, send: (_s: number, p: unknown) => sent.push(p) }, botId: 'bot' };
        return { connector: new Seyfert(client as never), emit: (p: object) => handler(p as never), sent };
    }],
    ['Lunibee', () => {
        let handler: (data: { event: string; data: unknown }) => void = () => {}; const sent: unknown[] = [];
        const client = { on: (_e: string, h: typeof handler) => { handler = h; }, ws: { send: (p: unknown) => sent.push(p) }, user: { id: 'bot' } };
        return { connector: new Lunibee(client as never), emit: (p: { t: string; d: unknown }) => handler({ event: p.t, data: p.d }), sent };
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
    test('sends packets through the client', () => {
        const { connector, sent } = build();
        connector.sendPacket(0, { op: 4, d: { guild_id: '1' } } as never, true);
        expect(sent.length).toBe(1);
    });
    test('reports the bot id', () => {
        expect(build().connector.getId()).toBe('bot');
    });
});
