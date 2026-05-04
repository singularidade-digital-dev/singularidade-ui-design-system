#!/usr/bin/env node
// Tries multiple crop regions on the Integras brand book to find the cleanest X.
import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(
  __dirname,
  '../../../identidade_visual/integras_digital/identidade_visual_integras_digital_1_v1.png',
);
const OUT_DIR = join(__dirname, '../scratch');

const meta = await sharp(SRC).metadata();
console.log('source:', meta.width, 'x', meta.height);

const candidates = [
  // X from "ÍCONE" section (large, isolated, lower right)
  { name: 'icone-A', left: 580, top: 800, width: 230, height: 230 },
  { name: 'icone-B', left: 600, top: 820, width: 200, height: 200 },
  { name: 'icone-C', left: 560, top: 770, width: 280, height: 280 },
  // X from "LOGO PRIMÁRIA" section (top, smaller but cleaner)
  { name: 'primaria-A', left: 410, top: 50, width: 240, height: 200 },
  { name: 'primaria-B', left: 430, top: 60, width: 200, height: 180 },
  // X from "VARIAÇÃO HORIZONTAL" section
  { name: 'horizontal-A', left: 110, top: 290, width: 180, height: 140 },
];

for (const c of candidates) {
  const buf = await sharp(SRC).extract(c).toBuffer();
  writeFileSync(join(OUT_DIR, `integras-recrop-${c.name}.png`), buf);
  await sharp(buf)
    .resize({ width: 400, fit: 'inside' })
    .toFile(join(OUT_DIR, `integras-recrop-${c.name}-preview.png`));
  console.log(`✓ ${c.name}`);
}
