/** Rythra standalone Lavalink client example with the Discord.js connector. */
import { Client, GatewayIntentBits } from 'discord.js';
import type { Message, TextChannel } from 'discord.js';
import { Rythra, Node, RythraPlayer } from '@rythra/core';
import type { Track, SearchResponse } from '@rythra/core';
import { DiscordJS } from '@rythra/connectors';

const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) throw new Error('BOT_TOKEN is required.');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates],
});
const connector = new DiscordJS(client);
const rythra = new Rythra({
    connector,
    autoPlay: true,
    nodes: [{
        host: process.env.LAVALINK_HOST || 'localhost',
        port: Number(process.env.LAVALINK_PORT || 2333),
        password: process.env.LAVALINK_PASSWORD,
        identifier: process.env.LAVALINK_IDENTIFIER || 'main',
        secure: process.env.LAVALINK_SECURE === 'true',
    }],
});

rythra.on('nodeError', (node: Node, error: Error) => {
    console.error(`[Rythra] Node ${node.options.identifier ?? 'unknown'} error:`, error.message);
});
rythra.on('nodeCreate', (node: Node) => {
    const identifier = node.options.identifier ?? 'unknown';
    console.log(`[Rythra] Node ${identifier} created`);
    node.on('connect', () => console.log(`[Rythra] Node ${identifier} connected`));
    node.on('disconnect', () => console.log(`[Rythra] Node ${identifier} disconnected`));
});
rythra.on('playerCreate', (player: RythraPlayer) => {
    player.on('trackStart', (track: Track | null | undefined) => {
        if (!track) return;
        const channel = client.channels.cache.get(player.textChannel) as TextChannel | undefined;
        if (channel) void channel.send(`Now playing: **${track.info.title}**`);
    });
    player.on('trackException', (data: unknown) => console.error(`[Rythra] Playback exception in ${player.guild}:`, data));
});

client.once('clientReady', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    try {
        await rythra.connect();
        console.log('[Rythra] Lavalink connection established');
    } catch (error) {
        console.error('[Rythra] Failed to connect to Lavalink:', error);
    }
});

type Player = ReturnType<typeof rythra.createPlayer>;

async function enqueue(player: Player, message: Message, result: SearchResponse): Promise<boolean> {
    if (result.loadType === 'empty' || result.loadType === 'error') return false;
    if (result.loadType === 'playlist') {
        const tracks = result.data.tracks;
        if (!tracks.length) { await message.reply('The playlist contains no playable tracks.'); return false; }
        player.queue.add(tracks);
        await message.reply(`Added playlist **${result.data.info.name}** with ${tracks.length} tracks.`);
        return true;
    }
    if (result.loadType === 'track') {
        player.queue.add(result.data);
        await message.reply(`Added **${result.data.info.title}** to the queue.`);
        return true;
    }
    // Search responses from Lavalink are normalized by Rythra as data.tracks.
    const tracks = result.data?.tracks;
    const track = Array.isArray(tracks) ? tracks[0] : undefined;
    if (!track) {
        console.warn('[Rythra] Search returned an invalid/empty track list:', JSON.stringify(result));
        await message.reply('No playable search results found.');
        return false;
    }
    player.queue.add(track);
    await message.reply(`Added **${track.info.title}** to the queue.`);
    return true;
}

async function play(message: Message, guildId: string, args: string[]): Promise<void> {
    const query = args.join(' ');
    if (!query) return void message.reply('Please provide a search query.');
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) return void message.reply('You need to be in a voice channel.');

    try {
        const result: SearchResponse = await rythra.search(query, message.author.id, 'youtube');
        if (result.loadType === 'empty') return void message.reply('No results found.');
        if (result.loadType === 'error') return void message.reply(`Lavalink search failed: ${result.data.message}`);

        const player = rythra.createPlayer({ guild: guildId, voiceChannel: voiceChannel.id, textChannel: message.channel.id });
        if (!(await enqueue(player, message, result))) return;
        player.connect();
        if (!player.playing && !player.paused) await player.play();
    } catch (error) {
        console.error('[Rythra] Play command failed:', error);
        await message.reply('An error occurred while trying to play the track.');
    }
}

async function showQueue(player: Player, message: Message): Promise<void> {
    if (player.queue.length === 0 && !player.queue.current) return void message.reply('The queue is empty.');
    const queue = player.queue.map((track: Track, index: number) => `${index + 1}. **${track.info.title}**`).join('\n');
    await message.reply(`**Current Queue:**\n${player.queue.current ? `Now Playing: **${player.queue.current.info.title}**\n\n` : ''}${queue || 'No more songs in queue.'}`);
}

const controls: Record<string, [(player: Player) => Promise<void>, string]> = {
    skip: [(p) => p.skip(), 'Skipped the current track.'],
    stop: [(p) => p.stop(), 'Stopped playback.'],
    pause: [(p) => p.pause(true), 'Paused playback.'],
    resume: [(p) => p.pause(false), 'Resumed playback.'],
};

client.on('messageCreate', async (message: Message) => {
    if (message.author.bot || !message.guild || !message.content.startsWith('-')) return;
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift()?.toLowerCase() ?? '';

    if (command === 'play' || command === 'p') return play(message, message.guild.id, args);

    const player = rythra.players.get(message.guild.id);
    if (!player) return;
    if (command === 'queue') return showQueue(player, message);
    const control = controls[command];
    if (control) {
        await control[0](player);
        await message.reply(control[1]);
    }
});

const shutdown = async (signal: string): Promise<void> => {
    console.log(`[Rythra] Received ${signal}; shutting down...`);
    await rythra.destroy();
    client.destroy();
};
process.once('SIGINT', () => void shutdown('SIGINT'));
process.once('SIGTERM', () => void shutdown('SIGTERM'));
void client.login(TOKEN);
