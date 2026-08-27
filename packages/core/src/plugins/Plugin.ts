/**
 * Extension contract for Rythra plugins.
 *
 * @remarks
 * Plugins receive lifecycle hooks rather than reaching into private manager
 * state. This keeps extensions compatible with future core refactors.
 */
export interface RythraPlugin<Context = unknown> {
    /** Unique plugin name used for diagnostics and duplicate detection. */
    readonly name: string;
    /** Optional semantic version of the plugin. */
    readonly version?: string;
    /** Called once when the plugin is registered. */
    setup?(context: Context): void | Promise<void>;
    /** Called while the Rythra manager is being destroyed. */
    destroy?(context: Context): void | Promise<void>;
}

/**
 * Small plugin registry with duplicate protection and deterministic teardown.
 */
export class PluginRegistry<Context = unknown> {
    private readonly plugins = new Map<string, RythraPlugin<Context>>();

    /** Returns all registered plugins in registration order. */
    public list(): readonly RythraPlugin<Context>[] { return [...this.plugins.values()]; }

    /**
     * Registers and initializes a plugin.
     * @param plugin Plugin to register.
     * @param context Plugin context.
     * @throws {Error} When another plugin uses the same name.
     */
    public async register(plugin: RythraPlugin<Context>, context: Context): Promise<void> {
        if (!plugin.name.trim()) throw new Error('Plugin name cannot be empty.');
        if (this.plugins.has(plugin.name)) throw new Error(`Plugin already registered: ${plugin.name}`);
        await plugin.setup?.(context);
        this.plugins.set(plugin.name, plugin);
    }

    /**
     * Unregisters and tears down a plugin.
     * @param name Plugin name.
     * @param context Plugin context.
     * @returns Whether a plugin was removed.
     */
    public async unregister(name: string, context: Context): Promise<boolean> {
        const plugin = this.plugins.get(name);
        if (!plugin) return false;
        await plugin.destroy?.(context);
        this.plugins.delete(name);
        return true;
    }

    /** Tears down and removes every registered plugin. */
    public async clear(context: Context): Promise<void> {
        for (const name of [...this.plugins.keys()]) await this.unregister(name, context);
    }
}
