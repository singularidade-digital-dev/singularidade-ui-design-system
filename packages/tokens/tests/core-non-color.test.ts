import { describe, it, expect } from 'vitest';
import typography from '../src/core/typography.json' with { type: 'json' };
import spacing from '../src/core/spacing.json' with { type: 'json' };
import radius from '../src/core/radius.json' with { type: 'json' };
import shadow from '../src/core/shadow.json' with { type: 'json' };
import duration from '../src/core/duration.json' with { type: 'json' };
import easing from '../src/core/easing.json' with { type: 'json' };

describe('typography', () => {
  it('define famílias sans (Plus Jakarta) e mono (JetBrains)', () => {
    expect(typography.font.family.sans.$value).toContain('Plus Jakarta Sans');
    expect(typography.font.family.mono.$value).toContain('JetBrains Mono');
  });

  it('escala modular xs..7xl', () => {
    const sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'] as const;
    for (const s of sizes) {
      expect(typography.font.size[s], `font.size.${s}`).toBeDefined();
    }
  });

  it('weights regular/medium/semibold/bold', () => {
    expect(typography.font.weight.regular.$value).toBe(400);
    expect(typography.font.weight.medium.$value).toBe(500);
    expect(typography.font.weight.semibold.$value).toBe(600);
    expect(typography.font.weight.bold.$value).toBe(700);
  });
});

describe('spacing', () => {
  it('escala 0..32 baseada em 4px', () => {
    expect(spacing.size['0'].$value).toBe('0px');
    expect(spacing.size['1'].$value).toBe('4px');
    expect(spacing.size['4'].$value).toBe('16px');
    expect(spacing.size['8'].$value).toBe('32px');
    expect(spacing.size['32'].$value).toBe('128px');
  });
});

describe('radius', () => {
  it('escala none/xs/sm/md/lg/xl/full', () => {
    expect(radius.radius.none.$value).toBe('0px');
    expect(radius.radius.xs.$value).toBe('2px');
    expect(radius.radius.sm.$value).toBe('6px');
    expect(radius.radius.md.$value).toBe('8px');
    expect(radius.radius.lg.$value).toBe('12px');
    expect(radius.radius.xl.$value).toBe('16px');
    expect(radius.radius.full.$value).toBe('9999px');
  });
});

describe('shadow', () => {
  it('escala xs/sm/md/lg/xl/2xl com variantes light e dark', () => {
    for (const level of ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const) {
      expect(shadow.shadow.light[level], `shadow.light.${level}`).toBeDefined();
      expect(shadow.shadow.dark[level], `shadow.dark.${level}`).toBeDefined();
    }
  });
});

describe('duration', () => {
  it('instant/fast/base/slow', () => {
    expect(duration.duration.instant.$value).toBe('0ms');
    expect(duration.duration.fast.$value).toBe('100ms');
    expect(duration.duration.base.$value).toBe('200ms');
    expect(duration.duration.slow.$value).toBe('400ms');
  });
});

describe('easing', () => {
  it('linear/ease-out/ease-in-out/spring', () => {
    expect(easing.easing.linear.$value).toBeDefined();
    expect(easing.easing['ease-out'].$value).toBeDefined();
    expect(easing.easing['ease-in-out'].$value).toBeDefined();
    expect(easing.easing.spring.$value).toBeDefined();
  });
});
