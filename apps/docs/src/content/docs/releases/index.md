---
title: Versões
description: O Design System v2 é a linguagem visual; os pacotes publicados têm as próprias versões, em SemVer
sidebar: { label: Visão geral, order: 1 }
prev: { link: /devs/contribuir/, label: Como contribuir }
next: { link: /releases/adocao/, label: Adoção nos produtos }
---

O **Design System v2** é a linguagem visual que este site documenta: princípios, conteúdo, fundamentos, componentes e páginas-modelo. "v2" é o nome da linguagem, não a versão de um pacote.

Os pacotes publicados seguem o SemVer, cada um com a sua versão. A 1.0.0 é a primeira que traz os tokens da v2. As versões 0.1.0 e 0.2.0 traziam a primeira linguagem visual, a v1.

## Pacotes

| Pacote                           | Maven                                   | Versão atual |
| -------------------------------- | --------------------------------------- | ------------ |
| `@singularidade/tokens`          | `digital.singularidade:tokens`          | 1.0.0        |
| `@singularidade/brand-assets`    | `digital.singularidade:brand-assets`    | 1.0.0        |
| `@singularidade/vaadin-bindings` | `digital.singularidade:vaadin-bindings` | 1.0.0        |

- Os três saem juntos, com a mesma versão, a partir de uma tag do repositório (`v1.0.0`).
- Saem no Maven. O npm ainda não está ligado: os nomes `@singularidade/*` valem dentro do monorepo. Veja [Instalação](/comecar/instalacao/).
- A biblioteca de componentes Vaadin, `singularidade-ui-vaadin`, fica em outro repositório e tem a sua própria versão. A 2.1.0 já declara os três pacotes na 1.0.0.
- O `bundle.css` dos componentes da v2 não faz parte de nenhum pacote: é o CSS de referência que as prévias deste site carregam (veja [Como usar](/comecar/como-usar/#componentes)).

## Histórico

| Versão                     | Data       | Tag      | Linguagem | O que trouxe                                                         |
| -------------------------- | ---------- | -------- | --------- | -------------------------------------------------------------------- |
| [1.0.0](/releases/v1-0-0/) | 15/11/2026 | `v1.0.0` | v2        | Os tokens da v2, um só tema escuro e o tema Vaadin gerado dos tokens |
| [0.2.0](/releases/v0-2-0/) | 16/09/2026 | `v0.2.0` | v1        | O tema Vaadin no Vaadin 25 e a publicação só por tag                 |
| [0.1.0](/releases/v0-1-0/) | 04/05/2026 | sem tag  | v1        | A primeira versão: tokens e brand assets                             |

A 0.2.0 teve antes uma versão candidata, com a tag `v0.2.0-RC1` e o mesmo código.

## O que vem depois

Os nomes da v1 que a v2 não tem continuam como aliases deprecados e saem na 1.2. A lista, com o substituto de cada um, está na [v1.0.0](/releases/v1-0-0/#o-que-quebra).

Como a v2 chega a cada produto está em [Adoção nos produtos](/releases/adocao/).
