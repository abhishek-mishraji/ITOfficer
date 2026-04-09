const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const navLinks = document.querySelectorAll('.primary-nav a');
const pageKey = document.body.dataset.page;

if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (pageKey) {
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === pageKey) {
      link.classList.add('is-active');
    }
  });
}

const currentYear = document.querySelector('[data-current-year]');
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
