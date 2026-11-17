---
title: Padrões
description: Os padrões de tela que juntam os componentes, dos formulários ao celular, e as medidas de site e de e-mail
---

Cada padrão junta componentes do sistema; as páginas-modelo, nesta seção, mostram os modelos montados.

## 1. Formulários

- Uma coluna, com o rótulo em cima. Agrupe com fieldset e legend.
- Marque só o opcional, com "(opcional)" em `color-text-secondary`.
- Valide ao sair do campo e ao enviar, nunca a cada tecla. Com 6 campos ou mais, mostre um resumo dos erros no topo, com link para cada campo.
- O que foi digitado nunca se perde.
- `autocomplete` em todos os campos. Não peça duas vezes o que já se sabe (WCAG 3.3.7): país e CPF vêm do perfil.
- Campos especializados: PhoneField (DDI e número, com tabular-nums), TaxIdField (CPF e CNPJ alfanumérico; colar funciona), AddressField e CountrySelect.
- Ações no fim do formulário: na página, alinhadas à esquerda com o campo; no diálogo, à direita. O primário diz o resultado: "Enviar código", "Salvar alterações".
- Ritmo de espaço: 4px (`size-1`), 16px (`size-4`) e 32px (`size-8`).

## 2. Consentimento

**No cadastro**: a linha opcional do [Checkbox](/componentes/checkbox/), desmarcada, 16px abaixo dos termos obrigatórios e com o mesmo peso das outras linhas.

**Na Privacidade**

- Um card "Personalizar ofertas" com o estado (badge neutro "Consentimento dado em 12/11/2026" ou "Sem consentimento"), o texto explicativo real e um botão secundário: "Revogar consentimento" ou "Dar consentimento".
- Os dois botões têm o mesmo peso, e nenhum é vermelho.
- Embaixo, uma tabela compacta: Item, Versão, Aceito em, Revogado em.

**Cookies**

- Banner que não bloqueia a página, embaixo. Título "Cookies neste site" e o texto real.
- "Aceitar todos", "Apenas essenciais" e "Configurar", os três com o mesmo estilo (secundário).
- Analytics desligado até a pessoa aceitar. O banner nunca cobre o foco.
- Sem analytics nem cookie que não seja essencial, não há banner. É o caso do integras.digital, cuja Política de Privacidade diz o que fica no navegador.

## 3. Estado vazio

- Use o [EmptyState](/componentes/empty-state/), centralizado na área.
- Diga o que aparece ali, como chega e quem pode agir.
- Sem botão quando a pessoa não pode agir.
- No Hub, todo vazio da pessoa leva o ícone no ladrilho de 64px. Na vitrine, o vazio fica abaixo das abas e das categorias, com 112px de respiro até o ícone (48px no celular), e a ação tem 44px. O vazio de Assinados leva o emblema das [Faixas](/componentes/faixas/) no lugar do ícone.

## 4. Card da loja e detalhe

O card é o [ConnectorCard](/componentes/connector-card/). O detalhe abre num Dialog lg ou em `/conectores/<id>`, com o logo de 64px no quadro branco, o nome em `heading` e o editor, a descrição completa, três exemplos reais do que perguntar, as contagens, o aviso de órgão público e o bloco de preço.

Um único primário: enquanto há teste, "Adicionar ao Claude"; depois do teste, "Assinar por R$ 19,90/mês".

**Guia de uso por e-mail**

- No detalhe, "Enviar para o meu e-mail" (terciário, com o ícone de envelope) vem logo depois de "Adicionar ao Claude" e antes de "Gerenciar a assinatura", só para quem tem acesso. No celular, as três ações quebram em linhas.
- Vai sempre para o e-mail da sessão, até 3 por hora. Enquanto envia, fica desabilitado; depois confirma com o endereço mascarado ("Guia enviado para ma\*\*\*@…"), ou diz que o limite chegou, que não há acesso ou que o envio falhou.
- O guia também sai sozinho, uma vez por ativação: a chave é pessoa, conector e início do contrato.

## 5. Tour

Use o [Tour](/componentes/tour/): uma vez por tela, até 6 passos, com véu e o alvo aceso; sempre dá para pular, e o último passo aponta para o botão que o abre de novo ("Ver o tour desta página"). No Hub, o balão leva as Faixas no canto e tem 360px.

