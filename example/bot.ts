/**
 * Rythra standalone Lavalink client example with the Discord.js connector.
 *
 * Run with:
 *   bun run example/bot.ts
 *
 * Discord-specific behavior stays in the example application while Rythra
 * remains responsible for Lavalink nodes, players, queues, and playback.
 */

import { Client, GatewayIntentBits } from 'discord.js';
import type { Message, TextChannel } from 'discord.js';
import { Rythra, Node, RythraPlayer, DiscordJS } from 'rythra';
import type { Track, SearchResponse } from 'rythra';

/** Discord bot token. Set BOT_TOKEN in the environment. */
const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) throw new Error('BOT_TOKEN is required.');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

/** Discord.js connector used to bridge Discord gateway voice state with Rythra. */
const connector = new DiscordJS(client);

/** Rythra manager configured with the application's Lavalink node. */
const rythra = new Rythra({
    connector,
    autoPlay: true,
    nodes: [{
        host: process.env.LAVALINK_HOST || 'localhost',
        port: Number(process.env.LAVALINK_PORT || 2333),
        password: process.env.LAVALINK_PASSWORD || 'youshallnotpass',
        identifier: process.env.LAVALINK_IDENTIFIER || 'main',
        secure: process.env.LAVALINK_SECURE === 'true',
    }],
});

/** Log node-level failures without exposing credentials. */
rythra.on('nodeError', (node: Node, error: Error) => {
    console.error(`[Rythra] Node ${node.options.identifier ?? 'unknown'} error:`, error.message);
});

/** Observe node lifecycle events. */
rythra.on('nodeCreate', (node: Node) => {
    const identifier = node.options.identifier ?? 'unknown';
    console.log(`[Rythra] Node ${identifier} created`);
    node.on('connect', () => console.log(`[Rythra] Node ${identifier} connected`));
    node.on('disconnect', () => console.log(`[Rythra] Node ${identifier} disconnected`));
});

/** Attach application-level feedback to each newly created player. */
rythra.on('playerCreate', (player: RythraPlayer) => {
    player.on('trackStart', (track: Track | null | undefined) => {
        if (!track) return;
        const channel = client.channels.cache.get(player.textChannel) as TextChannel | undefined;
        if (channel) void channel.send(`Now playing: **${track.info.title}**`);
    });
    player.on('trackException', (data: unknown) => {
        console.error(`[Rythra] Playback exception in ${player.guild}:`, data);
    });
});

/** Connect Lavalink nodes once Discord is ready. */
client.once('clientReady', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    try {
        await rythra.connect();
        console.log('[Rythra] Lavalink connection established');
    } catch (error) {
        console.error('[Rythra] Failed to connect to Lavalink:', error);
    }
});

/**
 * Minimal text-command example.
 *
 * Commands remain in the example because Discord commands and UX are
 * application concerns, not responsibilities of the framework-agnostic core.
 */
client.on('messageCreate', async (message: Message) => {
    if (message.author.bot || !message.guild) return;

    const prefix = '-';
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    if (command === 'play' || command === 'p') {
        const query = args.join(' ');
        if (!query) return void message.reply('Please provide a search query.');

        const voiceChannel = message.member?.voice.channel;
        if (!voiceChannel) return void message.reply('You need to be in a voice channel.');

        try {
            const searchResult: SearchResponse = await rythra.search(query, message.author.id, 'youtube');
            if (searchResult.loadType === 'empty' || searchResult.loadType === 'error') {
                return void message.reply('No results found or Lavalink returned an error.');
            }

            const player = rythra.createPlayer({
                guild: message.guild.id,
                voiceChannel: voiceChannel.id,
                textChannel: message.channel.id,
            });

            switch (searchResult.loadType) {
                case 'playlist':
                    player.queue.add(searchResult.data.tracks);
                    await message.reply(
                        `Added playlist **${searchResult.data.info.name}** with ${searchResult.data.tracks.length} tracks.`,
                    );
                    break;

                case 'track': {
                    const track = searchResult.data;
                    player.queue.add(track);
                    await message.reply(`Added **${track.info.title}** to the queue.`);
                    break;
                }

                case 'search': {
                    const track = searchResult.data.tracks[0];
                    if (!track) return void message.reply('No results found.');
                    player.queue.add(track);
                    await message.reply(`Added **${track.info.title}** to the queue.`);
                    break;
                }

                default:
                    return void message.reply('No playable results found.');
            }

            player.connect();
            if (!player.playing && !player.paused) await player.play();
        } catch (error) {
            console.error('[Rythra] Play command failed:', error);
            await message.reply('An error occurred while trying to play the track.');
        }
    }

    if (command === 'skip') {
        const player = rythra.players.get(message.guild.id);
        if (!player) return void message.reply('No player found for this guild.');
        await player.skip();
        await message.reply('Skipped the current track.');
    }

    if (command === 'queue') {
        const player = rythra.players.get(message.guild.id);
        if (!player) return void message.reply('No player found for this guild.');
        if (player.queue.length === 0 && !player.queue.current) return void message.reply('The queue is empty.');

        const queue = player.queue
            .map((track: Track, index: number) => `${index + 1}. **${track.info.title}**`)
            .join('\n');

        await message.reply(
            `**Current Queue:**\n${player.queue.current ? `Now Playing: **${player.queue.current.info.title}**\n\n` : ''}${queue || 'No more songs in queue.'}`,
        );
    }

    if (command === 'stop') {
        const player = rythra.players.get(message.guild.id);
        if (!player) return void message.reply('No player found for this guild.');
        await player.stop();
        await message.reply('Stopped playback.');
    }

    if (command === 'pause') {
        const player = rythra.players.get(message.guild.id);
        if (!player) return void message.reply('No player found for this guild.');
        await player.pause(true);
        await message.reply('Paused playback.');
    }

    if (command === 'resume') {
        const player = rythra.players.get(message.guild.id);
        if (!player) return void message.reply('No player found for this guild.');
        await player.pause(false);
        await message.reply('Resumed playback.');
    }
});

/** Gracefully release Rythra and Discord resources on process termination. */
const shutdown = async (signal: string): Promise<void> => {
    console.log(`[Rythra] Received ${signal}; shutting down...`);
    await rythra.destroy();
    client.destroy();
};

process.once('SIGINT', () => void shutdown('SIGINT'));
process.once('SIGTERM', () => void shutdown('SIGTERM'));

void client.login(TOKEN);
