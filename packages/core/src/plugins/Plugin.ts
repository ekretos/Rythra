/**
 * Stable lifecycle contract for Rythra extensions.
 *
 * Plugins are intentionally framework-agnostic. They receive a narrow context
 * and may register integrations without reaching into private core state.
 */
export interface RythraPlugin<TContext = RythraPluginContext> {
    /** Unique plugin identifier used for registration and diagnostics. */
    readonly name: string;

    /** Plugin semantic version. */
    readonly version: string;

    /** Initialize the plugin. */
    setup(context: TContext): void | Promise<void>;

    /** Release resources owned by the plugin. */
    destroy?(): void | Promise<void>;
}

/** Minimal stable context exposed to ecosystem plugins. */
export interface RythraPluginContext {
    /** Register a named lifecycle hook. */
    on(event: string, listener: (...args: unknown[]) => void | Promise<void>): () => void;

    /** Read immutable runtime metadata. */
    readonly version: string;
}
