import { LitElement, html, css } from 'lit';
export class ProfileCard extends LitElement {
  static styles = css`:host{display:block}.card{background:white;border-radius:1.2rem;padding:2rem;box-shadow:0 1rem 2.5rem #17203314;text-align:center}.avatar{width:92px;height:92px;border-radius:50%;background:linear-gradient(135deg,#5b4bdb,#f7b267);display:grid;place-items:center;color:white;font-size:2rem;font-weight:800;margin:auto}.badge{display:inline-block;background:#eeecff;color:#4033a8;border-radius:99px;padding:.35rem .7rem;margin:.2rem;font-size:.8rem}`;
  render() { return html`<div class="card profile-shell"><div class="avatar">ALD</div><h2 class="mt-3 mb-1">rnlkav</h2><p class="text-secondary">Front-End Web Developer</p><p>Membangun pengalaman web yang hangat, mudah digunakan, dan bermakna.</p><div>${['JavaScript','Lit','Bootstrap','Sass','Accessibility'].map((skill) => html`<span class="badge">${skill}</span>`)}</div></div>`; }
}
customElements.define('profile-card', ProfileCard);
