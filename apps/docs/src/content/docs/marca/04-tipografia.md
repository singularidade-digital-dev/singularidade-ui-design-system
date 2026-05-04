---
title: 4 · Tipografia
description: Plus Jakarta Sans + JetBrains Mono, escala, hierarquia
sidebar: { order: 4 }
---

## Famílias

| Família  | Uso                              | Fonte                      |
| -------- | -------------------------------- | -------------------------- |
| **Sans** | Display + body                   | Plus Jakarta Sans Variable |
| **Mono** | Código, números financeiros, IDs | JetBrains Mono Variable    |

Ambas self-hosted (LGPD-friendly, sem chamadas a Google Fonts) via WOFF2 com subsets latin + latin-ext (cobre PT-BR/EN/ES).

```css
@import '@singularidade/brand-assets/fonts/plus-jakarta-sans.css';
@import '@singularidade/brand-assets/fonts/jetbrains-mono.css';
```

## Escala (modular 1.125)

| Token           | Tamanho | Uso                        |
| --------------- | ------- | -------------------------- |
| `font.size.xs`  | 11px    | Labels uppercase, captions |
| `font.size.s`   | 13px    | Body secundário            |
| `font.size.m`   | 14px    | **Body default**           |
| `font.size.l`   | 16px    | Body grande                |
| `font.size.xl`  | 18px    | H4, section headings       |
| `font.size.2xl` | 22px    | H3, page titles            |
| `font.size.3xl` | 28px    | H2                         |
| `font.size.5xl` | 40px    | H1, hero                   |
| `font.size.7xl` | 56px    | Display                    |

## Pesos

400 (regular) · 500 (medium) · 600 (semibold) · 700 (bold)

## Hierarquia

- **Display**: Plus Jakarta Bold, font-size.5xl, line-height 1.1, letter-spacing -0.03em
- **Heading**: Plus Jakarta Bold, font-size.3xl, line-height 1.25, letter-spacing -0.02em
- **Body**: Plus Jakarta Regular, font-size.m, line-height 1.5
- **Label**: Plus Jakarta Semibold, font-size.xs, uppercase, letter-spacing 0.06em
- **Code**: JetBrains Mono Regular, font-size.s
