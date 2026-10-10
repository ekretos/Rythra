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
        const handlers: Record<string, Array<(data: unknown) => void>> = {}; const sent: unknown[] = [];
        const client = { on: (e: string, h: (d: unknown) => void) => { (handlers[e] ??= []).push(h); }, sendVoiceState: (g: string, c: string | null) => { sent.push({ g, c }); return true; }, ws: { send: (p: unknown) => sent.push(p) }, user: { id: 'bot' } };
        const route: Record<string, string> = { VOICE_STATE_UPDATE: 'voiceStateUpdate', VOICE_SERVER_UPDATE: 'voiceServerUpdate' };
        return { connector: new Lunibee(client as never), emit: (p: { t: string; d: object }) => { const e = route[p.t]; if (e) handlers[e]?.forEach((h) => h({ endpoint: 'e.discord.media', ...p.d })); }, sent };
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

describe('Lunibee specifics', () => {
    const make = (client: object) => new Lunibee({ ws: { send: () => true }, user: { id: 'bot' }, ...client } as never);
    test('ignores a voice server update with a null endpoint', () => {
        const handlers: Array<(d: unknown) => void> = [];
        const connector = make({ on: (e: string, h: (d: unknown) => void) => { if (e === 'voiceServerUpdate') handlers.push(h); } });
        const calls: string[] = [];
        connector.setManager({ voiceStateUpdate: () => {}, voiceServerUpdate: async () => { calls.push('server'); } } as never);
        connector.listen();
        handlers.forEach((h) => h({ guild_id: '1', token: 't', endpoint: null }));
        expect(calls).toEqual([]);
    });
    test('routes op 4 through sendVoiceState and falls back to ws.send on older Lunibee', () => {
        const sendVoiceState: Array<unknown[]> = []; const raw: unknown[] = [];
        const modern = make({ on() {}, sendVoiceState: (...a: unknown[]) => { sendVoiceState.push(a); return true; }, ws: { send: (p: unknown) => raw.push(p) } });
        modern.sendPacket(0, { op: 4, d: { guild_id: '1', channel_id: '2', self_mute: false, self_deaf: true } } as never, true);
        expect(sendVoiceState).toEqual([['1', '2', { selfMute: false, selfDeaf: true }]]);
        expect(raw).toEqual([]);
        const legacy = make({ on() {}, ws: { send: (p: unknown) => raw.push(p) } });
        legacy.sendPacket(0, { op: 4, d: { guild_id: '1', channel_id: null } } as never, true);
        expect(raw).toEqual([{ op: 4, d: { guild_id: '1', channel_id: null }, s: null, t: null }]);
    });
});
