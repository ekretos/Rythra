# @rythra/plugins 🧩

Official plugin contracts and extension lifecycle registry for [Rythra](https://github.com/Ekretos/Rythra).

[![npm version](https://img.shields.io/npm/v/@rythra/plugins.svg?style=flat-square)](https://www.npmjs.com/package/@rythra/plugins)
[![license](https://img.shields.io/github/license/Ekretos/Rythra.svg?style=flat-square)](https://github.com/Ekretos/Rythra/blob/main/LICENSE)

---

## 📦 Installation

```bash
bun add @rythra/plugins
# or
npm install @rythra/plugins
```

---

## 🚀 Overview

Plugins extend public lifecycle contracts rather than depending on private core internals, keeping your bot extensions stable across Rythra releases:

```typescript
import { PluginRegistry, type RythraPlugin } from '@rythra/plugins';

const registry = new PluginRegistry();

const myPlugin: RythraPlugin = {
    name: 'custom-logger',
    version: '1.0.0',
    load(manager) {
        console.log('Plugin loaded into Rythra manager!');
    },
    unload(manager) {
        console.log('Plugin unloaded.');
    }
};

registry.register(myPlugin);
```

---

## 📄 License

MIT © [Rythra Team](https://github.com/Ekretos/Rythra)
