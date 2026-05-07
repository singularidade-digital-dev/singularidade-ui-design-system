#!/usr/bin/env node
// Crop tight X from "LOGO PRIMÁRIA" section, vectorize with potrace,
// then build a clean SVG with brand gradient applied to the traced shape.
import sharp from 'sharp';
import potrace from 'potrace';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __dirname = dirname(fileURLToPath(import.meta.url));
const trace = promisify(potrace.trace);

const SRC = join(
  __dirname,
  '../../../identidade_visual/integras_digital/identidade_visual_integras_digital_1_v1.png',
);
const OUT_DIR = join(__dirname, '../scratch');

// Tight crop of the X from LOGO PRIMÁRIA section.
// Brand-color bbox in source: x=[453..583], y=[97..269] (W=131, H=173).
// Crop with ~10px margin so the rounded leg endings of the bottom chevron
// are fully included — earlier 180px-tall crop clipped the bottom by ~9px.
const cropBuf = await sharp(SRC)
  .extract({ left: 440, top: 85, width: 160, height: 200 })
  .toBuffer();
writeFileSync(join(OUT_DIR, 'integras-x-tight.png'), cropBuf);

// Upscale 4x for better trace fidelity.
const upscaled = await sharp(cropBuf).resize({ width: 880, kernel: 'lanczos3' }).toBuffer();
writeFileSync(join(OUT_DIR, 'integras-x-upscaled.png'), upscaled);

// Flatten on white before potrace (it requires no alpha).
const flat = await sharp(upscaled).flatten({ background: '#ffffff' }).toBuffer();

// Potrace: black + white silhouette.
const traced = await trace(flat, {
  threshold: 200,
  turdSize: 80,
  optTolerance: 0.4,
  color: '#000000',
  background: 'transparent',
});
writeFileSync(join(OUT_DIR, 'integras-x-traced.svg'), traced);
console.log('✓ traced raw black:', traced.length, 'bytes');

// Extract path d attribute and viewBox; rebuild with gradient brand.
const pathMatch = traced.match(/<path[^>]*d="([^"]+)"[^>]*\/>/);
const viewBoxMatch = traced.match(/viewBox="([^"]+)"/);
if (!pathMatch || !viewBoxMatch) throw new Error('Could not parse traced SVG');

const pathD = pathMatch[1];
const viewBox = viewBoxMatch[1];

// The traced shape has both chevrons in a single path (with fill-rule). We can't
// easily split top vs bottom for separate gradients without geometric analysis.
// So apply ONE vertical gradient covering full brand spectrum (magenta → coral → orange).
const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" version="1.1">
  <defs>
    <linearGradient id="integras-brand" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#E91E8B"/>
      <stop offset="50%" stop-color="#E8606A"/>
      <stop offset="100%" stop-color="#F5A623"/>
    </linearGradient>
  </defs>
  <path
    fill="url(#integras-brand)"
    fill-rule="evenodd"
    d="${pathD}"
  />
</svg>
`;

writeFileSync(join(OUT_DIR, 'integras-x-final.svg'), finalSvg);
console.log('✓ integras-x-final.svg', finalSvg.length, 'bytes');

// Render preview at 600px
await sharp(Buffer.from(finalSvg), { density: 200 })
  .resize({ width: 600, fit: 'inside' })
  .flatten({ background: '#fdfafc' })
  .png()
  .toFile(join(OUT_DIR, 'integras-x-final-preview.png'));
console.log('✓ integras-x-final-preview.png');

// Also a 64px version for favicon-style check
await sharp(Buffer.from(finalSvg), { density: 200 })
  .resize({ width: 64, fit: 'inside' })
  .png()
  .toFile(join(OUT_DIR, 'integras-x-final-64.png'));
console.log('✓ integras-x-final-64.png');
