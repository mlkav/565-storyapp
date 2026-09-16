import { html, render } from 'lit';
import { register } from '../api/auth-api.js';
import { t } from '../utils/i18n.js';

export function renderRegister(outlet) {
  render(
    html`<main class="container page-shell py-5">
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-6">
          <div class="card border-0 shadow-sm p-4">
            <h1 class="h3 mb-4">${t('registerTitle')}</h1>
            <div id="notice" class="alert d-none" role="alert"></div>
            <form id="register-form" novalidate>
              <label class="form-label" for="name">${t('name')}</label
              ><input class="form-control mb-3" id="name" required autocomplete="name" /><label
                class="form-label"
                for="email"
                >${t('email')}</label
              ><input
                class="form-control mb-3"
                id="email"
                type="email"
                required
                autocomplete="email"
              /><label class="form-label" for="password">${t('password')}</label
              ><password-input></password-input
              ><button class="btn btn-primary w-100 mt-4" type="submit">
                ${t('createAccount')}
              </button>
            </form>
            <p class="text-center mt-4 mb-0">
              ${t('hasAccount')} <a href="#/login">${t('login')}</a>
            </p>
          </div>
        </div>
      </div>
    </main>`,
    outlet,
  );
  const form = outlet.querySelector('#register-form');
  const notice = outlet.querySelector('#notice');
  const passwordInput = form.querySelector('password-input');
  const clearNotice = () => {
    notice.className = 'alert d-none';
    notice.textContent = '';
  };
  form.querySelector('#name').addEventListener('input', clearNotice);
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
      await register({
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        password: passwordInput.value,
      });
      notice.className = 'alert alert-success';
      notice.textContent = t('loginSuccess');
      form.reset();
      passwordInput.value = '';
      passwordInput.isValid = false;
    } catch (error) {
      notice.className = 'alert alert-danger';
      notice.textContent = error.message;
    } finally {
      button.disabled = false;
      button.textContent = t('createAccount');
    }
  });
}
