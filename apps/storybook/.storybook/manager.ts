import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'Singularidade DS · Vaadin 24',
  brandUrl: 'https://github.com/singularidade-digital-dev/singularidade-ui-design-system',
  brandImage: '/logos/singularidade/horizontal.svg',
  brandTarget: '_blank',
});

addons.setConfig({
  theme,
});
