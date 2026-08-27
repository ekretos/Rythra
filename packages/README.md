# Rythra Packages 📦

Rythra is organized as a modular, package-oriented monorepo. Production code is split into focused, decoupled packages under `packages/`:

---

## 🗂️ Workspace Packages

| Package | Path | Description |
| :--- | :--- | :--- |
| **`@rythra/core`** | [`packages/core`](./core) | Framework-agnostic Lavalink runtime, node, player, queue, health, and reliability |
| **`@rythra/protocol`** | [`packages/protocol`](./protocol) | Versioned Lavalink protocol contracts (v3, v4, v5) |
| **`@rythra/plugins`** | [`packages/plugins`](./plugins) | Plugin system and lifecycle registry |
| **`@rythra/connector-discordjs`** | [`packages/connectors/discordjs`](./connectors/discordjs) | Discord.js v14+ connector |
| **`@rythra/connector-eris`** | [`packages/connectors/eris`](./connectors/eris) | Eris connector |
| **`@rythra/connector-oceanic`** | [`packages/connectors/oceanic`](./connectors/oceanic) | Oceanic.js connector |
| **`@rythra/connector-seyfert`** | [`packages/connectors/seyfert`](./connectors/seyfert) | Seyfert connector |

---

## 📄 License

MIT © [Rythra Team](https://github.com/Ekretos/Rythra)
