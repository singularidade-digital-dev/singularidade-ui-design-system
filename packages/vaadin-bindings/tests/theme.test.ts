import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');
const STYLES = join(ROOT, 'themes/singularidade-base/styles.css');
const THEME_CSS = join(ROOT, '../tokens/build/css/theme.css');

const css = () => readFileSync(STYLES, 'utf-8');

interface Rule {
  selectors: string[];
  declarations: Map<string, string>;
}

function rules(source: string): Rule[] {
  const body = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@import[^;]+;/g, '');
  return [...body.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
    selectors: (m[1] ?? '').split(',').map((s) => s.replace(/\s+/g, ' ').trim()),
    declarations: new Map(
      [...(m[2] ?? '').matchAll(/(--[a-z0-9-]+):\s*([^;]+);/g)].map((d) => [
        d[1] ?? '',
        (d[2] ?? '').replace(/\s+/g, ' ').trim(),
      ]),
    ),
  }));
}

/** Declarations of every rule whose selector list contains all of `selectors`, merged. */
function declared(...selectors: string[]): Map<string, string> {
  const matching = rules(css()).filter((r) => selectors.every((s) => r.selectors.includes(s)));
  if (matching.length === 0) throw new Error(`no rule for ${selectors.join(', ')}`);
  return new Map(matching.flatMap((r) => [...r.declarations]));
}

/** The theme-independent block: the rule whose only selector is :root. */
const rootOnly = () => {
  const r = rules(css()).find((x) => x.selectors.length === 1 && x.selectors[0] === ':root');
  if (!r) throw new Error('no :root-only rule');
  return r.declarations;
};
/** The colour mapping, declared on :root, every [data-theme] and the dark overlays. */
const colours = () => declared(':root', '[data-theme]', "[theme~='dark']");
/** Lumo steps of the dark theme. */
const darkSteps = () => declared("[theme~='dark']", "[data-theme='dark']");
/** Lumo steps of the light theme. */
const lightSteps = () => declared(':root', "[data-theme='light']");

