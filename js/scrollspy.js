// Scrollspy: watches which section is currently in view and marks the
// matching sidebar nav item "active" -- this is what makes the dot
// move/fill as the visitor scrolls, instead of being a static menu.
(function () {
  const sections = document.querySelectorAll('.panel[id]');
  const navItems = document.querySelectorAll('.nav-item[data-section]');

  if (!sections.length || !navItems.length) return;

  const navMap = {};
  navItems.forEach(item => {
    navMap[item.dataset.section] = item;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navItem = navMap[id];
        if (!navItem) return;

        if (entry.isIntersecting) {
          navItems.forEach(item => item.classList.remove('active'));
          navItem.classList.add('active');
        }
      });
    },
    {
      // Fires when a section crosses the vertical middle of the viewport,
      // so the dot updates roughly when a section feels "current" to the eye
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    }
  );

  sections.forEach(section => observer.observe(section));
})();
