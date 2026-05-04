import type { Preview } from '@storybook/web-components';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

// Import token CSS — both brands × both modes. The themes addon switches via data-theme.
import '@singularidade/tokens/css/singularidade.light.css';
import '@singularidade/tokens/css/singularidade.dark.css';
import '@singularidade/tokens/css/integras.light.css';
import '@singularidade/tokens/css/integras.dark.css';

// Import brand fonts so lockup SVGs render with Plus Jakarta Sans + JetBrains Mono.
import '@singularidade/brand-assets/fonts/plus-jakarta-sans.css';
import '@singularidade/brand-assets/fonts/jetbrains-mono.css';

// Global page styles — neutral background using semantic tokens.
import './preview.css';

// Bridge our DS tokens → Vaadin v25 tokens so every Vaadin component picks
// up the brand palette. Storybook-only preview; the real bridge lives in Phase 3
// (vaadin-bindings inside singularidade-ui-vaadin).
import './vaadin-overrides.css';

// Intensity is applied via data-intensity attribute on <html>; the matching
// CSS rules live in vaadin-overrides.css for proper cascade with the brand+theme
// rules from the tokens package.

const preview: Preview = {
  globalTypes: {
    intensity: {
      name: 'Intensity',
      description: 'Primary color intensity preset',
      defaultValue: 'sober',
      toolbar: {
        icon: 'paintbrush',
        title: 'Intensity',
        items: [
          { value: 'sober', title: 'Sober (industry standard) — coral.600 / coral.400' },
          { value: 'brand', title: 'Brand pure — coral.500 / coral.300' },
          { value: 'magenta', title: 'Magenta max — magenta.500 / magenta.300' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // we use addon-themes for theme switching
    },
    a11y: {
      config: {},
      options: {},
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Foundations',
          ['Tokens', 'Color', 'Typography', 'Spacing', 'Motion', 'Iconography', 'Logos'],
          'Vaadin',
          ['Inputs', 'Actions', 'Display', 'Layout', 'Overlay'],
          '*',
        ],
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        'singularidade · light': 'singularidade light',
        'singularidade · dark': 'singularidade dark',
        'integras · light': 'integras light',
        'integras · dark': 'integras dark',
      },
      defaultTheme: 'singularidade · light',
      attributeName: 'data-theme-pair',
      // We set both data-brand and data-theme via a custom decorator below since
      // withThemeByDataAttribute only sets a single attribute.
    }),
    (story, context) => {
      const themePair = context.globals.theme || 'singularidade · light';
      const [brand, theme] = themePair.split(' · ');
      const intensity = context.globals.intensity || 'sober';
      const root = document.documentElement;
      root.setAttribute('data-brand', brand);
      root.setAttribute('data-theme', theme);
      root.setAttribute('data-intensity', intensity);
      return story();
    },
  ],
};

export default preview;
