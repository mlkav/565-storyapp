import { html, render } from 'lit';
import { getStories } from '../api/stories-api.js';
import { t } from '../utils/i18n.js';

export async function renderDashboard(outlet) {
  render(html`<main class="container page-shell page-visible py-5" aria-busy="true"><loading-spinner>Memuat cerita...</loading-spinner></main>`, outlet);
  try {
    const [response] = await Promise.all([
      getStories(),
      new Promise((resolve) => setTimeout(resolve, 350)),
    ]);
    const stories = response.data.listStory || [];
    render(html`
      <section class="hero py-5"><div class="container py-4"><div class="row align-items-center"><div class="col-lg-8"><span class="badge text-bg-warning mb-3">STORIES / 2026</span><h1 class="display-4 fw-bold">${t('dashboard')}</h1><p class="lead opacity-75">${t('subtitle')}</p><a href="#/add" class="btn hero-action mt-2"><span class="action-icon" aria-hidden="true">✎</span><span>${t('add')}</span><span aria-hidden="true">→</span></a></div><div class="col-lg-4 d-none d-lg-block text-center display-1">✦</div></div></div></section>
      <main class="container page-shell py-5"><div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4"><h2 class="h3 mb-0">${t('latest')}</h2><input id="search" class="form-control" style="max-width:300px" placeholder="${t('search')}" aria-label="${t('search')}"></div><div id="story-grid" class="row g-4"></div></main>
      <div class="modal fade" id="story-modal" tabindex="-1" aria-labelledby="story-modal-title"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h2 class="modal-title h5" id="story-modal-title">${t('storyDetail')}</h2><button class="btn-close" data-bs-dismiss="modal" aria-label="${t('close')}"></button></div><div class="modal-body" id="story-modal-body"></div></div></div></div>`, outlet);
    const grid = outlet.querySelector('#story-grid');
    const draw = (items) => { render(html`${items.map((story) => html`<div class="col-md-6 col-lg-4"><story-card .story=${story}></story-card></div>`)}`, grid); };
    draw(stories);
    outlet.querySelector('#search').addEventListener('input', (event) => draw(stories.filter((story) => `${story.name} ${story.description}`.toLowerCase().includes(event.target.value.toLowerCase()))));
    grid.addEventListener('click', (event) => {
      const button = event.target.closest('[data-story-id]');
      if (!button) return;
      const story = stories.find((item) => item.id === button.dataset.storyId);
      const coordinates = story.lat !== undefined && story.lon !== undefined
        ? html`<small class="text-secondary">${story.lat}, ${story.lon}</small>`
        : html``;
      render(html`<p>${story.description}</p>${coordinates}`, outlet.querySelector('#story-modal-body'));
    });
  } catch (error) {
    render(html`<main class="container page-shell py-5"><div class="alert alert-danger" role="alert">${error.message}</div></main>`, outlet);
  }
}
