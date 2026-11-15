---
title: Tema light & dark
description: Como o sistema light/dark funciona
sidebar: { order: 2 }
---

Há um só tema escuro, o dos tokens. O `theme.css` e os `{marca}.{tema}.css` saem das mesmas fontes, com os mesmos valores.

## Mecanismo

### `theme.css` (apps Vaadin e qualquer página)

Um arquivo com os dois temas:

| Seletor                                  | Tema                                                  |
| ---------------------------------------- | ----------------------------------------------------- |
| `:root`                                  | Claro, marca Integras                                 |
| `[theme~='dark']`, `[data-theme='dark']` | Escuro (`theme="dark"` é o atributo que o Vaadin usa) |
| `[data-theme='light']`                   | Claro numa região dentro de uma página escura         |

```css
@import '@singularidade/tokens/css/theme.css';
```

```text
<html theme="dark">
<section data-theme="light">…</section>
```

### `{marca}.{tema}.css` (sites)

Cada arquivo declara as variáveis sob o seletor combinado:

```css
[data-brand='integras'][data-theme='light'],
:root[data-brand='integras'][data-theme='light'] {
  --color-surface-base: #fdfafc;
  --color-text-primary: #261a21;
  ...
}
```

Importar **ambos** os temas da marca no site — o seletor garante que só o ativo aplica.

## Claro e escuro

| Token                       | Light   | Dark                      |
| --------------------------- | ------- | ------------------------- |
| `color-surface-base`        | #fdfafc | #1a1517                   |
| `color-surface-raised`      | #ffffff | #261a21                   |
| `color-surface-sunken`      | #f5f0f4 | #1a111a                   |
| `color-text-primary`        | #261a21 | #fdfafc                   |
| `color-text-secondary`      | #524049 | #c8bcc4                   |
| `color-text-muted`          | #735f6b | #a697a1                   |
| `color-text-disabled`       | #a697a1 | #735f6b                   |
| `color-border-default`      | #c8bcc4 | rgba(200, 188, 196, 0.15) |
| `color-border-control`      | #8c7b86 | #8c7b86                   |
| `color-interactive-primary` | #be3550 | #fb7185                   |
| `color-on-primary`          | #ffffff | #1a111a                   |

No escuro, o que está mais perto é mais claro: cards, campos e diálogos (`color-surface-raised`, #261a21) são mais claros que a base (#1a1517). As superfícies de status são translúcidas (por exemplo, `color-feedback-warning-surface` é rgba(251, 191, 36, 0.16)), e as sombras `--shadow-*` têm valores próprios.

## Hybrid color recap

A camada semantic preserva `--color-brand-primary` em **ambos** os modos (não muda entre light/dark — é a marca: #e91e8b no Integras, #ed1e79 com `data-brand="singularidade"`). O que muda é `--color-interactive-primary`:

| Mode  | `interactive.primary` | Reasoning                         |
| ----- | --------------------- | --------------------------------- |
| Light | `coral.600 #BE3550`   | Sóbrio em CTA repetido            |
| Dark  | `coral.400 #FB7185`   | Brilhante pra atingir AA contrast |

Texto e ícone sobre a cor de ação usam `--color-on-primary`, nunca branco literal: no escuro o preenchimento clareia e o texto escurece (#1a111a sobre #fb7185, 6,85:1; no claro, #ffffff sobre #be3550, 5,51:1).

Veja [ADR-004](/devs/arquitetura/) pra rationale.

## Detecção automática

Nos sites, com `data-theme`:

```js
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';
```

Toggle persistente pode salvar em `localStorage` e sincronizar com `prefers-color-scheme`. Nos apps Vaadin, o escuro é o atributo `theme="dark"`; veja [Vaadin Flow](/devs/vaadin-flow/).
