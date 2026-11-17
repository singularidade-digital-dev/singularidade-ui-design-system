// Copies what the DS v2 previews (public/ds-v2/previews/*.html) load besides bundle.css:
// theme.css and text-styles.css from the @singularidade/tokens build, and the brand fonts from
// @singularidade/brand-assets. The previews then show the published tokens, in both themes.
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const tokensCss = resolve(here, '../../../packages/tokens/build/css');
const fonts = resolve(here, '../../../packages/brand-assets/src/fonts');
const dest = resolve(here, '../public/ds-v2');
const files = ['theme.css', 'text-styles.css'];

for (const file of files) {
  if (!existsSync(resolve(tokensCss, file))) {
    throw new Error(`${file} not found in ${tokensCss}: build @singularidade/tokens first`);
  }
}

mkdirSync(resolve(dest, 'tokens'), { recursive: true });
for (const file of files) {
  cpSync(resolve(tokensCss, file), resolve(dest, 'tokens', file));
}
cpSync(fonts, resolve(dest, 'fonts'), { recursive: true });
console.log(`copied tokens css and fonts -> ${dest}`);
