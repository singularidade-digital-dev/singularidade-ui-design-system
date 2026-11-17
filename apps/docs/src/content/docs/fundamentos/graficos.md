---
title: Gráficos
description: Séries, status, rótulos, mapa de calor e a configuração do ApexCharts com os tokens
sidebar: { order: 9 }
---

## Séries

- Pinte a série principal em `color-interactive-primary`. Uma série de comparação vai em `color-text-secondary`, que passa 3:1 em todas as superfícies (8,52 a 10,05:1). Mais de duas séries viram um gráfico por série ou se juntam em "Outros".
- `color-text-muted` (5,21 a 6,64:1) fica nos eixos e marcações, não numa série: ao lado do primário, as duas se confundem para quem não distingue o vermelho (ΔE 5,0 em OKLab, com protanopia simulada), e ao lado do `color-text-secondary`, até para quem enxerga todas as cores (ΔE 11,5).
- Nunca use `color-interactive-secondary-hover` (1,6 a 1,9:1 sobre as superfícies) nem as cores da marca numa série.

## Status

Use `color-feedback-*-solid` só quando o dado é status, como "Sucesso" e "Erro" das chamadas, que se separam com daltonismo simulado (ΔE 8,6 no claro, 13,2 no escuro). Status nunca vira "série 3".

## Rótulos e grade

- Ponha o rótulo direto na ponta da série, com texto em `color-text-secondary`, nunca na cor da série. A partir de duas séries, mantenha também a legenda. Primário e `color-text-secondary` ficam no limite com protanopia (ΔE 7,5 no claro), e o rótulo resolve.
- Linhas de grade em `color-border-subtle`; números com `ss-num`.
- Nunca degradê, sombra ou 3D: área com preenchimento sólido (`fill.type: 'solid'`). Um eixo y só.

## Mapa de calor

- Um matiz só, com as faixas nomeadas na legenda ("Sem uso", "Baixo", "Médio", "Alto").
- "Sem uso" em `color-interactive-secondary`; as outras três vêm da rampa coral: `color-brand-coral-400`, `-600` e `-800` no claro; `-600`, `-400` e `-200` no escuro.

## ApexCharts

Configure com os valores dos tokens, lidos com `getComputedStyle` ao carregar e ao trocar de tema:

- `colors` com as séries;
- `chart.foreColor` em `color-text-secondary`;
- `labels.style.colors` dos eixos em `color-text-muted`;
- `grid.borderColor` em `color-border-subtle`;
- `tooltip.theme` igual ao tema da página.

Sem `!important` para cobrir as cores fixas da biblioteca de gráficos.
