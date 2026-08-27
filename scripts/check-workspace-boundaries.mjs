import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const packagePaths = [
  "packages/core",
  "packages/protocol",
  "packages/persistence",
  "packages/metrics",
  "packages/plugins",
  "packages/types",
];

/**
 * Validate that workspace packages do not accidentally introduce forbidden
 * runtime coupling. The core package must remain framework agnostic.
 */
const forbidden = new Map([
  ["packages/core", [/discord\.js/i, /eris/i, /oceanic/i, /seyfert/i]],
  ["packages/types", [/discord\.js/i, /eris/i, /oceanic/i, /seyfert/i]],
]);

for (const packagePath of packagePaths) {
  const packageJsonPath = resolve(root, packagePath, "package.json");
  let packageJson;
  try {
    packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
  } catch {
    continue;
  }

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.optionalDependencies,
    ...packageJson.peerDependencies,
  };
  const rules = forbidden.get(packagePath) ?? [];

  for (const dependency of Object.keys(dependencies)) {
    if (rules.some((rule) => rule.test(dependency))) {
      throw new Error(`${packagePath} cannot depend on ${dependency}`);
    }
  }
}

console.log("Workspace dependency boundaries passed.");
