import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  BUILD_DIR,
  blockFor,
  normalize,
  parseBlocks,
  readBuild,
  siteCssValues,
  themeCssValues,
} from './helpers/css';
import {
  BRAND_SWAP,
  THEMES,
  asCss,
  expectedFor,
  referenceTextStyles,
  referenceTokens,
  resolveReference,
} from './helpers/reference';
import type { Theme } from './helpers/reference';
import { parseColor, toHex } from './helpers/color';

const V2_NAMES = [...referenceTokens.keys()];

/** "name: expected → actual" for every v2 token whose generated value differs. */
function mismatches(
  actual: Map<string, string>,
  expected: (name: string) => string,
  transform: (name: string, value: string) => string = asCss,
): string[] {
  return V2_NAMES.flatMap((name) => {
    const want = transform(name, expected(name));
    const got = actual.get(name);
    return got !== undefined && normalize(got) === normalize(want)
      ? []
      : [`${name}: ${want} → ${got ?? '(missing)'}`];
  });
}

describe('theme.css (Vaadin singularidade-base and any page) matches the DS v2 reference', () => {
  it.each(THEMES)('every v2 token has its %s value (Integras, the default brand)', (theme) => {
    expect(mismatches(themeCssValues(theme), (n) => expectedFor(n, theme, 'integras'))).toEqual([]);
  });

  it("[data-theme='light'] repeats the light value of every token the dark theme changes", () => {
    const blocks = parseBlocks(readBuild('css/theme.css'));
    const root = blockFor(blocks, ':root').vars;
    const light = blockFor(blocks, "[data-theme='light']").vars;
    const dark = blockFor(blocks, "[theme~='dark']").vars;
    expect([...light.keys()]).toEqual([...dark.keys()]);
    for (const [name, v] of light) expect(v.value, name).toBe(root.get(name)?.value);
    for (const [name, v] of dark) expect(v.value, name).not.toBe(root.get(name)?.value);
  });

  it('dark applies to Vaadin (theme="dark") and to data-theme="dark" alike', () => {
    const blocks = parseBlocks(readBuild('css/theme.css'));
    expect(blockFor(blocks, "[theme~='dark']").selectors).toEqual([
      "[theme~='dark']",
      "[data-theme='dark']",
    ]);
  });

  it('data-brand="singularidade" swaps only the three brand colours, also inside a nested data-theme', () => {
    const blocks = parseBlocks(readBuild('css/theme.css'));
    const brand = blockFor(blocks, "[data-brand='singularidade']");
    expect(brand.selectors).toEqual([
      "[data-brand='singularidade']",
      "[data-brand='singularidade'] [data-theme]",
    ]);
    expect(Object.fromEntries([...brand.vars].map(([n, v]) => [n, v.value]))).toEqual({
      'color-brand-primary': '#ed1e79',
      'color-brand-secondary': '#f15052',
      'color-brand-tertiary': '#f7931e',
    });
    for (const [name, target] of Object.entries(BRAND_SWAP)) {
      expect(brand.vars.get(name)?.value).toBe(resolveReference(target, 'light'));
    }
  });
});

describe('{brand}.{theme}.css (the sites) match the DS v2 reference', () => {
  const cases = (['integras', 'singularidade'] as const).flatMap((brand) =>
    THEMES.map((theme): [typeof brand, Theme] => [brand, theme]),
  );

  it.each(cases)('%s.%s.css', (brand, theme) => {
    expect(mismatches(siteCssValues(brand, theme), (n) => expectedFor(n, theme, brand))).toEqual(
      [],
    );
  });

  it.each(cases)('%s.%s.css keeps the data-brand + data-theme selector', (brand, theme) => {
    expect(readBuild(`css/${brand}.${theme}.css`)).toContain(
      `[data-brand="${brand}"][data-theme="${theme}"], :root[data-brand="${brand}"][data-theme="${theme}"] {`,
    );
  });

  it.each(cases)('%s.%s.css declares the same names as theme.css', (brand, theme) => {
    expect([...siteCssValues(brand, theme).keys()].sort()).toEqual(
      [...themeCssValues(theme).keys()].sort(),
    );
  });
});

describe('names that leave v2', () => {
  const blocks = parseBlocks(readBuild('css/theme.css'));
  const root = blockFor(blocks, ':root').vars;
  const v2 = new Set(V2_NAMES);

  it('every generated name outside v2 is a deprecated alias, and no v2 name is deprecated', () => {
    const outside = [...root].filter(([name]) => !v2.has(name));
    expect(outside.filter(([, v]) => !v.deprecated).map(([n]) => n)).toEqual([]);
    expect([...root].filter(([n, v]) => v2.has(n) && v.deprecated).map(([n]) => n)).toEqual([]);
    // shadow-light/dark-* (12), color-brand-gradient, text-* (22), button-size-* (6),
    // button-primary-border-radius/-font-weight, card-shadow-* (2), dialog-shadow,
    // input-border-radius, input-padding
    expect(outside).toHaveLength(47);
  });

  it('keeps the v1 values, now with one value per theme where v1 had only the light one', () => {
    const v = (name: string) => root.get(name)?.value;
    for (const level of ['xs', 'sm', 'md', 'lg', 'xl', '2xl']) {
      expect(v(`shadow-light-${level}`)).toBe(resolveReference(`shadow-${level}`, 'light'));
      expect(v(`shadow-dark-${level}`)).toBe(resolveReference(`shadow-${level}`, 'dark'));
    }
    expect(v('color-brand-gradient')).toBe(
      'linear-gradient(160deg, #e91e8b 0%, #e8606a 50%, #f5a623 100%)',
    );
    expect(v('input-border-radius')).toBe(v('input-radius'));
    expect(v('button-primary-border-radius')).toBe(v('button-radius'));
    expect(v('input-padding')).toBe('8px 12px');
    for (const theme of THEMES) {
      const values = themeCssValues(theme);
      expect(values.get('card-shadow-default')).toBe(values.get('shadow-xs'));
      expect(values.get('card-shadow-hover')).toBe(values.get('shadow-md'));
      expect(values.get('dialog-shadow')).toBe(values.get('shadow-xl'));
    }
  });

  it('drops --brand-* from every CSS file: url("@singularidade/…") never loads in a browser', () => {
    for (const file of [
      'theme.css',
      'integras.light.css',
      'integras.dark.css',
      'singularidade.light.css',
      'singularidade.dark.css',
    ]) {
      const css = readBuild(`css/${file}`);
      expect(css, file).not.toMatch(/--brand-/);
      expect(css, file).not.toContain('url(');
    }
  });
});

