const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbar-menu');

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navbarMenu.classList.toggle('active');

  if (navbarMenu.classList.contains('active')) {
    hamburger.setAttribute('aria-expanded', 'true');
    navbarMenu.setAttribute('aria-hidden', 'false');
    const links = navbarMenu.querySelectorAll('a');
    links.forEach((link, index) => {
      link.style.setProperty('--delay', `${index * 0.1}s`);
    });
  } else {
    hamburger.setAttribute('aria-expanded', 'false');
    navbarMenu.setAttribute('aria-hidden', 'true');
  }
});

const toggleBtn = document.getElementById('toggleTheme');
const body = document.body;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  body.classList.add(savedTheme);
} else {
  body.classList.add('light-mode');
}

function toggleTheme() {
  if (body.classList.contains('light-mode')) {
    body.classList.replace('light-mode', 'dark-mode');
    localStorage.setItem('theme', 'dark-mode');
  } else {
    body.classList.replace('dark-mode', 'light-mode');
    localStorage.setItem('theme', 'light-mode');
  }
}

toggleBtn.addEventListener('click', toggleTheme);