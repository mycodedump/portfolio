// Theme toggle: switches between light/dark, remembers choice for next visit
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'portfolio-theme';

  // On load: use saved preference, or fall back to light
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark') {
    root.setAttribute('data-theme', 'dark');
  }

  toggle.addEventListener('click', function () {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem(STORAGE_KEY, 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem(STORAGE_KEY, 'dark');
    }
  });
})();
