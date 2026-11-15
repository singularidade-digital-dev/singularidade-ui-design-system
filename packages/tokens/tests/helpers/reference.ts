import { readFileSync } from 'fs';
import { join } from 'path';

/** The approved DS v2 tokens.json, copied byte for byte (see reference/README.md). */

export type Theme = 'light' | 'dark';
export const THEMES: Theme[] = ['light', 'dark'];

type ThemedValue = Partial<Record<Theme, string>>;
export type ReferenceValue = string | number | ThemedValue;

interface ReferenceToken {
  name: string;
  value: ReferenceValue;
}

export interface ReferenceTextStyle {
  name: string;
  family?: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing?: string;
}

interface ReferenceTypeGroup {
  family: string;
  styles: ReferenceTextStyle[];
}

export interface ReferenceFontFace {
  family: string;
  file: string;
  weight: string;
  style: string;
}

interface Reference {
  color: { tokens: ReferenceToken[] };
  type: {
    fonts: ReferenceFontFace[];
    families: Record<string, string>;
    groups: ReferenceTypeGroup[];
  };
}

const SECTIONS = [
  'spacing',
  'radius',
  'shadow',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
  'duration',
  'easing',
  'breakpoint',
  'container',
  'control',
  'zIndex',
] as const;

const raw: unknown = JSON.parse(
  readFileSync(join(import.meta.dirname, '..', '..', 'reference', 'ds-v2.tokens.json'), 'utf-8'),
);
export const reference = raw as Reference;

function sectionTokens(section: (typeof SECTIONS)[number]): ReferenceToken[] {
  const value = (raw as Record<string, { tokens: ReferenceToken[] }>)[section];
  if (!value) throw new Error(`reference has no ${section} section`);
  return value.tokens;
}

/**
 * Every v2 token by its CSS custom property name (without the leading --): the
 * colours, the non-colour sections and the three font families (--font-family-*).
 */
export const referenceTokens = new Map<string, ReferenceValue>([
  ...reference.color.tokens.map((t): [string, ReferenceValue] => [t.name, t.value]),
  ...SECTIONS.flatMap((s) =>
    sectionTokens(s).map((t): [string, ReferenceValue] => [t.name, t.value]),
  ),
  ...Object.entries(reference.type.families).map(([k, v]): [string, ReferenceValue] => [
    `font-${k}`,
    v,
  ]),
]);

export const referenceTextStyles: ReferenceTextStyle[] = reference.type.groups.flatMap((g) =>
  g.styles.map((s) => ({ ...s, family: s.family ?? g.family })),
);

/** Value of a v2 token in a theme, following {alias} chains (a single value applies to both themes). */
export function resolveReference(name: string, theme: Theme, depth = 0): string {
  if (depth > 16) throw new Error(`alias chain too deep: ${name}`);
  const value = referenceTokens.get(name);
  if (value === undefined) throw new Error(`unknown v2 token ${name}`);
  const own = typeof value === 'object' ? (value[theme] ?? value.light) : value;
  if (own === undefined) throw new Error(`${name} has no ${theme} value`);
  const alias = String(own).match(/^\{([^}]+)\}$/);
  return alias?.[1] ? resolveReference(alias[1], theme, depth + 1) : String(own);
}

/** px → rem for the font-size scale, which the CSS outputs emit in rem (the v2 spec asks for it). */
export function asCss(name: string, value: string): string {
  const px = value.match(/^(-?\d*\.?\d+)px$/);
  return name.startsWith('font-size-') && px?.[1] ? `${Number(px[1]) / 16}rem` : value;
}

export const BRAND_SWAP: Record<string, string> = {
  'color-brand-primary': 'color-brand-singularidade-magenta',
  'color-brand-secondary': 'color-brand-singularidade-coral',
  'color-brand-tertiary': 'color-brand-singularidade-orange',
};

/** Expected value of a v2 token for a brand: data-brand="singularidade" re-points only the brand colours. */
export function expectedFor(
  name: string,
  theme: Theme,
  brand: 'integras' | 'singularidade',
): string {
  const swapped = brand === 'singularidade' ? BRAND_SWAP[name] : undefined;
  return resolveReference(swapped ?? name, theme);
}
