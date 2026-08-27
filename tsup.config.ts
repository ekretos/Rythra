import { defineConfig } from 'tsup';

/** Shared tsup defaults. Package build scripts provide their own entry/output. */
export default defineConfig({
    format: ['esm'],
    bundle: false,
    splitting: false,
    sourcemap: true,
    clean: true,
    target: 'esnext',
    minify: false,
    keepNames: true,
    skipNodeModulesBundle: true,
});
