#!/usr/bin/env node
// Renders a 5x2 grid PNG of all custom ss:* icons for visual review.
import sharp from 'sharp';
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ICONS_DIR = join(ROOT, 'src/icons/custom');
const OUT = join(ROOT, 'scratch/custom-icons-grid.png');

const icons = readdirSync(ICONS_DIR)
  .filter((f) => f.endsWith('.svg'))
  .sort();

const TILE = 120;
const COLS = 5;
const ROWS = Math.ceil(icons.length / COLS);
const W = COLS * TILE;
const H = ROWS * TILE;

const composites = [];
for (let i = 0; i < icons.length; i++) {
  const name = icons[i];
  const svg = readFileSync(join(ICONS_DIR, name), 'utf-8');
  const themed = svg.replace('stroke="currentColor"', 'stroke="#261A21"');

  const iconBuf = await sharp(Buffer.from(themed), { density: 400 })
    .resize({
      width: 80,
      height: 80,
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer();

  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const left = col * TILE + (TILE - 80) / 2;
  const top = row * TILE + 8;

  composites.push({ input: iconBuf, left, top });

  // Label as separate text rendered to PNG via Sharp svg
  const labelSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE}" height="24"><text x="${TILE / 2}" y="16" font-family="sans-serif" font-size="11" fill="#735F6B" text-anchor="middle">${name.replace('.svg', '')}</text></svg>`;
  const labelBuf = await sharp(Buffer.from(labelSvg)).png().toBuffer();
  composites.push({ input: labelBuf, left: col * TILE, top: row * TILE + 92 });
}

await sharp({
  create: {
    width: W,
    height: H,
    channels: 4,
    background: { r: 253, g: 250, b: 252, alpha: 1 },
  },
})
  .composite(composites)
  .png()
  .toFile(OUT);

console.log(`✓ ${OUT} (${icons.length} icons)`);
