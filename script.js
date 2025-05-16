const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbar-menu');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navbarMenu.classList.toggle('active');

  if (navbarMenu.classList.contains('active')) {
    hamburger.setAttribute('aria-expanded', 'true');
    navbarMenu.setAttribute('aria-hidden', 'false');

    // Pro animaci zpoždění linků v menu
    const links = navbarMenu.querySelectorAll('a');
    links.forEach((link, index) => {
      link.style.setProperty('--delay', `${index * 0.1}s`);
    });
  } else {
    hamburger.setAttribute('aria-expanded', 'false');
    navbarMenu.setAttribute('aria-hidden', 'true');
  }
});
