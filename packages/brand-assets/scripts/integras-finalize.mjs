#!/usr/bin/env node
// Takes the traced + gradient SVG, optimizes via SVGO, then writes the 4 final
// Integras logo files (symbol, monochrome, horizontal, vertical lockups).
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { optimize } from 'svgo';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SCRATCH = join(ROOT, 'scratch');
const LOGOS = join(ROOT, 'src/logos/integras');

// Read the path d attribute + viewBox from the traced SVG.
const traced = readFileSync(join(SCRATCH, 'integras-x-traced.svg'), 'utf-8');
const pathD = traced.match(/<path[^>]*d="([^"]+)"[^>]*\/>/)[1];
const viewBox = traced.match(/viewBox="([^"]+)"/)[1];
const [, , vbW, vbH] = viewBox.split(/\s+/).map(Number);
const aspect = vbW / vbH;
console.log(`viewBox: ${viewBox} (aspect ratio ${aspect.toFixed(3)})`);

// Optimize the path d using SVGO (it cleans up coords).
const tempSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><path fill="#000" fill-rule="evenodd" d="${pathD}"/></svg>`;
const opt = optimize(tempSvg, {
  plugins: [
    'preset-default',
    { name: 'cleanupNumericValues', params: { floatPrecision: 1 } },
    { name: 'convertPathData', params: { floatPrecision: 1 } },
  ],
});
const optimizedPathD = opt.data.match(/d="([^"]+)"/)[1];
console.log(`✓ optimized path: ${pathD.length} → ${optimizedPathD.length} bytes`);

// 1. symbol.svg — full color brand gradient
const symbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" version="1.1">
  <defs>
    <linearGradient id="integras-brand" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#E91E8B"/>
      <stop offset="50%" stop-color="#E8606A"/>
      <stop offset="100%" stop-color="#F5A623"/>
    </linearGradient>
  </defs>
  <path fill="url(#integras-brand)" fill-rule="evenodd" d="${optimizedPathD}"/>
</svg>
`;
writeFileSync(join(LOGOS, 'symbol.svg'), symbolSvg);
console.log('✓ src/logos/integras/symbol.svg');

// 2. monochrome.svg — currentColor
const monoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" version="1.1">
  <path fill="currentColor" fill-rule="evenodd" d="${optimizedPathD}"/>
</svg>
`;
writeFileSync(join(LOGOS, 'monochrome.svg'), monoSvg);
console.log('✓ src/logos/integras/monochrome.svg');

// 3. horizontal.svg — symbol on left + INTEGRAS.DIGITAL text inline.
//    Use nested <svg> with its own viewBox to isolate the symbol's coordinate
//    space — avoids dealing with viewBox minX/minY offsets in transforms.
const H_HEIGHT = 100;
const H_SYM_W = Math.round(H_HEIGHT * aspect);
const H_TEXT_GAP = 24;
const H_TEXT_W = 480;
const horizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${H_SYM_W + H_TEXT_GAP + H_TEXT_W} ${H_HEIGHT}" width="${H_SYM_W + H_TEXT_GAP + H_TEXT_W}" height="${H_HEIGHT}">
  <defs>
    <linearGradient id="ig-h-grad" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#E91E8B"/>
      <stop offset="50%" stop-color="#E8606A"/>
      <stop offset="100%" stop-color="#F5A623"/>
    </linearGradient>
  </defs>
  <svg x="0" y="0" width="${H_SYM_W}" height="${H_HEIGHT}" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">
    <path fill="url(#ig-h-grad)" fill-rule="evenodd" d="${optimizedPathD}"/>
  </svg>
  <text
    x="${H_SYM_W + H_TEXT_GAP}"
    y="68"
    font-family="'Plus Jakarta Sans', system-ui, sans-serif"
    font-weight="700"
    font-size="44"
    letter-spacing="0.06em"
    fill="#F5A623"
  >INTEGRAS<tspan fill="#E91E8B">.</tspan>DIGITAL</text>
</svg>
`;
writeFileSync(join(LOGOS, 'horizontal.svg'), horizontalSvg);
console.log('✓ src/logos/integras/horizontal.svg');

// 4. vertical.svg — symbol on top + text below.
// Balance top/bottom margins so the layout sits visually centered:
//   [V_PAD] [symbol V_SYM_H] [gap] [text V_TEXT_VISUAL_H] [V_PAD]
// Text at font-size 28 visually occupies ~25px (cap height + descent).
const V_W = 400;
const V_PAD = 15;
const V_SYM_H = 130;
const V_TEXT_VISUAL_H = 25;
const V_GAP = 30;
const V_TOTAL_H = V_PAD * 2 + V_SYM_H + V_GAP + V_TEXT_VISUAL_H;
const V_SYM_Y = V_PAD;
const V_SYM_W = Math.round(V_SYM_H * aspect);
const V_SYM_X = (V_W - V_SYM_W) / 2;
const V_TEXT_Y = V_SYM_Y + V_SYM_H + V_GAP + 22; // baseline = top + ascent (~22 for 28px Plus Jakarta)
const verticalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${V_W} ${V_TOTAL_H}" width="${V_W}" height="${V_TOTAL_H}">
  <defs>
    <linearGradient id="ig-v-grad" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#E91E8B"/>
      <stop offset="50%" stop-color="#E8606A"/>
      <stop offset="100%" stop-color="#F5A623"/>
    </linearGradient>
  </defs>
  <svg x="${V_SYM_X}" y="${V_SYM_Y}" width="${V_SYM_W}" height="${V_SYM_H}" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">
    <path fill="url(#ig-v-grad)" fill-rule="evenodd" d="${optimizedPathD}"/>
  </svg>
  <text
    x="${V_W / 2}"
    y="${V_TEXT_Y}"
    text-anchor="middle"
    font-family="'Plus Jakarta Sans', system-ui, sans-serif"
    font-weight="700"
    font-size="28"
    letter-spacing="0.06em"
    fill="#F5A623"
  >INTEGRAS<tspan fill="#E91E8B">.</tspan>DIGITAL</text>
</svg>
`;
writeFileSync(join(LOGOS, 'vertical.svg'), verticalSvg);
console.log('✓ src/logos/integras/vertical.svg');
