(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Úvodní odhalení jména po písmenech (jediný "velký" moment stránky)
  let index = 0;
  document.querySelectorAll('[data-split]').forEach((el) => {
    const text = el.textContent;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    [...text].forEach((char) => {
      const wrap = document.createElement('span');
      wrap.className = 'ch';
      wrap.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span');
      inner.textContent = char;
      inner.style.setProperty('--i', index++);
      wrap.appendChild(inner);
      el.appendChild(wrap);
    });
  });

  const start = () => document.documentElement.classList.add('is-ready');
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => requestAnimationFrame(start));
  } else {
    window.addEventListener('load', start);
  }


  // 3) Jemné odhalení obsahu při scrollu
  const targets = [
    ['.section-title', 0],
    ['.project .media', 0],
    ['.project-text', .12],
    ['.statement', 0],
    ['.skills > div', null],
    ['.mail', .1],
  ];
  const revealEls = [];
  targets.forEach(([selector, delay]) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--d', (delay === null ? i * 0.12 : delay) + 's');
      revealEls.push(el);
    });
  });

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      });
    }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach((el) => io.observe(el));
  }

  // 2) Jemný posun obrázků projektů při scrollu
  if (reduce) return;
  const items = [...document.querySelectorAll('.media')].map((media) => ({
    media,
    inner: media.querySelector('.media-inner'),
  }));

  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    items.forEach(({ media, inner }) => {
      const r = media.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const progress = (r.top + r.height / 2 - vh / 2) / vh; // -1 až 1
      inner.style.transform = `translateY(${progress * -6}%)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();