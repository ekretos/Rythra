/**
 * Metadata describing a community-installable Rythra plugin.
 *
 * Keeping metadata separate from runtime code lets tooling build catalogs,
 * compatibility reports, and discovery UIs without loading plugin modules.
 */
export interface PluginManifest {
    /** Package name published by the plugin author. */
    readonly name: string;
    /** Plugin release version using SemVer. */
    readonly version: string;
    /** Supported Rythra version range. */
    readonly rythra: string;
    /** Supported Lavalink protocol versions. */
    readonly lavalink: readonly ("v4" | "v5")[];
    /** Optional runtime compatibility declarations. */
    readonly runtimes?: readonly ("node" | "bun")[];
}

/** A validated plugin entry exposed by an ecosystem registry. */
export interface PluginEntry {
    /** Public manifest for discovery and compatibility checks. */
    readonly manifest: PluginManifest;
    /** Load the plugin only when an application opts into it. */
    readonly load: () => Promise<unknown>;
}

/**
 * In-memory registry suitable for applications, tooling, and tests.
 *
 * The registry deliberately stores lazy loaders instead of instantiated
 * plugins, preventing discovery from creating runtime side effects.
 */
export class PluginRegistry {
    private readonly entries = new Map<string, PluginEntry>();

    /** Register a plugin manifest and lazy loader. */
    public register(entry: PluginEntry): void {
        if (this.entries.has(entry.manifest.name)) {
            throw new Error(`Plugin is already registered: ${entry.manifest.name}`);
        }
        this.entries.set(entry.manifest.name, entry);
    }

    /** Return metadata for every registered plugin. */
    public list(): readonly PluginManifest[] {
        return [...this.entries.values()].map(({ manifest }) => manifest);
    }

    /** Find a plugin without loading it. */
    public get(name: string): PluginEntry | undefined {
        return this.entries.get(name);
    }

    /** Load a previously registered plugin on demand. */
    public async load(name: string): Promise<unknown> {
        const entry = this.entries.get(name);
        if (!entry) throw new Error(`Plugin is not registered: ${name}`);
        return entry.load();
    }
}
