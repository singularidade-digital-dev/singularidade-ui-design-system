import { describe, it, expect } from 'vitest';
import light from '../src/semantic/color.light.json' with { type: 'json' };
import dark from '../src/semantic/color.dark.json' with { type: 'json' };

describe('semantic light', () => {
  it('brand.primary é magenta.500 (#E91E8B)', () => {
    expect(light.color.brand.primary.$value).toBe('{color.brand.magenta.500}');
  });

  it('interactive.primary é coral.600 (#BE3550, mais sóbrio em light)', () => {
    expect(light.color.interactive.primary.$value).toBe('{color.brand.coral.600}');
  });

  it('interactive.primary.hover é coral.700', () => {
    expect(light.color.interactive.primary.hover.$value).toBe('{color.brand.coral.700}');
  });

  it('interactive.primary.active volta pra coral.500 (brand pure)', () => {
    expect(light.color.interactive.primary.active.$value).toBe('{color.brand.coral.500}');
  });

  it('surface.base aponta pra neutral.50 (warm-magenta undertone)', () => {
    expect(light.color.surface.base.$value).toBe('{color.neutral.50}');
  });

  it('feedback.error é red puro (#DC2626) — distingue de coral', () => {
    expect(light.color.feedback.error.solid.$value).toBe('{color.feedback.error.600}');
  });
});

describe('semantic dark', () => {
  it('brand.primary continua magenta.500 (não muda entre temas)', () => {
    expect(dark.color.brand.primary.$value).toBe('{color.brand.magenta.500}');
  });

  it('interactive.primary é coral.400 em dark (brilhante pra atingir AA)', () => {
    expect(dark.color.interactive.primary.$value).toBe('{color.brand.coral.400}');
  });

  it('interactive.primary.hover é coral.300 em dark', () => {
    expect(dark.color.interactive.primary.hover.$value).toBe('{color.brand.coral.300}');
  });

  it('surface.base aponta pra neutral.950', () => {
    expect(dark.color.surface.base.$value).toBe('{color.neutral.950}');
  });

  it('feedback.error em dark é error.400 (#F87171)', () => {
    expect(dark.color.feedback.error.solid.$value).toBe('{color.feedback.error.400}');
  });
});