describe('text-styles.css matches the 19 v2 text styles', () => {
  const css = readBuild('css/text-styles.css').replace(/\/\*\*[\s\S]*?\*\//g, '');
  const classes = new Map(
    [...css.matchAll(/\.([a-z0-9-]+)\s*\{([^}]*)\}/g)].map((m) => [
      m[1] ?? '',
      Object.fromEntries(
        [...(m[2] ?? '').matchAll(/([a-z-]+):\s*([^;]+);/g)].map((d) => [d[1], d[2]?.trim()]),
      ),
    ]),
  );

  it('has exactly the v2 styles', () => {
    expect([...classes.keys()]).toEqual(referenceTextStyles.map((s) => s.name));
    expect(classes.size).toBe(19);
  });

  it.each(referenceTextStyles.map((s) => [s.name, s] as const))('.%s', (name, style) => {
    expect(classes.get(name)).toEqual({
      'font-family': `var(--font-${style.family})`,
      'font-size': style.fontSize,
      'line-height': style.lineHeight,
      'font-weight': String(style.fontWeight),
      ...(style.letterSpacing !== undefined ? { 'letter-spacing': style.letterSpacing } : {}),
    });
  });
});

describe('Java e-mail constants match the DS v2 reference', () => {
  const javaConstants = (className: string): Map<string, string> => {
    const java = readFileSync(
      join(BUILD_DIR, `java/digital/singularidade/tokens/email/${className}.java`),
      'utf-8',
    );
    return new Map(
      [...java.matchAll(/public static final String (\w+) = "((?:[^"\\]|\\.)*)";/g)].map((m) => [
        m[1] ?? '',
        JSON.parse(`"${m[2] ?? ''}"`) as string,
      ]),
    );
  };
  const camel = (name: string) => name.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
  // Java gets colours as hex (#rrggbbaa when translucent) and keeps font sizes in px.
  const asJava = (name: string, value: string) =>
    /^(#|rgba?\()/.test(value) ? toHex(parseColor(value)) : value;

  const cases = (['integras', 'singularidade'] as const).flatMap((brand) =>
    THEMES.map((theme): [typeof brand, Theme] => [brand, theme]),
  );

  it.each(cases)('EmailTokens %s %s', (brand, theme) => {
    const className = `EmailTokens${brand[0]?.toUpperCase()}${brand.slice(1)}${theme[0]?.toUpperCase()}${theme.slice(1)}`;
    const constants = javaConstants(className);
    const byKebab = new Map(V2_NAMES.map((n) => [n, constants.get(camel(n)) ?? '']));
    expect(mismatches(byKebab, (n) => expectedFor(n, theme, brand), asJava)).toEqual([]);
  });

  it('keeps the values EmailTheme (singularidade-ui-vaadin) reads, so e-mails do not change', () => {
    const constants = javaConstants('EmailTokensIntegrasLight');
    expect(Object.fromEntries([...constants].filter(([n]) => n in EMAIL_THEME_V1))).toEqual(
      EMAIL_THEME_V1,
    );
  });
});

// Every constant EmailTheme.defaultIntegrasLight() reads, with its 0.2.0 value. Only
// fontFamilyMono changes in v2 (Fira Code out, Menlo and Consolas in), so it is left out.
const EMAIL_THEME_V1: Record<string, string> = {
  colorSurfaceBase: '#fdfafc',
  colorSurfaceSunken: '#f5f0f4',
  colorSurfaceRaised: '#ffffff',
  colorTextPrimary: '#261a21',
  colorTextMuted: '#735f6b',
  colorTextInverse: '#ffffff',
  colorInteractivePrimary: '#be3550',
  colorInteractivePrimaryHover: '#9f1239',
  colorBorderSubtle: '#ece5eb',
  colorFeedbackSuccessSolid: '#047857',
  colorFeedbackWarningSolid: '#b45309',
  colorFeedbackErrorSolid: '#dc2626',
  colorFeedbackInfoSolid: '#1d4ed8',
  colorFeedbackSuccessSurface: '#ecfdf5',
  colorFeedbackWarningSurface: '#fffbeb',
  colorFeedbackErrorSurface: '#fef2f2',
  colorFeedbackInfoSurface: '#eff6ff',
  size1: '4px',
  size2: '8px',
  size4: '16px',
  size6: '24px',
  size8: '32px',
  size12: '48px',
  radiusSm: '6px',
  radiusMd: '8px',
  radiusLg: '12px',
  fontFamilySans:
    "'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontSizeM: '14px',
  fontSize2xl: '22px',
  fontSizeS: '13px',
  fontLineHeightNormal: '1.5',
  fontLineHeightSnug: '1.25',
  colorBrandPrimary: '#e91e8b',
};
