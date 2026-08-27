# @rythra/connector-oceanic 🔌

Official **Oceanic.js** connector for [Rythra](https://github.com/Ekretos/Rythra). Bridges Oceanic.js gateway events and voice states with Rythra's framework-agnostic audio runtime.

[![npm version](https://img.shields.io/npm/v/@rythra/connector-oceanic.svg?style=flat-square)](https://www.npmjs.com/package/@rythra/connector-oceanic)
[![license](https://img.shields.io/github/license/Ekretos/Rythra.svg?style=flat-square)](https://github.com/Ekretos/Rythra/blob/main/LICENSE)

---

## 📦 Installation

```bash
# Using Bun
bun add @rythra/core @rythra/connector-oceanic oceanic.js

# Using npm
npm install @rythra/core @rythra/connector-oceanic oceanic.js
```

---

## 🚀 Usage

```typescript
import { Client } from 'oceanic.js';
import { Rythra } from '@rythra/core';
import { OceanicJS } from '@rythra/connector-oceanic';

const client = new Client({
    auth: 'Bot YOUR_DISCORD_BOT_TOKEN',
});

const connector = new OceanicJS(client);

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

client.once('ready', async () => {
    console.log(`Oceanic client ready as ${client.user.tag}!`);
    await rythra.connect();
});

client.connect();
```

---

## 📄 License

MIT © [Rythra Team](https://github.com/Ekretos/Rythra)
