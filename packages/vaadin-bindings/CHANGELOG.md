# @singularidade/vaadin-bindings

## 0.1.0

### Minor Changes

- Initial release of `@singularidade/vaadin-bindings` — Vaadin Flow theme bridge mapping `@singularidade/tokens` semantic CSS vars onto Vaadin v25 component tokens (`--vaadin-*`).

  Inclui:
  - `themes/singularidade/styles.css` — bridge completo cobrindo todos os componentes Vaadin v25 (button primary/secondary/tertiary/danger/success, text inputs, tabs, progress-bar, dialog, etc)
  - `themes/singularidade/theme.json` — config Vaadin parent theme + assets list
  - Java helper `digital.singularidade.ui.SingularidadeTheme` com constantes pra brand/theme + `@JsModule` que carrega o iconset `ss:*` automaticamente
  - Maven JAR com tudo empacotado em `META-INF/resources/themes/singularidade/`

  Apps Vaadin Flow consomem via `<dependency>digital.singularidade:vaadin-bindings:0.1.0</dependency>` + `@Theme("singularidade")`.

  **`@singularidade/tokens` patch:** flatten estrutura DTF híbrida `interactive.primary{$value, hover, active}` → `interactive.{primary, primary-hover, primary-active}` flat. Agora gera `--color-interactive-primary-hover` e `--color-interactive-primary-active` corretamente no CSS.
