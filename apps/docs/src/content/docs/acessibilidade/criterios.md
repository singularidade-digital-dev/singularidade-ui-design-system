---
title: Critérios
description: O que o sistema garante em cada critério da WCAG 2.2, do texto alternativo às mensagens de status
sidebar: { order: 2 }
---

O que o sistema garante, critério a critério.

## 1.1.1 Texto alternativo

- Logo: alt com o nome da marca. Logo de conector: alt vazio quando o nome está ao lado.
- Ícone com significado: rótulo. Captura de tela: descrição.
- Logo dentro de um botão que já tem nome: alt vazio. Prévia de upload: "Logotipo atual" ou "Foto atual".

## 1.3.1 e 2.4.6 Estrutura

Um h1 por página. Landmarks header, nav, main e footer. fieldset e legend nos grupos de campos.

## 1.3.5 Propósito do campo

`autocomplete` com email, name, tel, country, postal-code, one-time-code e current-password.

## 1.4.1 Uso de cor

Link no meio do texto é sublinhado. Status tem palavra e ícone. Medidor tem o número escrito.

## 1.4.3 e 1.4.11 Contraste

- Todos os pares foram medidos nos dois temas, com os tons translúcidos compostos sobre a superfície: texto com pelo menos 4,5:1; controle, foco e ícone com pelo menos 3:1. As notas dos tokens trazem os números (veja o [catálogo de tokens](/fundamentos/catalogo/)).
- As prévias deste sistema passam numa auditoria automática de cada texto e ícone pintado, no claro e no escuro.

Pares que a v2 corrigiu:

