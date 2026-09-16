import { LitElement, html } from 'lit';
import { formatDate } from '../utils/date-formatter.js';
import { locale, t } from '../utils/i18n.js';
export class StoryCard extends LitElement {
  static properties = { story: { type: Object } };
  createRenderRoot() { return this; }
  render() { const s = this.story; const dateLocale = { id: 'id-ID', en: 'en-US', es: 'es-ES' }[locale()] || 'id-ID'; return html`<article class="story-card card h-100"><img class="story-image card-img-top" src="${s.photoUrl}" alt="Foto cerita oleh ${s.name}" loading="lazy"><div class="card-body d-flex flex-column"><div class="d-flex justify-content-between gap-2"><h3 class="h5 card-title">${s.name}</h3><small class="text-secondary">${formatDate(s.createdAt, dateLocale)}</small></div><p class="card-text">${s.description}</p><button class="btn btn-sm btn-outline-primary mt-auto align-self-start" data-story-id="${s.id}" data-bs-toggle="modal" data-bs-target="#story-modal">${t('detail')}</button></div></article>`; }
}
customElements.define('story-card', StoryCard);
