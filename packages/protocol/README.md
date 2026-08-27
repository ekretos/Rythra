# @rythra/protocol 🌐

Versioned Lavalink protocol contracts and wire boundary for [Rythra](https://github.com/Ekretos/Rythra).

[![npm version](https://img.shields.io/npm/v/@rythra/protocol.svg?style=flat-square)](https://www.npmjs.com/package/@rythra/protocol)
[![license](https://img.shields.io/github/license/Ekretos/Rythra.svg?style=flat-square)](https://github.com/Ekretos/Rythra/blob/main/LICENSE)

---

## 📦 Installation

```bash
bun add @rythra/protocol
# or
npm install @rythra/protocol
```

---

## 🏗️ Structure

```text
packages/protocol/src/
├── v3/            # Lavalink v3 wire & REST contracts
├── v4/            # Lavalink v4 wire & REST contracts
├── v5/            # Lavalink v5 compatibility boundary
├── version.ts     # Version negotiation and semantic version parser
└── index.ts       # Protocol exports
```

---

## 📄 License

MIT © [Rythra Team](https://github.com/Ekretos/Rythra)
