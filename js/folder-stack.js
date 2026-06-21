// The folder-stack reveal itself is pure CSS (position: sticky with
// staggered top offsets per card). This script just tracks which card
// is currently frontmost, in case we want to tie other UI to it later
// (e.g. syncing the case-study tab color elsewhere on the page).
(function () {
  const cards = document.querySelectorAll('.folder-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-front', entry.isIntersecting);
      });
    },
    { threshold: 0.6 }
  );

  cards.forEach(card => observer.observe(card));
})();
