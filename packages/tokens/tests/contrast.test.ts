import { describe, it, expect } from 'vitest';
import { themeCssValues } from './helpers/css';
import { THEMES } from './helpers/reference';
import { contrast, over, parseColor } from './helpers/color';

/**
 * The contrast pairs of the DS v2 specification (design-system-v2-fonte/_test/contrast.py),
 * checked on what the build ships: theme.css, in both themes. 120 pairs per theme.
 */
interface Check {
  label: string;
  fg: string;
  bg: string;
  min: number;
  /** Opaque surface under a translucent background. */
  base?: string;
}

const SURFACES = ['color-surface-base', 'color-surface-raised', 'color-surface-sunken'];
const TONES = ['success', 'error', 'warning', 'info'];

function specChecks(): Check[] {
  const checks: Check[] = [];
  const add = (label: string, fg: string, bg: string, min: number, base?: string) =>
    checks.push(base === undefined ? { label, fg, bg, min } : { label, fg, bg, min, base });

  // text on the three surfaces
  for (const s of SURFACES) {
    for (const t of [
      'color-text-primary',
      'color-text-secondary',
      'color-text-muted',
      'color-link',
      'color-interactive-primary',
    ]) {
      add(`${t} on ${s}`, t, s, 4.5);
    }
    // feedback text never sits directly on sunken (warning: 4.46 in light)
    if (s !== 'color-surface-sunken') {
      for (const tone of TONES) {
        const t = `color-feedback-${tone}-text`;
        add(`${t} on ${s}`, t, s, 4.5);
      }
    }
    for (const t of [
      'color-border-control',
      'color-border-focus',
      'color-feedback-error-solid',
      'color-feedback-success-solid',
      'color-feedback-warning-solid',
      'color-feedback-info-solid',
      'color-text-muted',
    ]) {
      add(`[3:1] ${t} on ${s}`, t, s, 3);
    }
  }
  // hover text for link
  for (const s of SURFACES) add(`color-link-hover on ${s}`, 'color-link-hover', s, 4.5);
  // fills with text on top
  add('on-primary on interactive-primary', 'color-on-primary', 'color-interactive-primary', 4.5);
  add('on-primary on primary-hover', 'color-on-primary', 'color-interactive-primary-hover', 4.5);
  add('on-primary on primary-active', 'color-on-primary', 'color-interactive-primary-active', 4.5);
  for (const tone of TONES) {
    add(`on-status on ${tone}-solid`, 'color-on-status', `color-feedback-${tone}-solid`, 4.5);
  }
  add('on-status on error-hover', 'color-on-status', 'color-feedback-error-hover', 4.5);
  // tinted grounds (translucent in dark): over raised, base and sunken
  for (const base of ['color-surface-raised', 'color-surface-base', 'color-surface-sunken']) {
    const subtle = 'color-interactive-primary-subtle';
    add(`primary on primary-subtle /${base}`, 'color-interactive-primary', subtle, 4.5, base);
    add(
      `primary-hover on primary-subtle /${base}`,
      'color-interactive-primary-hover',
      subtle,
      4.5,
      base,
    );
    add(
      `primary-hover on primary-subtle-hover /${base}`,
      'color-interactive-primary-hover',
      'color-interactive-primary-subtle-hover',
      4.5,
      base,
    );
    add(`text-primary on primary-subtle /${base}`, 'color-text-primary', subtle, 4.5, base);
    add(`[3:1] focus on primary-subtle /${base}`, 'color-border-focus', subtle, 3, base);
    for (const tone of TONES) {
      const surface = `color-feedback-${tone}-surface`;
      add(
        `${tone}-text on ${tone}-surface /${base}`,
        `color-feedback-${tone}-text`,
        surface,
        4.5,
        base,
      );
      add(`text-primary on ${tone}-surface /${base}`, 'color-text-primary', surface, 4.5, base);
      add(`text-secondary on ${tone}-surface /${base}`, 'color-text-secondary', surface, 4.5, base);
    }
    add(
      `error-text on error-surface (danger-tertiary hover) /${base}`,
      'color-feedback-error-text',
      'color-feedback-error-surface',
      4.5,
      base,
    );
  }
  // neutral grounds
  for (const t of ['color-text-primary', 'color-text-secondary']) {
    add(`${t} on interactive-secondary`, t, 'color-interactive-secondary', 4.5);
  }
  add(
    'text-primary on interactive-secondary-hover',
    'color-text-primary',
    'color-interactive-secondary-hover',
    4.5,
  );
  add(
    'on-inverse on surface-inverse (tooltip)',
    'color-text-on-inverse',
    'color-surface-inverse',
    4.5,
  );
  // meters: fill vs track
  for (const f of [
    'color-interactive-primary',
    'color-feedback-warning-solid',
    'color-feedback-error-solid',
  ]) {
    add(`[3:1] meter ${f} vs interactive-secondary`, f, 'color-interactive-secondary', 3);
  }
  // borders
  add(
    '[3:1] border-control on interactive-secondary (secondary btn hover)',
    'color-border-control',
    'color-interactive-secondary',
    3,
  );
  add(
    '[3:1] checkbox checked fill on raised',
    'color-interactive-primary',
    'color-surface-raised',
    3,
  );
  add(
    '[3:1] info icon on raised (publisher badge-check)',
    'color-feedback-info-solid',
    'color-surface-raised',
    3,
  );
  add(
    'text-muted on sunken (sidenav group label, light)',
    'color-text-muted',
    'color-surface-sunken',
    4.5,
  );
  return checks;
}

