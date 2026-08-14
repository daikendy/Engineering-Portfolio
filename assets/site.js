document.addEventListener('DOMContentLoaded', () => {

  // Render centralized topbar, mobile menu, and sidebar navigation
  if (typeof renderSiteNavigation === 'function') {
    const isSubpage = document.body.classList.contains('subpage');
    renderSiteNavigation(isSubpage);
  }

  // Auto-populate dynamic site data fields from assets/data.js
  if (typeof SITE_DATA !== 'undefined') {
    document.querySelectorAll('[data-site-field]').forEach(el => {
      const field = el.getAttribute('data-site-field');
      const attr = el.getAttribute('data-site-attr');
      const value = SITE_DATA[field];
      if (value !== undefined) {
        if (attr) {
          el.setAttribute(attr, attr === 'href' && field.includes('email') && !value.startsWith('mailto:') ? `mailto:${value}` : value);
        } else {
          el.textContent = value;
        }
      }
    });
  }

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

  // Scroll reveals (skip hero elements, topbar, and mobile menu)
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.closest('#home') || el.closest('#site-topbar') || el.closest('#site-mobile-menu') || el.id === 'mobileMenu') return;
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      });
    });
  }

  // Hero headline split-word reveal animation (preserves <em> emphasis tags)
  const heroHead = document.getElementById('heroHead');
  if (heroHead) {
    const nodes = Array.from(heroHead.childNodes);
    let html = '';
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(' ').filter(w => w.length > 0);
        words.forEach(w => { html += `<span class="word"><span>${w}</span></span> `; });
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'EM') {
        const words = node.textContent.split(' ').filter(w => w.length > 0);
        const emWords = words.map(w => `<span class="word"><span>${w}</span></span>`).join(' ');
        html += `<em>${emWords}</em> `;
      }
    });
    heroHead.innerHTML = html.trim();
    if (window.gsap) {
      gsap.to('#heroHead .word span', {
        y: '0%', duration: 0.9, ease: 'power4.out', stagger: 0.03, delay: 0.1
      });
      gsap.to('.hero-sub, .hero-meta', {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', delay: 0.4
      });
    }
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

  // Handle cross-page deep link jumps (e.g. returning from subpages like index.html#arch)
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        setActive(targetId);
      }, 250);
    }
  }

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

  // Register PWA Service Worker for offline support and app installation
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swPath = document.body.classList.contains('subpage') ? '../sw.js' : './sw.js';
      navigator.serviceWorker.register(swPath)
        .then(reg => console.log('Portfolio PWA Service Worker Registered:', reg.scope))
        .catch(err => console.warn('PWA SW registration skipped:', err));
    });
  }

  // PostHog Telemetry & Web Analytics Integration
  (function initPostHog() {
    const apiKey = (typeof SITE_DATA !== 'undefined' && SITE_DATA.posthogApiKey) ? SITE_DATA.posthogApiKey : '';
    const apiHost = (typeof SITE_DATA !== 'undefined' && SITE_DATA.posthogApiHost) ? SITE_DATA.posthogApiHost : 'https://us.i.posthog.com';

    if (!apiKey || apiKey.includes('YOUR_POSTHOG_API_KEY')) return;

    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}var w=e;for(void 0!==a?w=e[a]=[]:a="posthog",w.people=w.people||[],w.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},w.people.toString=function(){return w.toString(1)+".people"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identifyGroup setGroupProperties removeGroupProperty setGroupPropertiesForFlags resetGroupPropertiesForFlags setPersonPropertiesForFlags resetPersonPropertiesForFlags getGroupProperties getGroupProperty getGroupPropertiesForFlags getGroupPropertyForFlags clearGroupPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags resetPersonPropertiesForFlags getGroupProperties getGroupProperty getGroupPropertiesForFlags getGroupPropertyForFlags clearGroupPropertiesForFlags".split(" "),n=0;n<o.length;n++)g(w,o[n]);e._i.push([i,s,a])},e.__SV=1.0,o=t.createElement("script"),o.type="text/javascript",o.async=!0,o.src=apiHost+"/static/array.js",(p=t.getElementsByTagName("script")[0]).parentNode.insertBefore(o,p))}(document,window.posthog||[]);

    window.posthog.init(apiKey, {
      api_host: apiHost,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      persistence: 'memory', // Cookieless mode — zero tracking cookies stored on client devices
      mask_all_text_inputs: true, // Privacy guardrail — masks all input fields
      mask_all_element_attributes: true // Privacy guardrail — masks sensitive attributes
    });
    console.log('PostHog Analytics Initialized (Privacy-friendly mode).');
  })();

  // Outbound & High-Value Telemetry Tracking Helpers
  document.addEventListener('click', (e) => {
    if (!window.posthog || typeof window.posthog.capture !== 'function') return;

    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    const text = (link.textContent || '').trim();

    // 1. Resume Download Tracking
    if (href.includes('resume.pdf')) {
      window.posthog.capture('resume_download_click', {
        page: window.location.pathname,
        link_text: text,
        url: href
      });
    }
    // 2. Outbound Release & Social Links
    else if (href.startsWith('http://') || href.startsWith('https://')) {
      if (href.includes('resumaxxing') || href.includes('eruscent')) {
        window.posthog.capture('outbound_release_click', {
          page: window.location.pathname,
          target_url: href,
          link_text: text
        });
      } else if (href.includes('github.com') || href.includes('linkedin.com') || href.includes('x.com') || href.includes('twitter.com')) {
        window.posthog.capture('social_profile_click', {
          platform: href.includes('github') ? 'github' : href.includes('linkedin') ? 'linkedin' : 'x_twitter',
          target_url: href
        });
      }
    }
    // 3. Email Contact Click
    else if (href.startsWith('mailto:')) {
      window.posthog.capture('contact_email_click', {
        email: href.replace('mailto:', ''),
        page: window.location.pathname
      });
    }
  });
});

