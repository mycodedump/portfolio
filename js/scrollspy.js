// Tracks which section is in view, marks the matching sidebar item active.
(function () {
  const sections = document.querySelectorAll('.panel[id]');
  const navItems = document.querySelectorAll('.nav-item[data-section]');
  if (!sections.length || !navItems.length) return;

  const navMap = {};
  navItems.forEach(item => { navMap[item.dataset.section] = item; });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navItem = navMap[id];
        if (!navItem || !entry.isIntersecting) return;
        navItems.forEach(item => item.classList.remove('active'));
        navItem.classList.add('active');
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));
})();
