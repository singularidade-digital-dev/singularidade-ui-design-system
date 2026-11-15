# ADR-006: Storybook 8 com web-components renderer

- **Status:** accepted
- **Date:** 2026-05-03
- **Deciders:** singularidade.digital

> **Nota de status (2026-11-15, release 1.0.0).** A decisão continua valendo: Storybook 8.6 com `@storybook/web-components-vite` e Lit. O texto abaixo fica como foi escrito, mas dois pontos não valem mais:
>
> - "Vaadin v25 abandonou Lumo — bridge `--vaadin-*` necessário": o Vaadin 25.0 removeu o Material, não o Lumo. A ponte `@singularidade/vaadin-bindings` segue mapeando `--lumo-*` e usa as style properties `--vaadin-*` só no anel de foco e nos campos (borda e fundo). A cópia do Storybook (`.storybook/vaadin-overrides.css`) também só mapeia `--lumo-*`.
> - O Storybook roda os web components do Vaadin 24 (`@vaadin/*` ^24.9.0, 24.10.1 no lockfile), com essa cópia da ponte sobre os quatro `{marca}.{tema}.css`. Ele não carrega o tema `singularidade-base` da 1.0.0, gerado do `tokens/theme.css`, então não mostra exatamente o tema dos apps, que rodam o Vaadin 25.
>
> O Chromatic não foi adotado: não há dependência nem passo dele no CI.

## Contexto

Apps Singularidade são Vaadin Flow (Java server-side rendering). Componentes da UI são Vaadin web-components customizados. Como apresentar/documentar/iterar visualmente sem precisar do app full-stack?

## Decisão

**Storybook 8** com renderer **`@storybook/web-components-vite`** + **Lit** para escrever stories. Renderiza Vaadin web-components nativamente.

## Alternativas consideradas

| Stack                                       | Pros                                                                                             | Contras                                                        |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| **Storybook 8 web-components-vite + Lit** ✓ | Vaadin é web-components, integração natural, hot reload via Vite, ecossistema Storybook (addons) | Curva pra Lit syntax (template literals)                       |
| Storybook React + wrappers                  | React conhecido                                                                                  | Wrap web-component em React adiciona indireção                 |
| Vaadin Designer / Vaadin TestBench          | Oficial Vaadin                                                                                   | Não é Storybook-class — sem visual regression, addons fracos   |
| Histoire                                    | Vue-friendly                                                                                     | Sem suporte web-components                                     |
| Custom dev playground                       | Total controle                                                                                   | Reinvent the wheel — perderiam addons (a11y, themes, viewport) |

## Consequências

**Positivas:**

- Stories rendem Vaadin components nativamente sem wrappers
- Addons usados: `addon-essentials`, `addon-a11y` (axe-core inline), `addon-themes` (light/dark + brand selector), `storybook-addon-pseudo-states` (`:hover`/`:focus` forçados)
- Vite HMR rápido
- Chromatic para visual regression (Fase 7)

**Negativas:**

- Lit syntax tem curva (`html\`<vaadin-button .items=\${...}>\`\``)
- Storybook v9 saiu mas migration ainda imatura — ficamos em v8.6
- Vaadin v25 abandonou Lumo — bridge `--vaadin-*` necessário, ver [Storybook bridge](https://github.com/singularidade-digital-dev/singularidade-ui-design-system/blob/main/apps/storybook/.storybook/vaadin-overrides.css)

## Implementação

```ts
// apps/storybook/.storybook/main.ts
import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  framework: { name: '@storybook/web-components-vite', options: {} },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-themes'],
};
```

Stories em TypeScript com Lit:

```ts
import { html } from 'lit';
export const Primary = {
  render: () => html`<vaadin-button theme="primary">Salvar</vaadin-button>`,
};
```

## Referências

- [Storybook 8 web-components docs](https://storybook.js.org/docs/web-components/get-started/install)
- [Lit](https://lit.dev/)
- [Vaadin web-components](https://vaadin.com/components)
