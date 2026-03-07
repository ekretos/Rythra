---
title: Getting Started
description: Learn how to set up and use Rythra in your project.
---

Rythra is a powerful and flexible Lavalink client for Node.js, designed to be easy to use and extend.

## Installation

You can install Rythra using your preferred package manager:

```bash
bun add rythra
# or
npm install rythra
# or
yarn add rythra
```

## Basic Setup

To use Rythra, you need a running Lavalink server and a Discord bot.

### Initializing Rythra

Here's a simple example of how to initialize Rythra with a Discord.js client:

```typescript
import { Client, GatewayIntentBits } from "discord.js";
import { Rythra, Connectors } from "rythra";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const rythra = new Rythra({
    connector: new Connectors.DiscordJS(client),
    nodes: [
        {
            host: "localhost",
            port: 2333,
            password: "youshallnotpass",
            secure: false,
        },
    ],
});

rythra.on("nodeCreate", (node) => {
    console.log(`Node ${node.options.identifier} created!`);
});

rythra.on("nodeConnect", (node) => {
    console.log(`Node ${node.options.identifier} connected!`);
});

client.login("YOUR_DISCORD_BOT_TOKEN");
```

## Searching for Tracks

You can search for tracks using the `search` method:

```typescript
const query = "never gonna give you up";
const result = await rythra.search(query, "USER_ID");

if (result.loadType === "search") {
    console.log(`Found ${result.data.length} tracks!`);
}
```

## Creating a Player

To play audio in a voice channel, you need to create a player:

```typescript
const player = rythra.createPlayer({
    guild: "GUILD_ID",
    voiceChannel: "VOICE_CHANNEL_ID",
    textChannel: "TEXT_CHANNEL_ID",
});

player.connect();
```

Next, learn how to [control the player](/rythra/player).
