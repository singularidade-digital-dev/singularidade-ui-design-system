#!/usr/bin/env node
// Generates a Vaadin iconset registering all custom icons under "ss:" namespace.
// Consumers import this once and use <vaadin-icon icon="ss:tenant"/>.
//
// Format reference: https://vaadin.com/docs/latest/components/icon
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BUILD = join(ROOT, 'build');
mkdirSync(BUILD, { recursive: true });

const CUSTOM = join(ROOT, 'src/icons/custom');
const files = readdirSync(CUSTOM)
  .filter((f) => f.endsWith('.svg'))
  .sort();

const symbols = files
  .map((f) => {
    const name = f.replace('.svg', '');
    const svg = readFileSync(join(CUSTOM, f), 'utf-8');
    const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] || '0 0 24 24';
    const inner = svg
      .replace(/<\?xml[^?]*\?>/, '')
      .replace(/<\/?svg[^>]*>/g, '')
      .trim();
    return `  <svg id="ss:${name}" viewBox="${viewBox}">${inner}</svg>`;
  })
  .join('\n');

// Vaadin Iconset uses a single <vaadin-iconset> element with nested <svg> per icon.
// The script tag pattern is documented for vaadin-icon component.
const iconset = `// @singularidade/brand-assets — Vaadin iconset for "ss:*" custom icons
// Auto-generated. Do not edit directly.
import { html, render } from 'lit';

const template = html\`
<vaadin-iconset name="ss" size="24">
  <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
${symbols}
    </defs>
  </svg>
</vaadin-iconset>
\`;

const container = document.createElement('div');
render(template, container);
document.head.appendChild(container);

export const iconNames = ${JSON.stringify(files.map((f) => f.replace('.svg', '')))};
`;

writeFileSync(join(BUILD, 'vaadin-iconset.js'), iconset);
console.log(`✓ build/vaadin-iconset.js (${files.length} ss:* icons)`);
