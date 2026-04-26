/* ===================================================
   TRACKING — AH Motos
   Google Analytics | Google Tag Manager | Meta Pixel
   =================================================== */

/* --- IDs de configuração (preencher antes do deploy) --- */
const CONFIG = {
  GA_ID:     'G-XXXXXXXXXX',   // Google Analytics 4
  GTM_ID:    'GTM-XXXXXXX',    // Google Tag Manager
  PIXEL_ID:  'XXXXXXXXXXXXXXX', // Meta (Facebook) Pixel
};

/* ===== Google Tag Manager ===== */
export function initGTM() {
  if (!CONFIG.GTM_ID || CONFIG.GTM_ID.includes('X')) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${CONFIG.GTM_ID}`;
  document.head.appendChild(script);

  // noscript fallback (inserir manualmente no <body> se necessário)
}

/* ===== Google Analytics 4 ===== */
export function initGA() {
  if (!CONFIG.GA_ID || CONFIG.GA_ID.includes('X')) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', CONFIG.GA_ID);
}

/* ===== Meta Pixel ===== */
export function initMetaPixel() {
  if (!CONFIG.PIXEL_ID || CONFIG.PIXEL_ID.includes('X')) return;

  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', CONFIG.PIXEL_ID);
  window.fbq('track', 'PageView');
}

/* ===== Eventos customizados ===== */
export function trackEvent(eventName, params = {}) {
  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  }
  // GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params });
  }
}

/* Eventos pré-definidos */
export const Events = {
  whatsappClick: () =>
    trackEvent('whatsapp_click', { category: 'CTA', label: 'WhatsApp' }),
  formSubmit: () =>
    trackEvent('generate_lead', { category: 'Form', label: 'Contato' }),
  serviceView: (service) =>
    trackEvent('view_item', { category: 'Services', label: service }),
};
