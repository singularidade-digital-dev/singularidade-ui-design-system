import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    'storybook-addon-pseudo-states',
  ],
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [
    '../public',
    { from: '../../../packages/brand-assets/src/logos', to: '/logos' },
    { from: '../../../packages/brand-assets/src/icons', to: '/icons' },
    { from: '../../../packages/brand-assets/build', to: '/brand-build' },
  ],
  typescript: {
    check: false,
  },
};

export default config;
