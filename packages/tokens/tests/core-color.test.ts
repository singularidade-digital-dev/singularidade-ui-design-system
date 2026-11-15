import { describe, it, expect } from 'vitest';
import coreColor from '../src/core/color.json' with { type: 'json' };

describe('core color tokens', () => {
  it('contém valores brand exatos da identidade visual do Integras', () => {
    expect(coreColor.color.brand.magenta['500'].$value).toBe('#E91E8B');
    expect(coreColor.color.brand.coral['500'].$value).toBe('#E8606A');
    expect(coreColor.color.brand.orange['500'].$value).toBe('#F5A623');
    expect(coreColor.color.brand.integras.magenta.$value).toBe('{color.brand.magenta.500}');
  });

  it('traz a paleta original da Singularidade', () => {
    expect(coreColor.color.brand.singularidade.magenta.$value).toBe('#ED1E79');
    expect(coreColor.color.brand.singularidade.coral.$value).toBe('#F15052');
    expect(coreColor.color.brand.singularidade.orange.$value).toBe('#F7931E');
  });

  it('cada brand color tem 11 paradas (50, 100, 200, ..., 950)', () => {
    const stops = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    for (const family of ['magenta', 'coral', 'orange'] as const) {
      const palette = coreColor.color.brand[family] as Record<
        string,
        { $value: string; $type: string }
      >;
      for (const stop of stops) {
        expect(palette[stop], `${family}.${stop}`).toBeDefined();
        expect(palette[stop]!.$type).toBe('color');
      }
    }
  });

  it('neutral tem 14 paradas, com o 450 da v2 e o 900/950 na ordem certa', () => {
    const stops = [
      '0',
      '50',
      '100',
      '200',
      '300',
      '400',
      '450',
      '500',
      '600',
      '700',
      '800',
      '900',
      '950',
      '1000',
    ];
    const neutral = coreColor.color.neutral as Record<string, { $value: string; $type: string }>;
    expect(Object.keys(neutral).sort((a, b) => Number(a) - Number(b))).toEqual(stops);
    expect(neutral['450']!.$value).toBe('#8C7B86');
    expect(neutral['900']!.$value).toBe('#1A1517');
    expect(neutral['950']!.$value).toBe('#1A111A');
  });

  it('feedback colors universais existem (success, error, warning, info)', () => {
    for (const sem of ['success', 'error', 'warning', 'info'] as const) {
      expect(coreColor.color.feedback[sem]['500'], `${sem}.500`).toBeDefined();
    }
  });
});
