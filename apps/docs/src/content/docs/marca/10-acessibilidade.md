---
title: 10 · Acessibilidade
description: WCAG 2.2 AA mínimo, AAA quando viável
sidebar: { order: 10 }
---

## Padrão

**WCAG 2.2 nível AA** mínimo. **AAA** quando viável (texto principal sobre surface).

## Princípios

1. **Contraste 4,5:1** texto normal, **3:1** texto large (≥18pt) e borda de controle, foco e ícone, nos dois temas. Texto de erro usa `--color-feedback-error-text` (`#B91C1C` no light: 6,24:1 sobre `--color-surface-base`); o `-solid` (`#DC2626`, 4,66:1 no mesmo fundo) fica para ícone e preenchimento. Campo, checkbox, rádio e botão secundário têm borda em `--color-border-control`: 3,52 a 3,97:1 sobre as superfícies do light e 4,23 a 4,65:1 sobre as do dark.
2. **Focus ring 2px** sempre visível em elementos interativos. Cor: `--color-border-focus` (coral.600 no light, coral.400 no dark): 5,31:1 sobre `--color-surface-base` no light (#BE3550 / #FDFAFC) e 6,71:1 no dark (#FB7185 / #1A1517). No Vaadin, o tema `singularidade-base` liga o anel do Vaadin 25 (`--vaadin-focus-ring-*`) a esse token.
3. **Alvo de toque** — nunca menor que `--target-min` (24px); `--target-touch` (44px) para botões e área tappable em mobile.
4. **Cor nunca sozinha** — sempre acompanha texto, ícone ou padrão pra diferenciar status.
5. **Lang attribute** — `<html lang="pt-BR">` ou idioma do conteúdo.
6. **Prefers-reduced-motion** — animações desabilitadas. Veja [Motion](/marca/06-motion/).
7. **Skip link** — primeiro foco no body é "Pular para conteúdo".

## Auditoria automática

- **Contraste no CI:** `packages/tokens/tests/contrast.test.ts` confere os 240 pares da especificação do DS v2, 120 por tema, sobre o `theme.css` gerado. Tons translúcidos entram compostos sobre a superfície.
- **Rampas em ordem:** `packages/tokens/tests/ramps.test.ts` confere a ordem de luminância das rampas de cor.
- **axe-core no Storybook:** o addon-a11y mostra as violações no painel de cada story. Não roda no CI.

## Checklist por componente

- [ ] Tem label/aria-label?
- [ ] Atinge 4,5:1 em todos os estados (default/hover/active/focus/disabled), nos dois temas?
- [ ] É operável por teclado (Tab/Shift+Tab)?
- [ ] Focus visível?
- [ ] Funciona em modo dark?
- [ ] Respeita `prefers-reduced-motion`?
