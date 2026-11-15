import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const site = 'https://ds.singularidade.digital';
// Share image for every page: public/og.png (1200×630), rendered from scripts/og-card.html.
const ogImage = `${site}/og.png`;
const ogImageAlt =
  'Símbolo da Singularidade ao lado do título Singularidade Design System e da versão 1.0.0';

export default defineConfig({
  site,
  integrations: [
    starlight({
      title: 'Singularidade DS',
      favicon: '/favicon.png',
      description: 'Design system da Singularidade Digital — tokens, brand book, componentes',
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: ogImage } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: ogImageAlt } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: ogImage } },
        { tag: 'meta', attrs: { name: 'twitter:image:alt', content: ogImageAlt } },
      ],
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
