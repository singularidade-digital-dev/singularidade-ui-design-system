import { describe, it, expect } from 'vitest';
import { themeCssValues } from './helpers/css';
import { luminance, parseColor } from './helpers/color';

/** Every ramp goes from light to dark as the stop number grows (v1 had neutral 900/950 swapped). */
const RAMPS = [
  'color-brand-magenta',
  'color-brand-coral',
  'color-brand-orange',
  'color-neutral',
  'color-feedback-success',
  'color-feedback-error',
  'color-feedback-warning',
  'color-feedback-info',
];

const values = themeCssValues('light');

function stops(ramp: string): [number, number][] {
  const pattern = new RegExp(`^${ramp}-(\\d+)$`);
  return [...values]
    .flatMap(([name, value]): [number, number][] => {
      const stop = name.match(pattern)?.[1];
      return stop === undefined ? [] : [[Number(stop), luminance(parseColor(value))]];
    })
    .sort((a, b) => a[0] - b[0]);
}

describe('ramps in order', () => {
  it.each(RAMPS)('%s gets darker at every stop', (ramp) => {
    const ladder = stops(ramp);
    expect(ladder.length).toBeGreaterThanOrEqual(8);
    const outOfOrder = ladder
      .slice(1)
      .filter(([, lum], i) => lum >= (ladder[i]?.[1] ?? Infinity))
      .map(([stop]) => stop);
    expect(outOfOrder).toEqual([]);
  });

  it('neutral has the v2 stops, 450 included', () => {
    expect(stops('color-neutral').map(([s]) => s)).toEqual([
      0, 50, 100, 200, 300, 400, 450, 500, 600, 700, 800, 900, 950, 1000,
    ]);
  });
});
