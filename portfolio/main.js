(function () {
  const root = document.documentElement;
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
  const saved = localStorage.getItem('theme');

  function applyTheme(theme) {
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  }

  const initial = saved || (prefersLight.matches ? 'light' : 'dark');
  applyTheme(initial);

  prefersLight.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        applyTheme(root.classList.contains('light') ? 'dark' : 'light');
      });
    }

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  });
})();