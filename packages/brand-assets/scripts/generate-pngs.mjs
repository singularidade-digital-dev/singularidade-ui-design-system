#!/usr/bin/env node
// Renders symbol.svg per brand to icon-{16,32,180,512}.png via Sharp.
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BRANDS = ['singularidade', 'integras'];
const SIZES = [16, 32, 180, 512];

for (const brand of BRANDS) {
  const symbolPath = join(ROOT, 'src/logos', brand, 'symbol.svg');
  const svg = readFileSync(symbolPath);
  for (const size of SIZES) {
    const out = join(ROOT, 'src/logos', brand, `icon-${size}.png`);
    const density = size <= 32 ? 72 : size <= 180 ? 96 : 150;
    await sharp(svg, { density, limitInputPixels: false })
      .resize({
        width: size,
        height: size,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(out);
    console.log(`✓ ${brand}/icon-${size}.png`);
  }
}
