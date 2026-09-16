import { LitElement, html } from 'lit';
import { addStory } from '../api/stories-api.js';
import { t } from '../utils/i18n.js';

export class AddStoryForm extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`<form class="needs-validation" novalidate>
      <div class="row g-4">
        <div class="col-lg-5">
          <div class="dropzone" id="dropzone">
            <span>${t('choose')}</span><img class="d-none" id="preview" alt="Preview foto" />
          </div>
          <label class="form-label mt-3" for="photo">${t('photo')}</label
          ><input class="form-control" id="photo" type="file" accept="image/*" required />
          <div class="invalid-feedback">${t('photoRequired')}</div>
        </div>
        <div class="col-lg-7">
          <label class="form-label" for="description">${t('description')}</label
          ><textarea
            class="form-control"
            id="description"
            rows="8"
            required
            minlength="10"
            aria-describedby="description-help"
          ></textarea>
          <div id="description-help" class="form-text">${t('minDescription')}</div>
          <div class="invalid-feedback">${t('minDescription')}</div>
          <div id="notice" class="alert d-none mt-3" role="alert"></div>
          <button class="btn btn-primary mt-4" type="submit">${t('publish')} →</button>
        </div>
      </div>
    </form>`;
  }
  firstUpdated() {
    const form = this.querySelector('form');
    const input = this.querySelector('#photo');
    const preview = this.querySelector('#preview');
    const dropzone = this.querySelector('#dropzone');
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (!file) return;
      preview.src = URL.createObjectURL(file);
      preview.classList.remove('d-none');
      dropzone.querySelector('span').classList.add('d-none');
    });
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      form.classList.add('was-validated');
      if (!form.checkValidity()) return;
      const file = input.files?.[0];
      if (!file || !file.type.startsWith('image/') || file.size > 1024 * 1024) {
        this.querySelector('#notice').className = 'alert alert-danger mt-3';
        this.querySelector('#notice').textContent =
          'Foto harus berupa gambar dan berukuran maksimal 1 MB.';
        return;
      }
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Memproses...';
      try {
        await addStory(this.querySelector('#description').value.trim(), file);
        this.dispatchEvent(new CustomEvent('story-saved', { bubbles: true }));
      } catch (error) {
        this.querySelector('#notice').className = 'alert alert-danger mt-3';
        this.querySelector('#notice').textContent = error.message;
        button.disabled = false;
        button.textContent = t('publish') + ' →';
      }
    });
  }
}
customElements.define('add-story-form', AddStoryForm);
