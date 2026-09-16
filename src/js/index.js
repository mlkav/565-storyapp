import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../scss/main.scss';
import './components/app-header.js';
import './components/app-footer.js';
import './components/story-card.js';
import './components/add-story-form.js';
import './components/profile-card.js';
import './components/loading-spinner.js';
import './components/password-input.js';
import { renderDashboard } from './pages/dashboard-page.js';
import { renderAddStory } from './pages/add-story-page.js';
import { renderProfile } from './pages/profile-page.js';
import { renderLogin } from './pages/login-page.js';
import { renderRegister } from './pages/register-page.js';
import { localeReady } from './utils/i18n.js';
import { clearSession, isAuthenticated } from './utils/auth.js';

const app = document.querySelector('#app');
const shell = () => {
  app.innerHTML = '<app-header></app-header><div id="page"></div><app-footer></app-footer>';
};
const route = async () => {
  const currentPage = app.querySelector('#page');
  const page = document.createElement('div');
  page.id = 'page';
  currentPage.classList.remove('page-visible');
  await new Promise((resolve) => setTimeout(resolve, 450));
  currentPage.replaceWith(page);
  const path = window.location.hash.replace('#', '') || (isAuthenticated() ? '/' : '/login');
  try {
    if ((path === '/login' || path === '/register') && isAuthenticated()) {
      window.location.hash = '#/';
      return;
    } else if ((path === '/' || path === '/add' || path === '/profile') && !isAuthenticated()) {
      window.location.hash = '#/login';
      return;
    } else if (path === '/login') renderLogin(page);
    else if (path === '/register') renderRegister(page);
    else if (path === '/add') renderAddStory(page);
    else if (path === '/profile') renderProfile(page);
    else await renderDashboard(page);
    requestAnimationFrame(() => {
      page.querySelectorAll('.page-shell').forEach((el) => el.classList.add('page-visible'));
    });
  } catch (error) {
    page.innerHTML = `<div class="container page-shell py-5 page-visible"><div class="alert alert-danger">Tidak dapat memuat halaman: ${error.message}</div></div>`;
  }
};
window.addEventListener('hashchange', route);
window.addEventListener('auth-expired', () => {
  clearSession();
  window.location.hash = '#/login';
});
window.addEventListener('locale-changed', () => {
  shell();
  route();
});
await localeReady;
shell();
route();
