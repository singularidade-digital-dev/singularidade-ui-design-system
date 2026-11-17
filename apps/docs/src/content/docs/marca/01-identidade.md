---
title: 1 · Identidade e manifesto
description: Quem é a Singularidade Digital, as duas marcas e os quatro valores do manifesto
sidebar: { order: 1 }
---

A **Singularidade Digital** é a empresa que faz o **Integras**: conectores de IA para empresas, mais o **Integras Hub**, para pessoas. "integras.digital" é o domínio, não o nome do produto.

## Manifesto

**Direto.** Produtos resolvem problemas reais de quem opera o negócio, não impressionam quem nunca usou.

**Respeitoso.** Tecnologia complexa com interface simples; ninguém é punido pela curva de aprendizado.

**Confiante, mas humano.** Firme nas afirmações e acolhedor no erro. O português do Brasil é escrito na origem, não traduzido do inglês.

**Aberto.** Tokens, documentação e código são públicos, sob a licença Apache-2.0, e as decisões ficam registradas em ADRs.

Na interface, os quatro valores viram regra de tela: veja [Norte e assinatura visual](/principios/norte/).

## Duas marcas, um sistema

A Singularidade é a matriz, e o Integras é a marca padrão dos tokens. As duas dividem tipografia, neutros, cor de ação e princípios. Muda o logo, o nome e as três cores da marca: a Singularidade usa a sua paleta original. Veja [Multi-marca](/fundamentos/multi-marca/).

Em código, isso é uma camada fina: o `identity.json` de cada marca aponta o caminho do logo, e o `overrides.json` guarda só o que a marca troca (vazio no Integras; as três cores da marca na Singularidade).
