# @rythra/connector-discordjs 🔌

Official **Discord.js** connector for [Rythra](https://github.com/Ekretos/Rythra). Bridges Discord.js gateway events and voice state with Rythra's framework-agnostic audio runtime.

[![npm version](https://img.shields.io/npm/v/@rythra/connector-discordjs.svg?style=flat-square)](https://www.npmjs.com/package/@rythra/connector-discordjs)
[![license](https://img.shields.io/github/license/Ekretos/Rythra.svg?style=flat-square)](https://github.com/Ekretos/Rythra/blob/main/LICENSE)

---

## 📦 Installation

```bash
# Using Bun
bun add @rythra/core @rythra/connector-discordjs discord.js

# Using npm
npm install @rythra/core @rythra/connector-discordjs discord.js
```

---

## 🚀 Usage

```typescript
import { Client, GatewayIntentBits } from 'discord.js';
import { Rythra } from '@rythra/core';
import { DiscordJS } from '@rythra/connector-discordjs';

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
});

client.once('clientReady', async () => {
    console.log(`Ready as ${client.user?.tag}!`);
    await rythra.connect();
});

client.login('YOUR_DISCORD_BOT_TOKEN');
```

---

## 📄 License

MIT © [Rythra Team](https://github.com/Ekretos/Rythra)
