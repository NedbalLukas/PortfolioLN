(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  const mobileQuery = window.matchMedia('(max-width: 760px)');

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.getElementById(id.slice(1));
      if (!target) return;
      if (header && header.classList.contains('is-open')) setMenu(false);
    });
  });

  if (!header || !toggle || !menu) return;

  function setMenu(open) {
    header.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    document.documentElement.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
  }

  toggle.setAttribute('aria-label', 'Otevřít menu');
  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  const handleBreakpoint = (event) => {
    if (!event.matches) setMenu(false);
  };

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', handleBreakpoint);
  } else {
    mobileQuery.addListener(handleBreakpoint);
  }
})();
