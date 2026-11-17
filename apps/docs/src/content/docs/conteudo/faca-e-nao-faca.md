---
title: Faça e não faça
description: Textos que saem e o que entra no lugar, das mensagens de erro às escolhas da pessoa
sidebar: { order: 3 }
---

Cada item mostra o texto que sai e o que entra no lugar.

## Mensagens de sucesso e de erro

- Não: "Salvo com sucesso", "Saved successfully", "Guardado exitosamente". Sim: "{Item} salvo" ("Parâmetros salvos", "Perfil atualizado").
- Não: "Erro ao salvar: {0}", que expõe a exceção. Sim: "Não foi possível salvar. Tente de novo; se continuar, fale com o suporte."
- Não: "Erro: Module not contracted or module limit reached". Sim: o motivo, nas três línguas:
  - "Limite de conectores ativos do plano atingido. Desative outro conector ou mude de plano em Conta."
  - "Este conector não faz parte do plano contratado."
  - "A assinatura está suspensa ou cancelada: não é possível ativar conectores."
- Não: "Ocorreu um erro inesperado. Tente novamente." Sim: diga o que falhou: "Não foi possível carregar os conectores. Tente de novo."

## Termos, estados e plural

- Não: "Excluir Role" e "Deseja excluir a role ''{0}''?". Sim: "Excluir papel" e "Excluir o papel {0}? Quem tem só este papel perde o acesso aos conectores dele."
- Não: "ACTIVE" e "ERROR" (enum cru). Sim: "Ativo" e "Erro". Veja [Badge](/componentes/badge/).
- Não: "Liberado só para: 1 e-mails", em vermelho. Sim: "Liberado para 1 e-mail", em badge neutro.
- Não: "0 pessoa(s) com pagamento · 0 conector(es) ativo(s)". Sim: "Nenhuma pessoa com pagamento · nenhum conector ativo".

## Boas-vindas e jargão

- Não: "Olá, {e-mail}!". Sim: "Olá, Ana", pelo nome e sem exclamação. O guia de uso por e-mail é a exceção: "Olá, {nome}!" ou "Olá!", nunca com o endereço.
- Não: "Suas credenciais MCP estão prontas. Use os endpoints abaixo para integrar seu cliente MCP (Claude, etc.)." Sim: "Seu acesso está pronto. Copie o endereço do conector e adicione-o no Claude."
- Não: "Abrir tenant no admin", sem tradução. Sim: "Abrir instituição no painel".
- Não: "Obrigado! O conector {0} está ativo…" (e-mail). Sim: "O conector {0} está ativo na sua conta do Integras Hub e se renova todo mês."

## Escolhas da pessoa

- Cookies: "Aceitar todos" e "Apenas essenciais" com o mesmo destaque, nunca um em evidência e o outro quase sumindo.
- "Revogar consentimento" é botão secundário, nunca vermelho.

## Expressões banidas

"Ops!", "Por favor", "Clique aqui", "Sucesso!", "potencialize", "revolucione", "IA mágica" e a faísca decorativa.
