---
title: Meta e base legal
description: WCAG 2.2 AA em apps, sites e e-mails, a LBI na prática e o consentimento como acessibilidade cognitiva
sidebar: { order: 1 }
---

## Meta

**WCAG 2.2 nível AA** em apps, sites e e-mails, verificada tela a tela. AAA quando viável, como no texto principal sobre a superfície.

## Base legal

**LBI (Lei 13.146/2015), art. 63**

- A acessibilidade é obrigatória nos sites de empresas com sede no país, "conforme as melhores práticas e diretrizes de acessibilidade adotadas internacionalmente". Na prática, isso é a WCAG.
- O §1º manda: "os sítios devem conter símbolo de acessibilidade em destaque".

**Referência técnica nacional**: a ABNT NBR 17225, de 2025, segue a WCAG. Confira os requisitos a mais que ela traz.

## A LBI na prática

**Símbolo**

- O ícone `accessibility` do Lucide com o texto "Acessibilidade".
- Fica no rodapé dos dois sites, do login e das telas do Hub.

**Declaração de acessibilidade** (em pt, en e es)

- A meta: WCAG 2.2 AA.
- A data da última revisão.
- As limitações conhecidas.
- Um canal para relatar barreiras e o prazo de resposta.

## Princípios

1. **Contraste**: 4,5:1 para texto normal e 3:1 para texto grande (24px ou mais, ou 19px em bold) e para borda de controle, foco e ícone, nos dois temas. Veja [Cor](/fundamentos/cor/#contraste).
2. **Foco sempre visível**: outline de 2px em `color-border-focus`. Veja [Raio, sombra e foco](/fundamentos/raio-sombra-e-foco/#foco).
3. **Alvo de toque**: nunca menor que `target-min` (24px); `target-touch` (44px) no modo confortável.
4. **Cor nunca sozinha**: status sempre com palavra e ícone; link no meio do texto sublinhado.
5. **Idioma**: `<html lang="pt-BR">`, ou o idioma do conteúdo.
6. **Movimento reduzido**: com `prefers-reduced-motion`, nada se move. Veja [Movimento](/fundamentos/movimento/).
7. **Pular para o conteúdo**: o primeiro foco da página, nos sites e nos apps.

O detalhe, critério a critério, está em [Critérios](/acessibilidade/criterios/).

## Consentimento também é acessibilidade cognitiva

LGPD e WCAG pedem a mesma coisa:

- Linguagem simples e finalidade dita.
- Opção desmarcada por padrão.
- Revogar no mesmo lugar e com o mesmo esforço de dar.

Veja [Ética](/principios/etica/).
