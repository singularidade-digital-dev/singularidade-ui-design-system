# ADR-004: Hybrid color strategy

- **Status:** accepted
- **Date:** 2026-05-03
- **Deciders:** singularidade.digital

## Contexto

Brand magenta puro `#E91E8B` é vibrante. Aplicado em **todo CTA** (botões repetidos em formulários, listas, dialogs) gera fadiga visual e disputa atenção com conteúdo. Como manter brand presente sem cansar?

## Decisão

**Estratégia híbrida**:

- **Surfaces brand** (login, hero, splash, marketing, gradient): brand magenta puro `#E91E8B` — máximo impacto, baixa frequência.
- **UI chrome repetido** (botões em formulários, dialogs, listas): **`coral.600 #BE3550`** mais sóbrio em light mode, **`coral.400 #FB7185`** brilhante em dark mode (pra atingir AA contrast).
- **Status colors** (success, error, warning, info): universais — não derivam da brand. Acessibilidade > consistência visual.
- **Error solid**: `#DC2626` red puro, distinto do coral primary, evita ambiguidade.

## Alternativas consideradas

| Estratégia                     | Pros                                                             | Contras                                             |
| ------------------------------ | ---------------------------------------------------------------- | --------------------------------------------------- |
| **Hybrid** ✓ (Stripe pattern)  | Brand presente sem fadiga, AA garantido, hierarquia visual clara | Mais decisões — designers precisam saber qual layer |
| Brand pure em tudo             | Maximum brand visibility                                         | Fadiga, hierarquia visual perde força               |
| Chrome 100% neutro (bg+border) | Mínima fadiga                                                    | Brand "esquecida" no produto, vira commodity        |
| Tailwind/Material default      | Fácil                                                            | Sem identidade própria                              |

## Consequências

**Positivas:**

- CTA primário `coral.600` ainda destaca-se claramente no chrome
- Surfaces brand (login, hero) mantêm impacto vibrante
- AA contrast em todos os estados, light + dark
- Designer tem framework claro: "É surface brand? → magenta puro. É CTA UI? → coral.600/coral.400"

**Negativas:**

- 2 valores de "primary" pra lembrar (`brand.primary` vs `interactive.primary`)
- Pode soar inconsistente pra quem espera 1 cor primary única

## Implementação

```jsonc
// semantic/color.light.json
{
  "color": {
    "brand": {
      "primary": { "$value": "{color.brand.magenta.500}" }, // #E91E8B
    },
    "interactive": {
      "primary": { "$value": "{color.brand.coral.600}" }, // #BE3550
    },
  },
}
```

Componentes Vaadin no chrome usam `var(--color-interactive-primary)`. Hero/login usa `var(--color-brand-primary)` ou `var(--color-brand-gradient)`.

## Referências

- Stripe brand site (purple vibrante) vs Stripe app dashboard (purple sóbrio)
- [Marca / Cor](/marca/03-cor/)
- [Storybook Foundations / Color](http://localhost:6006/?path=/story/foundations-color--brand)
