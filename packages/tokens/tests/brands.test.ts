import { describe, it, expect } from 'vitest';
import singIdentity from '../src/brands/singularidade/identity.json' with { type: 'json' };
import singOverrides from '../src/brands/singularidade/overrides.json' with { type: 'json' };
import intIdentity from '../src/brands/integras/identity.json' with { type: 'json' };
import intOverrides from '../src/brands/integras/overrides.json' with { type: 'json' };

describe('singularidade brand', () => {
  it('identity define logoSymbol path', () => {
    expect(singIdentity.brand.logoSymbol.$value).toBeDefined();
  });

  it('overrides está vazio (segue defaults da matriz)', () => {
    expect(Object.keys(singOverrides)).toHaveLength(0);
  });
});

describe('integras brand', () => {
  it('identity define logoSymbol diferente do Singularidade', () => {
    expect(intIdentity.brand.logoSymbol.$value).not.toBe(singIdentity.brand.logoSymbol.$value);
  });

  it('overrides está vazio (segue padrão da matriz por decisão B)', () => {
    expect(Object.keys(intOverrides)).toHaveLength(0);
  });
});
