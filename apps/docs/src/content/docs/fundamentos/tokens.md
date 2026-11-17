---
title: Tokens
description: O modelo W3C DTF em três camadas, as saídas do Style Dictionary e as regras de leitura
sidebar: { order: 10 }
---

Tokens são a **fonte única da verdade** do design system. Mudanças visuais nascem aqui e chegam a todo lugar pelo build. Desde a 1.0.0, as fontes são o port do Design System v2 aprovado; a cópia fiel do `tokens.json` da v2 fica em `packages/tokens/reference/ds-v2.tokens.json`, e os testes comparam o build com ela. Todos os valores estão no [catálogo de tokens](/fundamentos/catalogo/).

## Como ler

- Componentes leem só tokens semânticos (`color-surface-*`, `color-text-*`, `color-interactive-*`, `color-border-*`, `color-feedback-*`, `color-link`, `color-on-*`) e os aliases de componente (`button-*`, `card-*`, `input-*`, `dialog-*`).
- As rampas são o núcleo: nenhum componente as lê direto. As exceções são a escala do mapa de calor, em [Gráficos](/fundamentos/graficos/), e a laje e a tira das [Faixas](/componentes/faixas/).
- Nenhum hex, px ou cor solta fora dos tokens. A única exceção é o botão "Continuar com Google".

## Modelo em três camadas

1. **Core (primitivos)**: valores crus. `color.brand.coral.500`, `size.4`, `font.size.m`. Não mudam com o tema.
2. **Semântica**: a intenção, que muda com o tema. `color.brand.primary`, `color.text.primary`, `color.border.control`. É a camada que os componentes leem.
3. **Componente**: o alias de um componente, quando ele precisa de um valor próprio. `button.primary.background`, `card.padding`.

Arquivos `*.light.json` e `*.dark.json` guardam só o que muda com o tema. Veja o [ADR-002](/devs/arquitetura/).

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

Compatível com Style Dictionary, Tokens Studio (plugin do Figma) e Penpot.

## Saídas

O Style Dictionary 4 compila os tokens para CSS, JS, JSON e Java:

| Saída          | Caminho                                                       | Uso                                                    |
| -------------- | ------------------------------------------------------------- | ------------------------------------------------------ |
| **CSS**        | `@singularidade/tokens/css/theme.css`                         | Qualquer página e o tema Vaadin: claro, escuro e marca |
| **CSS**        | `@singularidade/tokens/css/{brand}.{theme}.css`               | Sites (`data-brand` + `data-theme`)                    |
| **CSS**        | `@singularidade/tokens/css/text-styles.css`                   | Os 19 estilos de texto como classes                    |
| **Módulo JS**  | `@singularidade/tokens` (export raiz)                         | Apps em TypeScript                                     |
| **JSON plano** | `@singularidade/tokens/json/tokens.json`                      | Ferramentas, sincronia com o Figma                     |
| **Java**       | `digital.singularidade.tokens.SingularidadeTokens`            | Runtime do Vaadin Flow                                 |
| **Java**       | `digital.singularidade.tokens.email.EmailTokens{Marca}{Tema}` | E-mails (Thymeleaf), por marca e tema                  |

A saída canônica (JS, JSON e `SingularidadeTokens`) e o `:root` do `theme.css` seguem o Integras, no tema claro. No CSS os tamanhos de fonte saem em rem; JS, JSON e Java ficam em px.

## Além da cor

- Espaço: `--size-0` a `--size-32`, em grade de 4px.
- Raio: `--radius-*`. Sombra: `--shadow-xs` a `--shadow-2xl`, com um valor por tema. Foco: `--focus-ring`.
- Movimento: `--duration-*` e `--easing-*`.
- Layout: `--bp-*`, `--container-*`, `--header-height-*`, `--sidenav-width` e `--dialog-width-*`.
- Tamanhos: `--control-*` (altura de controle), `--target-*` (alvo de toque) e `--icon-*`.
- Camadas: `--z-*`.

## Marcas e temas

Duas formas, para usos diferentes:

- **`theme.css`**: um arquivo com os dois temas e as duas marcas. Claro no `:root`, escuro em `[theme~='dark']` e `[data-theme='dark']`. O Integras é o padrão; `data-brand="singularidade"` troca só as três cores da marca. É o que o tema Vaadin carrega.
- **`{marca}.{tema}.css`**: quatro arquivos para os sites, `integras.light.css`, `integras.dark.css`, `singularidade.light.css` e `singularidade.dark.css`. Cada um só ativa com os dois atributos:

```text
<html data-brand="integras" data-theme="light">
```

Veja [Tema claro e escuro](/fundamentos/tema/) e [Multi-marca](/fundamentos/multi-marca/).

## Nomes deprecados

Os nomes da v1 que a v2 não tem continuam como aliases deprecados até a 1.2: `/* deprecated */` no CSS e `@Deprecated` no Java. A lista, com o substituto de cada um, está na [v1.0.0](/releases/v1-0-0/).

## Catálogo

O [catálogo de tokens](/fundamentos/catalogo/) mostra cada token da v2 com o valor nos dois temas e o uso. O Storybook (Foundations / Color) ainda usa só os nomes da v1: não mostra `color-border-control`, `color-on-primary`, `color-link`, `color-feedback-*-text` nem as paletas por marca. Veja em [Componentes](/componentes/) como abrir o Storybook.
