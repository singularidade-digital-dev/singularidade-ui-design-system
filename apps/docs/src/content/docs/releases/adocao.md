---
title: Adoção nos produtos
description: Onde a linguagem do Design System v2 vale, o caminho de uma mudança até os produtos e o que os pacotes ainda não trazem
sidebar: { order: 2 }
prev: { link: /releases/, label: Versões }
next: { link: /releases/v0-1-0/, label: v0.1.0 }
---

A linguagem do Design System v2 vale para todas as interfaces da Singularidade Digital: o Integras Hub, o portal das empresas, o admin da plataforma, os sites integras.digital e singularidade.digital e os e-mails.

## O caminho de uma mudança

1. **Tokens**: a mudança nasce no `@singularidade/tokens`, que gera o CSS, o JS, o JSON e o Java.
2. **Tema Vaadin**: o `vaadin-bindings` liga os componentes do Vaadin aos tokens, no tema `singularidade-base`.
3. **Biblioteca**: a `singularidade-ui-vaadin` estende o tema e traz os componentes que os apps dividem.
4. **Produtos**: os apps Vaadin sobem a versão da biblioteca; os sites leem os `{marca}.{tema}.css`; os e-mails usam as classes `EmailTokens{Marca}{Tema}`.

Uma versão nova sai primeiro nos pacotes, depois na biblioteca e só então nos apps.

## O que já segue a v2

- **Apps Vaadin**, com a biblioteca 2.1.0: o tema gerado dos tokens, a borda visível nos campos, um anel de foco só, o item atual do menu em `color-interactive-primary-subtle`, o link "Pular para o conteúdo" e os nomes dos botões na língua da pessoa.
- **Integras Hub**: as [Faixas](/componentes/faixas/) no login, na volta do checkout, no balão do tour e no vazio de Assinados; os estados vazios com o ladrilho de 64px; o Meu espaço no celular.
- **Portal das empresas**: os nomes "Conectores", "Papéis", "Auditoria" e "Ações administrativas"; os selos em palavras, na língua da tela; os plurais certos.
- **Admin da plataforma**: os status traduzidos e os cartões de número só com as cores do tema.
- **Sites**: a banda das Faixas no topo da home e as páginas na linguagem da v2.

## O que os pacotes ainda não trazem

- O tema Vaadin não tem as densidades (`ss-comfortable` e `ss-compact`) nem a fonte de 16px, e não carrega o `text-styles.css`. Nos apps Vaadin, use os tokens `--font-*`.
- O seletor de tema da biblioteca 2.1.0 alterna entre claro e escuro, sem a opção Sistema; sem uma escolha guardada, abre no claro.
- O selo de status da biblioteca (StatusBadge) mostra só a palavra, sem ícone. Veja [Badge](/componentes/badge/).
- Os 10 ícones `ss:*` do `brand-assets` ainda têm traço 1.5, e a v2 pede 2. `accessibility` e `credit-card` ainda não estão no subconjunto de Lucide do pacote. Veja [Iconografia](/fundamentos/iconografia/).
- O iconset `ss:*` ainda não chega aos apps pelo Maven. Veja [Vaadin Flow](/devs/vaadin-flow/#custom-icons-ss).
- O `singularidade-symbol.svg` do pacote ainda traz as cores do Integras. Veja [Logo](/marca/02-logo/).
- O Storybook usa os web components do Vaadin 24 e não carrega o tema `singularidade-base`. Veja [Componentes](/componentes/#storybook).
