#!/usr/bin/env node
// Copia WOFF2 (latin + latin-ext) do @fontsource-variable/* pra src/fonts/.
// Gera CSS @font-face autônomo apontando pros arquivos relativos.
import { copyFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const ROOT = join(__dirname, '..');
const FONTS_DIR = join(ROOT, 'src/fonts');
mkdirSync(FONTS_DIR, { recursive: true });

// weight: the wght axis range of each variable file, as @fontsource-variable declares it.
const FAMILIES = [
  {
    pkg: '@fontsource-variable/plus-jakarta-sans',
    family: 'Plus Jakarta Sans',
    cssFile: 'plus-jakarta-sans.css',
    fileBase: 'plus-jakarta-sans',
    weight: '200 800',
  },
  {
    pkg: '@fontsource-variable/jetbrains-mono',
    family: 'JetBrains Mono',
    cssFile: 'jetbrains-mono.css',
    fileBase: 'jetbrains-mono',
    weight: '100 800',
  },
];

const SUBSETS = ['latin', 'latin-ext'];
const STYLES = [
  { axis: 'wght', style: 'normal', label: 'normal' },
  { axis: 'wght', style: 'italic', label: 'italic' },
];

// Unicode-range cobrindo subset (heurística básica). Quebrado em
// múltiplas linhas no formato Prettier exige (4-space indent depois
// de "unicode-range:"); rodar `prettier --write` numa CSS com a
// versão single-line dispara reformat — evita drift toda mvn install.
const UNICODE_RANGE = {
  latin: [
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,',
    'U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  ],
  'latin-ext': [
    'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329,',
    'U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F,',
    'U+A720-A7FF',
  ],
};

for (const f of FAMILIES) {
  const pkgPath = dirname(require.resolve(`${f.pkg}/package.json`));
  // The same files answer to the long name ('<Family> Variable', what the tokens list
  // first) and to the short one ('<Family>'), which older CSS and e-mail stacks name.
  const names = [`${f.family} Variable`, f.family];
  const cssLines = [
    `/* ${f.family} — variable WOFF2 (latin + latin-ext), as '${names[0]}' and '${names[1]}' */`,
  ];

  for (const subset of SUBSETS) {
    for (const s of STYLES) {
      const file = `${f.fileBase}-${subset}-${s.axis}-${s.label}.woff2`;
      copyFileSync(join(pkgPath, 'files', file), join(FONTS_DIR, file));
      console.log(`✓ ${file}`);
    }
  }

  for (const name of names) {
    for (const subset of SUBSETS) {
      const unicodeRange = UNICODE_RANGE[subset].map((l) => `    ${l}`).join('\n');
      for (const s of STYLES) {
        cssLines.push(`
@font-face {
  font-family: '${name}';
  font-style: ${s.style};
  font-display: swap;
  font-weight: ${f.weight};
  src: url('./${f.fileBase}-${subset}-${s.axis}-${s.label}.woff2') format('woff2-variations');
  unicode-range:
${unicodeRange};
}`);
      }
    }
  }

  writeFileSync(join(FONTS_DIR, f.cssFile), cssLines.join('\n') + '\n');
  console.log(`✓ ${f.cssFile}`);
}
