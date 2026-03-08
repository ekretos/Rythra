# Rythra 🎵

A lightweight, powerful, and modular Lavalink wrapper for multi-library Discord bots. Designed for performance and developer flexibility.

[![npm version](https://img.shields.io/npm/v/rythra.svg?style=flat-square)](https://www.npmjs.com/package/rythra)
[![license](https://img.shields.io/github/license/Ekretos/Rythra.svg?style=flat-square)](https://github.com/Ekretos/Rythra/blob/main/LICENSE)

## Why Rythra?

- **Modular Architecture**: Separate concerns with dedicated classes for `Player`, `Queue`, `Node`, and `Rest`.
- **Multi-Library Support**: Native connectors for **Discord.js**, **Eris**, **OceanicJS**, and **Seyfert**.
- **Lavalink v4 Ready**: Fully compatible with the latest Lavalink features, including RESTful voice updates and advanced session management.
- **Built-in Queue**: A robust, zero-dependency queue system included out of the box.
- **Developer Friendly**: Clean API, full TypeScript support, and helpful error handling with `RestError`.

---

## 🚀 Getting Started

### Installation

```bash
bun add rythra
# or
npm install rythra
```

### Quick Start (Discord.js)

```typescript
import { Client, GatewayIntentBits } from 'discord.js';
import { Rythra, Connector } from 'rythra';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Create the connector
const connector = new Connector.DiscordJS(client);

// Initialize Rythra
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
    autoPlay: true, // Automatically play the next song in queue
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    rythra.connect();
});

// Simple play command example
client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!play')) {
        const query = message.content.split(' ').slice(1).join(' ');
        const voiceChannel = message.member?.voice.channel;

        if (!voiceChannel || !query) return;

        const result = await rythra.search(query, message.author.id);
        const player = rythra.createPlayer({
            guild: message.guild.id,
            voiceChannel: voiceChannel.id,
            textChannel: message.channel.id,
        });

        player.connect();
        player.queue.add(result.data.tracks[0] || result.data[0]);

        if (!player.playing) await player.play();
        message.reply(`Added to queue: **${player.queue.current.info.title}**`);
    }
});

client.login('YOUR_BOT_TOKEN');
```

---

## 🔌 Supported Libraries

Rythra abstracts library interactions through a clean static API on the `Connector` class:

- **Discord.js**: `new Connector.DiscordJS(client)`
- **Eris**: `new Connector.Eris(client)`
- **OceanicJS**: `new Connector.OceanicJS(client)`
- **Seyfert**: `new Connector.Seyfert(client)`

---

## 🏗️ Architecture

### `Rythra` (Manager)

The central orchestrator for nodes and players.

- `search(query, requester, source?)`: Robust search across YouTube, SoundCloud, Spotify, etc.
- `createPlayer(options)`: Get or create a guild-specific player.
- `nodes`: Access and manage Lavalink nodes.

### `RythraPlayer`

Handles playback for a single guild.

- `play()`, `stop()`, `pause()`, `skip()`
- `setVolume(volume)`
- `queue`: Access the built-in `Queue` instance.

### `Queue`

A powerful array-based queue.

- `add(track)`: Supports single tracks or arrays (playlists).
- `shuffle()`, `clear()`, `shift()`
- `current`, `previous`: Track history and current state.

### `Rest`

Direct access to the Lavalink REST API.

- Comprehensive support for sessions, players, stats, and route planners.
- Handles Lavalink v4 requirements (like `sessionId`).

---

## 🛠️ Configuration

```typescript
const rythra = new Rythra({
    connector: new Connector.DiscordJS(client),
    autoPlay: true, // Auto-advance queue
    defaultSearchPlatform: 'youtube',
    userAgent: 'MyBot/1.0',
    restTimeout: 15, // Seconds
});
```

---

## 📄 License

MIT © [Rythra Team](https://github.com/Ekretos/Rythra)
