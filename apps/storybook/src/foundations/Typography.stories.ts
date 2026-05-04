import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const sample = (size: string, label: string) => html`
  <div
    style="display:flex;align-items:baseline;gap:24px;border-bottom:1px solid var(--color-border-subtle);padding:16px 0;"
  >
    <div
      style="font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);min-width:80px;"
    >
      ${size}
    </div>
    <div
      style="font-family:var(--font-family-sans);font-size:var(--font-size-${size});color:var(--color-text-primary);font-weight:600;flex:1;"
    >
      Singularidade Digital ${label}
    </div>
  </div>
`;

export const Scale: Story = {
  render: () => html`
    <div style="padding:32px;font-family:var(--font-family-sans);">
      <h2 style="font-size:18px;margin:0 0 24px;color:var(--color-text-primary);">
        Type scale (modular 1.125)
      </h2>
      ${sample('xs', 'xs')} ${sample('s', 's')} ${sample('m', 'm — body default')}
      ${sample('l', 'l')} ${sample('xl', 'xl')} ${sample('2xl', '2xl')} ${sample('3xl', '3xl')}
      ${sample('4xl', '4xl')} ${sample('5xl', '5xl — hero')}
    </div>
  `,
};

export const Families: Story = {
  render: () => html`
    <div style="padding:32px;display:flex;flex-direction:column;gap:32px;">
      <div>
        <h3
          style="font-family:var(--font-family-sans);color:var(--color-text-secondary);font-size:11px;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 8px;"
        >
          Sans · Plus Jakarta Sans Variable
        </h3>
        <div
          style="font-family:var(--font-family-sans);font-size:48px;font-weight:700;letter-spacing:-0.02em;color:var(--color-text-primary);"
        >
          Aa Bb Cc 123
        </div>
        <p
          style="font-family:var(--font-family-sans);color:var(--color-text-secondary);max-width:640px;line-height:1.5;"
        >
          Plus Jakarta Sans é geometric, com proporções modernas e um leve toque humanista. Usada em
          display e body.
        </p>
      </div>
      <div>
        <h3
          style="font-family:var(--font-family-sans);color:var(--color-text-secondary);font-size:11px;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 8px;"
        >
          Mono · JetBrains Mono Variable
        </h3>
        <div
          style="font-family:var(--font-family-mono);font-size:36px;font-weight:600;color:var(--color-text-primary);"
        >
          const x = 42;
        </div>
        <p
          style="font-family:var(--font-family-mono);color:var(--color-text-secondary);max-width:640px;line-height:1.5;font-size:13px;"
        >
          // JetBrains Mono pra código, números financeiros, IDs e labels técnicos.
        </p>
      </div>
    </div>
  `,
};

export const Weights: Story = {
  render: () => html`
    <div style="padding:32px;font-family:var(--font-family-sans);">
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="font-weight:400;font-size:24px;color:var(--color-text-primary);">
          Regular 400 — A geometria da marca em corpo de texto
        </div>
        <div style="font-weight:500;font-size:24px;color:var(--color-text-primary);">
          Medium 500 — Emphasis sutil
        </div>
        <div style="font-weight:600;font-size:24px;color:var(--color-text-primary);">
          Semibold 600 — Headings, labels
        </div>
        <div style="font-weight:700;font-size:24px;color:var(--color-text-primary);">
          Bold 700 — Display, hero
        </div>
      </div>
    </div>
  `,
};
