# @singularidade/tokens

## 0.2.0

### Minor Changes

- fe42225: Adiciona target Java per-brand × mode em `build/java/digital/singularidade/tokens/email/`. Gera 4 classes (`EmailTokensIntegrasLight`, `EmailTokensIntegrasDark`, `EmailTokensSingularidadeLight`, `EmailTokensSingularidadeDark`) com hex literais resolvidos por brand+mode — consumível por Spring/Thymeleaf em e-mails inline-styled (sem CSS variables, sem theme switching em runtime). Reusa o format `java/class` existente; mesma convenção de nomes camelCase. Construído junto com o build de tokens; não requer pnpm/Maven plugins extras.

## 0.1.1

### Patch Changes

- Initial release of `@singularidade/vaadin-bindings` — Vaadin Flow theme bridge mapping `@singularidade/tokens` semantic CSS vars onto Vaadin v25 component tokens (`--vaadin-*`).

  Inclui:
  - `themes/singularidade/styles.css` — bridge completo cobrindo todos os componentes Vaadin v25 (button primary/secondary/tertiary/danger/success, text inputs, tabs, progress-bar, dialog, etc)
  - `themes/singularidade/theme.json` — config Vaadin parent theme + assets list
  - Java helper `digital.singularidade.ui.SingularidadeTheme` com constantes pra brand/theme + `@JsModule` que carrega o iconset `ss:*` automaticamente
  - Maven JAR com tudo empacotado em `META-INF/resources/themes/singularidade/`

  Apps Vaadin Flow consomem via `<dependency>digital.singularidade:vaadin-bindings:0.1.0</dependency>` + `@Theme("singularidade")`.

  **`@singularidade/tokens` patch:** flatten estrutura DTF híbrida `interactive.primary{$value, hover, active}` → `interactive.{primary, primary-hover, primary-active}` flat. Agora gera `--color-interactive-primary-hover` e `--color-interactive-primary-active` corretamente no CSS.

## 0.1.0

### Minor Changes

- Initial release of `@singularidade/tokens` — design tokens da Singularidade Digital.

  Inclui:
  - Core tokens: brand colors (magenta/coral/orange em scales 50-950), neutral warm-magenta undertone, feedback (success/error/warning/info), typography (Plus Jakarta Sans + JetBrains Mono), spacing (escala 4px), radius, shadow, duration, easing
  - Semantic tokens light + dark com hybrid color strategy (brand puro em superfícies brand, coral.600/coral.400 como interactive primary)
  - Component tokens (button, card, input, dialog)
  - Sub-brand overlays (singularidade matriz + integras)
  - Outputs Style Dictionary: CSS multi-brand × multi-theme + JS/TS + JSON + Java
