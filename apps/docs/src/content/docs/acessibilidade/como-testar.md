---
title: Como testar
description: Os testes automáticos do design system e o roteiro de cada tela antes do merge
sidebar: { order: 3 }
---

## Testes automáticos

No CI do design system:

- **Contraste**: `packages/tokens/tests/contrast.test.ts` confere os 240 pares da especificação do DS v2, 120 por tema, sobre o `theme.css` gerado. Tons translúcidos entram compostos sobre a superfície.
- **Paridade com a v2**: `packages/tokens/tests/v2-parity.test.ts` confere cada token, nos dois temas, no `theme.css`, nos quatro CSS dos sites, no `text-styles.css` e nas constantes Java de e-mail.
- **Rampas em ordem**: `packages/tokens/tests/ramps.test.ts` confere a ordem de luminância das rampas de cor.

Nos temas dos apps, um teste barra cor solta, token indefinido ou deprecado e selo abaixo de 4,5:1.

O addon-a11y (axe-core) do Storybook mostra as violações no painel de cada story. Não roda no CI.

## Cada tela, antes do merge

1. Script de contraste no CI, com todos os pares dos tokens nos dois temas.
2. axe na documentação e, via Playwright, nas telas do Hub e dos sites: zero violação séria.
3. Navegar só pelo teclado.
4. Leitor de tela: NVDA com Firefox e VoiceOver com Safari, no login, no cadastro, na vitrine, na assinatura e no cancelamento.
5. Zoom de 200% e largura de 320px.
6. Tema escuro e movimento reduzido ligados.

## Cada componente

- [ ] Tem rótulo ou `aria-label`?
- [ ] Atinge 4,5:1 em todos os estados (padrão, hover, pressionado, foco, desabilitado), nos dois temas?
- [ ] É operável pelo teclado (Tab e Shift+Tab)?
- [ ] O foco está visível?
- [ ] Funciona no tema escuro?
- [ ] Respeita `prefers-reduced-motion`?
