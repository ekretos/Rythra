# Community plugin example

This example shows the intended shape of a third-party Rythra plugin without depending on private internals.

```ts
import type { PluginEntry } from "@rythra/plugins";

export const plugin: PluginEntry = {
    manifest: {
        name: "example-rythra-plugin",
        version: "0.1.0",
        rythra: ">=0.0.2",
        lavalink: ["v4", "v5"],
        runtimes: ["node", "bun"],
    },
    load: async () => {
        return {
            name: "example-rythra-plugin",
        };
    },
};
```

Keep the implementation behind the package's public entry point and test lifecycle/failure behavior before publishing.
