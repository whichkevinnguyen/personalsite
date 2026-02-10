(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // --- Nav scroll state ---
  const nav = document.querySelector('.nav');

  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Scroll Spy ---
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  if (sections.length && navLinks.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle(
                'nav__link--active',
                link.getAttribute('href') === `#${id}`
              );
            });
          }
        });
      },
      { rootMargin: '-20% 0px -75% 0px' }
    );
    sections.forEach((section) => spyObserver.observe(section));
  }

  // --- Mobile Menu ---
  const menuToggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menu.classList.toggle('nav__menu--open');
      document.body.classList.toggle('no-scroll', !isOpen);
    });

    menu.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('nav__menu--open');
        document.body.classList.remove('no-scroll');
      });
    });
  }
})();
