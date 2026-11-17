---
title: Heurísticas de Nielsen
description: As dez heurísticas de usabilidade de Nielsen, escritas como regra de tela
sidebar: { order: 2 }
---

As dez heurísticas de Nielsen, cada uma com o que ela pede em tela.

## 1. Visibilidade do estado do sistema

- Toda ação responde em até 100ms: estado pressionado ou spinner no botão.
- Status sempre com uma palavra ([Badge](/componentes/badge/)); uso sempre com número ([Meter](/componentes/meter/): "Hoje: 12 de 50 consultas").
- O item atual do menu tem `aria-current` e fundo `color-interactive-primary-subtle`.
- Título da aba do navegador: "Página · Integras Hub".

## 2. Correspondência com o mundo real

- Vocabulário de quem usa: conector, consulta, assinatura, endereço do conector.
- No Hub nunca aparecem "MCP", "endpoint", "tenant" nem "role".
- Datas e moeda no formato local: 12/12/2026, R$ 19,90.

## 3. Controle e liberdade

- "Desfazer" em toda ação reversível (lixeira).
- Esc fecha diálogo; "Voltar" guarda o que foi digitado.
- Cancelar a assinatura leva o mesmo número de passos que assinar.
- O tour sempre pode ser pulado.

## 4. Consistência e padrões

- Um componente por função: um Button, um Badge, um EmptyState.
- A mesma cor de ação no site, no app e no e-mail.
- Os mesmos termos nas três línguas e nos três canais.

## 5. Prevenção de erros

- `type`, `inputmode` e `autocomplete` corretos em cada campo; máscaras que aceitam colar.
- Opção impossível fica desabilitada e mostra o motivo.
- A consequência (datas, reembolso) aparece escrita antes de confirmar.

## 6. Reconhecer em vez de lembrar

- Rótulo sempre visível; placeholder só como exemplo.
- Filtros ativos aparecem como chips.
- Endereço do conector visível, com botão Copiar.
- Uso e plano mostrados no contexto onde importam.

## 7. Eficiência

- Busca quando a lista passa de 8 itens.
- Ações em lote nas tabelas do admin.
- Filtros lembrados por pessoa; link direto para cada aba de configuração.

## 8. Estética minimalista

- No máximo dois níveis de ênfase por card.
- Zero decoração: sem degradê, brilho, blur ou grade de fundo.

## 9. Diagnóstico e recuperação de erros

- Dizer o que aconteceu e como resolver, junto do campo e em linguagem simples.
- Nunca mostrar exceção na tela ("Erro ao salvar: {0}" sai).
- O que foi digitado continua no campo.

## 10. Ajuda e documentação

- Link "Como funciona" no contexto; estados vazios que ensinam.
- Ajuda sempre no mesmo lugar: o botão "Ver o tour desta página" no fim do [PageHeader](/componentes/page-header/) e o contato de ajuda no rodapé (WCAG 3.2.6).
- Tour opcional.
