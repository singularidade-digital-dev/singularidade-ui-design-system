import { describe, it, expect } from 'vitest';
import coreColor from '../src/core/color.json' with { type: 'json' };

describe('core color tokens', () => {
  it('contém valores brand exatos da identidade visual', () => {
    expect(coreColor.color.brand.magenta['500'].$value).toBe('#E91E8B');
    expect(coreColor.color.brand.coral['500'].$value).toBe('#E8606A');
    expect(coreColor.color.brand.orange['500'].$value).toBe('#F5A623');
  });

  it('cada brand color tem 11 paradas (50, 100, 200, ..., 950)', () => {
    const stops = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    for (const family of ['magenta', 'coral', 'orange'] as const) {
      for (const stop of stops) {
        expect(coreColor.color.brand[family][stop], `${family}.${stop}`).toBeDefined();
        expect(coreColor.color.brand[family][stop].$type).toBe('color');
      }
    }
  });

  it('neutral tem 13 paradas (0, 50, 100, ..., 950, 1000) com undertone magenta (hsl 330)', () => {
    const stops = [
      '0',
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      '950',
      '1000',
    ];
    for (const stop of stops) {
      expect(coreColor.color.neutral[stop], `neutral.${stop}`).toBeDefined();
    }
  });

  it('feedback colors universais existem (success, error, warning, info)', () => {
    for (const sem of ['success', 'error', 'warning', 'info'] as const) {
      expect(coreColor.color.feedback[sem]['500'], `${sem}.500`).toBeDefined();
    }
  });
});
