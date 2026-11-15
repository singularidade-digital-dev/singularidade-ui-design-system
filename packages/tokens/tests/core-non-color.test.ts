import { describe, it, expect } from 'vitest';
import typography from '../src/core/typography.json' with { type: 'json' };
import spacing from '../src/core/spacing.json' with { type: 'json' };
import radius from '../src/core/radius.json' with { type: 'json' };
import shadow from '../src/core/shadow.json' with { type: 'json' };
import duration from '../src/core/duration.json' with { type: 'json' };
import easing from '../src/core/easing.json' with { type: 'json' };
import layout from '../src/core/layout.json' with { type: 'json' };
import semanticShadowLight from '../src/semantic/shadow.light.json' with { type: 'json' };
import semanticShadowDark from '../src/semantic/shadow.dark.json' with { type: 'json' };

describe('typography', () => {
  it('define famílias sans (Plus Jakarta), mono (JetBrains) e e-mail', () => {
    expect(typography.font.family.sans.$value).toContain('Plus Jakarta Sans');
    expect(typography.font.family.mono.$value).toContain('JetBrains Mono');
    // e-mail clients do not download fonts: the static name, then system fallbacks
    expect(typography.font.family.email.$value.startsWith("'Plus Jakarta Sans',")).toBe(true);
  });

  it('lista primeiro o nome registrado pelo @font-face do brand-assets', () => {
    // brand-assets registers the variable fonts as '<Family> Variable'; a token
    // that names only the static family makes browsers fall back to system-ui.
    expect(typography.font.family.sans.$value.startsWith("'Plus Jakarta Sans Variable'")).toBe(
      true,
    );
    expect(typography.font.family.mono.$value.startsWith("'JetBrains Mono Variable'")).toBe(true);
  });

  it('escala xs..7xl, com xs em 12px (v2)', () => {
    const sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'] as const;
    for (const s of sizes) {
      expect(typography.font.size[s], `font.size.${s}`).toBeDefined();
    }
    expect(typography.font.size.xs.$value).toBe('12px');
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
  it('escala xs/sm/md/lg/xl/2xl com um valor por tema', () => {
    for (const level of ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const) {
      expect(semanticShadowLight.shadow[level].$value).toBe(`{shadow.light.${level}}`);
      expect(semanticShadowDark.shadow[level].$value).toBe(`{shadow.dark.${level}}`);
    }
  });

  it('shadow.light.* e shadow.dark.* ficam como aliases deprecados', () => {
    for (const level of ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const) {
      expect(shadow.shadow.light[level].$deprecated, `shadow.light.${level}`).toBeDefined();
      expect(shadow.shadow.dark[level].$deprecated, `shadow.dark.${level}`).toBeDefined();
    }
  });
});

describe('layout (v2)', () => {
  it('breakpoints, contêineres, controles, alvos, ícones e z-index', () => {
    expect(layout.bp.sm.$value).toBe('640px');
    expect(layout.container.auth.$value).toBe('440px');
    expect(layout.control.md.$value).toBe('36px');
    expect(layout.target.touch.$value).toBe('44px');
    expect(layout.icon['2xl'].$value).toBe('48px');
    expect(layout.header.height.app.$value).toBe('56px');
    expect(layout.sidenav.width.$value).toBe('240px');
    expect(layout.z['skip-link'].$value).toBe(1700);
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
