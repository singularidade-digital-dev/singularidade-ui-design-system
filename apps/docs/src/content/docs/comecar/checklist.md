---
title: Checklist de design
description: Os 16 itens que toda tela confere antes de ir para o ar
sidebar: { order: 4 }
---

Confira cada item em toda tela, no claro e no escuro.

1. **Só tokens**: nenhum hex, px ou cor solta. A única exceção documentada é o botão do Google. Veja [Tokens](/fundamentos/tokens/).
2. **Contraste nos dois temas**: texto com pelo menos 4,5:1 (3:1 se tiver 24px ou mais, ou 19px em bold); borda de controle, foco e ícone com pelo menos 3:1.
3. **Um primário por tela ou diálogo.** Ação destrutiva usa danger, diz o verbo e nunca divide a tela com um primário (as duas cores são quase iguais). Nada de botões "OK", "Sim" ou "Não". Veja [Button](/componentes/button/).
4. **Todos os estados desenhados**: padrão, hover, foco (outline de 2px) e pressionado; desabilitado, sempre com o motivo; erro, carregando e vazio. Veja [Estados](/fundamentos/estados/).
5. **Alvo de toque** de pelo menos 24px no modo compacto e 44px no confortável. A tela funciona com 320px sem rolagem lateral.
6. **Todo campo tem rótulo visível.** Só o opcional é marcado, com "(opcional)". O erro aparece junto do campo, com texto e ícone. Colar funciona. Veja [TextField](/componentes/text-field/).
7. **Status sempre com palavra traduzida e ícone.** Nunca o enum cru, nunca só a cor. Veja [Badge](/componentes/badge/).
8. **Tempo de resposta**: qualquer ação responde em até 100ms; a partir de 300ms, spinner ou esqueleto; nunca tela branca. Veja [Skeleton](/componentes/skeleton/).
9. **Texto**: só a primeira letra maiúscula, na voz da marca; traduzido em pt, en e es, com plural ICU; sem "com sucesso", sem exclamação; sem "MCP", "endpoint" ou "tenant" no Hub. Veja [Voz e tom](/conteudo/voz-e-tom/).
10. **Consentimento e cookies**: nada vem pré-marcado; as escolhas têm o mesmo peso; revogar é tão fácil quanto aceitar. Veja [Ética](/principios/etica/).
11. **Preço**: valor, período, renovação e cancelamento aparecem antes de pagar. Sem urgência falsa nem desconto falso. Veja [Price](/componentes/price/).
12. **Sem cara de IA**: degradê só no logo; sem glow, blur ou grade de fundo; sem emoji, sem borda colorida à esquerda, sem cinza frio. A tira das Faixas, com pontos, é a exceção de marca.
13. **Logo oficial**, sem redesenhar nem recolorir. Respiro de 1× a altura do símbolo. Logo de conector sempre num quadro branco. Veja [Logo](/marca/02-logo/).
14. **Movimento**: só em transform e opacity, com até 200ms na interface; respeita prefers-reduced-motion; nunca `transition: all`. Veja [Movimento](/fundamentos/movimento/).
15. **Semântica**: um h1 por página, landmarks, lang e `<title>`; link "Pular para o conteúdo"; aria-live nas mensagens. Veja [Acessibilidade](/acessibilidade/criterios/).
16. **E-mail**: largura de 600px e logo em PNG; um botão e o mesmo link em texto; preheader, lang e title; cores em hex de 6 dígitos; código de acesso no bloco code-block. Veja [PageEmail](/paginas-modelo/email/).
