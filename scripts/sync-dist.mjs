import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

const mappings = [
  { from: 'dist/core', to: 'packages/core/dist' },
  { from: 'dist/connectors/discordjs', to: 'packages/connectors/discordjs/dist' },
  { from: 'dist/connectors/eris', to: 'packages/connectors/eris/dist' },
  { from: 'dist/connectors/oceanic', to: 'packages/connectors/oceanic/dist' },
  { from: 'dist/connectors/seyfert', to: 'packages/connectors/seyfert/dist' },
  { from: 'dist/protocol', to: 'packages/protocol/dist' },
  { from: 'dist/plugins', to: 'packages/plugins/dist' },
];

for (const { from, to } of mappings) {
  const srcDir = path.join(root, from);
  const destDir = path.join(root, to);
  if (fs.existsSync(srcDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    fs.cpSync(srcDir, destDir, { recursive: true });
  }
}

console.log('Synced package dist artifacts for publishing.');
