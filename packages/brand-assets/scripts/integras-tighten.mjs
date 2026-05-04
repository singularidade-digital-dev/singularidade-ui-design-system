#!/usr/bin/env node
// Reads the traced Integras SVG, renders it to PNG, detects the actual shape
// bounding box via sharp.trim(), and rewrites the traced SVG + finalized files
// with a tight viewBox so the X is centered with no whitespace margins.
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SCRATCH = join(ROOT, 'scratch');
const TRACED = join(SCRATCH, 'integras-x-traced.svg');

// 1. Read original viewBox + path
const traced = readFileSync(TRACED, 'utf-8');
const origViewBox = traced
  .match(/viewBox="([^"]+)"/)[1]
  .split(/\s+/)
  .map(Number);
const [origX, origY, origW, origH] = origViewBox;
console.log(`original viewBox: ${origX} ${origY} ${origW} ${origH}`);

// 2. Render to a known pixel size
const RENDER_W = 1000;
const RENDER_H = Math.round((RENDER_W * origH) / origW);
const rendered = await sharp(Buffer.from(traced), { density: 200, limitInputPixels: false })
  .resize({ width: RENDER_W, height: RENDER_H, fit: 'fill' })
  .png()
  .toBuffer();

// 3. Trim transparent edges and capture offsets
const trimmed = await sharp(rendered)
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer({
    resolveWithObject: true,
  });
const { trimOffsetLeft, trimOffsetTop, width: tightPixW, height: tightPixH } = trimmed.info;
console.log(
  `trim offsets: left=${trimOffsetLeft}, top=${trimOffsetTop}, tight pixels: ${tightPixW}x${tightPixH}`,
);

// 4. Map back to SVG units. trimOffsetLeft is negative (how much was trimmed off left).
const svgPerPixelX = origW / RENDER_W;
const svgPerPixelY = origH / RENDER_H;
const tightX = origX + -trimOffsetLeft * svgPerPixelX;
const tightY = origY + -trimOffsetTop * svgPerPixelY;
const tightW = tightPixW * svgPerPixelX;
const tightH = tightPixH * svgPerPixelY;

// 5. Add tiny breathing room (2% padding) so antialiasing doesn't clip
const padX = tightW * 0.02;
const padY = tightH * 0.02;
const finalX = tightX - padX;
const finalY = tightY - padY;
const finalW = tightW + padX * 2;
const finalH = tightH + padY * 2;

console.log(
  `tight viewBox: ${finalX.toFixed(1)} ${finalY.toFixed(1)} ${finalW.toFixed(1)} ${finalH.toFixed(1)}`,
);

// 6. Rewrite traced SVG with tight viewBox (path data unchanged — viewBox shifts the visible region)
const tightTraced = traced.replace(
  /viewBox="[^"]+"/,
  `viewBox="${finalX.toFixed(1)} ${finalY.toFixed(1)} ${finalW.toFixed(1)} ${finalH.toFixed(1)}"`,
);
writeFileSync(TRACED, tightTraced);
console.log('✓ rewrote scratch/integras-x-traced.svg with tight viewBox');
