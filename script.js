document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('active'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('active')));
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Yozuv animatsiyasi (typewriter)
  const typedEl = document.getElementById('typed');
  const lines = [
    "Ko'riladigan kontent.",
    'Zayavka olib keladigan reklama.',
    'Strategiya, syomka, montaj, Meta Ads — hammasi bir qo\u2019lda.'
  ];
  if (typedEl && !reduced) {
    let li = 0, ci = 0, del = false;
    const full = () => lines[li];
    (function tick() {
      const t = full();
      typedEl.textContent = t.slice(0, ci);
      if (!del) {
        ci++;
        if (ci > t.length) { del = true; return void setTimeout(tick, 1600); }
        setTimeout(tick, 34);
      } else {
        ci--;
        if (ci < 0) { ci = 0; del = false; li = (li + 1) % lines.length; return void setTimeout(tick, 350); }
        setTimeout(tick, 14);
      }
    })();
  } else if (typedEl) {
    typedEl.textContent = lines.join(' ');
  }
  // Reveal
  const els = document.querySelectorAll('section, .case, .mini-card, .shoot-grid figure, .proof-grid figure, .serv-grid > div, .price-cards > div, .steps li');
  els.forEach(el => el.classList.add('rv'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
  // 3D tilt
  const fine = window.matchMedia('(pointer:fine)').matches;
  if (fine && !reduced) {
    document.querySelectorAll('.case, .mini-card, .frame3d').forEach(card => {
      card.addEventListener('mousemove', ev => {
        const r = card.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(950px) rotateY(' + (x * 9) + 'deg) rotateX(' + (-y * 9) + 'deg) translateY(-3px)';
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }
  // Yulduzli fon (canvas)
  const cv = document.getElementById('stars');
  if (cv && !reduced) {
    const ctx = cv.getContext('2d');
    let W, H, pts = [];
    const N = window.innerWidth < 600 ? 45 : 90;
    function size() {
      W = cv.width = cv.offsetWidth * devicePixelRatio;
      H = cv.height = cv.offsetHeight * devicePixelRatio;
    }
    size();
    window.addEventListener('resize', size);
    for (let i = 0; i < N; i++) {
      pts.push({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .0006, vy: (Math.random() - .5) * .0006, r: Math.random() * 1.6 + .4 });
    }
    (function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r * devicePixelRatio, 0, 7);
        ctx.fillStyle = 'rgba(216,180,90,.55)';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    })();
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
      window.open('https://t.me/ulugfv?text=' + encodeURIComponent('Salom! Men ' + n + '. ' + t + ' kerak. Aloqa: ' + c + '. ' + x), '_blank');
      if (note) note.textContent = 'Tayyor — Telegram ochilmoqda...';
      form.reset();
    });
  }
});
