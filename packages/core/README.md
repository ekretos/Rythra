# @rythra/core 🎵

The framework-agnostic core runtime for Rythra. Responsible for Lavalink node lifecycle, player management, audio queues, REST interaction, health monitoring, and failover recovery.

[![npm version](https://img.shields.io/npm/v/@rythra/core.svg?style=flat-square)](https://www.npmjs.com/package/@rythra/core)
[![license](https://img.shields.io/github/license/Ekretos/Rythra.svg?style=flat-square)](https://github.com/Ekretos/Rythra/blob/main/LICENSE)

---

## 📦 Installation

```bash
# Using Bun
bun add @rythra/core

# Using npm
npm install @rythra/core
```

---

## 🚀 Usage

`@rythra/core` is designed to be paired with any Discord library connector (e.g. `@rythra/connector-discordjs`):

```typescript
import { Rythra, Node, RythraPlayer } from '@rythra/core';
import type { Track, SearchResponse } from '@rythra/core';
import { DiscordJS } from '@rythra/connector-discordjs';
import { Client, GatewayIntentBits } from 'discord.js';

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

// Connect to Lavalink nodes once Discord is ready
client.once('clientReady', async () => {
    console.log(`Bot ready as ${client.user?.tag}`);
    await rythra.connect();
});

// Search tracks
const result = await rythra.search('never gonna give you up', 'USER_ID', 'youtube');
if (result.loadType === 'search') {
    console.log(`Found ${result.data.length} tracks`);
}

// Create a player
const player = rythra.createPlayer({
    guild: 'GUILD_ID',
    voiceChannel: 'VOICE_CHANNEL_ID',
    textChannel: 'TEXT_CHANNEL_ID',
});
```

---

## 🏗️ Architecture

```text
packages/core/src/
├── Connector.ts        # Abstract connector contract for Discord libraries
├── Node.ts             # Lavalink WebSocket node management & reconnects
├── Player.ts           # Guild audio player controller
├── Queue.ts            # High-performance audio queue
├── Rest.ts             # Lavalink REST API client
├── Rythra.ts           # Central manager orchestrating nodes and players
├── Types.ts            # Public TypeScript definitions & interfaces
├── errors/             # Typed errors (RythraError, ConfigurationError, etc.)
├── filters/            # Audio filters (Equalizer, Timescale, Karaoke, etc.)
├── health/             # Node and player health monitoring
├── reliability/        # Circuit breaker and fault tolerance
└── queue/              # Queue storage adapters
```

---

## 📄 License

MIT © [Rythra Team](https://github.com/Ekretos/Rythra)
