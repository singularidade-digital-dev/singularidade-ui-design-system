import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Foundations/Color',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Paleta brand canônica + escalas neutral, success, error, warning, info. Cores são consumidas via tokens semânticos (`--color-*`).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const swatch = (name: string, value: string, label = '') => html`
  <div style="display:flex;flex-direction:column;gap:6px;width:120px;">
    <div
      style="width:120px;height:80px;background:var(${name});border:1px solid var(--color-border-subtle);border-radius:8px;"
      title="${name}: ${value}"
    ></div>
    <div
      style="font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-secondary);"
    >
      ${name}
    </div>
    <div style="font-family:var(--font-family-mono);font-size:11px;color:var(--color-text-muted);">
      ${value}
    </div>
    ${label ? html`<div style="font-size:11px;color:var(--color-text-muted);">${label}</div>` : ''}
  </div>
`;

const section = (title: string, children: ReturnType<typeof html>) => html`
  <section style="margin-bottom:48px;">
    <h2 style="font-size:18px;font-weight:600;color:var(--color-text-primary);margin:0 0 16px;">
      ${title}
    </h2>
    <div style="display:flex;gap:16px;flex-wrap:wrap;">${children}</div>
  </section>
`;

export const Brand: Story = {
  render: () => html`
    <div style="padding:32px;">
      ${section(
        'Brand (semantic)',
        html`
          ${swatch('--color-brand-primary', '#E91E8B', 'magenta · brand pure')}
          ${swatch('--color-brand-secondary', '#E8606A', 'coral')}
          ${swatch('--color-brand-tertiary', '#F5A623', 'orange')}
        `,
      )}
      ${section(
        'Interactive',
        html`
          ${swatch('--color-interactive-primary', 'coral.600 / coral.400')}
          ${swatch('--color-interactive-primary-hover', 'coral.700 / coral.300')}
          ${swatch('--color-interactive-primary-active', 'coral.500')}
        `,
      )}
      ${section(
        'Surface',
        html`
          ${swatch('--color-surface-base', 'neutral.50 / neutral.950')}
          ${swatch('--color-surface-raised', 'neutral.0 / neutral.800')}
          ${swatch('--color-surface-sunken', 'neutral.100 / neutral.900')}
        `,
      )}
      ${section(
        'Text',
        html`
          ${swatch('--color-text-primary', 'neutral.800 / neutral.50')}
          ${swatch('--color-text-secondary', 'neutral.600 / neutral.300')}
          ${swatch('--color-text-muted', 'neutral.500 / neutral.400')}
          ${swatch('--color-text-disabled', 'neutral.400 / neutral.600')}
        `,
      )}
      ${section(
        'Feedback',
        html`
          ${swatch('--color-feedback-success-solid', 'green')}
          ${swatch('--color-feedback-error-solid', 'red puro #DC2626')}
          ${swatch('--color-feedback-warning-solid', 'amber')}
          ${swatch('--color-feedback-info-solid', 'blue')}
        `,
      )}
    </div>
  `,
};

const palette = (name: string, stops: string[]) => html`
  <section style="margin-bottom:32px;">
    <h3
      style="font-size:14px;font-weight:600;color:var(--color-text-primary);margin:0 0 12px;text-transform:capitalize;"
    >
      ${name}
    </h3>
    <div
      style="display:flex;gap:0;border-radius:8px;overflow:hidden;border:1px solid var(--color-border-subtle);"
    >
      ${stops.map(
        (stop) => html`
          <div
            style="flex:1;height:64px;background:var(--color-brand-${name}-${stop});display:flex;align-items:flex-end;padding:6px;font-family:var(--font-family-mono);font-size:10px;color:${parseInt(
              stop,
            ) > 400
              ? '#fff'
              : '#000'};"
          >
            ${stop}
          </div>
        `,
      )}
    </div>
  </section>
`;

export const BrandScales: Story = {
  render: () => html`
    <div style="padding:32px;">
      <h2 style="font-size:18px;font-weight:600;color:var(--color-text-primary);margin:0 0 24px;">
        Brand color scales
      </h2>
      ${palette('magenta', [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        '950',
      ])}
      ${palette('coral', [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        '950',
      ])}
      ${palette('orange', [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        '950',
      ])}
    </div>
  `,
};

export const Gradient: Story = {
  render: () => html`
    <div style="padding:32px;">
      <h2 style="font-size:18px;font-weight:600;color:var(--color-text-primary);margin:0 0 16px;">
        Gradient brand canônico
      </h2>
      <div
        style="height:160px;border-radius:12px;background:var(--color-brand-gradient);box-shadow:var(--shadow-light-md);"
      ></div>
      <p
        style="font-family:var(--font-family-mono);font-size:12px;color:var(--color-text-secondary);margin-top:12px;"
      >
        --color-brand-gradient
      </p>
    </div>
  `,
};
