# ADR-002: Modelo de tokens em 3 camadas

- **Status:** accepted
- **Date:** 2026-05-03
- **Deciders:** singularidade.digital

## Contexto

Tokens podem ser estruturados de várias formas: lista flat (Bootstrap), 2-tier (Tailwind), 3-tier estrito (IBM Carbon, Shopify Polaris). Decidir o modelo afeta manutenibilidade e clareza pra consumidores.

## Decisão

**3-tier estrito**:

1. **Core (primitives)** — valores crus, sem semântica. Paleta completa em escalas 50–950, spacing 0–32, modular type scale. Imutável a tema.
2. **Semantic** — intent (theme-aware). `color.brand.primary`, `color.surface.base`, `color.text.primary`. Resolve diferente em light/dark. **Componentes consomem essa camada.**
3. **Component** — scoped quando precisa override pontual. `button.primary.bg`, `card.padding`, `dialog.shadow`.

**Regra de ouro:** componentes nunca consomem core direto — sempre semantic ou component.

## Alternativas consideradas

| Modelo                         | Pros                                                                  | Contras                                               |
| ------------------------------ | --------------------------------------------------------------------- | ----------------------------------------------------- |
| Flat (Bootstrap-style)         | Simples                                                               | Sem indireção pra theming, refactor difícil           |
| 2-tier (core + semantic)       | Mais simples que 3-tier                                               | Casos especiais por componente sujam o semantic layer |
| **3-tier (Carbon, Polaris)** ✓ | Separação clara, theming flexível, override por componente sem poluir | Mais arquivos, curva de aprendizado                   |

## Consequências

**Positivas:**

- Theming light/dark trivial — só a camada semantic muda, core fixo
- Sub-marcas via overlay são clean — só identity.json + overrides.json
- Mudanças no palette propagam automaticamente

**Negativas:**

- 3 lookups pra rastrear um valor final ("button uses card.padding which uses size.5")
- Consumidores podem se perder

## Implementação

- `packages/tokens/src/{core,semantic,component}/*.json` em formato W3C DTF
- Style Dictionary 4 compila pra CSS, JS, JSON, Java
- Tests garantem que component tokens só referenciam semantic, nunca core

## Referências

- [W3C Design Tokens Format](https://design-tokens.github.io/community-group/format/)
- [IBM Carbon tokens](https://carbondesignsystem.com/elements/color/tokens/)
- [Shopify Polaris tokens](https://polaris.shopify.com/tokens)
