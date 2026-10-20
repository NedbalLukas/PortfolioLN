(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealElements = [
    ...document.querySelectorAll('.section-title, .project .media, .project-text, .statement, .skills > div, .mail')
  ];

  revealElements.forEach((element, index) => {
    element.setAttribute('data-reveal', '');
    if (element.matches('.project-text')) element.style.setProperty('--d', '0.12s');
    else if (element.matches('.skills > div')) element.style.setProperty('--d', `${index * 0.08}s`);
    else element.style.setProperty('--d', '0s');
  });

  function showEverything() {
    root.classList.add('is-ready');
    revealElements.forEach((element) => element.classList.add('in-view'));
  }

  if (reduceMotion) {
    showEverything();
    return;
  }

  document.querySelectorAll('[data-split]').forEach((element) => {
    const label = element.textContent.trim();
    element.setAttribute('aria-label', label);
    element.textContent = '';

    [...label].forEach((character, index) => {
      const wrapper = document.createElement('span');
      wrapper.className = 'ch';
      wrapper.setAttribute('aria-hidden', 'true');

      const letter = document.createElement('span');
      letter.textContent = character === ' ' ? '\u00a0' : character;
      letter.style.setProperty('--i', index);

      wrapper.appendChild(letter);
      element.appendChild(wrapper);
    });
  });

  const start = () => requestAnimationFrame(() => root.classList.add('is-ready'));
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(start).catch(start);
  } else {
    window.addEventListener('load', start, { once: true });
    window.setTimeout(start, 1200);
  }

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      currentObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -4% 0px'
  });

  revealElements.forEach((element) => observer.observe(element));
})();
