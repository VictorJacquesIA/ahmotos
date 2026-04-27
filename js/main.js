/* ===================================================
   MAIN — AH Motos
   Entry point — orquestra todos os módulos
   =================================================== */

import { $, $$, on, debounce } from './utils.js';
import { initScrollAnimations, staggerChildren, initHeroParallax } from './animations.js';
import { initForms } from './forms.js';
import { initGTM, initGA, initMetaPixel, Events } from './tracking.js';

/* ===================================================
   HEADER — sticky + mobile menu
   =================================================== */
function initHeader() {
  const header  = $('.header');
  const toggle  = $('.header__toggle');
  const mobileNav = $('.header__mobile-nav');

  if (!header) return;

  /* Sticky scroll */
  const handleScroll = debounce(() => {
    header.classList.toggle('header--scrolled', window.scrollY > 40);
  }, 50);

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // check on load

  /* Mobile menu toggle */
  if (toggle && mobileNav) {
    on(toggle, 'click', () => {
      const open = mobileNav.classList.toggle('header__mobile-nav--open');
      toggle.classList.toggle('header__toggle--active', open);
      header.classList.toggle('header--menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    /* Fechar ao clicar em link do menu mobile */
    on($$('.header__mobile-nav-link', mobileNav), 'click', () => {
      mobileNav.classList.remove('header__mobile-nav--open');
      toggle.classList.remove('header__toggle--active');
      header.classList.remove('header--menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });

    /* Fechar ao clicar fora */
    document.addEventListener('click', e => {
      if (!header.contains(e.target)) {
        mobileNav.classList.remove('header__mobile-nav--open');
        toggle.classList.remove('header__toggle--active');
        header.classList.remove('header--menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* Active nav link no scroll */
  const sections = $$('section[id]');
  const navLinks = $$('.header__nav-link[href^="#"]');

  const setActiveLink = debounce(() => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'header__nav-link--active',
            link.getAttribute('href') === `#${section.id}`
          );
        });
      }
    });
  }, 80);

  window.addEventListener('scroll', setActiveLink, { passive: true });
}

/* ===================================================
   FAQ — accordion
   =================================================== */
function initFAQ() {
  const items = $$('.faq__item');

  items.forEach(item => {
    const question = $('.faq__question', item);
    const answer   = $('.faq__answer', item);

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq__item--active');

      /* Fecha todos */
      items.forEach(i => {
        i.classList.remove('faq__item--active');
        const a = $('.faq__answer', i);
        if (a) a.style.maxHeight = null;
      });

      /* Abre o clicado (se não estava aberto) */
      if (!isOpen) {
        item.classList.add('faq__item--active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ===================================================
   WHATSAPP — tracking nos cliques
   =================================================== */
function initWhatsApp() {
  const links = $$('[href*="wa.me"]');
  on(links, 'click', Events.whatsappClick);
}

/* ===================================================
   SMOOTH SCROLL — links âncora internos
   =================================================== */
function initSmoothScroll() {
  on($$('a[href^="#"]'), 'click', e => {
    const href = e.currentTarget.getAttribute('href');
    if (href === '#') return;
    const target = $(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80; // altura do header fixo
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}

/* ===================================================
   INIT
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initGTM();
  initGA();
  initMetaPixel();

  initHeader();
  initFAQ();
  initWhatsApp();
  initSmoothScroll();
  initForms();

  staggerChildren('.services__grid', '.services__card');
  staggerChildren('.testimonials__grid', '.testimonials__card');
  staggerChildren('.faq', '.faq__item');

  initScrollAnimations();
  initHeroParallax();
});
