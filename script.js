const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbar-menu');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
  hamburger.setAttribute('aria-expanded', !expanded);

  hamburger.classList.toggle('active');
  navbarMenu.classList.toggle('active');

  const hidden = navbarMenu.getAttribute('aria-hidden') === 'true';
  navbarMenu.setAttribute('aria-hidden', !hidden);

  // Zablokování scrollu při otevřeném menu na mobilu
  if (navbarMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
