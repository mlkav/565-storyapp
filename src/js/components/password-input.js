import { LitElement, html } from 'lit';

export class PasswordInput extends LitElement {
  static properties = { value: { type: String }, isVisible: { type: Boolean }, isValid: { type: Boolean } };
  createRenderRoot() { return this; }
  constructor() {
    super();
    this.value = '';
    this.isVisible = false;
    this.isValid = false;
  }
  handleInput(event) {
    this.value = event.target.value;
    this.isValid = this.value.length >= 8;
    this.dispatchEvent(new CustomEvent('password-changed', { detail: { value: this.value, isValid: this.isValid }, bubbles: true, composed: true }));
  }
  renderIcon() {
    return this.isVisible
      ? html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.2A10.7 10.7 0 0112 5c5.2 0 9 5.3 9 7s-3.8 7-9 7a9.7 9.7 0 01-4.1-.9M5.6 7.1C3.9 8.5 3 10.6 3 12c0 1.7 3.8 7 9 7"></path></svg>`
      : html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"></path><circle cx="12" cy="12" r="2.5"></circle></svg>`;
  }
  render() {
    return html`<div class="input-group password-control"><input class="form-control ${this.value && !this.isValid ? 'is-invalid' : ''}" type="${this.isVisible ? 'text' : 'password'}" .value=${this.value} minlength="8" required placeholder="Minimal 8 karakter" @input=${this.handleInput}><button class="btn btn-outline-secondary password-toggle" type="button" aria-label="${this.isVisible ? 'Sembunyikan password' : 'Tampilkan password'}" @click=${() => { this.isVisible = !this.isVisible; }}>${this.renderIcon()}</button><div class="invalid-feedback">Password minimal 8 karakter.</div></div>`;
  }
}
customElements.define('password-input', PasswordInput);
