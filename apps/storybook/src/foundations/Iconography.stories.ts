import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

interface IconEntry {
  name: string;
  prefix: string;
  qualified: string;
  viewBox: string;
  source: string;
  path: string;
}

interface Catalog {
  icons: IconEntry[];
}

const meta: Meta = { title: 'Foundations/Iconography', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;

// Load catalog and SVGs via static dirs (mapped in .storybook/main.ts).
async function loadCatalog(): Promise<Catalog> {
  const res = await fetch('/brand-build/icons.json');
  return res.json();
}

const iconImg = (entry: IconEntry) => {
  const folder = entry.prefix === 'lucide' ? 'lucide' : 'custom';
  return html`
    <div
      style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px;background:var(--color-surface-raised);border:1px solid var(--color-border-subtle);border-radius:8px;min-width:100px;"
    >
      <img
        src="/icons/${folder}/${entry.name}.svg"
        alt="${entry.qualified}"
        style="width:32px;height:32px;color:var(--color-text-primary);"
      />
      <div
        style="font-family:var(--font-family-mono);font-size:10px;color:var(--color-text-muted);text-align:center;"
      >
        ${entry.qualified}
      </div>
    </div>
  `;
};

async function renderSection(filter: (e: IconEntry) => boolean, title: string, subtitle: string) {
  const catalog = await loadCatalog();
  const filtered = catalog.icons.filter(filter);
  return html`
    <div style="padding:32px;font-family:var(--font-family-sans);">
      <h2 style="font-size:18px;color:var(--color-text-primary);margin:0 0 8px;">${title}</h2>
      <p style="color:var(--color-text-secondary);margin:0 0 24px;">
        ${filtered.length} ${subtitle}
      </p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">${filtered.map(iconImg)}</div>
    </div>
  `;
}

export const Custom: Story = {
  render: () => {
    const container = document.createElement('div');
    container.textContent = 'Loading…';
    renderSection(
      (e) => e.prefix === 'ss',
      'Custom domain icons (ss:*)',
      'ícones de domínio Singularidade. ViewBox 24×24, stroke 1.5, currentColor.',
    ).then((tree) => {
      container.innerHTML = '';
      // Append rendered lit template
      import('lit').then(({ render }) => render(tree, container));
    });
    return container;
  },
};

export const Lucide: Story = {
  render: () => {
    const container = document.createElement('div');
    container.textContent = 'Loading…';
    renderSection(
      (e) => e.prefix === 'lucide',
      'Lucide subset',
      'ícones do Lucide curados pra apps SaaS.',
    ).then((tree) => {
      container.innerHTML = '';
      import('lit').then(({ render }) => render(tree, container));
    });
    return container;
  },
};
