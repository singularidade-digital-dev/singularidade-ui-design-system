# ADR-003: Sub-marcas via overlay

- **Status:** accepted
- **Date:** 2026-05-03
- **Deciders:** singularidade.digital

## Contexto

Singularidade Digital é a empresa-matriz. Cada produto (integras.digital, futuros) precisa identidade própria mas com **DNA visual unificada**. Como modelar isso nos tokens sem duplicar código?

## Decisão

Sub-marcas como **overlay fino** sobre matriz:

```
packages/tokens/src/
├── core/                 ← compartilhado por TODAS as marcas
├── semantic/             ← compartilhado (varia só por mode)
├── component/            ← compartilhado
└── brands/
    ├── singularidade/{identity.json, overrides.json}
    └── integras/{identity.json, overrides.json}
```

`identity.json` contém: nome, ID, paths para logos.
`overrides.json` contém: customizações pontuais. **Vazio por padrão** quando segue matriz (estratégia "endossada").

Style Dictionary builda 1 conjunto por brand × theme: `singularidade.{light,dark}.css`, `integras.{light,dark}.css`. Vaadin escolhe via `data-brand` attribute.

## Alternativas consideradas

| Estratégia                                          | Pros                                                              | Contras                                                             |
| --------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Overlay fino (matriz + overrides)** ✓             | DNA unificada, customização cirúrgica, novos produtos = 1 arquivo | Precisa cuidado pra não divergir overrides                          |
| Brands independentes (cada um tem seu set completo) | Total flexibilidade                                               | Manter consistência fica oneroso, drift garantido                   |
| Houses pattern (sub-domain branded)                 | Marcas têm autonomia visual                                       | Quebra DNA, parece empresas separadas                               |
| White-label (multi-tenant theming)                  | Cliente customiza tudo                                            | Não é o caso aqui — Singularidade é matriz, sub-marcas são produtos |

## Consequências

**Positivas:**

- Adicionar nova sub-marca = 1 arquivo `identity.json` + zerado `overrides.json`
- Customização pontual sem fork
- Brand magenta puro `#E91E8B` é shared — todas as marcas o usam
- Visual reconhecível como família

**Negativas:**

- Tentação de divergir cresce com número de marcas
- Decisões de override precisam revisão (pode virar exceção que dilui DNA)

## Implementação

```jsonc
// brands/integras/identity.json
{
  "brand": {
    "name": { "$value": "integras.digital", "$type": "string" },
    "id": { "$value": "integras", "$type": "string" },
    "logoSymbol": { "$value": "@singularidade/brand-assets/logos/integras/symbol.svg", "$type": "asset" }
  }
}

// brands/integras/overrides.json
{}  // vazio = segue matriz
```

## Referências

- [Marca / Identidade](/marca/01-identidade/)
- [Foundations / Multi-marca](/foundations/multi-marca/)
