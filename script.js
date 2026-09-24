document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('active'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('active')));
  }
  const form = document.getElementById('leadForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const n = document.getElementById('fName').value.trim();
      const c = document.getElementById('fContact').value.trim();
      const t = document.getElementById('fType').value;
      const x = document.getElementById('fText').value.trim();
      const msg = 'Salom! Men ' + n + '. ' + t + ' kerak. Aloqa: ' + c + '. ' + x;
      if (note) note.textContent = 'Tayyor — Telegram ochilmoqda...';
      window.open('https://t.me/ulugfv?text=' + encodeURIComponent(msg), '_blank');
      form.reset();
    });
  }
});
