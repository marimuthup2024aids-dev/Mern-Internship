// Shared script: nav active, theme toggle, to-top, skill animation, mailto
document.addEventListener('DOMContentLoaded', () => {
  // set year in footers
  const years = [...document.querySelectorAll('[id^=year]')];
  years.forEach(y => y.textContent = new Date().getFullYear());

  // NAV: mark active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if(href === path) a.classList.add('active');
  });

  // THEME toggle (light/dark) stored in localStorage
  const themeBtn = document.getElementById('themeToggle');
  const body = document.body;
  const saved = localStorage.getItem('pm_theme');
  if(saved === 'light') body.classList.add('light');

  if(themeBtn){
    themeBtn.addEventListener('click', () => {
      body.classList.toggle('light');
      const mode = body.classList.contains('light') ? 'light' : 'dark';
      localStorage.setItem('pm_theme', mode);
      themeBtn.textContent = mode === 'light' ? '🌞' : '🌙';
    });
    themeBtn.textContent = body.classList.contains('light') ? '🌞' : '🌙';
  }

  // Back to top button
  const toTop = document.getElementById('toTop');
  if(toTop){
    window.addEventListener('scroll', () => {
      if(window.scrollY > 350) toTop.style.display = 'block';
      else toTop.style.display = 'none';
    });
    toTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  }

  // Animate skill bars when in view
  const skillBars = document.querySelectorAll('.skill-progress');
  if(skillBars.length){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const el = entry.target;
          const fill = el.getAttribute('data-fill') || 70;
          el.style.width = fill + '%';
          io.unobserve(el);
        }
      });
    }, {threshold: 0.4});
    skillBars.forEach(b => io.observe(b));
  }

  // Contact forms: sendMail opens mail client
  window.sendMail = function(e){
    e.preventDefault();
    const f = e.target;
    const name = encodeURIComponent(f.name.value);
    const email = encodeURIComponent(f.email.value);
    const message = encodeURIComponent(f.message.value);
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:marimuthu582007@gmail.com?subject=${subject}&body=${body}`;
  };

  // Small neon hover for icon buttons (progressive)
  document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.style.boxShadow = '0 8px 40px rgba(107,139,255,0.12)');
    btn.addEventListener('mouseleave', () => btn.style.boxShadow = '');
  });
});
