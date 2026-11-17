---
title: 3 · Cores da marca
description: As paletas das duas marcas, os degradês dos símbolos e onde a cor da marca entra
sidebar: { order: 3 }
---

As cores da marca ficam no logo e em superfície de marca, como as [Faixas](/componentes/faixas/). A interface usa uma só cor de ação, o coral-vinho `color-interactive-primary`: veja [Cor](/fundamentos/cor/).

## Integras

A marca padrão (`color-brand-integras-*`):

<div class="ds-palette">
  <div style="background:#E91E8B"><span>magenta · #E91E8B</span></div>
  <div style="background:#E8606A"><span>coral · #E8606A</span></div>
  <div style="background:#F5A623"><span>laranja · #F5A623</span></div>
</div>

## Singularidade

A paleta original (`color-brand-singularidade-*`), ativa com `data-brand="singularidade"`:

<div class="ds-palette">
  <div style="background:#ED1E79"><span>magenta · #ED1E79</span></div>
  <div style="background:#F15052"><span>coral · #F15052</span></div>
  <div style="background:#F7931E"><span>laranja · #F7931E</span></div>
</div>

`--color-brand-primary`, `-secondary` e `-tertiary` apontam para a paleta da marca ativa e não mudam entre os temas. São cores de marca, não de interface: sobre branco, o magenta, o coral e o laranja do Integras dão 4,18:1, 3,33:1 e 2,03:1.

## Onde a cor da marca entra

- No logo e nos símbolos.
- Nas [Faixas](/componentes/faixas/), o momento de marca, nas cores da marca ativa.
- No diagrama ilustrado do site.
- Nunca em texto, botão, borda ou fundo de texto, nem numa série de gráfico. O magenta nunca disputa atenção com a ação.

## Degradês

Degradê só dentro do símbolo e no diagrama ilustrado do site, sempre vertical, como o símbolo. Não é token: o formato dos tokens não aceita degradê.

```css
/* Integras */
background: linear-gradient(180deg, #e91e8b 0%, #e8606a 50%, #f5a623 100%);

/* Singularidade */
background: linear-gradient(180deg, #ed1e79 0%, #f7931e 100%);
```

`--color-brand-gradient` (o degradê de 160° da v1) continua como alias deprecado até a 1.2.

## Marca e cor de ação

Na v1, a paleta vibrante ia também no login, no hero e no splash, e a interface usava o coral mais sóbrio. Na v2, a interface é chapada: a cor de ação é o coral.600 (#BE3550) no claro e o coral.400 (#FB7185) no escuro, e a marca fica no logo e nas Faixas. Veja o [ADR-004](/devs/arquitetura/).

## Escalas

Cada cor da marca tem 11 paradas (`50` a `950`), como `var(--color-brand-magenta-500)`. A rampa neutra (`--color-neutral-*`) vai de `0` a `1000` e tem o `450` (#8C7B86), base da `--color-border-control`. As rampas são o núcleo: nenhum componente as lê direto (as exceções são o mapa de calor e as Faixas). Todas estão no [catálogo de tokens](/fundamentos/catalogo/#cor-rampas); o Storybook (Foundations / Color) ainda usa só os nomes da v1.

## Feedback

Sucesso (esmeralda), aviso (âmbar) e informação (azul) não derivam da marca: são universais, como manda a convenção da indústria. O erro usa vermelho puro, não coral, para se distinguir da cor de ação. Veja [Cor](/fundamentos/cor/#status).

## Contraste

O contraste medido dos pares principais, nos dois temas, está em [Cor](/fundamentos/cor/#contraste).
