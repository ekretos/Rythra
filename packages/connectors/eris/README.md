# @rythra/connector-eris 🔌

Official **Eris** connector for [Rythra](https://github.com/Ekretos/Rythra). Bridges Eris gateway events and voice states with Rythra's framework-agnostic audio runtime.

[![npm version](https://img.shields.io/npm/v/@rythra/connector-eris.svg?style=flat-square)](https://www.npmjs.com/package/@rythra/connector-eris)
[![license](https://img.shields.io/github/license/Ekretos/Rythra.svg?style=flat-square)](https://github.com/Ekretos/Rythra/blob/main/LICENSE)

---

## 📦 Installation

```bash
# Using Bun
bun add @rythra/core @rythra/connector-eris eris

# Using npm
npm install @rythra/core @rythra/connector-eris eris
```

---

## 🚀 Usage

```typescript
import Eris from 'eris';
import { Rythra } from '@rythra/core';
import { ErisConnector } from '@rythra/connector-eris';

const client = new Eris.Client('YOUR_DISCORD_BOT_TOKEN');
const connector = new ErisConnector(client);

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

client.on('ready', async () => {
    console.log('Eris client ready!');
    await rythra.connect();
});

client.connect();
```

---

## 📄 License

MIT © [Rythra Team](https://github.com/Ekretos/Rythra)
