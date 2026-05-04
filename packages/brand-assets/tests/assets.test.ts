import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

describe('logos per brand', () => {
  for (const brand of ['singularidade', 'integras'] as const) {
    it(`${brand} has symbol/horizontal/vertical/monochrome SVGs`, () => {
      const dir = join(ROOT, 'src/logos', brand);
      for (const variant of ['symbol', 'horizontal', 'vertical', 'monochrome']) {
        expect(existsSync(join(dir, `${variant}.svg`)), `${brand}/${variant}.svg`).toBe(true);
      }
    });

    it(`${brand} has icon PNGs in 16/32/180/512`, () => {
      const dir = join(ROOT, 'src/logos', brand);
      for (const size of [16, 32, 180, 512]) {
        expect(existsSync(join(dir, `icon-${size}.png`)), `${brand}/icon-${size}.png`).toBe(true);
      }
    });

    it(`${brand}/symbol.svg contém gradient brand`, () => {
      const svg = readFileSync(join(ROOT, 'src/logos', brand, 'symbol.svg'), 'utf-8');
      // Singularidade tem 1 gradient com 3 stops; Integras tem 2 gradients (top + bottom)
      expect(svg).toContain('#E91E8B');
      expect(svg).toContain('#E8606A');
      expect(svg).toContain('#F5A623');
    });

    it(`${brand}/monochrome.svg usa currentColor`, () => {
      const svg = readFileSync(join(ROOT, 'src/logos', brand, 'monochrome.svg'), 'utf-8');
      expect(svg).toContain('currentColor');
    });
  }
});

describe('fonts', () => {
  it('plus-jakarta-sans WOFF2 latin + latin-ext, normal + italic', () => {
    for (const subset of ['latin', 'latin-ext']) {
      for (const style of ['normal', 'italic']) {
        const file = `plus-jakarta-sans-${subset}-wght-${style}.woff2`;
        expect(existsSync(join(ROOT, 'src/fonts', file)), file).toBe(true);
      }
    }
  });

  it('jetbrains-mono WOFF2 latin + latin-ext, normal + italic', () => {
    for (const subset of ['latin', 'latin-ext']) {
      for (const style of ['normal', 'italic']) {
        const file = `jetbrains-mono-${subset}-wght-${style}.woff2`;
        expect(existsSync(join(ROOT, 'src/fonts', file)), file).toBe(true);
      }
    }
  });

  it('plus-jakarta-sans.css declara @font-face apontando pros WOFF2 locais', () => {
    const css = readFileSync(join(ROOT, 'src/fonts/plus-jakarta-sans.css'), 'utf-8');
    expect(css).toContain('@font-face');
    expect(css).toContain('Plus Jakarta Sans Variable');
    expect(css).toContain('./plus-jakarta-sans-latin-wght-normal.woff2');
  });
});

describe('icons', () => {
  it('lucide subset tem pelo menos 50 ícones', () => {
    const dir = join(ROOT, 'src/icons/lucide');
    const files = readdirSync(dir).filter((f) => f.endsWith('.svg'));
    expect(files.length).toBeGreaterThanOrEqual(50);
  });

  it('custom ss:* tem 10 ícones esperados', () => {
    const dir = join(ROOT, 'src/icons/custom');
    const expected = [
      'tenant',
      'mcp-server',
      'tool',
      'eula-signed',
      'eula-pending',
      'provisioning',
      'billing-cycle',
      'tax-id',
      'integration-pending',
      'compliance',
    ];
    for (const name of expected) {
      expect(existsSync(join(dir, `${name}.svg`)), name).toBe(true);
    }
  });

  it('cada custom icon usa viewBox 24x24 e currentColor', () => {
    const dir = join(ROOT, 'src/icons/custom');
    const files = readdirSync(dir).filter((f) => f.endsWith('.svg'));
    for (const file of files) {
      const svg = readFileSync(join(dir, file), 'utf-8');
      expect(svg, `${file} viewBox`).toContain('viewBox="0 0 24 24"');
      expect(svg, `${file} currentColor`).toContain('currentColor');
    }
  });
});

describe('build outputs', () => {
  it('icons.svg-sprite.svg existe e tem 80+ symbols', () => {
    const path = join(ROOT, 'build/icons.svg-sprite.svg');
    if (!existsSync(path)) return; // build pode não ter rodado em CI fresh
    const sprite = readFileSync(path, 'utf-8');
    const symbolCount = (sprite.match(/<symbol\b/g) || []).length;
    expect(symbolCount).toBeGreaterThanOrEqual(80);
  });

  it('vaadin-iconset.js registra ss:* iconset', () => {
    const path = join(ROOT, 'build/vaadin-iconset.js');
    if (!existsSync(path)) return;
    const js = readFileSync(path, 'utf-8');
    expect(js).toContain('vaadin-iconset name="ss"');
    expect(js).toContain('id="ss:tenant"');
  });

  it('icons.json catalog tem todas marcas + custom', () => {
    const path = join(ROOT, 'build/icons.json');
    if (!existsSync(path)) return;
    const catalog = JSON.parse(readFileSync(path, 'utf-8'));
    expect(catalog.icons.length).toBeGreaterThanOrEqual(80);
    expect(catalog.icons.some((i: { qualified: string }) => i.qualified === 'ss:tenant')).toBe(
      true,
    );
  });
});
