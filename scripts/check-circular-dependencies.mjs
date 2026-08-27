import { readFile, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const packagesRoot = resolve(root, "packages");
const packageByName = new Map();

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      try {
        const manifest = JSON.parse(await readFile(resolve(path, "package.json"), "utf8"));
        if (manifest.name?.startsWith("@rythra/")) packageByName.set(manifest.name, path);
      } catch {
        await walk(path);
      }
    }
  }
}

await walk(packagesRoot);
const graph = new Map();

for (const [name, path] of packageByName) {
  const manifest = JSON.parse(await readFile(resolve(path, "package.json"), "utf8"));
  const deps = new Set([
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.devDependencies ?? {}),
    ...Object.keys(manifest.peerDependencies ?? {}),
    ...Object.keys(manifest.optionalDependencies ?? {}),
  ]);
  graph.set(name, [...deps].filter((dep) => packageByName.has(dep)));
}

const visiting = new Set();
const visited = new Set();

function visit(name, chain = []) {
  if (visiting.has(name)) {
    const cycle = [...chain.slice(chain.indexOf(name)), name].join(" -> ");
    throw new Error(`Circular @rythra dependency detected: ${cycle}`);
  }
  if (visited.has(name)) return;
  visiting.add(name);
  for (const dependency of graph.get(name) ?? []) visit(dependency, [...chain, name]);
  visiting.delete(name);
  visited.add(name);
}

for (const name of graph.keys()) visit(name);
console.log(`Circular dependency check passed for ${graph.size} package(s).`);
