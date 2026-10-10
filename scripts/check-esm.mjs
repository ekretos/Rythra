import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

/** Loads every built entry point under plain Node ESM to catch extensionless or undeclared imports. */
const root = resolve(import.meta.dirname, "..");
const entries = [
  "dist/index.js",
  "packages/core/dist/index.js",
  "packages/protocol/dist/index.js",
  "packages/plugins/dist/index.js",
  "packages/metrics/dist/index.js",
  "packages/persistence/dist/index.js",
  "packages/connectors/dist/index.js",
];

for (const entry of entries) {
  await import(pathToFileURL(resolve(root, entry)).href);
}
console.log(`Loaded ${entries.length} built entry points in Node ESM.`);
