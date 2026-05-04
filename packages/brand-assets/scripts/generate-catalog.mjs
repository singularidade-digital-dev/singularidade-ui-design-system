#!/usr/bin/env node
// Generates a machine-readable JSON catalog of all icons (lucide + custom).
// Used by docs site, Storybook, tooling.
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BUILD = join(ROOT, 'build');
mkdirSync(BUILD, { recursive: true });

const sources = [
  { dir: 'src/icons/lucide', prefix: 'lucide', source: 'lucide-static' },
  { dir: 'src/icons/custom', prefix: 'ss', source: '@singularidade/brand-assets' },
];

const catalog = { icons: [] };

for (const s of sources) {
  const fullDir = join(ROOT, s.dir);
  const files = readdirSync(fullDir)
    .filter((f) => f.endsWith('.svg'))
    .sort();

  for (const f of files) {
    const name = f.replace('.svg', '');
    const svg = readFileSync(join(fullDir, f), 'utf-8');
    const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] || '0 0 24 24';

    catalog.icons.push({
      name,
      prefix: s.prefix,
      qualified: `${s.prefix}:${name}`,
      viewBox,
      source: s.source,
      path: s.dir + '/' + f,
    });
  }
}

writeFileSync(join(BUILD, 'icons.json'), JSON.stringify(catalog, null, 2));
console.log(`✓ build/icons.json (${catalog.icons.length} icons)`);
