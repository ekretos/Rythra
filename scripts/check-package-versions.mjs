import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const packagesRoot = resolve(root, "packages");

/**
 * Ensure every publishable workspace package declares a valid SemVer version.
 * Independent versions are intentional; packages must not silently inherit
 * the root application's private version.
 */
async function collect(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const packages = [];

  for (const entry of entries) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      try {
        const packageJson = JSON.parse(await readFile(resolve(path, "package.json"), "utf8"));
        packages.push({ path, packageJson });
      } catch {
        packages.push(...(await collect(path)));
      }
    }
  }

  return packages;
}

const packages = await collect(packagesRoot);
const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const seen = new Map();

for (const { path, packageJson } of packages) {
  if (packageJson.private) continue;
  if (!packageJson.name?.startsWith("@rythra/")) {
    throw new Error(`${path}: publishable packages must use the @rythra/ scope`);
  }
  if (!semver.test(packageJson.version ?? "")) {
    throw new Error(`${packageJson.name}: invalid SemVer version ${packageJson.version}`);
  }
  if (seen.has(packageJson.name)) {
    throw new Error(`Duplicate package name: ${packageJson.name}`);
  }
  seen.set(packageJson.name, packageJson.version);
}

console.log(`Package version validation passed for ${seen.size} package(s).`);
