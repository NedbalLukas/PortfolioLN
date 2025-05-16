const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('navbar-menu');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;

  hamburger.classList.toggle('active');
  menu.classList.toggle('active');

  hamburger.setAttribute('aria-expanded', !expanded);
  menu.setAttribute('aria-hidden', expanded);
});
