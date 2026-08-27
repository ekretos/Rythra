# Rythra 🎵

A lightweight, powerful, and modular Lavalink wrapper for multi-library Discord bots. Designed for performance and developer flexibility.

[![npm version](https://img.shields.io/npm/v/rythra.svg?style=flat-square)](https://www.npmjs.com/package/rythra)
[![license](https://img.shields.io/github/license/Ekretos/Rythra.svg?style=flat-square)](https://github.com/Ekretos/Rythra/blob/main/LICENSE)

## Why Rythra?

- **Modular Architecture**: Separate concerns with dedicated classes for `Player`, `Queue`, `Node`, and `Rest`.
- **Multi-Library Support**: Native connectors for **Discord.js**, **Eris**, **OceanicJS**, and **Seyfert**.
- **Version-Aware Protocol**: Lavalink API generation is isolated from the core player/manager API, with explicit v4/v5 selection and automatic server-version detection.
- **Lavalink v4 Ready**: RESTful player control, voice updates, session management, filters, and modern event handling.
- **v5-Ready Architecture**: The protocol layer accepts Lavalink v5 so the core API does not need a rewrite when the v5 server protocol is released.
- **Built-in Queue**: A robust, zero-dependency queue system included out of the box.
- **Developer Friendly**: Clean API, full TypeScript support, and helpful error handling with `RestError`.

> **Lavalink v5 note:** The upstream Lavalink project currently publishes v4.2.x as its latest stable server release. Rythra therefore does not claim unverified v5 server compatibility; instead, the protocol boundary is implemented now so v5-specific endpoint/handshake changes can be added without breaking the public API.

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

const connector = new Connector.DiscordJS(client);

const rythra = new Rythra({
    connector,
    lavalinkVersion: 'auto',
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

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    await rythra.connect();
});

client.login('YOUR_BOT_TOKEN');
```

### Selecting a Lavalink generation

```typescript
const rythra = new Rythra({
    connector,
    lavalinkVersion: 'auto', // 4 | 5 | auto
    nodes: [
        { host: 'node-v4.example.com', lavalinkVersion: 4 },
        { host: 'node-v5.example.com', lavalinkVersion: 5 },
    ],
});
```

`auto` reads the server version from `/version` before opening the versioned WebSocket connection. Unsupported future major versions are rejected instead of being silently treated as v4.

---

## 🔌 Supported Libraries

Rythra abstracts library interactions through the `Connector` class:

- **Discord.js**: `new Connector.DiscordJS(client)`
- **Eris**: `new Connector.Eris(client)`
- **OceanicJS**: `new Connector.OceanicJS(client)`
- **Seyfert**: `new Connector.Seyfert(client)`

---

## 🏗️ Architecture

```text
Rythra
├── Core
│   ├── Player
│   ├── Queue
│   ├── Node
│   └── Rest
├── Protocol
│   ├── Lavalink v4
│   └── Lavalink v5 boundary
└── Connectors
    ├── Discord.js
    ├── Eris
    ├── OceanicJS
    └── Seyfert
```

The public player API remains independent from Lavalink API generation. Version-specific behavior belongs in the protocol/node/REST layer.

---

## 🛠️ Configuration

```typescript
const rythra = new Rythra({
    connector: new Connector.DiscordJS(client),
    lavalinkVersion: 'auto',
    autoPlay: true,
    defaultSearchPlatform: 'youtube',
    userAgent: 'MyBot/1.0',
    restTimeout: 15,
});
```

---

## 🧪 Testing

```bash
bun test
```

---

## 📄 License

MIT © [Rythra Team](https://github.com/Ekretos/Rythra)
