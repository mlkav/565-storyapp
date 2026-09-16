import { LitElement, html, css } from 'lit';
export class AppFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #172033;
      color: #dce2f2;
      padding: 2rem;
      text-align: center;
    }
    a {
      color: #f7b267;
      text-decoration: none;
    }
    .small {
      opacity: 0.7;
      font-size: 0.85rem;
    }
  `;
  render() {
    return html`<footer>
      <strong>✦ Story App</strong>
      <div class="small mt-2">Made with Lit & Bootstrap · 2026</div>
      <a href="https://github.com/mlkav" rel="noreferrer">GitHub</a>
    </footer>`;
  }
}
customElements.define('app-footer', AppFooter);
