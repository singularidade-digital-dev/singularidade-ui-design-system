import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = { title: 'Foundations/Logos', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;

const card = (title: string, src: string, height = 120) => html`
  <div
    style="background:var(--color-surface-raised);border:1px solid var(--color-border-subtle);border-radius:12px;padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;min-width:200px;"
  >
    <img src="${src}" alt="${title}" style="height:${height}px;width:auto;" />
    <div
      style="font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-secondary);"
    >
      ${title}
    </div>
  </div>
`;

const monoCard = (title: string, src: string, color: string, bg: string) => html`
  <div
    style="background:${bg};border:1px solid var(--color-border-subtle);border-radius:12px;padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;min-width:200px;color:${color};"
  >
    <img src="${src}" alt="${title}" style="height:120px;width:auto;" />
    <div style="font-family:var(--font-family-mono);font-size:11px;">${title}</div>
  </div>
`;

export const Singularidade: Story = {
  render: () => html`
    <div style="padding:32px;display:flex;flex-direction:column;gap:24px;">
      <h2 style="font-size:18px;color:var(--color-text-primary);margin:0;">
        Singularidade Digital
      </h2>
      <div style="display:flex;gap:24px;flex-wrap:wrap;">
        ${card('symbol.svg', '/logos/singularidade/symbol.svg')}
        ${card('horizontal.svg', '/logos/singularidade/horizontal.svg')}
        ${card('vertical.svg', '/logos/singularidade/vertical.svg')}
      </div>
      <h3 style="font-size:14px;color:var(--color-text-primary);margin:8px 0 0;">
        Monochrome (currentColor)
      </h3>
      <div style="display:flex;gap:24px;flex-wrap:wrap;">
        ${monoCard('on light', '/logos/singularidade/monochrome.svg', '#261A21', '#FDFAFC')}
        ${monoCard('on dark', '/logos/singularidade/monochrome.svg', '#FDFAFC', '#1A1517')}
      </div>
      <h3 style="font-size:14px;color:var(--color-text-primary);margin:8px 0 0;">Favicon PNGs</h3>
      <div style="display:flex;gap:24px;align-items:flex-end;">
        ${card('icon-32', '/logos/singularidade/icon-32.png', 32)}
        ${card('icon-180', '/logos/singularidade/icon-180.png', 90)}
        ${card('icon-512', '/logos/singularidade/icon-512.png', 180)}
      </div>
    </div>
  `,
};

export const Integras: Story = {
  render: () => html`
    <div style="padding:32px;display:flex;flex-direction:column;gap:24px;">
      <h2 style="font-size:18px;color:var(--color-text-primary);margin:0;">integras.digital</h2>
      <div style="display:flex;gap:24px;flex-wrap:wrap;">
        ${card('symbol.svg', '/logos/integras/symbol.svg')}
        ${card('horizontal.svg', '/logos/integras/horizontal.svg')}
        ${card('vertical.svg', '/logos/integras/vertical.svg')}
      </div>
      <h3 style="font-size:14px;color:var(--color-text-primary);margin:8px 0 0;">
        Monochrome (currentColor)
      </h3>
      <div style="display:flex;gap:24px;flex-wrap:wrap;">
        ${monoCard('on light', '/logos/integras/monochrome.svg', '#261A21', '#FDFAFC')}
        ${monoCard('on dark', '/logos/integras/monochrome.svg', '#FDFAFC', '#1A1517')}
      </div>
      <h3 style="font-size:14px;color:var(--color-text-primary);margin:8px 0 0;">Favicon PNGs</h3>
      <div style="display:flex;gap:24px;align-items:flex-end;">
        ${card('icon-32', '/logos/integras/icon-32.png', 32)}
        ${card('icon-180', '/logos/integras/icon-180.png', 90)}
        ${card('icon-512', '/logos/integras/icon-512.png', 180)}
      </div>
    </div>
  `,
};
