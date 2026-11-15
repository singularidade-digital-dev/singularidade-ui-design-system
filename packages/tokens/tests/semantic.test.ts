import { describe, it, expect } from 'vitest';
import shared from '../src/semantic/color.json' with { type: 'json' };
import light from '../src/semantic/color.light.json' with { type: 'json' };
import dark from '../src/semantic/color.dark.json' with { type: 'json' };

describe('semantic shared by both themes', () => {
  it('brand.primary é o magenta do Integras (marca padrão)', () => {
    expect(shared.color.brand.primary.$value).toBe('{color.brand.integras.magenta}');
  });

  it('aliases on-*, link e border.control (v2)', () => {
    expect(shared.color['on-primary'].$value).toBe('{color.text.inverse}');
    expect(shared.color['on-status'].$value).toBe('{color.text.inverse}');
    expect(shared.color.link.$value).toBe('{color.interactive.primary}');
    expect(shared.color.border.control.$value).toBe('{color.neutral.450}');
  });
});

describe('semantic light', () => {
  it('interactive.primary é coral.600 (#BE3550, mais sóbrio em light)', () => {
    expect(light.color.interactive.primary.$value).toBe('{color.brand.coral.600}');
  });

  it('interactive.primary-hover é coral.700 (flat token, gera --color-interactive-primary-hover)', () => {
    expect(light.color.interactive['primary-hover'].$value).toBe('{color.brand.coral.700}');
  });

  it('interactive.primary-active é coral.800 (v2: 10,55:1 com branco; o coral.500 dava 3,33:1)', () => {
    expect(light.color.interactive['primary-active'].$value).toBe('{color.brand.coral.800}');
  });

  it('surface.base aponta pra neutral.50 (warm-magenta undertone)', () => {
    expect(light.color.surface.base.$value).toBe('{color.neutral.50}');
  });

  it('feedback.error é red puro (#DC2626) e o texto de erro é o error.700', () => {
    expect(light.color.feedback.error.solid.$value).toBe('{color.feedback.error.600}');
    expect(light.color.feedback.error.text.$value).toBe('{color.feedback.error.700}');
  });
});

describe('semantic dark', () => {
  it('interactive.primary é coral.400 em dark (brilhante pra atingir AA)', () => {
    expect(dark.color.interactive.primary.$value).toBe('{color.brand.coral.400}');
  });

  it('interactive.primary-hover é coral.300 em dark', () => {
    expect(dark.color.interactive['primary-hover'].$value).toBe('{color.brand.coral.300}');
  });

  it('surface.base aponta pra neutral.900 (#1A1517, nome da v2)', () => {
    expect(dark.color.surface.base.$value).toBe('{color.neutral.900}');
  });

  it('text.disabled é neutral.500 em dark (v2: era #524049, 1,38:1)', () => {
    expect(dark.color.text.disabled.$value).toBe('{color.neutral.500}');
  });

  it('superfícies de status são translúcidas em dark', () => {
    expect(dark.color.feedback.warning.surface.$value).toBe('rgba(251, 191, 36, 0.16)');
  });

  it('feedback.error em dark é error.400 (#F87171)', () => {
    expect(dark.color.feedback.error.solid.$value).toBe('{color.feedback.error.400}');
  });
});

describe('both theme files declare the same tokens', () => {
  const paths = (node: object, prefix = ''): string[] =>
    Object.entries(node).flatMap(([key, value]: [string, unknown]) =>
      key.startsWith('$')
        ? []
        : value !== null && typeof value === 'object' && '$value' in value
          ? [`${prefix}${key}`]
          : paths(value as object, `${prefix}${key}.`),
    );

  it('color.light.json e color.dark.json têm os mesmos caminhos', () => {
    expect(paths(light).sort()).toEqual(paths(dark).sort());
  });
});
