document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('active'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('active')));
  }
  // Reveal on scroll
  const els = document.querySelectorAll('section, .case, .mini-card, .shoot-grid figure, .proof-grid figure, .serv-grid > div, .price-cards > div, .steps li');
  els.forEach(el => el.classList.add('rv'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
  // 3D tilt (faqat sichqonchali qurilmada)
  const fine = window.matchMedia('(pointer:fine)').matches;
  if (fine) {
    document.querySelectorAll('.case, .mini-card, .hero-photo').forEach(card => {
      card.addEventListener('mousemove', ev => {
        const r = card.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) translateY(-3px)';
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }
  // Forma -> Telegram
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
