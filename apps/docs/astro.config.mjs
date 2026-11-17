import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const site = 'https://ds.singularidade.digital';
// Share image for every page: public/og.png (1200×630), rendered from scripts/og-card.html.
const ogImage = `${site}/og.png`;
const ogImageAlt =
  'Símbolo da Singularidade ao lado do título Singularidade Design System e da versão 1.0.0';

export default defineConfig({
  site,
  // Pages that moved when the Design System v2 content arrived: old links keep working.
  redirects: {
    '/foundations/tokens': '/fundamentos/tokens/',
    '/foundations/tema': '/fundamentos/tema/',
    '/foundations/multi-marca': '/fundamentos/multi-marca/',
    '/marca/04-tipografia': '/fundamentos/tipografia/',
    '/marca/05-voice-tone': '/conteudo/voz-e-tom/',
    '/marca/06-motion': '/fundamentos/movimento/',
    '/marca/07-iconografia': '/fundamentos/iconografia/',
    '/marca/08-ilustracao': '/fundamentos/imagem/',
    '/marca/09-layout': '/fundamentos/espaco-e-layout/',
    '/marca/10-acessibilidade': '/acessibilidade/meta-e-base-legal/',
    '/componentes/primitivos': '/componentes/',
  },
  integrations: [
    starlight({
      title: 'Singularidade DS',
      favicon: '/favicon.png',
      description:
        'Design system da Singularidade Digital: princípios, conteúdo, fundamentos, componentes e tokens do Design System v2',
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
          items: [
            'comecar/visao-geral',
            'comecar/como-usar',
            'comecar/instalacao',
            'comecar/checklist',
          ],
        },
        { label: 'Princípios', autogenerate: { directory: 'principios' } },
        { label: 'Conteúdo', autogenerate: { directory: 'conteudo' } },
        { label: 'Fundamentos', autogenerate: { directory: 'fundamentos' } },
        {
          label: 'Componentes',
          items: [
            'componentes',
            {
              label: 'Ações',
              collapsed: true,
              items: ['componentes/button', 'componentes/link'],
            },
            {
              label: 'Formulário',
              collapsed: true,
              items: [
                'componentes/text-field',
                'componentes/select',
                'componentes/checkbox',
                'componentes/chips',
              ],
            },
            {
              label: 'Navegação',
              collapsed: true,
              items: [
                'componentes/header',
                'componentes/side-nav',
                'componentes/tabs',
                'componentes/stepper',
              ],
            },
            {
              label: 'Exibição',
              collapsed: true,
              items: [
                'componentes/page-header',
                'componentes/connector-card',
                'componentes/price',
                'componentes/badge',
                'componentes/avatar',
                'componentes/table',
                'componentes/empty-state',
                'componentes/faixas',
              ],
            },
            {
              label: 'Feedback',
              collapsed: true,
              items: [
                'componentes/alert',
                'componentes/toast',
                'componentes/dialog',
                'componentes/meter',
                'componentes/skeleton',
                'componentes/tour',
              ],
            },
          ],
        },
        {
          label: 'Páginas-modelo',
          items: [
            'paginas-modelo/padroes',
            'paginas-modelo/vitrine',
            'paginas-modelo/login',
            'paginas-modelo/cadastro',
            'paginas-modelo/configuracoes',
            'paginas-modelo/estado-vazio',
            'paginas-modelo/email',
            'paginas-modelo/site',
          ],
        },
        { label: 'Acessibilidade', autogenerate: { directory: 'acessibilidade' } },
        { label: 'Marca', autogenerate: { directory: 'marca' } },
        { label: 'Devs', autogenerate: { directory: 'devs' } },
        { label: 'Versões', autogenerate: { directory: 'releases' } },
      ],
    }),
  ],
});
