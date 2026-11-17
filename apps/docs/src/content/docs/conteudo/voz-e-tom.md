---
title: Voz e tom
description: A voz constante, o tom de cada situação e as regras de texto que valem nas três línguas
sidebar: { order: 1 }
---

## Voz (constante)

- **Direto**: verbo primeiro; o que importa vem no começo. "Salvar alterações", não "Clique aqui para salvar suas alterações".
- **Respeitoso**: erro é informação, não culpa. Sem pressão e sem urgência.
- **Confiante e humano**: preciso em valores, datas e limites; acolhedor no erro.
- **Concreto**: fala de sistemas, dados, permissões e registros. Nunca de "jornada", "potencial" ou "mágica".
- **Aberto**: diz o que acontece com o dado, quanto custa e como sair.

## Tom (varia com a situação)

- **Entrada**: breve. "Grátis. Informe seu e-mail, aceite os termos e confirme com o código que enviaremos."
- **Erro**: calmo, assume a parte do sistema e diz o próximo passo. "Não foi possível falar com o serviço de pagamento agora. Tente de novo em instantes."
- **Dinheiro**: exato, sem empurrar. "O acesso continua até 30/11, o fim do mês já pago. Não há reembolso proporcional, e nada mais é cobrado depois."
- **Consentimento**: claro e sem juridiquês. Use o texto real do "Como funciona", que diz o que entra, o que nunca é feito e como revogar.
- **Sucesso**: discreto. "Perfil atualizado."

## Regras gerais (nas três línguas)

### Tratamento

- "você" em pt-BR, "you" em inglês e "tú" em espanhol. A empresa fala como "nós" ("Enviamos um código de 6 dígitos para ana@empresa.com.br. Ele vale por 10 minutos.").
- Em espanhol, o portal das empresas usa usted. Veja [Por idioma](/conteudo/idiomas/).

### Caixa

- Só a primeira letra maiúscula em títulos, botões, menus, abas e cabeçalhos de tabela.
- Não: "Taxa de Erro por Conector", "Modernização e Migração". Sim: "Taxa de erro por conector", "Modernização e migração".

### Nomes

- Produto pessoal: "Integras Hub". Produto das empresas: "Integras". Empresa: "Singularidade Digital".
- "integras.digital" aparece só como domínio e razão social. O logo do Integras é o símbolo com o nome do produto em `brand-label`, escrito como texto ("INTEGRAS", e "INTEGRAS HUB" no Hub). Veja [Logo](/marca/02-logo/).
- Recursos: Conhecimento, Memória, Meu espaço.
- No portal das empresas, na tela e nos e-mails: "Conectores" (não "Módulos"), "Papéis" (não "Roles" nem "Matriz de Permissões"), "Auditoria" (não "Audit Log") e "Ações administrativas" (não "Admin Log").
- Ficam de propósito: "Dashboard" e "Marketplace" no menu do portal, e tools, resources, prompts, TOOL e tools/call, que são termos do MCP ("1 tool · 1 resource · 1 prompt").
- Na tela, "instituição"; nunca "tenant".
- No Hub não aparecem "MCP", "endpoint", "tenant" nem "token".

### Glossário

| pt                    | en                | es                       |
| --------------------- | ----------------- | ------------------------ |
| conector              | connector         | conector                 |
| assinatura            | subscription      | suscripción              |
| consulta              | query             | consulta                 |
| teste grátis          | free trial        | prueba gratis            |
| endereço do conector  | connector address | dirección del conector   |
| papel                 | role              | rol                      |
| auditoria             | audit log         | auditoría                |
| ações administrativas | admin actions     | acciones administrativas |
| conta                 | account           | cuenta                   |
| Adicionar ao Claude   | Add to Claude     | Agregar a Claude         |

### Pontuação

- Reticências como um caractere só ("…"), nunca três pontos.
- “ · ” entre metadados.
- Sem exclamação, sem "Por favor", sem emoji.
- “→” não entra em texto, porque a Plus Jakarta Sans não tem o glifo. Use o ícone arrow-right.
- Exceção: o guia de uso por e-mail, das empresas e do Hub, abre com "Olá, {nome}!" ou, sem nome, "Olá!" (nunca o endereço). Ele também usa “→” nos caminhos de menu ("claude.ai: Personalização → Conectores → …", "+ → Conectores → Eleições (TSE) → escolha o roteiro").

### Números e datas

- Sempre via Intl.
- Datas: "12/12/2026" em pt e es; "Dec 12, 2026" em inglês. Em inglês, nunca a data só com números, que é ambígua.
- Moeda: "R$ 19,90", com espaço inseparável. Em inglês, "R$ 49.90".
- Plural sempre com ICU (`{0,choice,…}`): nunca "1 e-mails" nem "0 pessoa(s)". Sim: "1 registro", "em 1 trecho", "resta 1 ativação", "Vai para 1 pessoa", "1 usuário associado", "Enviando 1 arquivo".
- Os números saem no formato do idioma da tela (1.234 / 1,234), nunca no do servidor.
- Nos sites, "R$" fica preso ao número por um espaço que não quebra, e os mesmos números aparecem na notação de cada idioma (11.181.098 / 11,181,098).

### Fórmulas

- Botão: verbo e objeto, até 3 palavras.
- Erro: o que houve e como resolver.
- Estado vazio: o que aparece ali e como chega.
- Confirmação: título em pergunta, consequência, botões com verbo.
- Link: diz o destino.
