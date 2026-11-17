---
title: Visão geral
description: O que é o Singularidade Design System, o Design System v2 e onde está cada parte
sidebar: { order: 1 }
---

O **Singularidade Design System** é a fonte única da interface das duas marcas da Singularidade Digital: o **Integras** (conectores de IA para empresas, mais o **Integras Hub**, para pessoas) e a **Singularidade** (o site da empresa). Vale para o portal das empresas, o Integras Hub, a plataforma, os dois sites e os e-mails.

O norte é profissional, funcional e sem cara de IA: a interface some e o trabalho aparece. A linguagem visual atual, o **Design System v2**, evolui a identidade real sem trocá-la (o magenta, o coral e o laranja dos símbolos, os neutros quentes, a Plus Jakarta Sans e a JetBrains Mono) e tira o enfeite.

## Design System v2 e versões dos pacotes

"Design System v2" é o nome da linguagem visual: princípios, conteúdo, fundamentos, componentes e páginas-modelo. Os pacotes publicados têm as próprias versões, em SemVer. A 1.0.0 dos três pacotes é a primeira que traz os tokens da v2. Veja [Versões](/releases/).

## O que tem aqui

| Seção                                                | O que explica                                                                    |
| ---------------------------------------------------- | -------------------------------------------------------------------------------- |
| [Princípios](/principios/norte/)                     | O porquê: norte, assinatura visual, heurísticas, leis de UX e ética              |
| [Conteúdo](/conteudo/voz-e-tom/)                     | Voz e tom, regras de texto nas três línguas e exemplos reais                     |
| [Fundamentos](/fundamentos/cor/)                     | Cor, tipografia, espaço, raio, sombra, foco, movimento, estados, ícones e tokens |
| [Componentes](/componentes/)                         | Os 24 componentes, cada um com a prévia ao vivo no claro e no escuro             |
| [Páginas-modelo](/paginas-modelo/padroes/)           | Os padrões de tela e os 7 modelos de página montados com os componentes          |
| [Acessibilidade](/acessibilidade/meta-e-base-legal/) | A meta WCAG 2.2 AA, a LBI e o que o sistema garante, critério a critério         |
| [Marca](/marca/01-identidade/)                       | Identidade, logo e cores das duas marcas                                         |
| [Devs](/devs/vaadin-flow/)                           | Vaadin Flow, decisões de arquitetura e como contribuir                           |
| [Versões](/releases/)                                | A linguagem visual, os pacotes, a adoção nos produtos e as notas de cada versão  |

## Como o sistema é feito

1. **Tokens como fonte única**: qualquer mudança visual nasce no `@singularidade/tokens` e chega aos produtos pelo build.
2. **W3C DTF**: o formato padrão da indústria, que conversa com Figma, Tokens Studio e Penpot.
3. **Várias saídas**: os mesmos tokens compilam para CSS, JS, JSON e constantes Java.
4. **Uma só cor de ação**: o coral-vinho `color-interactive-primary` é a cor da interface. O magenta, o coral e o laranja da marca ficam no logo e em superfície de marca, como as [Faixas](/componentes/faixas/).
5. **Duas marcas, um sistema**: nos tokens, o Integras é a marca padrão e a Singularidade troca só as três cores da marca; o resto é igual, e cada marca tem o seu logo.

## Estrutura

```
@singularidade/tokens          design tokens (W3C DTF)
@singularidade/brand-assets    logos, ícones, fontes
@singularidade/vaadin-bindings tema pai singularidade-base (Vaadin Flow 25)
```

Os pacotes saem no Maven; o npm ainda não está ligado. Veja [Instalação](/comecar/instalacao/).

## Quem deve consumir

| Você é…                     | Use                                                                                                                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dev backend Vaadin Flow** | `digital.singularidade:vaadin-bindings` (Maven), que traz `tokens` e `brand-assets`                                                                                                                                                   |
| **Dev frontend de site**    | O CSS gerado (`theme.css` ou `{marca}.{tema}.css`) e as fontes de `@singularidade/brand-assets`; sem npm por enquanto                                                                                                                 |
| **Designer**                | Os [princípios](/principios/norte/), os [fundamentos](/fundamentos/cor/), as prévias dos [componentes](/componentes/) e o [catálogo de tokens](/fundamentos/catalogo/); as fontes em W3C DTF ficam em `packages/tokens/src/**/*.json` |
| **Quem escreve texto**      | [Conteúdo](/conteudo/voz-e-tom/): voz, tom, glossário e exemplos nas três línguas                                                                                                                                                     |
| **Curador de docs**         | Este site (Astro Starlight com conteúdo MDX), em `apps/docs`                                                                                                                                                                          |
