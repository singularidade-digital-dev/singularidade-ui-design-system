#!/usr/bin/env node
// Takes the traced + gradient SVG, optimizes via SVGO, then writes the 4 final
// Integras logo files (symbol, monochrome, horizontal, vertical lockups).
//
// All four files share the same uniform 5% margin around their content
// (matching the rasterized icon-{16,32,180,512}.png crops).
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { optimize } from 'svgo';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SCRATCH = join(ROOT, 'scratch');
const LOGOS = join(ROOT, 'src/logos/integras');

const MARGIN = 0.05; // 5% margin around content on every side

// 1. Read traced SVG (path d + viewBox).
const traced = readFileSync(join(SCRATCH, 'integras-x-traced.svg'), 'utf-8');
const pathD = traced.match(/<path[^>]*d="([^"]+)"[^>]*\/>/)[1];
const viewBox = traced.match(/viewBox="([^"]+)"/)[1];
const [, , vbW, vbH] = viewBox.split(/\s+/).map(Number);

// 2. Optimize the path via SVGO (cleans up coords).
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

// 3. Measure tight bbox of the optimized path (rasterize at high res, scan alpha).
const measureSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><path fill="#000" fill-rule="evenodd" d="${optimizedPathD}"/></svg>`;
const renderW = 1000;
const { data, info } = await sharp(Buffer.from(measureSvg), { density: 200 })
  .resize({ width: renderW, fit: 'inside' })
  .raw().ensureAlpha().toBuffer({ resolveWithObject: true });
let xmin = info.width, xmax = -1, ymin = info.height, ymax = -1;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    if (data[(y * info.width + x) * info.channels + 3] > 8) {
      if (x < xmin) xmin = x; if (x > xmax) xmax = x;
      if (y < ymin) ymin = y; if (y > ymax) ymax = y;
    }
  }
}
const sx = vbW / info.width, sy = vbH / info.height;
const ICON = {
  x: xmin * sx,
  y: ymin * sy,
  w: (xmax - xmin) * sx,
  h: (ymax - ymin) * sy,
};
console.log(`✓ icon bbox: x=${ICON.x.toFixed(1)} y=${ICON.y.toFixed(1)} w=${ICON.w.toFixed(1)} h=${ICON.h.toFixed(1)}`);
const ICON_TIGHT_VB = `${ICON.x.toFixed(2)} ${ICON.y.toFixed(2)} ${ICON.w.toFixed(2)} ${ICON.h.toFixed(2)}`;
const ICON_ASPECT = ICON.w / ICON.h;

// Helper: round to 2 decimals.
const f = (n) => Number(n.toFixed(2));

// 4. symbol.svg — square viewBox, 5% margin around longest dim.
const SYM_SIDE = Math.max(ICON.w, ICON.h) / (1 - 2 * MARGIN);
const SYM_VB_X = ICON.x - (SYM_SIDE - ICON.w) / 2;
const SYM_VB_Y = ICON.y - (SYM_SIDE - ICON.h) / 2;
const symbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(SYM_VB_X)} ${f(SYM_VB_Y)} ${f(SYM_SIDE)} ${f(SYM_SIDE)}" version="1.1">
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

// 5. monochrome.svg — same square viewBox, currentColor.
const monoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(SYM_VB_X)} ${f(SYM_VB_Y)} ${f(SYM_SIDE)} ${f(SYM_SIDE)}" version="1.1">
  <path fill="currentColor" fill-rule="evenodd" d="${optimizedPathD}"/>
</svg>
`;
writeFileSync(join(LOGOS, 'monochrome.svg'), monoSvg);
console.log('✓ src/logos/integras/monochrome.svg');