function pairRatio(check: Check, values: Map<string, string>): number {
  const colour = (name: string) => {
    const value = values.get(name);
    if (value === undefined) throw new Error(`theme.css has no --${name}`);
    return parseColor(value);
  };
  let bg = colour(check.bg);
  if (bg[3] < 1) {
    if (check.base === undefined)
      throw new Error(`${check.bg} is translucent; the check needs a base`);
    const base = colour(check.base);
    if (base[3] < 1) throw new Error(`${check.base} must be opaque`);
    bg = over(bg, base);
  }
  let fg = colour(check.fg);
  if (fg[3] < 1) fg = over(fg, bg);
  return contrast(fg, bg);
}

const CHECKS = specChecks();

describe('contrast (DS v2 specification, 240 pairs)', () => {
  it('checks 120 pairs per theme', () => {
    expect(CHECKS).toHaveLength(120);
    expect(CHECKS.length * THEMES.length).toBe(240);
  });

  describe.each(THEMES)('%s', (theme) => {
    const values = themeCssValues(theme);
    it.each(CHECKS.map((c) => [c.label, c] as const))('%s', (_label, check) => {
      expect(pairRatio(check, values)).toBeGreaterThanOrEqual(check.min);
    });
  });

  it('matches the ratios the specification reports for the fixes of wave 0', () => {
    const light = themeCssValues('light');
    const dark = themeCssValues('dark');
    const ratio = (fg: string, bg: string, values: Map<string, string>) =>
      Math.round(pairRatio({ label: '', fg, bg, min: 0 }, values) * 100) / 100;
    // pressed primary with white text: was 3.33 (#e8606a)
    expect(ratio('color-on-primary', 'color-interactive-primary-active', light)).toBe(10.55);
    // error as text on base: was 4.66 with the solid red
    expect(ratio('color-feedback-error-text', 'color-surface-base', light)).toBe(6.24);
    expect(ratio('color-feedback-error-solid', 'color-surface-base', light)).toBe(4.66);
    // muted text in dark on raised: was 4.47 (#8b7d85 on #1c1820)
    expect(ratio('color-text-muted', 'color-surface-raised', dark)).toBe(6.04);
  });
});
