#!/usr/bin/env node
// Copia subset selecionado do lucide-static pra src/icons/lucide/.
// Subset reflete uso esperado em apps SaaS: navigation, actions, status, content.
import { copyFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const ROOT = join(__dirname, '..');
const TARGET = join(ROOT, 'src/icons/lucide');
mkdirSync(TARGET, { recursive: true });

// Subset curado pra apps SaaS — adicionar conforme demanda
// Names match lucide-static v0.469. Some icons were renamed in recent versions
// (e.g. home → house, alert-circle → circle-alert, bar-chart → chart-column).
const SUBSET = [
  // Navigation
  'house',
  'menu',
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'arrow-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'chevron-down',
  'external-link',
  // Actions
  'plus',
  'minus',
  'x',
  'check',
  'save',
  'pencil',
  'square-pen',
  'trash-2',
  'copy',
  'download',
  'upload',
  'search',
  'filter',
  'refresh-cw',
  'ellipsis',
  'ellipsis-vertical',
  // Status
  'circle-check',
  'circle-x',
  'circle-alert',
  'triangle-alert',
  'info',
  'circle-help',
  'loader',
  'loader-circle',
  // Users / auth
  'user',
  'users',
  'log-in',
  'log-out',
  'lock',
  'lock-open',
  'key',
  'shield',
  // Content
  'file',
  'file-text',
  'folder',
  'folder-open',
  'mail',
  'phone',
  'calendar',
  'clock',
  // Data viz
  'chart-column',
  'chart-pie',
  'trending-up',
  'trending-down',
  'database',
  // Settings
  'settings',
  'sliders-horizontal',
  'cog',
  'palette',
  // UI feedback
  'eye',
  'eye-off',
  'star',
  'heart',
  'bookmark',
  'bell',
  // Misc
  'globe',
  'link',
  'image',
  'code',
  'terminal',
];

const pkgPath = dirname(require.resolve('lucide-static/package.json'));

let copied = 0;
let missing = [];
for (const name of SUBSET) {
  const src = join(pkgPath, 'icons', `${name}.svg`);
  const dst = join(TARGET, `${name}.svg`);
  try {
    copyFileSync(src, dst);
    copied++;
  } catch (err) {
    missing.push(name);
  }
}

console.log(`✓ ${copied}/${SUBSET.length} Lucide icons copied`);
if (missing.length) {
  console.log(`⚠ missing in lucide-static: ${missing.join(', ')}`);
}
