// Imports the Design System v2 previews into public/ds-v2.
//
// Each <Card>/preview.html of a DS v2 components folder (the output of the DS v2 preview generator,
// with icons inline and images as data URIs) becomes public/ds-v2/previews/<Card>.html, framed the
// way the DS v2 frames it: the published tokens (theme.css and text-styles.css, copied by
// copy-ds-v2-assets.mjs), the brand fonts and bundle.css. bundle.css and bundle.js are copied as
// they are. A preview opens in the theme given by ?tema=claro|escuro, else the theme of the page
// that embeds it, else the system theme.
//
// Usage: node scripts/import-ds-v2-previews.mjs <DS v2 components folder>
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const src = process.argv[2];
if (!src || !existsSync(join(src, 'bundle.css'))) {
  throw new Error('usage: node scripts/import-ds-v2-previews.mjs <DS v2 components folder>');
}

const here = dirname(fileURLToPath(import.meta.url));
const dest = resolve(here, '../public/ds-v2');
const previews = join(dest, 'previews');
mkdirSync(previews, { recursive: true });

const themeScript =
  "<script>(function(){var q=new URLSearchParams(location.search).get('tema');" +
  "var t=q==='escuro'?'dark':q==='claro'?'light':null;" +
  "if(!t){try{if(window.parent!==window){t=window.parent.document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';}}catch(e){}}" +
  "if(!t){t=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}" +
  "document.documentElement.setAttribute('data-theme',t);})();</script>";

const head = [
  '<meta name="viewport" content="width=device-width, initial-scale=1">',
  '<meta name="robots" content="noindex">',
  '<link rel="stylesheet" href="../fonts/plus-jakarta-sans.css">',
  '<link rel="stylesheet" href="../fonts/jetbrains-mono.css">',
  '<link rel="stylesheet" href="../tokens/theme.css">',
  '<link rel="stylesheet" href="../tokens/text-styles.css">',
  '<link rel="stylesheet" href="../bundle.css">',
  themeScript,
  '<script src="../bundle.js" defer></script>',
].join('\n');

let count = 0;
for (const card of readdirSync(src).sort()) {
  const file = join(src, card, 'preview.html');
  if (!existsSync(file)) continue;
  const lines = readFileSync(file, 'utf8').split('\n');
  // The first line is the card marker (<!-- @dsCard ... -->); the cover is not a component.
  if (!lines[0].startsWith('<!-- @dsCard') || !/\bgroup=/.test(lines[0])) continue;
  // CSS comments in the previews are working notes, not documentation: they are dropped.
  const html = lines
    .slice(1)
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace('<html lang="pt-BR">', '<html lang="pt-BR" data-theme="light">')
    .replace('<head><meta charset="utf-8">', `<head><meta charset="utf-8">\n${head}`);
  if (!html.includes('data-theme="light"') || !html.includes('../bundle.css')) {
    throw new Error(`${card}: unexpected preview head`);
  }
  writeFileSync(join(previews, `${card}.html`), html);
  count++;
}

for (const file of ['bundle.css', 'bundle.js']) copyFileSync(join(src, file), join(dest, file));
console.log(`imported ${count} previews and the bundle -> ${dest}`);
