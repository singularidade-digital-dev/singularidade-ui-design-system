// Copies the brand logos from @singularidade/brand-assets into public/logos so the
// brand book pages can reference them by URL (/logos/<brand>/<variant>.svg).
import { cpSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, '../../../packages/brand-assets/src/logos');
const dest = resolve(here, '../public/logos');

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log(`copied logos ${src} -> ${dest}`);
