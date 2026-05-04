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

// Bridge our DS tokens → Vaadin Lumo tokens so every Vaadin component picks
// up the brand palette. Storybook-only preview; the real bridge lives in Phase 3
// (vaadin-bindings inside singularidade-ui-vaadin).
import './lumo-overrides.css';

// Intensity presets to compare different primary palette strategies live.
// Default ("sober") matches the spec's hybrid color strategy.
const INTENSITY_PRESETS: Record<
  string,
  Record<
    string,
    { lightPrimary: string; lightHover: string; darkPrimary: string; darkHover: string }
  >
> = {
  sober: {
    coral: {
      lightPrimary: '#BE3550',
      lightHover: '#9F1239',
      darkPrimary: '#FB7185',
      darkHover: '#FDA4AF',
    },
  },
  brand: {
    coral: {
      lightPrimary: '#E8606A',
      lightHover: '#BE3550',
      darkPrimary: '#FDA4AF',
      darkHover: '#FECDD3',
    },
  },
  magenta: {
    coral: {
      lightPrimary: '#E91E8B',
      lightHover: '#9D174D',
      darkPrimary: '#F472B6',
      darkHover: '#FBCFE8',
    },
  },
};

function applyIntensity(intensity: string, theme: string) {
  const preset = INTENSITY_PRESETS[intensity]?.coral || INTENSITY_PRESETS.sober.coral;
  const isDark = theme === 'dark';
  const primary = isDark ? preset.darkPrimary : preset.lightPrimary;
  const hover = isDark ? preset.darkHover : preset.lightHover;
  const root = document.documentElement;
  root.style.setProperty('--color-interactive-primary', primary);
  root.style.setProperty('--color-interactive-primary-hover', hover);
  root.style.setProperty('--lumo-primary-color', primary);
  root.style.setProperty('--lumo-primary-text-color', primary);
  root.style.setProperty('--color-border-focus', primary);
}

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
      applyIntensity(intensity, theme);
      return story();
    },
  ],
};

export default preview;
