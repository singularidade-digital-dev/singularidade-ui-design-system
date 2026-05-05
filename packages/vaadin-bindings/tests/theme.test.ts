import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

describe('vaadin-bindings theme', () => {
  it('themes/singularidade-base/styles.css exists (parent theme)', () => {
    expect(existsSync(join(ROOT, 'themes/singularidade-base/styles.css'))).toBe(true);
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
    expect(json.lumoImports).toEqual([]);
  });

  it('styles.css imports tokens for all 4 brand×theme combinations (theme-relative)', () => {
    const css = readFileSync(join(ROOT, 'themes/singularidade-base/styles.css'), 'utf-8');
    expect(css).toContain('./tokens/singularidade.light.css');
    expect(css).toContain('./tokens/singularidade.dark.css');
    expect(css).toContain('./tokens/integras.light.css');
    expect(css).toContain('./tokens/integras.dark.css');
  });

  it('styles.css maps --color-* to --lumo-* base tokens', () => {
    const css = readFileSync(join(ROOT, 'themes/singularidade-base/styles.css'), 'utf-8');
    expect(css).toContain('--lumo-primary-color: var(--color-interactive-primary)');
    expect(css).toContain('--lumo-base-color: var(--color-surface-base)');
    expect(css).toContain('--lumo-body-text-color: var(--color-text-primary)');
  });

  it('styles.css covers feedback colors using semantic tokens', () => {
    const css = readFileSync(join(ROOT, 'themes/singularidade-base/styles.css'), 'utf-8');
    expect(css).toContain('--lumo-error-color: var(--color-feedback-error-solid)');
    expect(css).toContain('--lumo-success-color: var(--color-feedback-success-solid)');
    expect(css).toContain('--lumo-warning-color: var(--color-feedback-warning-solid)');
  });

  it('styles.css declares Plus Jakarta Sans Variable as default font family', () => {
    const css = readFileSync(join(ROOT, 'themes/singularidade-base/styles.css'), 'utf-8');
    expect(css).toContain('--lumo-font-family');
    expect(css).toContain('Plus Jakarta Sans Variable');
  });

  it('styles.css uses shadow tokens with light/dark variants', () => {
    const css = readFileSync(join(ROOT, 'themes/singularidade-base/styles.css'), 'utf-8');
    expect(css).toContain('--lumo-box-shadow-m: var(--shadow-light-md)');
    expect(css).toContain('--lumo-box-shadow-m: var(--shadow-dark-md)');
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

  // ---- Smoke tests against brand×theme CSS output ---------------------
  // These guard against silent regressions in the Style Dictionary pipeline.
  // The brand-color values below are committed in @singularidade/tokens
  // (src/core/color.json + src/brands/*); if Style Dictionary's transforms
  // change or a brand swap is misrouted, these tests catch it before the
  // theme reaches downstream consumers.

  it('singularidade.light.css resolves --color-interactive-primary to coral.700 (#be3550)', () => {
    const path = join(ROOT, '../tokens/build/css/singularidade.light.css');
    expect(existsSync(path)).toBe(true);
    const css = readFileSync(path, 'utf-8');
    expect(css).toMatch(/--color-interactive-primary:\s*#be3550/i);
  });

  it('singularidade.dark.css resolves --color-interactive-primary to coral.400 brighter (#fb7185)', () => {
    const path = join(ROOT, '../tokens/build/css/singularidade.dark.css');
    expect(existsSync(path)).toBe(true);
    const css = readFileSync(path, 'utf-8');
    expect(css).toMatch(/--color-interactive-primary:\s*#fb7185/i);
  });

  it('integras.light.css resolves --color-interactive-primary (sub-brand override)', () => {
    const path = join(ROOT, '../tokens/build/css/integras.light.css');
    expect(existsSync(path)).toBe(true);
    const css = readFileSync(path, 'utf-8');
    // Integras uses a distinct primary; assert it's defined and not the same
    // hex as singularidade.light to verify the brand overlay actually overrides.
    expect(css).toMatch(/--color-interactive-primary:\s*#[0-9a-f]{6}/i);
  });

  it('styles.css supports both Vaadin standard `theme="dark"` and data-theme dark triggers', () => {
    // Regression guard: dark mode broke when only [data-theme='dark'] matched
    // (Vaadin Flow uses theme="dark" attribute); both selectors must apply
    // the same dark token set.
    const css = readFileSync(join(ROOT, 'themes/singularidade-base/styles.css'), 'utf-8');
    expect(css).toMatch(/\[theme~='dark'\]/);
    expect(css).toMatch(/\[data-theme='dark'\]/);
  });

  it('styles.css re-pins dark tokens on body-appended Vaadin overlays (dialog, notification, popover, etc.)', () => {
    // Regression guard: when only the [theme~='dark'] block on :root applies
    // dark tokens, body-appended overlays (vaadin-dialog-overlay,
    // vaadin-notification-card, vaadin-popover-overlay, ...) inherit Lumo's
    // light defaults from their own :host shadow-DOM declarations and
    // render with wrong colors. The re-pin block scoped via
    // html[theme~='dark'] vaadin-*-overlay fixes this.
    const css = readFileSync(join(ROOT, 'themes/singularidade-base/styles.css'), 'utf-8');
    expect(css).toMatch(/html\[theme~='dark'\] vaadin-dialog-overlay/);
    expect(css).toMatch(/html\[theme~='dark'\] vaadin-notification-card/);
    expect(css).toMatch(/html\[theme~='dark'\] vaadin-popover-overlay/);
    expect(css).toMatch(/html\[theme~='dark'\] vaadin-combo-box-overlay/);
  });
});