// 6. horizontal.svg — icon left + text right, 5% margin around all content.
const H_TEXT_FONT = 44;
const H_TEXT_W = 440; // measured width of "INTEGRAS.DIGITAL" at 44pt + 0.06em letter-spacing
const H_GAP = 24;
const H_OUTER_H = 100;
const H_ICON_H = H_OUTER_H * (1 - 2 * MARGIN); // 90
const H_ICON_W = H_ICON_H * ICON_ASPECT;
const H_CONTENT_W = H_ICON_W + H_GAP + H_TEXT_W;
const H_OUTER_W = H_CONTENT_W / (1 - 2 * MARGIN);
const H_PAD_X = (H_OUTER_W - H_CONTENT_W) / 2;
const H_PAD_Y = (H_OUTER_H - H_ICON_H) / 2;
const H_TEXT_X = H_PAD_X + H_ICON_W + H_GAP;
// Optical-center text baseline so cap-mid aligns with icon center.
const H_TEXT_BASELINE = H_OUTER_H / 2 + H_TEXT_FONT * 0.36;
const horizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(H_OUTER_W)} ${H_OUTER_H}" width="${f(H_OUTER_W)}" height="${H_OUTER_H}">
  <defs>
    <linearGradient id="ig-h-grad" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#E91E8B"/>
      <stop offset="50%" stop-color="#E8606A"/>
      <stop offset="100%" stop-color="#F5A623"/>
    </linearGradient>
  </defs>
  <svg x="${f(H_PAD_X)}" y="${f(H_PAD_Y)}" width="${f(H_ICON_W)}" height="${H_ICON_H}" viewBox="${ICON_TIGHT_VB}" preserveAspectRatio="xMidYMid meet">
    <path fill="url(#ig-h-grad)" fill-rule="evenodd" d="${optimizedPathD}"/>
  </svg>
  <text
    x="${f(H_TEXT_X)}"
    y="${f(H_TEXT_BASELINE)}"
    font-family="'Plus Jakarta Sans', system-ui, sans-serif"
    font-weight="700"
    font-size="${H_TEXT_FONT}"
    letter-spacing="0.06em"
    fill="#F5A623"
  >INTEGRAS<tspan fill="#E91E8B">.</tspan>DIGITAL</text>
</svg>
`;
writeFileSync(join(LOGOS, 'horizontal.svg'), horizontalSvg);
console.log('✓ src/logos/integras/horizontal.svg');

// 7. vertical.svg — icon stacked above text, 5% margin around all content.
const V_TEXT_FONT = 28;
const V_TEXT_W = 280; // measured width of "INTEGRAS.DIGITAL" at 28pt + 0.06em letter-spacing
const V_TEXT_VISUAL_H = V_TEXT_FONT * 0.78; // cap-height + descent
const V_GAP = 30;
const V_ICON_H = 130;
const V_ICON_W = V_ICON_H * ICON_ASPECT;
const V_CONTENT_W = Math.max(V_ICON_W, V_TEXT_W);
const V_CONTENT_H = V_ICON_H + V_GAP + V_TEXT_VISUAL_H;
const V_OUTER_W = V_CONTENT_W / (1 - 2 * MARGIN);
const V_OUTER_H = V_CONTENT_H / (1 - 2 * MARGIN);
const V_PAD_Y = (V_OUTER_H - V_CONTENT_H) / 2;
const V_ICON_X = (V_OUTER_W - V_ICON_W) / 2;
const V_ICON_Y = V_PAD_Y;
const V_TEXT_X = V_OUTER_W / 2;
const V_TEXT_BASELINE = V_PAD_Y + V_ICON_H + V_GAP + V_TEXT_FONT * 0.78;
const verticalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(V_OUTER_W)} ${f(V_OUTER_H)}" width="${f(V_OUTER_W)}" height="${f(V_OUTER_H)}">
  <defs>
    <linearGradient id="ig-v-grad" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#E91E8B"/>
      <stop offset="50%" stop-color="#E8606A"/>
      <stop offset="100%" stop-color="#F5A623"/>
    </linearGradient>
  </defs>
  <svg x="${f(V_ICON_X)}" y="${f(V_ICON_Y)}" width="${f(V_ICON_W)}" height="${V_ICON_H}" viewBox="${ICON_TIGHT_VB}" preserveAspectRatio="xMidYMid meet">
    <path fill="url(#ig-v-grad)" fill-rule="evenodd" d="${optimizedPathD}"/>
  </svg>
  <text
    x="${f(V_TEXT_X)}"
    y="${f(V_TEXT_BASELINE)}"
    text-anchor="middle"
    font-family="'Plus Jakarta Sans', system-ui, sans-serif"
    font-weight="700"
    font-size="${V_TEXT_FONT}"
    letter-spacing="0.06em"
    fill="#F5A623"
  >INTEGRAS<tspan fill="#E91E8B">.</tspan>DIGITAL</text>
</svg>
`;
writeFileSync(join(LOGOS, 'vertical.svg'), verticalSvg);
console.log('✓ src/logos/integras/vertical.svg');
