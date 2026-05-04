---
title: 9 · Layout & grid
description: Breakpoints, grid 12-col, container widths, spacing rhythm
sidebar: { order: 9 }
---

## Breakpoints

| Nome    | Largura       | Uso típico                      |
| ------- | ------------- | ------------------------------- |
| Mobile  | `< 640px`     | Smartphone retrato              |
| Tablet  | `640–1024px`  | Tablet, mobile landscape        |
| Desktop | `1024–1280px` | Notebook, desktop pequeno       |
| Wide    | `> 1280px`    | Desktop grande, monitor externo |

## Container widths

- Conteúdo prosa: `max-width: 65ch` (~720px)
- Container app: `max-width: 1280px` centralizado
- Hero/marketing: full bleed com padding `24px`+

## Spacing rhythm

Escala 4px (`size.0` → `size.32`):

```
0   1   2   3   4   5   6   8   10  12  16  20  24  32
0   4   8   12  16  20  24  32  40  48  64  80  96  128  (px)
```

Múltiplos comuns:

- `size.2` (8px) — gap entre elementos relacionados
- `size.4` (16px) — gap entre items de lista, padding interno de cards
- `size.6` (24px) — section spacing, padding de dialogs
- `size.10` (40px) — section break grande

## Grid

Grid 12 colunas, gutter `size.6` (24px). Use em layouts complexos; pra listas/forms simples, prefira `flex` ou `vaadin-vertical-layout`.
