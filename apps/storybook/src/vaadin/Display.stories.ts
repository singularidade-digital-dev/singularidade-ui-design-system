import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@vaadin/avatar';
import '@vaadin/icon';
import '@vaadin/progress-bar';

const meta: Meta = { title: 'Vaadin/Display', parameters: { layout: 'centered' } };
export default meta;
type Story = StoryObj;

export const Avatar: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center;">
      <vaadin-avatar name="Maria Silva"></vaadin-avatar>
      <vaadin-avatar name="João Pereira" theme="xsmall"></vaadin-avatar>
      <vaadin-avatar name="Ana Costa" theme="small"></vaadin-avatar>
      <vaadin-avatar name="Pedro Souza" theme="large"></vaadin-avatar>
      <vaadin-avatar abbr="SD" theme="xlarge"></vaadin-avatar>
    </div>
  `,
};

export const Badge: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <span theme="badge">Default</span>
      <span theme="badge primary">Primary</span>
      <span theme="badge success">Provisionado</span>
      <span theme="badge error">Falha</span>
      <span theme="badge warning">Pendente</span>
      <span theme="badge contrast">Trial</span>
      <span theme="badge pill">Pill</span>
      <span theme="badge small">Small</span>
    </div>
  `,
};

export const Icon: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center;color:var(--color-text-primary);">
      <vaadin-icon icon="vaadin:user" style="width:24px;height:24px;"></vaadin-icon>
      <vaadin-icon icon="vaadin:cog" style="width:24px;height:24px;"></vaadin-icon>
      <vaadin-icon
        icon="vaadin:check"
        style="width:24px;height:24px;color:var(--color-feedback-success-solid);"
      ></vaadin-icon>
      <vaadin-icon
        icon="vaadin:close"
        style="width:24px;height:24px;color:var(--color-feedback-error-solid);"
      ></vaadin-icon>
      <vaadin-icon
        icon="vaadin:warning"
        style="width:24px;height:24px;color:var(--color-feedback-warning-solid);"
      ></vaadin-icon>
    </div>
  `,
};

export const ProgressBar: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;width:400px;">
      <div>
        <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:6px;">
          Provisionando tenant…
        </div>
        <vaadin-progress-bar value="0.65"></vaadin-progress-bar>
      </div>
      <div>
        <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:6px;">
          Indeterminado
        </div>
        <vaadin-progress-bar indeterminate></vaadin-progress-bar>
      </div>
      <div>
        <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:6px;">
          Sucesso
        </div>
        <vaadin-progress-bar value="1" theme="success"></vaadin-progress-bar>
      </div>
      <div>
        <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:6px;">
          Erro (33%)
        </div>
        <vaadin-progress-bar value="0.33" theme="error"></vaadin-progress-bar>
      </div>
    </div>
  `,
};
