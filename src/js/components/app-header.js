import { LitElement, html } from 'lit';
import { locale, setLocale, t } from '../utils/i18n.js';
import { clearSession, getUser, isAuthenticated } from '../utils/auth.js';

export class AppHeader extends LitElement {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('auth-changed', this.handleAuthChanged);
  }
  disconnectedCallback() {
    window.removeEventListener('auth-changed', this.handleAuthChanged);
    super.disconnectedCallback();
  }
  handleAuthChanged = () => this.requestUpdate();
  render() {
    const loggedIn = isAuthenticated();
    return html` <nav class="app-nav navbar navbar-expand-lg sticky-top">
        <div class="container py-2">
          <a class="navbar-brand brand-mark" href="#/">✦ Story App</a>
          <div class="d-flex align-items-center gap-2">
            <select
              class="form-select form-select-sm language-select"
              aria-label="Language"
              id="language-select"
              @change=${this.handleLocaleChange}
            >
              <option value="id" ?selected=${locale() === 'id'}>ID</option>
              <option value="en" ?selected=${locale() === 'en'}>EN</option>
              <option value="es" ?selected=${locale() === 'es'}>ES</option>
            </select>
            <button
              class="btn btn-primary menu-trigger d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#main-menu"
              aria-controls="main-menu"
              aria-expanded="false"
              aria-label="Open menu"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16"></path>
              </svg>
            </button>
            <div class="header-actions d-none d-lg-flex gap-2">
              ${loggedIn ? html`<span class="small text-secondary align-self-center">Hi, ${getUser()?.name || ''}</span>` : html`<a class="btn btn-outline-primary" href="#/login">${t('login')}</a><a class="btn btn-primary" href="#/register">${t('register')}</a>`}
              ${
                loggedIn
                  ? html`<a
                        class="icon-action"
                        href="#/add"
                        title="${t('add')}"
                        aria-label="${t('add')}"
                        ><svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 5v14M5 12h14"></path></svg></a
                      ><a
                        class="icon-action"
                        href="#/profile"
                        title="${t('profile')}"
                        aria-label="${t('profile')}"
                        ><svg viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="12" cy="8" r="3"></circle>
                          <path d="M5 20c.8-3.3 3.2-5 7-5s6.2 1.7 7 5"></path></svg></a
                      ><button
                        class="icon-action icon-action-danger"
                        type="button"
                        title="${t('logout')}"
                        aria-label="${t('logout')}"
                        @click=${this.logout}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9"></path>
                        </svg>
                      </button>`
                  : ''
              }
            </div>
          </div>
        </div>
      </nav>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="main-menu">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title">Story App</h5>
          <button
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div class="nav flex-column gap-2">
            <a
              class="nav-link"
              href="#/"
              data-bs-dismiss="offcanvas"
              @click=${this.handleNavigation}
              >⌂ ${t('explore')}</a
            >${loggedIn ? html`<a class="nav-link" href="#/add" data-bs-dismiss="offcanvas" @click=${this.handleNavigation}>＋ ${t('add')}</a><a class="nav-link" href="#/profile" data-bs-dismiss="offcanvas" @click=${this.handleNavigation}>◎ ${t('profile')}</a><button class="btn btn-outline-danger mt-3" type="button" data-bs-dismiss="offcanvas" @click=${this.logout}>⇥ ${t('logout')}</button>` : html`<a class="nav-link" href="#/login" data-bs-dismiss="offcanvas">↪ ${t('login')}</a><a class="nav-link" href="#/register" data-bs-dismiss="offcanvas">＋ ${t('register')}</a>`}
          </div>
        </div>
      </div>`;
  }
  handleNavigation(event) {
    const target = event.currentTarget.getAttribute('href');
    if (target && window.location.hash !== target) window.location.hash = target;
  }
  logout() {
    if (!window.confirm('Apakah Anda yakin ingin keluar?')) return;
    clearSession();
    window.dispatchEvent(new Event('auth-changed'));
    window.location.hash = '#/login';
  }
  async handleLocaleChange(event) {
    await setLocale(event.target.value);
    document.documentElement.lang = event.target.value;
    window.dispatchEvent(new Event('locale-changed'));
  }
}
customElements.define('app-header', AppHeader);
