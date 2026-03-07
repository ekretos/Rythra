/**
 * #################################################################################
 * #                                                                               #
 * #    if you want to run: bun run example/bot.ts                                 #
 * #                                                                               #
 * #################################################################################
 */


import { Client, GatewayIntentBits } from "discord.js";
import { Rythra, Connector } from "../src";

// Replace with your bot token and clientId in example/.env
const TOKEN = process.env.BOT_TOKEN || "YOUR_BOT_TOKEN";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const connector = new Connector.DiscordJS(client);

const rythra = new Rythra({
    connector,
    autoPlay: true,
    nodes: [
        {
            host: "host.zedbot.xyz",
            port: 3000,
            password: "kartadharta",
            identifier: "zedbot-node",
            secure: false,
            rejectUnauthorized: false,
        },
    ],
});

rythra.on("nodeError", (node, err) => {
    console.error(`Node ${node.options.identifier} error:`, err);
});

rythra.on("nodeCreate", (node) => {
    console.log(`Node ${node.options.identifier} created!`);

    node.on("connect", () => console.log(`Node ${node.options.identifier} connected!`));
    node.on("disconnect", () => console.log(`Node ${node.options.identifier} disconnected!`));
    node.on("error", (err: any) => console.error(`Node ${node.options.identifier} error:`, err));
});

rythra.on("ready", () => {
    console.log("Rythra is ready!");
});

client.on("clientReady", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    rythra.connect();
});

rythra.on("nodeCreate", (node) => {
    node.on("connect", () => console.log(`Node ${node.options.identifier} connected!`));
    node.on("error", (err: any) => console.error(`Node ${node.options.identifier} error:`, err));
});

rythra.on("playerCreate", (player) => {
    // Status message on track start
    player.on("trackStart", (track: any) => {
        const channel = client.channels.cache.get(player.textChannel) as any;
        if (channel) channel.send(`Now playing: **${track.info.title}**`);
    });
});

client.on("messageCreate", async (message: any) => {
    if (message.author.bot || !message.guild) return;

    const prefix = "-";
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    if (command === "play") {
        const query = args.join(" ");
        if (!query) return message.reply("Please provide a search query!");

        const voiceChannel = message.member?.voice.channel;
        if (!voiceChannel) return message.reply("You need to be in a voice channel!");

        try {
            const searchResult = await rythra.search(query, message.author.id);

            if (searchResult.loadType === "empty" || searchResult.loadType === "error") {
                return message.reply("No results found or an error occurred.");
            }

            const player = rythra.createPlayer({
                guild: message.guild.id,
                voiceChannel: voiceChannel.id,
                textChannel: message.channel.id,
            });

            if (searchResult.loadType === "playlist") {
                player.queue.add(searchResult.data.tracks);
                message.reply(`Added playlist **${searchResult.data.info.name}** with ${searchResult.data.tracks.length} tracks to the queue.`);
            } else {
                const track = searchResult.data[0] || searchResult.data;
                player.queue.add(track);
                message.reply(`Added **${track.info.title}** to the queue.`);
            }

            player.connect();
            if (!player.playing && !player.paused) {
                await player.play();
            }

        } catch (error) {
            console.error(error);
            message.reply("An error occurred while trying to play the track.");
        }
    }

    if (command === "skip") {
        const player = rythra.players.get(message.guild.id);
        if (!player) return message.reply("No player found for this guild.");

        await player.skip();
        message.reply("Skipped current track.");
    }

    if (command === "queue") {
        const player = rythra.players.get(message.guild.id);
        if (!player) return message.reply("No player found for this guild.");

        if (player.queue.length === 0 && !player.queue.current) {
            return message.reply("The queue is empty.");
        }

        const queueStr = player.queue.map((t, i) => `${i + 1}. **${t.info.title}**`).join("\n");
        message.reply(`**Current Queue:**\n${player.queue.current ? `Now Playing: **${player.queue.current.info.title}**\n\n` : ""}${queueStr || "No more songs in queue."}`);
    }

    if (command === "stop") {
        const player = rythra.players.get(message.guild.id);
        if (!player) return message.reply("No player found for this guild.");

        await player.stop();
        message.reply("Stopped playback.");
    }

    if (command === "pause") {
        const player = rythra.players.get(message.guild.id);
        if (!player) return message.reply("No player found for this guild.");

        await player.pause(true);
        message.reply("Paused playback.");
    }

    if (command === "resume") {
        const player = rythra.players.get(message.guild.id);
        if (!player) return message.reply("No player found for this guild.");

        await player.pause(false);
        message.reply("Resumed playback.");
    }
});

client.login(TOKEN);
