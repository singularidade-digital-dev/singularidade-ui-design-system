/** WCAG 2 contrast helpers: the same maths as the DS v2 _test/contrast.py. */

export type Rgba = [number, number, number, number];

export function parseColor(value: string): Rgba {
  const v = value.trim().toLowerCase();
  const hex = v.match(/^#([0-9a-f]{3,8})$/);
  if (hex?.[1]) {
    let h = hex[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    const channel = (i: number) => parseInt(h.slice(i, i + 2), 16);
    return [channel(0), channel(2), channel(4), h.length === 8 ? channel(6) / 255 : 1];
  }
  const fn = v.match(/^rgba?\(([^)]*)\)$/);
  if (fn?.[1]) {
    const parts = fn[1].split(',').map((p) => Number(p.trim()));
    const [r = NaN, g = NaN, b = NaN, a = 1] = parts;
    if ([r, g, b, a].some(Number.isNaN)) throw new Error(`cannot parse colour ${value}`);
    return [r, g, b, a];
  }
  throw new Error(`cannot parse colour ${value}`);
}

/** Composites a colour that may be translucent over an opaque one. */
export function over(fg: Rgba, bg: Rgba): Rgba {
  const a = fg[3];
  return [fg[0] * a + bg[0] * (1 - a), fg[1] * a + bg[1] * (1 - a), fg[2] * a + bg[2] * (1 - a), 1];
}

export function luminance(c: Rgba): number {
  const channel = (x: number) => {
    const s = x / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(c[0]) + 0.7152 * channel(c[1]) + 0.0722 * channel(c[2]);
}

export function contrast(a: Rgba, b: Rgba): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** #rrggbb, or #rrggbbaa when translucent: what the Java (e-mail) target emits. */
export function toHex(c: Rgba): string {
  const byte = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  const rgb = `#${byte(c[0])}${byte(c[1])}${byte(c[2])}`;
  return c[3] < 1 ? `${rgb}${byte(c[3] * 255)}` : rgb;
}
