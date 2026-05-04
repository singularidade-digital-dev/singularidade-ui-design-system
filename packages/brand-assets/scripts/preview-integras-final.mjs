#!/usr/bin/env node
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const items = [
  { in: 'src/logos/integras/symbol.svg', out: 'integras-final-symbol.png', w: 400 },
  { in: 'src/logos/integras/horizontal.svg', out: 'integras-final-horizontal.png', w: 800 },
  { in: 'src/logos/integras/vertical.svg', out: 'integras-final-vertical.png', w: 400 },
  { in: 'src/logos/integras/monochrome.svg', out: 'integras-final-monochrome.png', w: 400 },
];

for (const it of items) {
  const svg = readFileSync(join(ROOT, it.in));
  const buf = await sharp(svg, { density: 200, limitInputPixels: false })
    .resize({ width: it.w, fit: 'inside' })
    .flatten({ background: it.in.includes('monochrome') ? '#fdfafc' : '#ffffff' })
    .png()
    .toBuffer();
  // monochrome needs CSS color injected; render with inline style replacement
  if (it.in.includes('monochrome')) {
    const themed = svg.toString('utf-8').replace('fill="currentColor"', 'fill="#261A21"');
    await sharp(Buffer.from(themed), { density: 200 })
      .resize({ width: it.w, fit: 'inside' })
      .flatten({ background: '#fdfafc' })
      .png()
      .toFile(join(ROOT, 'scratch', it.out));
  } else {
    await sharp(buf)
      .png()
      .toFile(join(ROOT, 'scratch', it.out));
  }
  console.log(`✓ scratch/${it.out}`);
}
