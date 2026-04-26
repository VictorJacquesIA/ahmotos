/* ===================================================
   UTILS — AH Motos
   =================================================== */

/**
 * Seleciona um elemento do DOM
 * @param {string} selector
 * @param {Element} [parent=document]
 */
export const $ = (selector, parent = document) => parent.querySelector(selector);

/**
 * Seleciona múltiplos elementos do DOM
 * @param {string} selector
 * @param {Element} [parent=document]
 */
export const $$ = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector));

/**
 * Adiciona event listener com suporte a múltiplos elementos
 * @param {Element|Element[]} el
 * @param {string} event
 * @param {Function} handler
 */
export const on = (el, event, handler) => {
  const targets = Array.isArray(el) ? el : [el];
  targets.forEach(t => t?.addEventListener(event, handler));
};

/**
 * Formata número de telefone BR para link WhatsApp
 * @param {string} phone — somente dígitos, ex: "54999999999"
 * @returns {string}
 */
export const whatsappLink = (phone, message = '') => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}${message ? `?text=${encoded}` : ''}`;
};

/**
 * Debounce simples
 * @param {Function} fn
 * @param {number} delay
 */
export const debounce = (fn, delay = 150) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Verifica se está em viewport
 * @param {Element} el
 */
export const isInViewport = el => {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
};
