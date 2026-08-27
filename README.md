# Rythra 🎵

A lightweight, powerful, and modular Lavalink client for modern TypeScript & JavaScript runtimes. Designed for performance, reliability, and multi-library flexibility.

[![npm version](https://img.shields.io/npm/v/rythra.svg?style=flat-square)](https://www.npmjs.com/package/rythra)
[![license](https://img.shields.io/github/license/Ekretos/Rythra.svg?style=flat-square)](https://github.com/Ekretos/Rythra/blob/main/LICENSE)

---

## ✨ Features

- 🧩 **Modular & Standalone**: Use the full all-in-one `rythra` package or install only `@rythra/core` with your chosen connector.
- 🔌 **Multi-Library Connectors**: Native support for **Discord.js**, **Eris**, **Oceanic.js**, and **Seyfert**.
- ⚡ **Version-Aware Protocol**: Built-in support for **Lavalink v4** and forward-compatible **Lavalink v5** architecture with auto-version discovery.
- 📜 **Zero-Dependency Queue**: High-performance built-in queue system with loop, shuffle, and custom store support.
- 🛡️ **Reliability & Resilience**: Built-in circuit breaker, health monitoring snapshots, and automatic failover.
- 🎯 **Full TypeScript Support**: Comprehensive type definitions, strict error classes (`RythraError`, `RestError`), and autocomplete out of the box.

---

## 📦 Installation

You can install Rythra either as a single all-in-one package or as individual scoped packages:

### Option 1: All-in-One Package (Recommended)
```bash
# Using Bun
bun add rythra discord.js

# Using npm
npm install rythra discord.js

# Using pnpm
pnpm add rythra discord.js
```

### Option 2: Modular Packages
```bash
# Core + Discord.js
bun add @rythra/core @rythra/connector-discordjs discord.js

# Core + Eris
bun add @rythra/core @rythra/connector-eris eris

# Core + Oceanic.js
bun add @rythra/core @rythra/connector-oceanic oceanic.js

# Core + Seyfert
bun add @rythra/core @rythra/connector-seyfert seyfert
```

---

## 🚀 Quick Start

Here is a complete example using **Discord.js**:

```typescript
import { Client, GatewayIntentBits } from 'discord.js';
import { Rythra, DiscordJS } from 'rythra';
// Or modular:
// import { Rythra } from '@rythra/core';
// import { DiscordJS } from '@rythra/connector-discordjs';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const connector = new DiscordJS(client);

const rythra = new Rythra({
    connector,
    nodes: [
        {
            host: 'localhost',
            port: 2333,
            password: 'youshallnotpass',
            secure: false,
        },
    ],
    autoPlay: true,
});

rythra.on('nodeConnect', (node) => {
    console.log(`[Rythra] Node ${node.options.identifier ?? node.options.host} connected`);
});

rythra.on('playerCreate', (player) => {
    player.on('trackStart', (track) => {
        console.log(`[Rythra] Started playing: ${track?.info.title}`);
    });
});

client.once('clientReady', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    await rythra.connect();
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild || !message.content.startsWith('!play ')) return;

    const query = message.content.slice(6).trim();
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) return void message.reply('You need to join a voice channel first!');

    // Search tracks
    const result = await rythra.search(query, message.author.id, 'youtube');
    if (result.loadType === 'empty' || result.loadType === 'error') {
        return void message.reply('No playable results found.');
    }

    // Create or retrieve player
    const player = rythra.createPlayer({
        guild: message.guild.id,
        voiceChannel: voiceChannel.id,
        textChannel: message.channel.id,
    });

    if (result.loadType === 'playlist') {
        player.queue.add(result.data.tracks);
        await message.reply(`Added **${result.data.tracks.length}** tracks from playlist **${result.data.info.name}**.`);
    } else if (result.loadType === 'track') {
        player.queue.add(result.data);
        await message.reply(`Added **${result.data.info.title}** to the queue.`);
    } else if (result.loadType === 'search') {
        const track = result.data[0];
        if (track) {
            player.queue.add(track);
            await message.reply(`Added **${track.info.title}** to the queue.`);
        }
    }

    // Connect & play
    player.connect();
    if (!player.playing && !player.paused) await player.play();
});

client.login(process.env.BOT_TOKEN);
```

---

## 🔌 Supported Connectors

| Library | Connector Import | Package |
| :--- | :--- | :--- |
| **Discord.js** | `import { DiscordJS } from 'rythra'` or `'@rythra/connector-discordjs'` | [`@rythra/connector-discordjs`](https://www.npmjs.com/package/@rythra/connector-discordjs) |
| **Eris** | `import { ErisConnector } from '@rythra/connector-eris'` | [`@rythra/connector-eris`](https://www.npmjs.com/package/@rythra/connector-eris) |
| **Oceanic.js** | `import { OceanicJS } from '@rythra/connector-oceanic'` | [`@rythra/connector-oceanic`](https://www.npmjs.com/package/@rythra/connector-oceanic) |
| **Seyfert** | `import { SeyfertConnector } from '@rythra/connector-seyfert'` | [`@rythra/connector-seyfert`](https://www.npmjs.com/package/@rythra/connector-seyfert) |

---

## 🎛️ Player Controls & Queue

```typescript
const player = rythra.players.get(guildId);

// Playback controls
await player.play();
await player.pause(true);  // Pause
await player.pause(false); // Resume
await player.skip();       // Skip to next track
await player.stop();       // Stop and clear

// Volume (0 - 1000, 100 is default)
await player.setVolume(80);

// Seeking (in milliseconds)
await player.seek(60_000); // 1 minute

// Filters (Equalizer, Timescale, Tremolo, Karaoke, etc.)
await player.node.rest.updatePlayer({
    guildId,
    playerOptions: {
        filters: {
            timescale: { speed: 1.25, pitch: 1.0, rate: 1.0 }
        }
    }
});

// Queue management
player.queue.shuffle();
player.queue.remove(0); // Remove first track
player.queue.clear();   // Clear remaining queue
```

---

## 🌐 Protocol & Lavalink Versions

Rythra isolates Lavalink API generations so your application code never breaks across server upgrades:

```typescript
const rythra = new Rythra({
    connector,
    lavalinkVersion: 'auto', // 'auto' | 4 | 5
    nodes: [
        {
            host: 'node-v4.example.com',
            port: 2333,
            password: 'youshallnotpass',
            lavalinkVersion: 4,
        },
        {
            host: 'node-v5.example.com',
            port: 2333,
            password: 'youshallnotpass',
            lavalinkVersion: 'auto',
        },
    ],
});
```

---

## 🏗️ Monorepo Structure

```text
Rythra
├── packages/
│   ├── core                     # @rythra/core: Main runtime, player, queue, health, node
│   ├── protocol                 # @rythra/protocol: Lavalink v4/v5 protocol definitions
│   ├── plugins                  # @rythra/plugins: Extensible plugin registry
│   └── connectors/
│       ├── discordjs            # @rythra/connector-discordjs
│       ├── eris                 # @rythra/connector-eris
│       ├── oceanic              # @rythra/connector-oceanic
│       └── seyfert              # @rythra/connector-seyfert
└── dist/                        # Unified root distribution build
```

---

## 🧪 Development & Testing

```bash
# Install dependencies
bun install

# Run test suite
bun test

# Build all packages & documentation
bun run build

# Publish all packages to npm
bun run publish:all
```

---

## 📄 License

MIT © [Rythra Team](https://github.com/Ekretos/Rythra)
