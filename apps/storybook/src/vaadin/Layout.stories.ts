import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@vaadin/horizontal-layout';
import '@vaadin/vertical-layout';
import '@vaadin/split-layout';
import '@vaadin/tabs';

const meta: Meta = { title: 'Vaadin/Layout', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;

const block = (label: string, color = 'var(--color-brand-primary)') => html`
  <div
    style="background:${color};color:var(--color-text-inverse);padding:24px;border-radius:8px;font-family:var(--font-family-sans);font-weight:600;text-align:center;flex:1;"
  >
    ${label}
  </div>
`;

export const HorizontalLayout: Story = {
  render: () => html`
    <div style="padding:32px;">
      <vaadin-horizontal-layout theme="spacing padding">
        ${block('Box 1')} ${block('Box 2', 'var(--color-brand-secondary)')}
        ${block('Box 3', 'var(--color-brand-tertiary)')}
      </vaadin-horizontal-layout>
    </div>
  `,
};

export const VerticalLayout: Story = {
  render: () => html`
    <div style="padding:32px;max-width:480px;">
      <vaadin-vertical-layout theme="spacing padding">
        ${block('Top')} ${block('Middle', 'var(--color-brand-secondary)')}
        ${block('Bottom', 'var(--color-brand-tertiary)')}
      </vaadin-vertical-layout>
    </div>
  `,
};

export const SplitLayout: Story = {
  render: () => html`
    <vaadin-split-layout style="height: 400px; border: 1px solid var(--color-border-subtle);">
      <div style="padding: 24px; background: var(--color-surface-sunken);">
        <h3 style="margin: 0 0 8px;">Lista</h3>
        <p style="color: var(--color-text-secondary); font-size: 13px;">Item 1 · Item 2 · Item 3</p>
      </div>
      <div style="padding: 24px;">
        <h3 style="margin: 0 0 8px;">Detalhes</h3>
        <p style="color: var(--color-text-secondary); font-size: 13px;">
          Conteúdo detalhado do item selecionado.
        </p>
      </div>
    </vaadin-split-layout>
  `,
};

export const Tabs: Story = {
  render: () => html`
    <div style="padding:32px;max-width:600px;">
      <vaadin-tabs>
        <vaadin-tab>Visão geral</vaadin-tab>
        <vaadin-tab>Tools (12)</vaadin-tab>
        <vaadin-tab>Versões</vaadin-tab>
        <vaadin-tab>Faturamento</vaadin-tab>
        <vaadin-tab>Configurações</vaadin-tab>
      </vaadin-tabs>
    </div>
  `,
};
