// Updates the top-bar time to reflect IST, refreshing every minute.
(function () {
  const out = document.getElementById('clockOut');
  if (!out) return;

  function update() {
    const now = new Date();
    const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    let hours = ist.getHours();
    const minutes = ist.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    out.textContent = `IND — ${hours}.${minutes} ${ampm}`;
  }

  update();
  setInterval(update, 30000);
})();
