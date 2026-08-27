# @rythra/connector-seyfert 🔌

Official **Seyfert** connector for [Rythra](https://github.com/Ekretos/Rythra). Bridges Seyfert gateway events and voice states with Rythra's framework-agnostic audio runtime.

[![npm version](https://img.shields.io/npm/v/@rythra/connector-seyfert.svg?style=flat-square)](https://www.npmjs.com/package/@rythra/connector-seyfert)
[![license](https://img.shields.io/github/license/Ekretos/Rythra.svg?style=flat-square)](https://github.com/Ekretos/Rythra/blob/main/LICENSE)

---

## 📦 Installation

```bash
# Using Bun
bun add @rythra/core @rythra/connector-seyfert seyfert

# Using npm
npm install @rythra/core @rythra/connector-seyfert seyfert
```

---

## 🚀 Usage

```typescript
import { Client } from 'seyfert';
import { Rythra } from '@rythra/core';
import { SeyfertConnector } from '@rythra/connector-seyfert';

const client = new Client();
const connector = new SeyfertConnector(client);

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

client.events.on('botReady', async () => {
    console.log('Seyfert client ready!');
    await rythra.connect();
});

client.start();
```

---

## 📄 License

MIT © [Rythra Team](https://github.com/Ekretos/Rythra)
