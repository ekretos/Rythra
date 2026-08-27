import { execSync } from 'node:child_process';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

const packages = [
  'packages/core',
  'packages/protocol',
  'packages/plugins',
  'packages/connectors/discordjs',
  'packages/connectors/eris',
  'packages/connectors/oceanic',
  'packages/connectors/seyfert',
  '.'
];

console.log('Building all packages first...');
execSync('bun run build', { cwd: root, stdio: 'inherit' });

console.log('\nPublishing packages to npm...');
for (const pkg of packages) {
  const pkgDir = path.join(root, pkg);
  console.log(`\n--> Publishing ${pkg}...`);
  try {
    execSync('npm publish --access public', { cwd: pkgDir, stdio: 'inherit' });
    console.log(`✓ Published ${pkg}`);
  } catch (error) {
    console.error(`✗ Failed to publish ${pkg}:`, error.message);
  }
}
