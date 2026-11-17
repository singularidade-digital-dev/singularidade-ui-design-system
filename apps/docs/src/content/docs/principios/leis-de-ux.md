---
title: Leis de UX e Gestalt
description: Jakob, Hick, Fitts, Von Restorff, pico e fim, Doherty e os princípios da Gestalt aplicados às telas
sidebar: { order: 3 }
---

## Leis de UX

### Jakob

Seguir o que a pessoa já conhece do Claude, do Google e do Stripe.

- O logo, no canto superior esquerdo, leva ao início; o menu da pessoa fica no canto superior direito.
- No diálogo, o primário fica à direita.
- "Continuar com Google" segue o padrão do Google; o checkout fica no Stripe.
- Login e formulário não se reinventam.

### Hick

Menos escolhas por vez.

- No máximo 5 itens no menu do Hub e 7 por grupo no admin.
- Um primário por tela.
- Até 4 opções viram rádio visível; mais de 10 viram busca.
- Revelação progressiva: "Outras formas de entrar", "Como funciona".
- Busca e filtros só aparecem quando há itens suficientes: mais de 8 itens, ou pelo menos 2 categorias.

### Fitts

Alvos grandes e perto do que afetam.

- Alvo de 44px no modo confortável (Hub, sites, toque); nunca abaixo de 24px no compacto (WCAG 2.5.8).
- Botão de envio em largura total nas telas de entrada no celular.
- O rótulo do checkbox também é clicável.
- Ação destrutiva longe do primário e com outro estilo.

### Von Restorff

Só o primário se destaca, preenchido em `color-interactive-primary`.

- Badges em tons suaves.
- O magenta da marca nunca disputa atenção com a ação.
- No máximo um "Recomendado" por tabela de preços.

### Pico e fim

Desenhar com cuidado os picos e os finais.

- Picos: código aceito, conector ativo com a primeira consulta no Claude, pagamento confirmado.
- Finais: fim do tour; confirmação respeitosa depois de cancelar, sem culpa; e-mail pós-compra com o próximo passo.
- Erro no fim de um fluxo nunca apaga o que foi preenchido.

### Doherty (400ms)

A pessoa nunca fica esperando no escuro.

- Reconhecer a ação em até 100ms.
- Spinner ou esqueleto a partir de 300ms ("Carregando…" só acima de 300ms).
- Acima de 1s, esqueleto da região; acima de 10s, progresso com texto e saída.
- Nunca tela branca: o shell (cor de fundo e símbolo) aparece antes do JS.
- Alternâncias otimistas, com desfazer se falhar.

## Gestalt

- **Proximidade**: o espaço mostra o que é grupo; não use linha onde o espaço resolve.
  - 4px do rótulo ao campo e do campo à ajuda (`size-1`).
  - 8px entre botões e chips (`size-2`); 16px entre campos (`size-4`).
  - 24 a 32px entre grupos; 64 a 96px entre seções de site.
- **Semelhança**: mesma aparência, mesma função.
  - Badge nunca parece botão.
  - Card não clicável não reage a hover nem muda o cursor.
- **Região comum**: card ou superfície agrupa. No máximo um nível: card dentro de card é proibido.
- **Continuidade**: grade de 4px. Logo, título e conteúdo começam no mesmo x. Formulário em coluna única.
- **Figura e fundo**: base, raised, overlay. Sombra só no que flutua (menus, toasts, diálogos). No escuro, o que está mais perto é mais claro.
- **Pregnância**: poucas formas, raios consistentes, uma família de ícones.
