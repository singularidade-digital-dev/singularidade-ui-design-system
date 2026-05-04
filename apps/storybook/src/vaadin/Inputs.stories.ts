import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@vaadin/text-field';
import '@vaadin/password-field';
import '@vaadin/integer-field';
import '@vaadin/number-field';
import '@vaadin/text-area';
import '@vaadin/combo-box';
import '@vaadin/select';
import '@vaadin/date-picker';
import '@vaadin/checkbox';

const meta: Meta = { title: 'Vaadin/Inputs', parameters: { layout: 'centered' } };
export default meta;
type Story = StoryObj;

export const TextField: Story = {
  render: () => html`
    <vaadin-text-field
      label="Nome completo"
      placeholder="Como seu nome aparece no documento"
      helper-text="Conforme RG ou CNH"
      style="width: 320px;"
    ></vaadin-text-field>
  `,
};

export const PasswordField: Story = {
  render: () => html`
    <vaadin-password-field
      label="Senha"
      helper-text="Mínimo 12 caracteres"
      style="width: 320px;"
    ></vaadin-password-field>
  `,
};

export const IntegerField: Story = {
  render: () => html`
    <vaadin-integer-field
      label="Quantidade"
      step-buttons-visible
      min="0"
      max="100"
      value="10"
      style="width: 200px;"
    ></vaadin-integer-field>
  `,
};

export const NumberField: Story = {
  render: () => html`
    <vaadin-number-field
      label="Valor"
      step="0.01"
      min="0"
      style="width: 200px;"
    ></vaadin-number-field>
  `,
};

export const TextArea: Story = {
  render: () => html`
    <vaadin-text-area
      label="Descrição"
      placeholder="Conte mais sobre…"
      style="width: 400px;"
    ></vaadin-text-area>
  `,
};

export const ComboBox: Story = {
  render: () => html`
    <vaadin-combo-box
      label="País"
      .items=${['Brasil', 'Portugal', 'Estados Unidos', 'Argentina', 'Chile']}
      style="width: 320px;"
    ></vaadin-combo-box>
  `,
};

export const Select: Story = {
  render: () => html`
    <vaadin-select
      label="Plano"
      .items=${[
        { label: 'Starter', value: 'starter' },
        { label: 'Pro', value: 'pro' },
        { label: 'Enterprise', value: 'enterprise' },
      ]}
      value="pro"
      style="width: 200px;"
    ></vaadin-select>
  `,
};

export const DatePicker: Story = {
  render: () => html`
    <vaadin-date-picker label="Data de início" style="width: 200px;"></vaadin-date-picker>
  `,
};

export const Checkbox: Story = {
  render: () => html` <vaadin-checkbox label="Aceito os termos de uso" checked></vaadin-checkbox> `,
};

export const ValidationStates: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;width:320px;">
      <vaadin-text-field label="Default" placeholder="Estado padrão"></vaadin-text-field>
      <vaadin-text-field
        label="Error"
        invalid
        error-message="Campo obrigatório"
        value=""
      ></vaadin-text-field>
      <vaadin-text-field label="Disabled" disabled value="Não editável"></vaadin-text-field>
      <vaadin-text-field label="Readonly" readonly value="Apenas leitura"></vaadin-text-field>
      <vaadin-text-field label="Required" required helper-text="*"></vaadin-text-field>
    </div>
  `,
};
