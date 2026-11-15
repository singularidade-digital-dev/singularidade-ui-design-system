---
title: Tokens
description: Modelo W3C DTF em 3 camadas
sidebar: { order: 1 }
---

Tokens são a **fonte única da verdade** do design system. Mudanças visuais nascem aqui e propagam pra todo lugar via build. Desde a 1.0.0, as fontes são o port do Design System v2 aprovado; a cópia fiel fica em `packages/tokens/reference/ds-v2.tokens.json`, e os testes comparam o build com ela.

## Modelo 3-tier

1. **Core (primitives)** — valores crus. `color.brand.coral.500`, `size.4`, `font.size.m`. Imutável a tema.
2. **Semantic** — intent, theme-aware. `color.brand.primary`, `color.text.primary`, `color.border.control`. Componentes consomem essa camada.
3. **Component** — scoped a um componente quando precisa override. `button.primary.background`, `card.padding`.

Arquivos `*.light.json` e `*.dark.json` guardam só o que muda com o tema. Veja [ADR-002](/devs/arquitetura/) pra rationale.

## Formato W3C DTF

```jsonc
{
  "color": {
    "brand": {
      "magenta": {
        "500": {
          "$value": "#E91E8B",
          "$type": "color",
          "$description": "Magenta do símbolo do Integras (= color.brand.integras.magenta). Cor de marca, nunca de interface: 4,18:1 no branco.",
        },
      },
    },
  },
}
```

Compatível com Style Dictionary, Tokens Studio (Figma plugin), Penpot.

## Outputs

Style Dictionary 4 compila os tokens para CSS, JS, JSON e Java:

| Output        | Path                                                          | Uso                                                    |
| ------------- | ------------------------------------------------------------- | ------------------------------------------------------ |
| **CSS**       | `@singularidade/tokens/css/theme.css`                         | Qualquer página e o tema Vaadin: claro, escuro e marca |
| **CSS**       | `@singularidade/tokens/css/{brand}.{theme}.css`               | Sites (`data-brand` + `data-theme`)                    |
| **CSS**       | `@singularidade/tokens/css/text-styles.css`                   | Os 19 estilos de texto como classes                    |
| **JS module** | `@singularidade/tokens` (root export)                         | TypeScript apps                                        |
| **JSON flat** | `@singularidade/tokens/json/tokens.json`                      | Tooling, Figma sync                                    |
| **Java**      | `digital.singularidade.tokens.SingularidadeTokens`            | Vaadin Flow runtime                                    |
| **Java**      | `digital.singularidade.tokens.email.EmailTokens{Marca}{Tema}` | E-mails (Thymeleaf), por marca × tema                  |

A saída canônica (JS, JSON e `SingularidadeTokens`) e o `:root` do `theme.css` seguem o Integras, no tema claro. No CSS os tamanhos de fonte saem em rem; JS, JSON e Java ficam em px.

## Além da cor

- Espaço: `--size-0` a `--size-32`, em grade de 4px.
- Raio: `--radius-*`. Sombra: `--shadow-xs` a `--shadow-2xl`, com um valor por tema. Foco: `--focus-ring`.
- Movimento: `--duration-*` e `--easing-*`.
- Layout: `--bp-*`, `--container-*`, `--header-height-*`, `--sidenav-width` e `--dialog-width-*`.
- Tamanhos: `--control-*` (altura de controle), `--target-*` (alvo de toque) e `--icon-*`.
- Camadas: `--z-*`.

## Multi-brand × multi-theme

Duas formas, para usos diferentes:

- **`theme.css`** — um arquivo com os dois temas e as duas marcas. Claro no `:root`, escuro em `[theme~='dark']` e `[data-theme='dark']`. O Integras é o padrão; `data-brand="singularidade"` troca só as três cores da marca. É o que o tema Vaadin carrega.
- **`{marca}.{tema}.css`** — quatro arquivos para os sites: `integras.light.css`, `integras.dark.css`, `singularidade.light.css` e `singularidade.dark.css`. Cada um só ativa com os dois atributos:

```text
<html data-brand="integras" data-theme="light">
```

Veja [Tema light & dark](/foundations/tema/) e [Multi-marca](/foundations/multi-marca/).

## Nomes deprecados

Os nomes da v1 que a v2 não tem continuam como aliases deprecados até a 1.2: `/* deprecated */` no CSS e `@Deprecated` no Java. A lista, com o substituto de cada um, está na [v1.0.0](/releases/v1-0-0/).

## Catálogo

A lista completa, com o valor de cada token nos dois temas, é o `theme.css` gerado. O Storybook (Foundations / Color) ainda usa só os nomes da v1: não mostra `color-border-control`, `color-on-primary`, `color-link`, `color-feedback-*-text` nem as paletas por marca. Veja em [Componentes](/componentes/primitivos/) como abrir.
