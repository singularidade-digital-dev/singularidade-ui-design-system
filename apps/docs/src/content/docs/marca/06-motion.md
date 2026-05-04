---
title: 6 · Motion & interaction
description: Princípios de movimento, durações, curvas
sidebar: { order: 6 }
---

## Princípios

1. **Purposeful** — movimento orienta o olho ou comunica estado, nunca decora.
2. **Fast** — duração `≤300ms` na maioria dos casos. Acima disso, usuário começa a esperar.
3. **Easing natural** — `ease-out` na entrada, `ease-in` na saída. Movimentos súbitos = ruído.
4. **Respeita prefers-reduced-motion** — animações desabilitadas via `@media (prefers-reduced-motion)`.
5. **60fps** — apenas `transform` e `opacity` em animações. Evite layout shifts.

## Durations

| Token              | Valor   | Uso                                     |
| ------------------ | ------- | --------------------------------------- |
| `duration.instant` | `0ms`   | Mudanças sem animação (toggle disabled) |
| `duration.fast`    | `100ms` | Micro-interações (hover, focus)         |
| `duration.base`    | `200ms` | **Default** (transitions, badges)       |
| `duration.slow`    | `400ms` | Mudanças de página, dialogs entrando    |

## Easing

| Token                | Curva                                                 |
| -------------------- | ----------------------------------------------------- |
| `easing.linear`      | `linear` (raríssimo)                                  |
| `easing.ease-out`    | `cubic-bezier(0.16, 1, 0.3, 1)` — entrada padrão      |
| `easing.ease-in`     | `cubic-bezier(0.4, 0, 1, 1)` — saída                  |
| `easing.ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)`                        |
| `easing.spring`      | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` — drag, pop |

## Acessibilidade

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