- Borda de campo: de 1,22 a 1,83:1 para 3,52 a 4,65:1 (`color-border-control`).
- Anel de foco: de 2,23:1 (o primário a 50% do Lumo) para 5,3:1 no claro e 6,7:1 no escuro.
- Botão pressionado: de 3,33:1 para 10,55:1 (#791832).
- Hover do botão terciário: de 4,45:1 para 7,30:1 no claro; no escuro, 7,48:1 sobre a base e 6,84:1 sobre raised (texto em `color-interactive-primary-hover` sobre `color-interactive-primary-subtle`).
- Item atual do menu: de 4,36:1 para 5,01:1 no claro e 5,25:1 no escuro (`color-interactive-primary` sobre `color-interactive-primary-subtle`).
- Erro como texto: de 4,66:1 para 6,24:1. Erro sobre superfície: de 4,41:1 para 5,91:1 (`color-feedback-error-text`).
- Selos: de 3,05 a 3,46:1 (a paleta Material) para 4,84 a 8,01:1 com os tons do sistema, nos dois temas.
- Ícone branco em botão preenchido: de 1,52 a 2,93:1 para o estilo ghost. Ícone sobre base ou raised: neutro 9,14:1 ou mais, erro 6,06:1, sucesso 5,29:1, primário 5,31:1.
- Texto branco ou em degradê (1,96 a 4,18:1): proibido.
- `color-text-muted` no escuro: de 4,47:1 para 6,04:1 (#a697a1).
- Badge sobre linha selecionada no escuro: de 3,71 a 4,12:1 para os valores do badge sobre raised (base opaca no badge).

## 1.4.4, 1.4.10 e 1.4.12 Zoom, reflow e espaçamento

- Fontes em rem: o `theme.css` sai com os tamanhos de fonte em rem. Zoom de 200% sem perda.
- Largura de 320px sem rolagem lateral: a grade quebra e a tabela vira cards.
- Nada de altura fixa que corte o texto.

## 1.4.13 Tooltip

Fecha com Esc, continua visível quando o ponteiro vai até ele e abre também com o foco.

## 2.1.1 e 2.1.2 Teclado

Tudo funciona pelo teclado. O diálogo e o tour prendem o foco enquanto estão abertos, e Esc sai e devolve o foco a quem abriu.

## 2.2.1 Tempo

- Toast pausa quando recebe o ponteiro ou o foco. Mensagem de erro não some sozinha.
- O código de acesso vale 10 minutos e pode ser reenviado. A sessão avisa antes de expirar.

## 2.3 Movimento

`prefers-reduced-motion` respeitado, e nada pisca. Uma regra global faz transições e animações acabarem na hora com movimento reduzido, também nos componentes do Vaadin.

## 2.4.1 Pular para o conteúdo

- Também nos apps, não só nos sites: "Pular para o conteúdo" ("Skip to content", "Saltar al contenido") é o primeiro item da barra (`ss-skip-link`).
- Fica escondido por recorte até receber o foco, sem animação, e leva o foco à tela roteada (`tabindex="-1"`, sem anel em volta da página).
- Visual: fundo raised, texto em `color-link` sublinhado, peso 600, `shadow-md`, `radius-md`, `z-skip-link`, a 16px da borda e 8px do topo; outline de 2px no foco.

## 2.4.2 Título da página

"Página · Integras Hub".

## 2.4.3 e 2.4.7 Ordem e foco visível

Outline de 2px; a ordem do DOM é a ordem visual. No Vaadin, um anel só, o do Lumo, em `color-border-focus` (`--vaadin-focus-ring-*`); os campos mostram o anel também no clique.

## 2.4.11 Foco não encoberto

`scroll-padding-top` igual à altura do cabeçalho; o banner de cookies e os toasts não cobrem o foco.

## 2.5.3 Rótulo no nome

O nome acessível começa com o texto visível.

## 2.5.7 Arrastar

Sempre há alternativa ("Escolher arquivo", "Mover para…").

## 2.5.8 Tamanho do alvo

No mínimo 24px; 44px no modo confortável. Botão de fechar de painel com 32px, ações da grade com 32px, e as ações dos vazios e do balão do tour do Hub com 44px.

## 3.1.1 e 3.1.2 Idioma

- `lang` em pt-BR, en ou es no app, no site e no e-mail.
- "Mostrar senha", os textos do upload e os nomes dos botões saem na língua da tela, com as mesmas chaves nos 3 idiomas.
- Selos e status na língua da tela, nunca o código em inglês (veja [Badge](/componentes/badge/)).

## 3.2.6 Ajuda consistente

O botão do tour no fim do PageHeader e o contato de ajuda no rodapé, sempre no mesmo lugar.

## 3.3.1 a 3.3.3 Erros

Erro escrito junto do campo, com sugestão de correção; resumo no topo nos formulários longos.

## 3.3.4 Prevenção em ação financeira

- Resumo antes de pagar: valor, renovação e cancelamento.
- O cancelamento mostra as consequências. O direito de arrependimento de 7 dias é explicado.

## 3.3.7 Entrada redundante

O e-mail do cadastro segue para o passo do código; país e CPF vêm do perfil.

## 3.3.8 Autenticação acessível

- O código pode ser colado num campo único, com `autocomplete="one-time-code"`.
- O gerenciador de senha funciona. Sem captcha de quebra-cabeça.

## 4.1.2 Nome, papel e valor

- `aria-label` em botão só com ícone; `aria-pressed` nos chips; roles nas abas.
- `role` e `aria-valuetext` no medidor; `aria-expanded` no drawer.
- O nome sai na língua da pessoa (pt, en e es); a dica sozinha não dá nome ao botão:
  - Tema: o nome diz o que o clique faz ("Usar o tema escuro", "Usar o tema claro"), e o ícone mostra o tema atual (sol ou lua).
  - Fuso: "Mostrar horários em UTC", "Mostrar horários no fuso local" (globo ou relógio).
  - Seletor de idioma com o rótulo "Idioma", para o leitor de tela não ler só o valor ("PT-BR").
  - Botão do menu: "Menu de navegação", com a dica "Mostrar ou ocultar o menu"; a gaveta aberta por cima leva o mesmo nome.
  - Menu da conta: "Menu da conta".
  - Cada ação da grade com `aria-label` e tooltip.

## 4.1.3 Mensagens de status

Toasts e resultados assíncronos são lidos via `aria-live`; erros usam `assertive`.

## Alto contraste do Windows

Foco feito com outline. Borda transparente em vez de `border: none`. Ícones em `currentColor`.
