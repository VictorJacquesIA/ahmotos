/* ===================================================
   FORMS — AH Motos
   Validação front-end + envio (pronto para backend)
   =================================================== */

import { $, $$ } from './utils.js';
import { Events } from './tracking.js';

/* --- Config do endpoint (preencher no backend) --- */
const FORM_ENDPOINT = '/api/contact'; // substituir pela URL real

/**
 * Inicializa todos os formulários da página
 */
export function initForms() {
  const forms = $$('form[data-validate]');
  forms.forEach(setupForm);
}

/**
 * Configura validação e envio de um formulário
 * @param {HTMLFormElement} form
 */
function setupForm(form) {
  const fields = $$('[data-required]', form);
  const submitBtn = $('[type="submit"]', form);
  const successEl = $('.form-success', form.closest('[data-form-wrapper]') || form.parentElement);

  /* --- Validação em tempo real --- */
  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('is-error')) validateField(field);
    });
  });

  /* --- Submit --- */
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const allValid = fields.every(f => validateField(f));
    if (!allValid) return;

    setLoading(submitBtn, true);

    const data = Object.fromEntries(new FormData(form));

    try {
      /* Envio para backend — descomente quando tiver endpoint:
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Erro no servidor');
      */

      // Simulação de envio (remover quando backend estiver pronto)
      await new Promise(r => setTimeout(r, 1000));

      form.reset();
      form.style.display = 'none';
      if (successEl) successEl.classList.add('is-visible');
      Events.formSubmit();

    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      showGlobalError(form);
    } finally {
      setLoading(submitBtn, false);
    }
  });
}

/**
 * Valida um campo individual
 * @param {HTMLElement} field
 * @returns {boolean}
 */
function validateField(field) {
  const errorEl = field.parentElement.querySelector('.form-field__error');
  const value = field.value.trim();
  const type = field.getAttribute('type') || field.tagName.toLowerCase();
  let error = '';

  if (!value) {
    error = 'Campo obrigatório.';
  } else if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = 'Informe um e-mail válido.';
  } else if (type === 'tel' && !/^[\d\s\(\)\-\+]{8,}$/.test(value)) {
    error = 'Informe um telefone válido.';
  }

  field.classList.toggle('is-error', !!error);
  if (errorEl) {
    errorEl.textContent = error;
    errorEl.classList.toggle('is-visible', !!error);
  }

  return !error;
}

/**
 * Estado de loading no botão de submit
 */
function setLoading(btn, loading) {
  if (!btn) return;
  btn.disabled = loading;
  btn.dataset.originalText = btn.dataset.originalText || btn.textContent;
  btn.textContent = loading ? 'Enviando...' : btn.dataset.originalText;
}

/**
 * Exibe erro global no formulário
 */
function showGlobalError(form) {
  let errEl = form.querySelector('.form-global-error');
  if (!errEl) {
    errEl = document.createElement('p');
    errEl.className = 'form-global-error';
    errEl.style.cssText = 'color:#dc2626;font-size:.875rem;margin-top:.5rem;';
    form.appendChild(errEl);
  }
  errEl.textContent = 'Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.';
}
