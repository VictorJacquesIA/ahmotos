/* ===================================================
   ANIMATIONS — AH Motos
   Intersection Observer para scroll animations
   =================================================== */

import { $$ } from './utils.js';

/**
 * Inicializa animações de scroll com Intersection Observer
 */
export function initScrollAnimations() {
  const animatedEls = $$('.fade-up, .fade-in, .fade-left, .fade-right, .scale-in');

  if (!animatedEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // anima apenas uma vez
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  animatedEls.forEach(el => observer.observe(el));
}

/**
 * Aplica delays escalonados em grupos de cards
 * @param {string} parentSelector — seletor do container
 * @param {string} childSelector  — seletor dos cards
 */
export function staggerChildren(parentSelector, childSelector) {
  const parents = $$(parentSelector);

  parents.forEach(parent => {
    const children = $$(childSelector, parent);
    children.forEach((child, i) => {
      child.style.transitionDelay = `${(i + 1) * 0.1}s`;
    });
  });
}

/**
 * Efeito parallax leve no hero
 */
export function initHeroParallax() {
  const heroBg = document.querySelector('.hero__bg-img');
  if (!heroBg) return;

  const handleScroll = () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}
