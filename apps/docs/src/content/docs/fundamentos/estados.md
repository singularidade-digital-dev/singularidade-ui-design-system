---
title: Estados
description: Todos os estados desenhados e os tempos de resposta, para a pessoa nunca ver tela branca
sidebar: { order: 6 }
---

## Desenhe todos

Padrão, hover, foco, pressionado, desabilitado (sempre com o motivo à vista), erro, carregando e vazio. Cada componente mostra os seus estados na prévia, no claro e no escuro.

- Desabilitado só quando a ação é impossível, com o motivo à vista ("Reenviar em 0:45"). Nunca desabilite o envio para forçar o preenchimento: valide no envio.
- Erro junto do campo, com texto e ícone, sem apagar o que foi digitado.
- Vazio que ensina: o que aparece ali, como chega e quem pode agir. Veja [EmptyState](/componentes/empty-state/).

## Tempo de resposta

- Responda a toda ação em até 100ms: estado pressionado ou spinner no controle.
- Mostre esqueleto a partir de 300ms. Veja [Skeleton](/componentes/skeleton/).
- Acima de 10s, progresso com texto e uma saída.
- Nunca tela branca: o shell (cor de fundo e símbolo em `icon-2xl`) chega antes do JS.

O padrão completo de carregamento está em [Padrões](/paginas-modelo/padroes/#7-carregamento-doherty).
