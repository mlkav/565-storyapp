import { html, render } from 'lit';
import { login } from '../api/auth-api.js';
import { setSession } from '../utils/auth.js';
import { t } from '../utils/i18n.js';

export function renderLogin(outlet) {
  render(
    html`<main class="container page-shell py-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card border-0 shadow-sm p-4">
            <h1 class="h3 mb-4">${t('loginTitle')}</h1>
            <div id="notice" class="alert d-none" role="alert"></div>
            <form id="login-form" novalidate>
              <label class="form-label" for="email">${t('email')}</label
              ><input
                class="form-control mb-3"
                id="email"
                type="email"
                required
                autocomplete="email"
              /><label class="form-label" for="password">${t('password')}</label
              ><password-input></password-input
              ><button class="btn btn-primary w-100 mt-4" type="submit">${t('login')}</button>
            </form>
            <p class="text-center mt-4 mb-0">
              ${t('noAccount')} <a href="#/register">${t('register')}</a>
            </p>
          </div>
        </div>
      </div>
    </main>`,
    outlet,
  );
  const form = outlet.querySelector('#login-form');
  const notice = outlet.querySelector('#notice');
  const passwordInput = form.querySelector('password-input');
  const clearNotice = () => {
    notice.className = 'alert d-none';
    notice.textContent = '';
  };
  form.querySelector('#email').addEventListener('input', clearNotice);
  passwordInput.addEventListener('password-changed', clearNotice);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    form.classList.add('was-validated');
    if (!form.checkValidity()) return;
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Memproses...';
    try {
      const response = await login({
        email: form.email.value.trim(),
        password: passwordInput.value,
      });
      setSession(response.data.loginResult.token, response.data.loginResult.name);
      window.dispatchEvent(new Event('auth-changed'));
      window.location.hash = '#/';
    } catch (error) {
      notice.className = 'alert alert-danger';
      notice.textContent = error.message;
      button.disabled = false;
      button.textContent = t('login');
    }
  });
}