describe('vaadin-bindings theme', () => {
  it('themes/singularidade-base/styles.css exists (parent theme)', () => {
    expect(existsSync(STYLES)).toBe(true);
  });

  it('themes/singularidade-base/theme.json is valid JSON', () => {
    const path = join(ROOT, 'themes/singularidade-base/theme.json');
    expect(existsSync(path)).toBe(true);
    const json = JSON.parse(readFileSync(path, 'utf-8'));
    // Tokens and fonts are imported via theme-relative paths in styles.css
    // (./tokens/, ./fonts/), not via documentCss. The Vaadin theme handler
    // serves them under /themes/singularidade-base/{tokens,fonts}/ at runtime
    // — the only path Spring Security allows by default. See pom.xml for
    // the build-time copy from sibling @singularidade packages.
    // No lumoImports key at all: an empty array is a no-op that reads as "Lumo was
    // dropped", which is not true — Lumo is still the base theme in Vaadin 25, and the
    // tokens below map onto its --lumo-* variables.
    expect(json.lumoImports).toBeUndefined();
  });

  it('styles.css imports the generated tokens/theme.css, and nothing hand-written', () => {
    const imports = [...css().matchAll(/@import url\('([^']+)'\)/g)].map((m) => m[1]);
    expect(imports).toEqual([
      './tokens/theme.css',
      './fonts/plus-jakarta-sans.css',
      './fonts/jetbrains-mono.css',
    ]);
    expect(existsSync(join(ROOT, 'themes/singularidade-base/tokens/defaults.css'))).toBe(false);
  });

  it('pom.xml copies theme.css (not the four data-brand files) next to styles.css', () => {
    const pom = readFileSync(join(ROOT, 'pom.xml'), 'utf-8');
    expect(pom).toContain('<directory>../tokens/build/css</directory>');
    expect(pom).toContain('<include>theme.css</include>');
    expect(pom).not.toContain('<include>integras.*.css</include>');
    expect(existsSync(THEME_CSS)).toBe(true);
  });

  it('styles.css maps --color-* to --lumo-* base tokens', () => {
    expect(colours().get('--lumo-primary-color')).toBe('var(--color-interactive-primary)');
    expect(colours().get('--lumo-base-color')).toBe('var(--color-surface-base)');
    expect(colours().get('--lumo-body-text-color')).toBe('var(--color-text-primary)');
  });

  it('text on the primary fill reads on-primary; on a status fill, on-status', () => {
    expect(colours().get('--lumo-primary-contrast-color')).toBe('var(--color-on-primary)');
    for (const tone of ['error', 'success', 'warning']) {
      expect(colours().get(`--lumo-${tone}-contrast-color`), tone).toBe('var(--color-on-status)');
    }
  });

  it('feedback: -solid for the colour, -text for the text colour', () => {
    for (const tone of ['error', 'success', 'warning']) {
      expect(colours().get(`--lumo-${tone}-color`), tone).toBe(
        `var(--color-feedback-${tone}-solid)`,
      );
      expect(colours().get(`--lumo-${tone}-text-color`), tone).toBe(
        `var(--color-feedback-${tone}-text)`,
      );
    }
  });

  it('links read color-link', () => {
    expect(colours().get('--lumo-link-color')).toBe('var(--color-link)');
  });

  it('shadows read the per-theme shadow tokens', () => {
    expect(colours().get('--lumo-box-shadow-xs')).toBe('var(--shadow-xs)');
    expect(colours().get('--lumo-box-shadow-m')).toBe('var(--shadow-md)');
    expect(colours().get('--lumo-box-shadow-xl')).toBe('var(--shadow-xl)');
    expect(css()).not.toMatch(/--shadow-(light|dark)-/);
  });

  it('Vaadin 25: visible field border in border-control and a single focus ring in border-focus', () => {
    expect(rootOnly().get('--vaadin-input-field-border-width')).toBe('1px');
    expect(rootOnly().get('--vaadin-focus-ring-width')).toBe('2px');
    expect(colours().get('--vaadin-input-field-border-color')).toBe('var(--input-border)');
    expect(colours().get('--vaadin-input-field-background')).toBe('var(--input-background)');
    expect(colours().get('--vaadin-focus-ring-color')).toBe('var(--color-border-focus)');
    // the tokens behind them
    const theme = readFileSync(THEME_CSS, 'utf-8');
    expect(theme).toContain('--input-border: #8c7b86;');
    expect(theme).toContain('--color-border-focus: #be3550;');
  });

  it('every token the bridge reads exists in tokens/theme.css', () => {
    const theme = readFileSync(THEME_CSS, 'utf-8');
    const declared = new Set([...theme.matchAll(/(--[a-z0-9-]+):/g)].map((m) => m[1]));
    const read = new Set(
      [...css().matchAll(/var\((--[a-z0-9-]+)\)/g)]
        .map((m) => m[1] ?? '')
        .filter((name) => !name.startsWith('--lumo-') && !name.startsWith('--vaadin-')),
    );
    expect([...read].filter((name) => !declared.has(name))).toEqual([]);
    expect(read.size).toBeGreaterThan(30);
  });

  it('declares Plus Jakarta Sans Variable as default font family (through the token)', () => {
    expect(rootOnly().get('--lumo-font-family')).toBe('var(--font-family-sans)');
    expect(readFileSync(THEME_CSS, 'utf-8')).toMatch(
      /--font-family-sans: 'Plus Jakarta Sans Variable', 'Plus Jakarta Sans',/,
    );
  });

  it('font sizes come from the token scale, in rem', () => {
    expect(rootOnly().get('--lumo-font-size-m')).toBe('var(--font-size-m)');
    expect(readFileSync(THEME_CSS, 'utf-8')).toContain('--font-size-m: 0.875rem;');
  });

  it('SingularidadeTheme.java has expected constants', () => {
    const java = readFileSync(
      join(ROOT, 'src/main/java/digital/singularidade/ui/SingularidadeTheme.java'),
      'utf-8',
    );
    expect(java).toContain('THEME_NAME = "singularidade"');
    expect(java).toContain('BRAND_SINGULARIDADE');
    expect(java).toContain('BRAND_INTEGRAS');
    expect(java).toContain('@JsModule');
  });

  // ---- Smoke tests against the generated tokens --------------------------
  // These guard against silent regressions in the Style Dictionary pipeline:
  // theme.css is what this theme ships, and its values come from
  // @singularidade/tokens (src/**). The full comparison with the DS v2 reference
  // lives in packages/tokens/tests/v2-parity.test.ts.

  it('theme.css: --color-interactive-primary is coral.600 (#be3550) in light', () => {
    expect(readFileSync(THEME_CSS, 'utf-8')).toMatch(
      /:root \{[^}]*--color-interactive-primary:\s*#be3550/,
    );
  });

  it('theme.css: --color-interactive-primary is coral.400 (#fb7185) in dark, for theme="dark"', () => {
    expect(readFileSync(THEME_CSS, 'utf-8')).toMatch(
      /\[theme~='dark'\],\n\[data-theme='dark'\] \{[^}]*--color-interactive-primary:\s*#fb7185/,
    );
  });

  it('theme.css: dark status surfaces are translucent (the light ones broke the dark theme)', () => {
    expect(readFileSync(THEME_CSS, 'utf-8')).toMatch(
      /\[theme~='dark'\],\n\[data-theme='dark'\] \{[^}]*--color-feedback-warning-surface:\s*rgba\(251, 191, 36, 0\.16\)/,
    );
  });

  it('styles.css supports both Vaadin standard `theme="dark"` and data-theme dark triggers', () => {
    // Regression guard: dark mode broke when only [data-theme='dark'] matched
    // (Vaadin Flow uses theme="dark" attribute); both selectors must apply
    // the same dark token set.
    expect(css()).toMatch(/\[theme~='dark'\]/);
    expect(css()).toMatch(/\[data-theme='dark'\]/);
    // the steps that differ per theme are declared for both triggers, for every light step
    expect([...darkSteps().keys()].sort()).toEqual([...lightSteps().keys()].sort());
  });

  it('styles.css re-pins dark tokens on body-appended Vaadin overlays (dialog, notification, popover, etc.)', () => {
    // Regression guard: when only the [theme~='dark'] block on :root applies
    // dark tokens, body-appended overlays (vaadin-dialog-overlay,
    // vaadin-notification-card, vaadin-popover-overlay, ...) inherit Lumo's
    // light defaults from their own :host shadow-DOM declarations and
    // render with wrong colors. The re-pin selectors scoped via
    // html[theme~='dark'] vaadin-*-overlay fix this.
    for (const overlay of [
      'vaadin-dialog-overlay',
      'vaadin-notification-card',
      'vaadin-popover-overlay',
      'vaadin-combo-box-overlay',
    ]) {
      // the colour mapping and the dark steps both land on the overlay
      const pinned = declared(`html[theme~='dark'] ${overlay}`);
      expect(pinned.get('--lumo-base-color'), overlay).toBe('var(--color-surface-base)');
      expect(pinned.get('--lumo-primary-text-color'), overlay).toBe(
        'var(--color-interactive-primary)',
      );
      expect(pinned.get('--lumo-tint-5pct'), overlay).toBe(darkSteps().get('--lumo-tint-5pct'));
      // never a --vaadin-* property on the component itself: Lumo sets the focus ring
      // of a coloured notification on its own host, and an outer rule would win
      expect(
        [...pinned.keys()].filter((n) => n.startsWith('--vaadin-')),
        overlay,
      ).toEqual([]);
    }
  });
});
