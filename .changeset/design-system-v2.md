---
'@singularidade/tokens': major
'@singularidade/vaadin-bindings': major
'@singularidade/brand-assets': major
---

Design System v2 (onda 0): os tokens aprovados entram nas fontes do Style Dictionary e o tema Vaadin passa a ser gerado deles.

**@singularidade/tokens**

- Valores e nomes da v2 (`reference/ds-v2.tokens.json`, cópia fiel do `tokens.json` aprovado). Os testes comparam o que o build gera com ela, conferem os 240 pares de contraste da especificação (120 por tema) e a ordem das rampas.
- Novo `css/theme.css`, um arquivo para qualquer página e para o tema Vaadin: claro no `:root`, escuro em `[theme~='dark']` e `[data-theme='dark']`, claro numa região com `[data-theme='light']`. O Integras é a marca padrão; `[data-brand='singularidade']` troca só `--color-brand-primary`, `-secondary` e `-tertiary`.
- Os quatro `{marca}.{tema}.css` continuam, com o seletor `[data-brand][data-theme]`, para os sites. Com `data-brand="singularidade"` as três cores da marca passam à paleta original (#ed1e79, #f15052, #f7931e).
- Novo `css/text-styles.css` com os 19 estilos de texto da v2 (`.display-xl` a `.otp`).
- Novos tokens: `color-neutral-450`, `color-border-control`, `color-interactive-primary-subtle` e `-subtle-hover`, `color-feedback-*-text`, `color-feedback-error-hover`, `color-surface-inverse`, `color-text-on-inverse`, `color-on-primary`, `color-on-status`, `color-link` e `-hover`, as paletas `color-brand-integras-*` e `color-brand-singularidade-*`, `shadow-*` com um valor por tema, `focus-ring`, `button-radius`, `input-radius`, `font-family-email`, `bp-*`, `container-*`, `control-*`, `target-*`, `icon-*`, `header-height-*`, `sidenav-width`, `dialog-width-*` e `z-*`.
- Valores que mudam: `color-interactive-primary-active` no claro (#e8606a → #791832, 10,55:1 com branco); o tema escuro inteiro segue a v2 (texto desabilitado #735f6b, superfícies de status translúcidas); `button-secondary-border` e `input-border` passam a `color-border-control`; o hover do botão terciário passa a `color-interactive-primary-subtle`; `card-border` é `color-border-default` no escuro; `font-size-xs` vai de 11 para 12px; `font-family-mono` troca 'Fira Code' por Menlo e Consolas; `color-neutral-900` e `-950` trocam de valor entre si para a rampa ficar em ordem.
- No CSS os tamanhos de fonte saem em rem (JS, JSON e Java seguem em px).
- Os nomes da v1 que a v2 não tem ficam como aliases deprecados até a 1.2 (`/* deprecated */` no CSS, `@Deprecated` no Java): `shadow-light-*`, `shadow-dark-*`, `color-brand-gradient`, `text-*`, `button-size-*`, `button-primary-border-radius`, `button-primary-font-weight`, `card-shadow-*` (agora por tema), `dialog-shadow` (por tema), `input-border-radius` e `input-padding`.
- `--brand-*` sai do CSS (virava um `url()` que o navegador não carrega); continua no JSON, no JS e no Java.
- A saída canônica (`tokens.js`, `tokens.json`, `SingularidadeTokens.java`) passa a ser Integras claro. As classes `EmailTokens*` mantêm os nomes; as constantes que o `EmailTheme` lê mantêm os valores, menos `fontFamilyMono`.

**@singularidade/vaadin-bindings**

- `styles.css` importa `tokens/theme.css`. Saem o `tokens/defaults.css` escrito à mão (o escuro dele era outro) e os quatro imports `{marca}.{tema}.css`, que nunca ativavam nos apps; o JAR leva só o `theme.css`.
- Mapeamentos novos: `--lumo-primary-contrast-color` lê `color-on-primary`; os `--lumo-*-text-color` leem `color-feedback-*-text`; os `--lumo-*-contrast-color` de status leem `color-on-status`; `--lumo-link-color` lê `color-link`; as sombras leem `shadow-*` por tema; fonte, tamanhos de fonte e os degraus de 10% e 50% saem dos tokens.
- Vaadin 25: campos, checkbox e rádio com borda de 1px em `color-border-control` sobre `input-background`, e anel de foco único em `color-border-focus` (`--vaadin-focus-ring-*`).
- O bloco que reaplica as cores do escuro nos overlays continua.

**@singularidade/brand-assets**

- Os `@font-face` registram o nome longo ('Plus Jakarta Sans Variable', 'JetBrains Mono Variable') e o curto ('Plus Jakarta Sans', 'JetBrains Mono'), para as pilhas que nomeiam a família estática; a JetBrains Mono passa a cobrir os pesos de 100 a 800. Entra na versão 1.0.0 junto com os outros dois pacotes.
