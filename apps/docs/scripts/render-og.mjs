// Renders public/og.png (1200×630, the og:image and twitter:image of every page)
// from scripts/og-card.html with headless Chrome. Not part of the build: run it
// after changing the card, for example the version on it.
//
//   pnpm --filter @singularidade/tokens build    # the card reads tokens/build/css
//   node apps/docs/scripts/render-og.mjs [path to Chrome or Chromium]
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const card = resolve(here, 'og-card.html');
const out = resolve(here, '../public/og.png');
const themeCss = resolve(here, '../../../packages/tokens/build/css/theme.css');

if (!existsSync(themeCss)) {
  console.error('tokens not built: run `pnpm --filter @singularidade/tokens build` first');
  process.exit(1);
}

const chrome = process.argv[2] ?? process.env.CHROME ?? 'google-chrome';
// A throwaway profile, so a running Chrome is never reused or touched.
const profile = mkdtempSync(join(tmpdir(), 'og-chrome-'));
try {
  execFileSync(
    chrome,
    [
      '--headless=new',
      `--user-data-dir=${profile}`,
      '--disable-gpu',
      '--hide-scrollbars',
      // The card loads the brand fonts from file:// URLs.
      '--allow-file-access-from-files',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      // Gives the web fonts time to load before the capture.
      '--virtual-time-budget=10000',
      `--screenshot=${out}`,
      pathToFileURL(card).href,
    ],
    { stdio: 'inherit' },
  );
} finally {
  rmSync(profile, { recursive: true, force: true });
}
console.log(`rendered ${card} -> ${out}`);
