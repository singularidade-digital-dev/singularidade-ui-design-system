import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

describe('vaadin-bindings theme', () => {
  it('themes/singularidade/styles.css exists', () => {
    expect(existsSync(join(ROOT, 'themes/singularidade/styles.css'))).toBe(true);
  });

  it('themes/singularidade/theme.json is valid JSON with expected structure', () => {
    const path = join(ROOT, 'themes/singularidade/theme.json');
    expect(existsSync(path)).toBe(true);
    const json = JSON.parse(readFileSync(path, 'utf-8'));
    expect(Array.isArray(json.documentCss)).toBe(true);
    expect(json.documentCss.length).toBeGreaterThan(0);
    expect(json.documentCss).toContain('/tokens/css/singularidade.light.css');
    expect(json.documentCss).toContain('/brand-assets/fonts/plus-jakarta-sans.css');
  });

  it('styles.css imports tokens for all 4 brand×theme combinations', () => {
    const css = readFileSync(join(ROOT, 'themes/singularidade/styles.css'), 'utf-8');
    expect(css).toContain('/tokens/css/singularidade.light.css');
    expect(css).toContain('/tokens/css/singularidade.dark.css');
    expect(css).toContain('/tokens/css/integras.light.css');
    expect(css).toContain('/tokens/css/integras.dark.css');
  });

  it('styles.css maps --color-* to --vaadin-* base tokens', () => {
    const css = readFileSync(join(ROOT, 'themes/singularidade/styles.css'), 'utf-8');
    expect(css).toContain('--vaadin-text-color: var(--color-text-primary)');
    expect(css).toContain('--vaadin-background-color: var(--color-surface-base)');
    expect(css).toContain('--vaadin-focus-ring-color: var(--color-interactive-primary)');
  });

  it('styles.css overrides primary button background with brand', () => {
    const css = readFileSync(join(ROOT, 'themes/singularidade/styles.css'), 'utf-8');
    expect(css).toMatch(/vaadin-button\[theme~='primary'\]\s*\{[^}]*--vaadin-button-background/);
  });

  it('styles.css covers hover and active states using flat tokens', () => {
    const css = readFileSync(join(ROOT, 'themes/singularidade/styles.css'), 'utf-8');
    expect(css).toContain('--color-interactive-primary-hover');
    expect(css).toContain('--color-interactive-primary-active');
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
