// Imports the Design System v2 previews into public/ds-v2.
//
// Each <Card>/preview.html of a DS v2 components folder (the output of the DS v2 preview generator,
// with icons inline and images as data URIs) becomes public/ds-v2/previews/<Card>.html, framed the
// way the DS v2 frames it: the published tokens (theme.css and text-styles.css, copied by
// copy-ds-v2-assets.mjs), the brand fonts and bundle.css. bundle.css and bundle.js are copied as
// they are. A preview opens in the theme given by ?tema=claro|escuro, else the theme of the page
// that embeds it, else the system theme.
//
// A few texts change on the way to this public site (`adjustments` below, listed in Como
// contribuir); the DS v2 source stays as it is.
//
// Usage: node scripts/import-ds-v2-previews.mjs <DS v2 components folder>
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
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

// Texts of the DS v2 source that change on the way to this public site: a note about a library
// keeps the library's name, internal notes go, the plans read as the integras.digital sells them,
// and sample data that could pass for real becomes plainly fictitious. Each entry must match
// exactly `times` times (default 1), or the import stops: a source that changed is a reason to
// review the adjustment, never to publish the old text again without notice.
const adjustments = {
  Badge: [
    {
      find: '<h2 class="overline ss-demo-title">StatusBadge · biblioteca 2.1.0</h2>',
      replace:
        '<h2 class="overline ss-demo-title">Selo de status nos apps Vaadin · biblioteca 2.1.0</h2>',
    },
    {
      find: ' O mapeamento StatusBadge v2 ficou em aberto.',
      replace: ' A v2 pede palavra e ícone em todo status: este selo ainda não traz o ícone.',
    },
  ],
  Header: [
    {
      find: 'Até o logotipo do Integras ser vetorizado, use o símbolo com o brand-label.',
      replace: 'O logo do produto é o símbolo com o nome em brand-label.',
    },
  ],
  PageConfiguracoes: [{ find: 'value="79 99812-4410"', replace: 'value="79 99999-0000"' }],
  PageEmail: [
    {
      // The product name is written beside the logo: the image is decorative (alt="").
      find: /(<span class="pe-brand"><img src="[^"]*") alt="Integras Hub">/g,
      replace: '$1 alt="">',
      times: 2,
    },
  ],
  PageSite: [
    { find: 'Usuário adicional: R$&nbsp;50/mês', replace: 'Usuário adicional: R$&nbsp;9,90/mês' },
    { find: 'Capacidade dobrada (CPU e memória)', replace: 'O dobro de memória do Starter' },
    {
      find: 'Para cargas pesadas, alta disponibilidade e cenários críticos.',
      replace: 'Para cargas pesadas e operações com muitos conectores.',
    },
    {
      find: '2 instâncias em alta disponibilidade',
      replace: 'O dobro de CPU e de memória do Standard',
    },
    { find: 'Capacidade 4x (CPU e memória)', replace: 'Suporte prioritário' },
  ],
  SideNav: [
    { find: '<span class="code">058ef69</span>', replace: '<span class="code">a1b2c3d</span>' },
  ],
  Table: [
    {
      find: 'tecnologia.informacao@<wbr>associacaolaboratorios.org.br',
      replace: 'tecnologia.informacao@<wbr>associacaolaboratorios.test',
    },
  ],
};

function adjust(card, html) {
  for (const { find, replace, times = 1 } of adjustments[card] ?? []) {
    const found =
      typeof find === 'string' ? html.split(find).length - 1 : (html.match(find) ?? []).length;
    if (found !== times) {
      throw new Error(
        `${card}: expected ${times} of ${find}, found ${found}: review the adjustment`,
      );
    }
    // split/join for text: replace() would read "$&" in "R$&nbsp;" as a pattern.
    html = typeof find === 'string' ? html.split(find).join(replace) : html.replace(find, replace);
  }
  return html;
}

const cards = new Map();
for (const card of readdirSync(src).sort()) {
  const file = join(src, card, 'preview.html');
  if (!existsSync(file)) continue;
  const lines = readFileSync(file, 'utf8').split('\n');
  // The first line is the card marker (<!-- @dsCard ... -->); the cover is not a component.
  if (!lines[0].startsWith('<!-- @dsCard') || !/\bgroup=/.test(lines[0])) continue;
  cards.set(card, lines);
}

const missing = Object.keys(adjustments).filter((card) => !cards.has(card));
if (missing.length)
  throw new Error(`adjustments for cards not in the source: ${missing.join(', ')}`);

const output = new Map();
for (const [card, lines] of cards) {
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
  output.set(card, adjust(card, html));
}

// Nothing is written until every card and every adjustment checked out.
for (const [card, html] of output) writeFileSync(join(previews, `${card}.html`), html);
for (const file of ['bundle.css', 'bundle.js']) copyFileSync(join(src, file), join(dest, file));
console.log(`imported ${output.size} previews and the bundle -> ${dest}`);
