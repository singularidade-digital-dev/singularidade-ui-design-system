---
title: Tema claro e escuro
description: Como o claro e o escuro funcionam no theme.css e nos CSS dos sites, e como a pessoa escolhe o tema
sidebar: { order: 12 }
---

Há um só tema escuro, o dos tokens. O `theme.css` e os `{marca}.{tema}.css` saem das mesmas fontes, com os mesmos valores.

## Escolha do tema

- Siga o sistema operacional por padrão, ofereça Claro, Escuro e Sistema, e guarde a escolha.
- Para trocar o tema de uma região (a faixa escura do site, o e-mail sempre claro), ponha `data-theme` no elemento. O `bundle.css` redeclara `color` em todo `[data-theme]`, porque a cor herdada já vem calculada do pai.

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

Importe **os dois** temas da marca no site: o seletor garante que só o ativo vale.

## Claro e escuro

| Token                       | Claro   | Escuro                    |
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

No escuro, o que está mais perto é mais claro: cards, campos e diálogos (`color-surface-raised`, #261a21) são mais claros que a base (#1a1517). As superfícies de status são translúcidas (por exemplo, `color-feedback-warning-surface` é rgba(251, 191, 36, 0.16)), e as sombras `--shadow-*` têm valores próprios. A lista completa está no [catálogo de tokens](/fundamentos/catalogo/).

## A cor da marca não muda

A camada semântica preserva `--color-brand-primary` nos **dois** temas: é a marca, #e91e8b no Integras e #ed1e79 com `data-brand="singularidade"`. O que muda é `--color-interactive-primary`:

| Tema   | `interactive.primary` | Por quê                        |
| ------ | --------------------- | ------------------------------ |
| Claro  | `coral.600 #BE3550`   | Sóbrio numa ação que se repete |
| Escuro | `coral.400 #FB7185`   | Mais claro, para passar o AA   |

Texto e ícone sobre a cor de ação usam `--color-on-primary`, nunca branco literal: no escuro o preenchimento clareia e o texto escurece (#1a111a sobre #fb7185, 6,85:1; no claro, #ffffff sobre #be3550, 5,51:1).

Veja o [ADR-004](/devs/arquitetura/).

## Detecção automática

Nos sites, com `data-theme`:

```js
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';
```

Guarde a escolha da pessoa (Claro, Escuro ou Sistema) em `localStorage` e, em Sistema, acompanhe `prefers-color-scheme`. Nos apps Vaadin, o escuro é o atributo `theme="dark"`; veja [Vaadin Flow](/devs/vaadin-flow/).
