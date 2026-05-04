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

// 3. horizontal.svg — symbol + INTEGRAS.DIGITAL text inline
//    viewBox of traced is 880x720. Scale to 100px height: scale = 100/720 = 0.139.
//    Symbol width @ 100h = 880 * 0.139 = ~122px.
const SCALE = 100 / 720;
const SYM_W = Math.round(880 * SCALE);
const horizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SYM_W + 480} 100" width="${SYM_W + 480}" height="100">
  <defs>
    <linearGradient id="ig-h-grad" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#E91E8B"/>
      <stop offset="50%" stop-color="#E8606A"/>
      <stop offset="100%" stop-color="#F5A623"/>
    </linearGradient>
  </defs>
  <g transform="scale(${SCALE.toFixed(4)})">
    <path fill="url(#ig-h-grad)" fill-rule="evenodd" d="${optimizedPathD}"/>
  </g>
  <text
    x="${SYM_W + 25}"
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

// 4. vertical.svg — symbol on top + text below
const V_SCALE = 130 / 720; // bigger symbol vertically
const V_SYM_W = Math.round(880 * V_SCALE);
const verticalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" width="400" height="220">
  <defs>
    <linearGradient id="ig-v-grad" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#E91E8B"/>
      <stop offset="50%" stop-color="#E8606A"/>
      <stop offset="100%" stop-color="#F5A623"/>
    </linearGradient>
  </defs>
  <g transform="translate(${(400 - V_SYM_W) / 2}, 5) scale(${V_SCALE.toFixed(4)})">
    <path fill="url(#ig-v-grad)" fill-rule="evenodd" d="${optimizedPathD}"/>
  </g>
  <text
    x="200"
    y="190"
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
