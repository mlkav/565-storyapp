import { html, render } from 'lit';
import { t } from '../utils/i18n.js';
export function renderProfile(outlet) {
  render(html`<main class="container page-shell py-5"><div class="row justify-content-center"><div class="col-lg-6"><p class="text-primary fw-semibold mb-2">ABOUT THE CREATOR</p><h1 class="display-6 fw-bold mb-4">${t('about')}</h1><profile-card></profile-card><div class="card border-0 shadow-sm mt-4 p-4"><h2 class="h5">${t('notes')}</h2><p class="text-secondary mb-0">${t('notesText')}</p></div></div></div></main>`, outlet);
}
