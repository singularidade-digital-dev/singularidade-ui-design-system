import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'dark',
  brandTitle: 'Singularidade DS · Vaadin 24',
  brandUrl: 'https://github.com/singularidade-digital-dev/singularidade-ui-design-system',
  brandImage: '/logos/singularidade/horizontal.svg',
  brandTarget: '_blank',

  // Brand-aligned dark palette
  colorPrimary: '#FB7185', // coral.400 — interactive primary dark
  colorSecondary: '#E91E8B', // magenta — accents

  // App backgrounds
  appBg: '#1A1517', // neutral.950 — surface base dark
  appContentBg: '#261A21', // neutral.800 — surface raised dark
  appPreviewBg: '#FDFAFC', // preview iframe always neutral so stories control their own background
  appBorderColor: 'rgba(200, 188, 196, 0.12)',
  appBorderRadius: 8,

  // Text
  textColor: '#FDFAFC',
  textInverseColor: '#1A111A',
  textMutedColor: '#A697A1', // neutral.400

  // Toolbar
  barTextColor: '#FDFAFC',
  barSelectedColor: '#FB7185', // coral.400 — matches primary
  barHoverColor: '#FDA4AF', // coral.300
  barBg: '#1A1517',

  // Form inputs
  inputBg: '#1A111A',
  inputBorder: 'rgba(200, 188, 196, 0.16)',
  inputTextColor: '#FDFAFC',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme,
});
