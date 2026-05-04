import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://ds.singularidade.digital',
  integrations: [
    starlight({
      title: 'Singularidade DS',
      description: 'Design system da Singularidade Digital — tokens, brand book, componentes',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Português (BR)', lang: 'pt-BR' },
      },
      social: {
        github: 'https://github.com/singularidade-digital-dev/singularidade-ui-design-system',
      },
      logo: {
        src: './src/assets/logo-horizontal.svg',
        replacesTitle: true,
      },
      customCss: ['./src/styles/global.css', './src/styles/starlight-overrides.css'],
      sidebar: [
        {
          label: 'Começar',
          translations: { en: 'Get Started', es: 'Empezar' },
          autogenerate: { directory: 'comecar' },
        },
        {
          label: 'Marca',
          translations: { en: 'Brand', es: 'Marca' },
          autogenerate: { directory: 'marca' },
        },
        {
          label: 'Foundations',
          autogenerate: { directory: 'foundations' },
        },
        {
          label: 'Componentes',
          translations: { en: 'Components', es: 'Componentes' },
          autogenerate: { directory: 'componentes' },
        },
        {
          label: 'Devs',
          autogenerate: { directory: 'devs' },
        },
        {
          label: 'Releases',
          autogenerate: { directory: 'releases' },
        },
      ],
    }),
  ],
});