## 6. Confirmação e ação destrutiva

- Reversível: execute e ofereça "Desfazer" no toast ("Movido para a lixeira. Desfazer").
- Irreversível: [Dialog](/componentes/dialog/) com a consequência e as datas. O botão diz a ação ("Cancelar assinatura"); o foco começa no que preserva ("Manter").

## 7. Carregamento (Doherty)

- De 0 a 100ms: o estado pressionado do botão.
- Até 1s: spinner no próprio controle.
- Acima de 300ms: esqueleto da região.
- Acima de 10s: progresso com texto e a opção de sair.
- Shell antes do JS: o `index.html` já vem com o fundo `color-surface-base` e o símbolo de 48px (`icon-2xl`). Nada de tela branca só com a barra de carregamento.

## 8. Hierarquia de mensagens

- Do menor para o maior: erro no campo, [Alert](/componentes/alert/) na seção, Banner na página, Dialog para decisão que bloqueia.
- O [Toast](/componentes/toast/) só confirma uma ação.

## 9. Navegação

- Hub: "Conectores" (o início) e "Meu espaço" ficam no cabeçalho, no máximo 5 itens. O layout é o mesmo do portal das empresas, que mostra o menu lateral; a barra escolhe pelo tipo de conta.
- Admin: [SideNav](/componentes/side-nav/) em grupos de até 7 itens.
- Trilha (breadcrumb) a partir do 3º nível.
- Ajuda sempre no mesmo lugar: o botão do tour no fim do [PageHeader](/componentes/page-header/) e o contato no rodapé. Título da aba: "Página · Integras Hub".

## 10. Stepper (cadastro de empresa)

- Círculos de 24px: atual com fundo `color-interactive-primary` e número em `color-on-primary`; feito com check em `color-interactive-primary`; próximo com borda `color-border-control` e número em `color-text-secondary`.
- Linha de 2px em `color-border-default` entre os passos; rótulo abaixo do círculo. "Voltar" mantém os dados.
- Telas de sucesso e de erro: o ícone num quadro tingido (`color-feedback-*-surface`), na cor `color-feedback-*-text`. Nunca o ✓ e o ✗ brancos sobre um círculo saturado.

## 11. Cartão de número (painel do admin)

O painel do admin mostra números em cartões (`stat-card`), em blocos com título; o monitoramento usa os mesmos cartões.

- Grade de colunas de no mínimo 11rem (8,5rem até 768px), 16px entre os cartões e no máximo 58rem de largura, para os cartões não se espalharem num monitor largo.
- Cartão: raio `radius-lg`, padding de 24px (16px até 768px), altura mínima de 6,5rem (5,5rem até 768px), borda de 10% do contraste e `shadow-xs`.
- O número em 22px 600, numa linha só; o rótulo embaixo, em 13px `color-text-secondary`; a variação, quando há, em 12px, verde ou vermelha.
- O tom só entra quando o número pede atenção (pendências em aviso, falhas em erro), quando passa de zero.
- Só variáveis do tema, nunca cor literal. No escuro, o cartão comum sobe um degrau com `--lumo-contrast-5pct`, no tom quente do fundo. O de aviso usa `--color-feedback-warning-surface` no claro e `--lumo-warning-color-10pct` no escuro; o de erro, `--lumo-error-color-10pct` nos dois temas. Aviso e erro levam a borda na cor do tom.
- O cartão não se move no hover (veja [Movimento](/fundamentos/movimento/)).

## 12. Celular: Meu espaço e Conhecimento

**Meu espaço da pessoa do Hub** (até 600px, e cabe em 320)

- Os ícones do trilho vão para o cabeçalho, ao lado do nome e antes do "?": 44px (40px abaixo de 360px), com o lugar atual marcado por `aria-current="page"` e fundo `color-interactive-primary-subtle`.
- A explicação e "Quem acessou…" aparecem inteiros, seguidos de Arquivos e Memória.
- As pastas ficam numa caixa (`border-default`, `radius-lg`, raised). Na pasta aberta, a dica e os botões "Enviar arquivo" e "Enviar pasta" lado a lado (um embaixo do outro em 320); o vazio fica numa caixa, sem o cabeçalho das colunas.
- As listas crescem com as linhas até 50; acima disso, rolam numa caixa de min(70vh, 560px).
- O nome do recurso fica sob o nome da pessoa: é a exceção à regra do PageHeader.
- As empresas ficam com o trilho em toda a largura.

