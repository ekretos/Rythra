import { describe, expect, test } from 'bun:test';
import { Rythra } from '../../packages/core/src/Rythra';

const connector = { client: {}, setManager() {}, listen() {}, sendPacket() {}, getId: () => '1' };
const make = (failover = true, failoverDelay = 0) => {
    const rythra = new Rythra({ connector: connector as never, failover, failoverDelay, nodes: [
        { host: 'a', password: 'pw', lavalinkVersion: 4 }, { host: 'b', password: 'pw', lavalinkVersion: 4 },
    ] });
    const [a, b] = [...rythra.nodes.values()];
    const calls: Array<{ node: string; options: Record<string, unknown> }> = [];
    for (const node of [a!, b!]) {
        Object.defineProperty(node, 'connected', { get: () => true, configurable: true });
        (node.rest as unknown as { updatePlayer: unknown }).updatePlayer = async (data: { playerOptions: Record<string, unknown> }) => { calls.push({ node: node.options.host, options: data.playerOptions }); return undefined; };
    }
    return { rythra, a: a!, b: b!, calls };
};
const withVoice = async (rythra: Rythra) => {
    const player = rythra.createPlayer({ guild: 'g', voiceChannel: 'v', textChannel: 't' });
    rythra.voiceStateUpdate({ guild_id: 'g', session_id: 's', channel_id: 'v' } as never);
    await rythra.voiceServerUpdate({ guild_id: 'g', token: 'tok', endpoint: 'e' } as never);
    return player;
};

describe('failover', () => {
    test('migratePlayers moves the player with its playback state', async () => {
        const { rythra, a, b, calls } = make();
        Object.defineProperty(b, 'connected', { get: () => false, configurable: true });
        const player = await withVoice(rythra);
        expect(player.node).toBe(a);
        Object.defineProperty(b, 'connected', { get: () => true, configurable: true });
        Object.defineProperty(a, 'connected', { get: () => false, configurable: true });
        player.queue.current = { encoded: 'abc' } as never;
        player.lastPosition = 1234; player.volume = 50;
        const events: string[] = [];
        rythra.on('playerMigrate', () => events.push('migrate'));
        expect(await rythra.migratePlayers(a)).toBe(1);
        expect(player.node).toBe(b);
        expect(rythra.migrations).toBe(1);
        expect(events).toEqual(['migrate']);
        const last = calls.at(-1)!;
        expect(last.node).toBe('b');
        expect(last.options).toMatchObject({ volume: 50, paused: false, position: 1234, track: { encoded: 'abc' }, voice: { token: 'tok', sessionId: 's', channelId: 'v' } });
    });
    test('keeps the player on its node and reports failure when voice data is missing', async () => {
        const { rythra, a, b } = make();
        const player = rythra.createPlayer({ guild: 'g', voiceChannel: 'v', textChannel: 't' });
        Object.defineProperty(a, 'connected', { get: () => false, configurable: true });
        let failed = 0;
        rythra.on('playerMigrateFailed', () => failed++);
        expect(await rythra.migratePlayers(a)).toBe(0);
        expect(failed).toBe(1);
        expect(player.node).toBe(a);
        void b;
    });
    test('does nothing without another ready node', async () => {
        const { rythra, a, b } = make();
        await withVoice(rythra);
        Object.defineProperty(a, 'connected', { get: () => false, configurable: true });
        Object.defineProperty(b, 'connected', { get: () => false, configurable: true });
        expect(await rythra.migratePlayers(a)).toBe(0);
    });

    test('waits for the delay and skips migration when the node recovers', async () => {
        const { rythra, a, b } = make(true, 20);
        Object.defineProperty(b, 'connected', { get: () => false, configurable: true });
        const player = await withVoice(rythra);
        Object.defineProperty(b, 'connected', { get: () => true, configurable: true });
        a.emit('disconnect');
        await new Promise((r) => setTimeout(r, 50));
        expect(player.node).toBe(a); // `a` still reports connected, so it recovered
        expect(rythra.migrations).toBe(0);
    });
    test('migrates after the delay when the node stays down', async () => {
        const { rythra, a, b } = make(true, 10);
        Object.defineProperty(b, 'connected', { get: () => false, configurable: true });
        const player = await withVoice(rythra);
        Object.defineProperty(b, 'connected', { get: () => true, configurable: true });
        Object.defineProperty(a, 'connected', { get: () => false, configurable: true });
        a.emit('disconnect');
        await new Promise((r) => setTimeout(r, 60));
        expect(player.node).toBe(b);
        await rythra.destroy(0);
    });
});

describe('voice state ownership', () => {
    test("another member's voice state does not overwrite the bot's session", async () => {
        const { rythra } = make();
        const player = rythra.createPlayer({ guild: 'g', voiceChannel: 'v', textChannel: 't' });
        rythra.voiceStateUpdate({ guild_id: 'g', session_id: 'bot-session', channel_id: 'v', user_id: '1' } as never);
        rythra.voiceStateUpdate({ guild_id: 'g', session_id: 'other', channel_id: 'v', user_id: '999' } as never);
        expect(player.voiceState.session_id).toBe('bot-session');
    });
});
