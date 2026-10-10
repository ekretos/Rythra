# @rythra/connectors

Discord library connectors for [Rythra](https://github.com/Ekretos/Rythra): `DiscordJS`, `Eris`, `OceanicJS`, `Seyfert` and `Lunibee`.

A connector forwards your Discord library's voice events to Rythra and sends voice packets back through it. Your Discord library is **your own dependency** — this package does not install it.

## Install

```bash
bun add @rythra/core @rythra/connectors   # plus your Discord library
```

Import from the package root or a subpath:

```ts
import { DiscordJS } from '@rythra/connectors';
import { Lunibee } from '@rythra/connectors/lunibee'; // /discordjs, /eris, /oceanic, /seyfert, /lunibee
```

| Library | Class | Notes |
| --- | --- | --- |
| discord.js v14 | `DiscordJS` | Needs the `GuildVoiceStates` intent. |
| Eris | `Eris` | |
| Oceanic.js | `OceanicJS` | |
| Seyfert | `Seyfert` | |
| Lunibee | `Lunibee` | Single gateway connection; needs the `GuildVoiceStates` intent. |

## Usage

Every connector is used the same way: wrap your client and pass it to `Rythra`.

```ts
import { Client, GatewayIntentBits } from 'discord.js';
import { Rythra } from '@rythra/core';
import { DiscordJS } from '@rythra/connectors';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

const rythra = new Rythra({
    connector: new DiscordJS(client),
    nodes: [{ host: 'localhost', port: 2333, password: process.env.LAVALINK_PASSWORD! }],
});

client.once('clientReady', () => rythra.connect());
await client.login(process.env.BOT_TOKEN);
```

For Eris, Oceanic.js, Seyfert and Lunibee, replace `DiscordJS` with `Eris`, `OceanicJS`, `Seyfert` or `Lunibee` and pass that library's client. Connect Rythra only after the client is ready: connectors cannot send voice packets before the Discord gateway is connected.

## Writing a connector

Extend `Connector` from `@rythra/core` and implement `listen()`, `sendPacket()` and `getId()`. `listen()` is idempotent in the built-in connectors; keep the `listening` guard in yours.
