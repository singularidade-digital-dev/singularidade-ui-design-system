---
title: 10 · Acessibilidade
description: WCAG 2.2 AA mínimo, AAA quando viável
sidebar: { order: 10 }
---

## Padrão

**WCAG 2.2 nível AA** mínimo. **AAA** quando viável (texto principal sobre surface).

## Princípios

1. **Contraste 4.5:1** texto normal, **3:1** texto large (≥18pt). Tokens `feedback.error.solid` em red puro `#DC2626` foram escolhidos pra atingir AA mesmo sobre coral primary.
2. **Focus ring 2px** sempre visível em elementos interativos. Cor: `--color-border-focus` (coral).
3. **Touch ≥44px** — botões e área tappable em mobile.
4. **Cor nunca sozinha** — sempre acompanha texto, ícone ou padrão pra diferenciar status.
5. **Lang attribute** — `<html lang="pt-BR">` ou idioma do conteúdo.
6. **Prefers-reduced-motion** — animações desabilitadas. Veja [Motion](/marca/06-motion/).
7. **Skip link** — primeiro foco no body é "Pular para conteúdo".

## Auditoria automática

- **axe-core** roda em todas as stories do Storybook (addon-a11y bloqueante em CI).
- **Storybook test-runner** + Playwright valida fluxos completos (Fase 7).

## Checklist por componente

- [ ] Tem label/aria-label?
- [ ] Atinge 4.5:1 em todos os estados (default/hover/active/focus/disabled)?
- [ ] É operável por teclado (Tab/Shift+Tab)?
- [ ] Focus visível?
- [ ] Funciona em modo dark?
- [ ] Respeita `prefers-reduced-motion`?
