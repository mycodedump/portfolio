// Case study modal: opens as a left-slide panel, syncs with the URL hash
// so each case study is linkable/shareable (e.g. yoursite.com/#itravel),
// and the browser back button closes it naturally.
(function () {
  const backdrop = document.getElementById('csBackdrop');
  const panels = document.querySelectorAll('.cs-panel');

  if (!backdrop || !panels.length) return;

  function closeAll() {
    panels.forEach(p => p.classList.remove('open'));
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openPanel(id) {
    const panel = document.getElementById(id);
    if (!panel) { closeAll(); return; }
    panels.forEach(p => p.classList.remove('open'));
    panel.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    panel.scrollTop = 0;
  }

  function syncToHash() {
    const hash = window.location.hash.replace('#', '');
    const validIds = ['itravel', 'design-system', 'viisa'];
    if (validIds.includes(hash)) {
      openPanel('panel-' + hash);
    } else {
      closeAll();
    }
  }

  // Open on load if URL already has a case-study hash
  syncToHash();

  // React to back/forward navigation and direct hash changes
  window.addEventListener('hashchange', syncToHash);

  // Clicking the dimmed backdrop closes the panel (clears the hash)
  backdrop.addEventListener('click', function () {
    history.pushState('', document.title, window.location.pathname + window.location.search);
    closeAll();
  });

  // Each close button clears the hash too
  document.querySelectorAll('.cs-close').forEach(btn => {
    btn.addEventListener('click', function () {
      history.pushState('', document.title, window.location.pathname + window.location.search);
      closeAll();
    });
  });

  // Escape key closes
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      history.pushState('', document.title, window.location.pathname + window.location.search);
      closeAll();
    }
  });
})();
