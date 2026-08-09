document.addEventListener('DOMContentLoaded', () => {

  // Custom cursor
  const dot = document.getElementById('dot');
  if (dot && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', e => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
    });
    document.querySelectorAll('a, .btn, .note, .navlink').forEach(el => {
      el.addEventListener('mouseenter', () => dot.classList.add('grow'));
      el.addEventListener('mouseleave', () => dot.classList.remove('grow'));
    });
  }

  // Scroll reveals (skip hero elements, animated separately on index)
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.closest('#home')) return;
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      });
    });
  }

  // Scroll-spy nav (index only — sections must exist)
  const sections = document.querySelectorAll('main section[id]');
  const navlinks = document.querySelectorAll('.navlink[data-target]');
  if (sections.length && window.ScrollTrigger) {
    sections.forEach(sec => {
      ScrollTrigger.create({
        trigger: sec, start: 'top 50%', end: 'bottom 50%',
        onEnter: () => setActive(sec.id), onEnterBack: () => setActive(sec.id)
      });
    });
  }
  function setActive(id) {
    navlinks.forEach(l => l.classList.toggle('active', l.dataset.target === id));
  }
  navlinks.forEach(l => l.addEventListener('click', (e) => {
    const target = document.getElementById(l.dataset.target);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }));

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menuBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }
});
