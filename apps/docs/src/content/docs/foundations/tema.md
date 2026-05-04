---
title: Tema light & dark
description: Como o sistema light/dark funciona
sidebar: { order: 2 }
---

## Mecanismo

Light/dark switch via attribute `data-theme` no `<html>`:

```text
<html data-brand="singularidade" data-theme="light">
<html data-brand="singularidade" data-theme="dark">
```

Cada CSS file (`singularidade.light.css`, `singularidade.dark.css`) declara as variáveis sob seletor combinado:

```css
[data-brand='singularidade'][data-theme='light'] {
  --color-surface-base: #fdfafc;
  --color-text-primary: #261a21;
  ...
}
```

Importar **ambos** os CSS no app — o seletor garante que só o ativo aplica.

## Hybrid color recap

A camada semantic preserva `--color-brand-primary` magenta puro em **ambos** os modos (não muda entre light/dark — é a marca). O que muda é `--color-interactive-primary`:

| Mode  | `interactive.primary` | Reasoning                         |
| ----- | --------------------- | --------------------------------- |
| Light | `coral.600 #BE3550`   | Sóbrio em CTA repetido            |
| Dark  | `coral.400 #FB7185`   | Brilhante pra atingir AA contrast |

Veja [ADR-004](/devs/arquitetura/) pra rationale.

## Detecção automática

```js
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';
```

Toggle persistente pode salvar em `localStorage` e sincronizar com `prefers-color-scheme`.
