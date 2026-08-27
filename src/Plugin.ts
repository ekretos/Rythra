import type { Rythra } from './Rythra';

/** Context supplied to a Rythra plugin during installation. */
export interface PluginContext { /** Rythra manager instance. */ manager: Rythra; }

/** Extension contract for Rythra plugins. */
export interface RythraPlugin {
    /** Unique plugin name. */
    readonly name: string;
    /** Optional plugin version. */
    readonly version?: string;
    /** Installs the plugin. */
    setup(context: PluginContext): void | Promise<void>;
    /** Optional plugin cleanup hook. */
    destroy?(context: PluginContext): void | Promise<void>;
}
