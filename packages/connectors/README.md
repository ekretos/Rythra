# @rythra/connectors 🔌

Discord gateway and voice adapters for [Rythra](https://github.com/Ekretos/Rythra). Connectors bridge Discord library gateway events and voice states into Rythra's framework-agnostic voice runtime.

---

## 📦 Available Connectors

| Library | Package | Description |
| :--- | :--- | :--- |
| **Discord.js** | [`@rythra/connector-discordjs`](./discordjs) | Adapter for Discord.js v14+ bots |
| **Eris** | [`@rythra/connector-eris`](./eris) | Adapter for Eris bots |
| **Oceanic.js** | [`@rythra/connector-oceanic`](./oceanic) | Adapter for Oceanic.js bots |
| **Seyfert** | [`@rythra/connector-seyfert`](./seyfert) | Adapter for Seyfert bots |

---

## 🛠️ Implementing Custom Connectors

You can easily build a connector for any Discord library or gateway architecture by extending the base `Connector` class from `@rythra/core`:

```typescript
import { Connector } from '@rythra/core';

export class CustomConnector extends Connector {
    public listen(): void {
        // Listen to raw gateway voiceServerUpdate and voiceStateUpdate events
        // and forward them:
        // this.manager.voiceServerUpdate(data);
        // this.manager.voiceStateUpdate(data);
    }
}
```

---

## 📄 License

MIT © [Rythra Team](https://github.com/Ekretos/Rythra)
