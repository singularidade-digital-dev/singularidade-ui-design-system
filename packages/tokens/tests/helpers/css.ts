import { readFileSync } from 'fs';
import { join } from 'path';

export const BUILD_DIR = join(import.meta.dirname, '..', '..', 'build');

export interface CssVar {
  value: string;
  deprecated: string | undefined;
}

export interface CssBlock {
  selectors: string[];
  vars: Map<string, CssVar>;
}

export const readBuild = (file: string): string => readFileSync(join(BUILD_DIR, file), 'utf-8');

/**
 * Parses the token files the build writes: rule blocks of custom properties, each
 * declaration optionally followed by a `/* deprecated: … *\/` note. The file header
 * (a `/** … *\/` comment) is dropped first.
 */
export function parseBlocks(css: string): CssBlock[] {
  const body = css.replace(/\/\*\*[\s\S]*?\*\//g, '');
  const blocks: CssBlock[] = [];
  for (const rule of body.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectors = (rule[1] ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const vars = new Map<string, CssVar>();
    const declarations = rule[2] ?? '';
    for (const d of declarations.matchAll(
      /--([a-z0-9-]+):\s*([^;]+);(?:[ \t]*\/\*\s*deprecated:\s*(.*?)\s*\*\/)?/g,
    )) {
      vars.set(d[1] ?? '', { value: (d[2] ?? '').trim(), deprecated: d[3] });
    }
    blocks.push({ selectors, vars });
  }
  return blocks;
}

export function blockFor(blocks: CssBlock[], selector: string): CssBlock {
  const block = blocks.find((b) => b.selectors.includes(selector));
  if (!block) throw new Error(`no rule for ${selector}`);
  return block;
}

const values = (block: CssBlock): Map<string, string> =>
  new Map([...block.vars].map(([name, v]) => [name, v.value]));

/** theme.css resolved for one theme: the :root block, with the dark block on top for dark. */
export function themeCssValues(theme: 'light' | 'dark'): Map<string, string> {
  const blocks = parseBlocks(readBuild('css/theme.css'));
  const resolved = values(blockFor(blocks, ':root'));
  if (theme === 'dark') {
    for (const [name, value] of values(blockFor(blocks, "[theme~='dark']"))) {
      resolved.set(name, value);
    }
  }
  return resolved;
}

/** One of the four {brand}.{theme}.css files the sites import. */
export function siteCssValues(brand: string, theme: 'light' | 'dark'): Map<string, string> {
  const blocks = parseBlocks(readBuild(`css/${brand}.${theme}.css`));
  if (blocks.length !== 1 || !blocks[0])
    throw new Error(`${brand}.${theme}.css: expected one rule`);
  return values(blocks[0]);
}

export const normalize = (value: string): string => value.toLowerCase().replace(/\s+/g, ' ').trim();
