import { html, render } from 'lit';
import { t } from '../utils/i18n.js';
export function renderAddStory(outlet) {
  render(
    html`<main class="container page-shell py-5">
      <div class="row justify-content-center">
        <div class="col-xl-9">
          <div class="mb-4">
            <span class="text-primary fw-semibold">${t('newMemory')}</span>
            <h1 class="display-6 fw-bold">${t('add')}</h1>
            <p class="text-secondary">${t('addIntro')}</p>
          </div>
          <div id="notice" class="alert alert-success d-none" role="alert">
            ${t('success')} <a href="#/" class="alert-link">${t('explore')}</a>
          </div>
          <div class="card border-0 shadow-sm p-4"><add-story-form></add-story-form></div>
        </div>
      </div>
    </main>`,
    outlet,
  );
  outlet.querySelector('add-story-form').addEventListener('story-saved', () => {
    outlet.querySelector('#notice').classList.remove('d-none');
    setTimeout(() => {
      window.location.hash = '#/';
    }, 700);
  });
}
