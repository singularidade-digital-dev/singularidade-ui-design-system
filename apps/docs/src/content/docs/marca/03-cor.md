---
title: 3 · Cor
description: Paleta brand, semantic tokens, escalas, gradient, contraste WCAG
sidebar: { order: 3 }
---

## Brand canônica

<div style="display:flex;gap:16px;margin:16px 0;">
  <div style="flex:1;height:80px;background:#E91E8B;border-radius:8px;display:flex;align-items:flex-end;padding:8px;color:white;font-family:monospace;font-size:11px;">magenta · #E91E8B</div>
  <div style="flex:1;height:80px;background:#E8606A;border-radius:8px;display:flex;align-items:flex-end;padding:8px;color:white;font-family:monospace;font-size:11px;">coral · #E8606A</div>
  <div style="flex:1;height:80px;background:#F5A623;border-radius:8px;display:flex;align-items:flex-end;padding:8px;color:white;font-family:monospace;font-size:11px;">orange · #F5A623</div>
</div>

Gradient brand canônico: `linear-gradient(160deg, #E91E8B 0%, #E8606A 50%, #F5A623 100%)`.

## Estratégia híbrida

A paleta vibrante (magenta puro + gradient) é **reservada para surfaces brand**: login, hero, splash, marketing. No chrome de UI repetida (botões em formulários, listas, dialogs), usamos **coral.600 `#BE3550`** mais sóbrio (light mode) ou **coral.400 `#FB7185`** brilhante (dark mode) pra evitar fadiga visual.

| Token semântico                | Light               | Dark                 |
| ------------------------------ | ------------------- | -------------------- |
| `--color-brand-primary`        | `#E91E8B` magenta   | `#E91E8B` (não muda) |
| `--color-interactive-primary`  | `#BE3550` coral.600 | `#FB7185` coral.400  |
| `--color-feedback-error-solid` | `#DC2626` red puro  | `#F87171` red.400    |

A `--color-feedback-error-solid` usa **vermelho puro** (não coral) pra distinguir claramente do primary.

## Escalas completas

Cada cor brand tem 11 paradas (`50` → `950`). Acesse via `var(--color-brand-magenta-500)` etc. Demonstradas em [Foundations / Color](/foundations/tokens/) ou explore o Storybook.

## Universal feedback

Success (emerald), warning (amber), info (blue) NÃO derivam da brand — são universais, conforme convenção da indústria. Acessibilidade > consistência visual.

## Contraste WCAG

Combinações testadas em AA (4.5:1 texto normal, 3:1 large):

| Texto                    | Fundo                                | Contraste    |
| ------------------------ | ------------------------------------ | ------------ |
| `text.primary` `#261A21` | `surface.base` light `#FDFAFC`       | 14.7:1 ✓ AAA |
| `text.inverse` white     | `interactive.primary` `#BE3550`      | 5.5:1 ✓ AA   |
| `text.primary` `#FDFAFC` | `surface.base` dark `#1A1517`        | 14.5:1 ✓ AAA |
| `text.inverse` `#1A111A` | `interactive.primary` dark `#FB7185` | 5.0:1 ✓ AA   |
