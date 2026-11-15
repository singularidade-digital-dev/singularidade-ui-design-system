import { describe, it, expect } from 'vitest';
import singIdentity from '../src/brands/singularidade/identity.json' with { type: 'json' };
import singOverrides from '../src/brands/singularidade/overrides.json' with { type: 'json' };
import intIdentity from '../src/brands/integras/identity.json' with { type: 'json' };
import intOverrides from '../src/brands/integras/overrides.json' with { type: 'json' };

describe('integras brand (padrão da v2)', () => {
  it('identity define logoSymbol diferente do Singularidade', () => {
    expect(intIdentity.brand.logoSymbol.$value).not.toBe(singIdentity.brand.logoSymbol.$value);
  });

  it('overrides está vazio: é a marca padrão dos tokens semânticos', () => {
    expect(Object.keys(intOverrides)).toHaveLength(0);
  });
});

describe('singularidade brand', () => {
  it('identity define logoSymbol path', () => {
    expect(singIdentity.brand.logoSymbol.$value).toBeDefined();
  });

  it('overrides troca só as três cores da marca para a paleta original', () => {
    expect(Object.keys(singOverrides)).toEqual(['color']);
    expect(Object.keys(singOverrides.color)).toEqual(['brand']);
    const brand = singOverrides.color.brand;
    expect(Object.keys(brand)).toEqual(['primary', 'secondary', 'tertiary']);
    expect(brand.primary.$value).toBe('{color.brand.singularidade.magenta}');
    expect(brand.secondary.$value).toBe('{color.brand.singularidade.coral}');
    expect(brand.tertiary.$value).toBe('{color.brand.singularidade.orange}');
  });
});
