import { LitElement, html, css } from 'lit';

export class LoadingSpinner extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 4rem 1rem;
      color: #5b4bdb;
    }
    .spinner {
      width: 1.5rem;
      height: 1.5rem;
      border: 0.2rem solid #d9d5ff;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
  render() {
    return html`<div class="spinner" role="status" aria-label="Loading"></div>
      <span><slot>Memuat...</slot></span>`;
  }
}
customElements.define('loading-spinner', LoadingSpinner);
