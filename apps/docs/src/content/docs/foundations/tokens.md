---
title: Tokens
description: Modelo W3C DTF em 3 camadas
sidebar: { order: 1 }
---

Tokens são a **fonte única da verdade** do design system. Mudanças visuais nascem aqui e propagam pra todo lugar via build.

## Modelo 3-tier

1. **Core (primitives)** — valores crus. `color.brand.coral.500`, `size.4`, `font.size.m`. Imutável a tema.
2. **Semantic** — intent, theme-aware. `color.brand.primary`, `color.text.primary`. Componentes consomem essa camada.
3. **Component** — scoped a um componente quando precisa override. `button.primary.bg`, `card.padding`.

Veja [ADR-002](/devs/arquitetura/) pra rationale.

## Formato W3C DTF

```jsonc
{
  "color": {
    "brand": {
      "magenta": {
        "500": {
          "$value": "#E91E8B",
          "$type": "color",
          "$description": "Brand primary — Singularidade magenta (oficial)",
        },
      },
    },
  },
}
```

Compatível com Style Dictionary, Tokens Studio (Figma plugin), Penpot.

## Outputs

Style Dictionary 4 compila os tokens em **4 formatos**:

| Output        | Path                                               | Uso                         |
| ------------- | -------------------------------------------------- | --------------------------- |
| **CSS**       | `@singularidade/tokens/css/{brand}.{theme}.css`    | Web frontend, Vaadin themes |
| **JS module** | `@singularidade/tokens` (root export)              | TypeScript apps             |
| **JSON flat** | `@singularidade/tokens/json/tokens.json`           | Tooling, Figma sync         |
| **Java**      | `digital.singularidade.tokens.SingularidadeTokens` | Vaadin Flow runtime         |

## Multi-brand × multi-theme

4 combinações geradas:

- `singularidade.light.css` (default)
- `singularidade.dark.css`
- `integras.light.css`
- `integras.dark.css`

Aplicação via data attributes:

```text
<html data-brand="singularidade" data-theme="light">
```

## Catálogo

[Storybook → Foundations / Color](http://localhost:6006/?path=/story/foundations-color--brand) tem o catálogo visual completo.
