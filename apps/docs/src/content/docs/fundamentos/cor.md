---
title: Cor
description: Uma só cor de ação, superfícies empilhadas, neutros quentes, papéis fixos de status e o contraste medido nos dois temas
sidebar: { order: 1 }
---

As cores da marca e as paletas das duas marcas estão em [Cores da marca](/marca/03-cor/). Todos os valores, nos dois temas, estão no [catálogo de tokens](/fundamentos/catalogo/).

## Cor de ação

- Use uma só cor de ação, `color-interactive-primary` (#be3550 no claro, #fb7185 no escuro): botão primário, link, controle marcado, item selecionado, indicador de aba, preenchimento do medidor. Um primário por tela ou diálogo; só ele se destaca.
- Ponha texto e ícone sobre a cor de ação em `color-on-primary`, nunca em branco literal: no escuro o preenchimento clareia e o texto escurece (6,85:1).
- Hover em `color-interactive-primary-hover`; pressionado em `color-interactive-primary-active` (#791832 no claro, 10,55:1 com branco). Item atual, chip e linha selecionados e hover do terciário: `color-interactive-primary-subtle`.
- Não use o magenta, o coral nem o laranja da marca (`color-brand-integras-*`) em interface: dão 4,18, 3,33 e 2,03:1 sobre branco. Eles ficam no logo e em superfície de marca, como as [Faixas](/componentes/faixas/). O magenta nunca disputa atenção com a ação.
- Degradê só dentro do símbolo e no diagrama ilustrado do site, sempre vertical como o símbolo. Nunca em texto, botão, borda ou fundo de texto. Os dois degradês estão em [Cores da marca](/marca/03-cor/).

| Token semântico                | Claro                                            | Escuro              |
| ------------------------------ | ------------------------------------------------ | ------------------- |
| `--color-brand-primary`        | `#E91E8B` (Integras) · `#ED1E79` (Singularidade) | igual ao claro      |
| `--color-interactive-primary`  | `#BE3550` coral.600                              | `#FB7185` coral.400 |
| `--color-on-primary`           | `#FFFFFF`                                        | `#1A111A`           |
| `--color-feedback-error-solid` | `#DC2626` red puro                               | `#F87171` red.400   |
| `--color-feedback-error-text`  | `#B91C1C` red.700                                | `#F87171` red.400   |

O `--color-brand-primary` é a marca e não muda entre os temas. O que muda é a cor de ação: o coral.600, sóbrio, no claro, e o coral.400, mais claro, no escuro, para passar o contraste AA.

## Superfícies

- Empilhe as superfícies na ordem `color-surface-base` (página), `color-surface-raised` (card, campo, diálogo, menu, toast) e `color-surface-overlay` (véu).
- `color-surface-sunken` é poço: código, cabeçalho de tabela, SideNav no claro, campo somente leitura, fundo externo do e-mail.
- `color-surface-inverse` só no tooltip.
- No escuro, o que está mais perto é mais claro: cards, campos e diálogos (`color-surface-raised`, #261a21) são mais claros que a base (#1a1517).

## Neutros e texto

- Mantenha os neutros quentes (`color-neutral-*`, cinza puxado para o magenta). Cinza frio (hsla 225) e cards azulados (#1d1f2b) são proibidos.
- Texto: `color-text-primary` no principal, `color-text-secondary` em apoio, ajuda e descrição, `color-text-muted` em placeholder e metadado, `color-text-disabled` só em controle desabilitado. Cada nota de token traz o contraste medido nas superfícies em que pode ser usado, nos dois temas.

## Bordas

- Desenhe todo controle (campo, select, checkbox, rádio, botão secundário, chip) com `color-border-control` (3,52 a 4,65:1).
- `color-border-subtle`, `-default` e `-strong` são decorativas: nunca a única pista de um controle.

## Status

- Status usa `color-feedback-{success,error,warning,info}-*` com papéis fixos: `-solid` para ícone, preenchimento e borda de campo inválido; `-text` para texto; `-surface` para fundo tingido; `-border` para a borda do Alert.
- Sucesso (esmeralda), aviso (âmbar) e informação (azul) não derivam da marca: são universais, como manda a convenção da indústria. O erro usa vermelho puro, não coral, para se distinguir do primário.
- Todo status leva palavra e ícone: sucesso e erro diferem quase só no matiz (1,14:1 entre si no claro). Veja [Badge](/componentes/badge/).
- Dentro de Alert, escreva link em `color-text-primary` sublinhado. `color-feedback-warning-text` nunca vai direto sobre sunken (4,46:1).
- Badge tingido pinta o tom sobre uma base `color-surface-raised` opaca, para ler igual numa linha selecionada (dois tons translúcidos empilhados caem abaixo de 4,5:1 no escuro).

## Exceções

- Ponha logo de conector sempre num quadro `color-neutral-0` (branco), também no escuro.
- A única cor literal permitida é a do botão "Continuar com Google", imposta pelo Google.

## Contraste

AA pede 4,5:1 para texto normal e 3:1 para texto grande e para borda de controle, foco e ícone. Os valores abaixo são calculados sobre o `theme.css` gerado; o CI confere os 240 pares da especificação, 120 por tema (`packages/tokens/tests/contrast.test.ts`).

| Par                                                  | Claro                       | Escuro                      |
| ---------------------------------------------------- | --------------------------- | --------------------------- |
| `text-primary` sobre `surface-base`                  | 16,18:1 (#261A21 / #FDFAFC) | 17,41:1 (#FDFAFC / #1A1517) |
| `text-muted` sobre `surface-raised`                  | 5,87:1 (#735F6B / #FFFFFF)  | 6,04:1 (#A697A1 / #261A21)  |
| `link` sobre `surface-base`                          | 5,31:1 (#BE3550 / #FDFAFC)  | 6,71:1 (#FB7185 / #1A1517)  |
| `on-primary` sobre `interactive-primary`             | 5,51:1 (#FFFFFF / #BE3550)  | 6,85:1 (#1A111A / #FB7185)  |
| `on-primary` sobre `interactive-primary-active`      | 10,55:1 (#FFFFFF / #791832) | 5,54:1 (#1A111A / #E8606A)  |
| `feedback-error-text` sobre `surface-base`           | 6,24:1 (#B91C1C / #FDFAFC)  | 6,52:1 (#F87171 / #1A1517)  |
| `border-control` sobre `surface-raised` (mínimo 3:1) | 3,97:1 (#8C7B86 / #FFFFFF)  | 4,23:1 (#8C7B86 / #261A21)  |
| `border-focus` sobre `surface-raised` (mínimo 3:1)   | 5,51:1 (#BE3550 / #FFFFFF)  | 6,23:1 (#FB7185 / #261A21)  |

Os nomes da tabela são os tokens `--color-*`.
