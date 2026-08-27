import { describe, expect, test } from "bun:test";
import { PluginRegistry } from "../src/index.js";

describe("PluginRegistry", () => {
    test("registers and discovers metadata without loading plugins", () => {
        const registry = new PluginRegistry();
        let loaded = false;

        registry.register({
            manifest: {
                name: "example-plugin",
                version: "1.0.0",
                rythra: ">=0.0.2",
                lavalink: ["v4", "v5"],
            },
            load: async () => {
                loaded = true;
                return { name: "example-plugin" };
            },
        });

        expect(registry.list()).toHaveLength(1);
        expect(loaded).toBe(false);
    });

    test("loads a registered plugin on demand", async () => {
        const registry = new PluginRegistry();
        registry.register({
            manifest: {
                name: "example-plugin",
                version: "1.0.0",
                rythra: ">=0.0.2",
                lavalink: ["v5"],
            },
            load: async () => "loaded",
        });

        expect(await registry.load("example-plugin")).toBe("loaded");
    });

    test("rejects duplicate registrations", () => {
        const registry = new PluginRegistry();
        const entry = {
            manifest: { name: "duplicate", version: "1.0.0", rythra: ">=0.0.2", lavalink: ["v5"] as const },
            load: async () => undefined,
        };

        registry.register(entry);
        expect(() => registry.register(entry)).toThrow("already registered");
    });
});
