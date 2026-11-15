---
title: 3 · Cor
description: Paleta brand, semantic tokens, escalas, gradient, contraste WCAG
sidebar: { order: 3 }
---

## Cores da marca

**Integras**, a marca padrão (`color-brand-integras-*`):

<div class="ds-palette">
  <div style="background:#E91E8B">magenta · #E91E8B</div>
  <div style="background:#E8606A">coral · #E8606A</div>
  <div style="background:#F5A623">orange · #F5A623</div>
</div>

**Singularidade**, a paleta original (`color-brand-singularidade-*`), ativa com `data-brand="singularidade"`:

<div class="ds-palette">
  <div style="background:#ED1E79">magenta · #ED1E79</div>
  <div style="background:#F15052">coral · #F15052</div>
  <div style="background:#F7931E">orange · #F7931E</div>
</div>

`--color-brand-primary`, `-secondary` e `-tertiary` apontam para a paleta da marca ativa. São cores de marca, não de interface: sobre branco, o magenta, o coral e o laranja do Integras dão 4,18:1, 3,33:1 e 2,03:1.

Na v2, degradê não é token: fica só dentro do símbolo, na vertical (180°). `--color-brand-gradient` (o degradê de 160° da v1) continua como alias deprecado até a 1.2.

## Estratégia híbrida

A paleta vibrante é **reservada para surfaces brand**: logo, login, hero, splash, marketing. No chrome de UI repetida (botões em formulários, listas, dialogs), usamos **coral.600 `#BE3550`** mais sóbrio (light mode) ou **coral.400 `#FB7185`** brilhante (dark mode) pra evitar fadiga visual.

| Token semântico                | Light                                            | Dark                |
| ------------------------------ | ------------------------------------------------ | ------------------- |
| `--color-brand-primary`        | `#E91E8B` (Integras) · `#ED1E79` (Singularidade) | igual ao light      |
| `--color-interactive-primary`  | `#BE3550` coral.600                              | `#FB7185` coral.400 |
| `--color-on-primary`           | `#FFFFFF`                                        | `#1A111A`           |
| `--color-feedback-error-solid` | `#DC2626` red puro                               | `#F87171` red.400   |
| `--color-feedback-error-text`  | `#B91C1C` red.700                                | `#F87171` red.400   |

A `--color-feedback-error-solid` usa **vermelho puro** (não coral) pra distinguir claramente do primary. Fica para ícone, preenchimento e borda de campo inválido; texto de erro usa `--color-feedback-error-text`.

## Escalas completas

Cada cor brand tem 11 paradas (`50` → `950`). Acesse via `var(--color-brand-magenta-500)` etc. A rampa neutra (`--color-neutral-*`) vai de `0` a `1000` e ganhou o `450` (`#8C7B86`), base da `--color-border-control`. Todas estão no `theme.css` gerado (veja [Tokens](/foundations/tokens/)); o Storybook (Foundations / Color) ainda usa só os nomes da v1.

## Universal feedback

Success (emerald), warning (amber), info (blue) NÃO derivam da brand — são universais, conforme convenção da indústria. Acessibilidade > consistência visual.

## Contraste WCAG

AA pede 4,5:1 para texto normal e 3:1 para texto large e para borda de controle, foco e ícone. Os valores abaixo são calculados sobre o `theme.css` gerado; o CI confere os 240 pares da especificação, 120 por tema (`packages/tokens/tests/contrast.test.ts`).

| Par                                                  | Light                       | Dark                        |
| ---------------------------------------------------- | --------------------------- | --------------------------- |
| `text-primary` sobre `surface-base`                  | 16,18:1 (#261A21 / #FDFAFC) | 17,41:1 (#FDFAFC / #1A1517) |
| `text-muted` sobre `surface-raised`                  | 5,87:1 (#735F6B / #FFFFFF)  | 6,04:1 (#A697A1 / #261A21)  |
| `link` sobre `surface-base`                          | 5,31:1 (#BE3550 / #FDFAFC)  | 6,71:1 (#FB7185 / #1A1517)  |
| `on-primary` sobre `interactive-primary`             | 5,51:1 (#FFFFFF / #BE3550)  | 6,85:1 (#1A111A / #FB7185)  |
| `on-primary` sobre `interactive-primary-active`      | 10,55:1 (#FFFFFF / #791832) | 5,54:1 (#1A111A / #E8606A)  |
| `feedback-error-text` sobre `surface-base`           | 6,24:1 (#B91C1C / #FDFAFC)  | 6,52:1 (#F87171 / #1A1517)  |
| `border-control` sobre `surface-raised` (mínimo 3:1) | 3,97:1 (#8C7B86 / #FFFFFF)  | 4,23:1 (#8C7B86 / #261A21)  |
| `border-focus` sobre `surface-raised` (mínimo 3:1)   | 5,51:1 (#BE3550 / #FFFFFF)  | 6,23:1 (#FB7185 / #261A21)  |

Os nomes da tabela são os tokens `--color-*`. Texto de status nunca vai direto sobre `--color-surface-sunken`: `--color-feedback-warning-text` dá 4,46:1 ali no light (#B45309 / #F5F0F4).
