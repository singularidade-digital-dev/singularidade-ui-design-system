---
title: Como usar
description: As regras de uso do sistema, dos tokens semânticos aos temas, à marca e às classes dos componentes
sidebar: { order: 2 }
---

O resumo de como montar uma tela com o Design System v2. Cada item tem o detalhe nas seções de [Fundamentos](/fundamentos/cor/) e [Componentes](/componentes/).

## Tokens

- Leia só tokens semânticos (`color-surface-*`, `color-text-*`, `color-interactive-*`, `color-border-*`, `color-feedback-*`, `color-link`, `color-on-*`) e os aliases de componente (`button-*`, `card-*`, `input-*`, `dialog-*`).
- As rampas (`color-brand-magenta-*`, `color-brand-coral-*`, `color-neutral-*`…) são o núcleo: nenhum componente as lê direto. As exceções são a escala do mapa de calor, em [Gráficos](/fundamentos/graficos/), e a laje e a tira das [Faixas](/componentes/faixas/).
- Todos os valores, nos dois temas, estão no [catálogo de tokens](/fundamentos/catalogo/).

## Temas

- Há dois temas, Claro e Escuro, e um só tema escuro: o dos tokens.
- Siga o sistema operacional por padrão, ofereça Claro, Escuro e Sistema, e guarde a escolha.
- Na biblioteca `singularidade-ui-vaadin` 2.1.0, o seletor de tema ainda alterna só entre claro e escuro. Veja [Adoção nos produtos](/releases/adocao/#o-que-os-pacotes-ainda-não-trazem).
- Para trocar o tema de uma região (a faixa escura do site, o e-mail sempre claro), ponha `data-theme` no elemento. O `bundle.css` redeclara `color` em todo `[data-theme]`, porque a cor herdada já vem calculada do pai.
- O `css/theme.css` serve a qualquer página e ao tema Vaadin: claro no `:root`, escuro em `[theme~='dark']` e `[data-theme='dark']`, claro de novo numa região com `[data-theme='light']`. Os quatro `{marca}.{tema}.css` continuam, com `[data-brand][data-theme]`, para os sites. Veja [Tema claro e escuro](/fundamentos/tema/).

## Marca

- `data-brand="singularidade"` troca só `color-brand-primary`, `color-brand-secondary` e `color-brand-tertiary` para as cores originais da Singularidade (`color-brand-singularidade-*`). Vale também para um `[data-theme]` dentro da área.
- O `css/theme.css`, que é também o tema Vaadin, leva a mesma regra, e o build falha se a marca trocar outra coisa. O Integras é o padrão; o resto do sistema é igual nas duas marcas. Veja [Multi-marca](/fundamentos/multi-marca/).

## Componentes

- Monte a tela com as classes `ss-*` do `bundle.css` e as classes de estilo de texto geradas dos tokens (`display-xl`, `heading`, `body`, `body-sm`, `caption`, `label`, `button`, `button-lg`, `badge`, `overline`, `brand-label`, `code`, `code-lg`, `otp`), juntas:

  ```html
  <button class="ss-btn ss-btn--primary button">Enviar código</button>
  ```

- No pacote, os estilos de texto ficam em `css/text-styles.css`.
- O `bundle.css` do DS v2 é o CSS de referência dos componentes. As prévias deste site o carregam (`/ds-v2/bundle.css`), junto com o `theme.css` e o `text-styles.css` publicados. Ele ainda não faz parte de nenhum pacote: nos apps Vaadin, o visual vem do tema `singularidade-base` do `vaadin-bindings`.
- As classes `ss-demo-*` existem só nas prévias. Não use em produto.

## Densidade

- Ponha a densidade na raiz da área: `ss-comfortable` (controle de 44px e texto de 16px: Hub, sites e toque) ou `ss-compact` (36px e 14px: admin da empresa e plataforma).
- Vale para o `bundle.css`. O tema Vaadin do `vaadin-bindings` 1.0.0 ainda não tem as densidades nem a fonte de 16px.
