#!/usr/bin/env node
// Consolidates all icons (lucide + custom) into a single SVG sprite with <symbol>
// elements. Consumers reference via <use href="sprite.svg#icon-{name}"/>.
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BUILD = join(ROOT, 'build');
mkdirSync(BUILD, { recursive: true });

const sources = [
  { dir: 'src/icons/lucide', prefix: 'lucide' },
  { dir: 'src/icons/custom', prefix: 'ss' },
];

const symbols = [];
const manifest = [];

for (const s of sources) {
  const fullDir = join(ROOT, s.dir);
  const files = readdirSync(fullDir)
    .filter((f) => f.endsWith('.svg'))
    .sort();

  for (const f of files) {
    const name = f.replace('.svg', '');
    const svgRaw = readFileSync(join(fullDir, f), 'utf-8');

    // Extract viewBox + inner content
    const viewBox = svgRaw.match(/viewBox="([^"]+)"/)?.[1] || '0 0 24 24';
    const inner = svgRaw.replace(/<\?xml[^?]*\?>/, '').replace(/<\/?svg[^>]*>/g, '');

    const id = `${s.prefix}-${name}`;
    symbols.push(`  <symbol id="${id}" viewBox="${viewBox}">${inner.trim()}</symbol>`);
    manifest.push({ prefix: s.prefix, name, id, viewBox });
  }
}

const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
${symbols.join('\n')}
</svg>
`;

writeFileSync(join(BUILD, 'icons.svg-sprite.svg'), sprite);
console.log(`✓ build/icons.svg-sprite.svg (${manifest.length} icons)`);