**Portal das empresas** (até 600px)

- Conhecimento e Meu espaço empilham: as pastas em cima, com altura fixa e rolagem por dentro, e a pasta aberta embaixo, na largura da tela.
- "Enviar arquivo" e "Enviar pasta" descem de linha em vez de cortar; o rodapé de uso e "Quem acessou…" quebram linha.
- Sem pasta aberta, o texto diz "Escolha uma pasta na lista de pastas", não "à esquerda".
- Em qualquer largura, a etiqueta de categoria desce para baixo do nome da pasta quando os dois não cabem numa linha.
- A barra de filtros da Auditoria quebra linha, com "Exportar CSV" à direita.

## Modelos de página

| Modelo                                              | O que mostra                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [PageVitrine](/paginas-modelo/vitrine/)             | Hub, "Conectores", aberta a toda conta: banner de modo de teste, PageHeader com o botão do tour, busca, abas "Catálogo" e "Assinados", chips de categoria (um por vez, nas duas abas) e a grade de ConnectorCard. Na volta do checkout, o cartão da compra com as Faixas no canto.                |
| [PageLogin](/paginas-modelo/login/)                 | Entrar sem cartão, coluna de 440px a 12vh do topo: símbolo de 56px, Google e código por e-mail; e o passo do código com OtpField, erro no campo e reenvio com o motivo.                                                                                                                           |
| [PageCadastro](/paginas-modelo/cadastro/)           | Criar conta no mesmo molde, com termos obrigatórios, consentimento opcional e Alert de intenção; e o cadastro de empresa com Stepper.                                                                                                                                                             |
| [PageConfiguracoes](/paginas-modelo/configuracoes/) | Minha conta: navegação de 220px, cards de até 720px com rodapé "Salvar alterações" e "Descartar", Privacidade com "Revogar" neutro, toast "Perfil atualizado".                                                                                                                                    |
| [PageEstadoVazio](/paginas-modelo/estado-vazio/)    | Portal das empresas, Compartilhadas comigo: PageHeader e o EmptyState centralizado, sem botão. No Hub, o vazio da vitrine fica abaixo das categorias, e o de Assinados leva o emblema das Faixas.                                                                                                 |
| [PageEmail](/paginas-modelo/email/)                 | O código de acesso no code-block e o e-mail pós-compra com um só botão e o endereço em texto; só tema claro.                                                                                                                                                                                      |
| [PageSite](/paginas-modelo/site/)                   | Modelo de seções de site: hero com captura do produto, pontos em tipografia (sem cards de ícone), uma faixa escura com `data-theme`, preços com um só "Recomendado", perguntas, rodapé com o símbolo de acessibilidade e o banner de cookies. Nos dois sites, a home abre com a banda das Faixas. |

## Medidas de site

Seções com 64px de padding no celular e 96px no desktop, contêiner de 1200px. Sem glows, grade de fundo, ponto que brilha, texto em degradê (`.gradient-text`), sobretítulo numerado, rótulos em mono e caixa alta, cartões com ícone, botão em degradê e animação de entrada.

## E-mail

- Tabela de 600px (100% no celular), fundo externo #f5f0f4 com padding de 32px e 16px, cartão #ffffff com raio de 12px.
- Preheader oculto de 40 a 90 caracteres; `<html lang>` e `<title>` com o assunto; só `color-scheme: light`; cores em hex de 6 dígitos; imagens sem `height="auto"`.
- Símbolo em PNG 2× com 48px e o nome do produto em texto embaixo.
- Corpo com padding de 32px (24px no celular), título 22/28 700 em #261a21, texto 16/24 em #261a21, secundário 14/20 em #735f6b.
- Um botão #be3550 com texto #ffffff 16px 600, padding de 14px 28px, raio de 8px (5,51:1), e o endereço em texto embaixo.
- Rodapé 13/20 em #735f6b sobre #f5f0f4 (5,21:1), com nome, e-mail de privacidade sublinhado e o motivo do envio.
- Alerta com borda inteira de 1px e fundo tingido, nunca a borda esquerda de 4px. Um tema por marca.

Veja [PageEmail](/paginas-modelo/email/).
