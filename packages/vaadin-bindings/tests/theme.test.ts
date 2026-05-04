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
});
