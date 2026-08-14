/**
 * Centralized Reusable Component Templates
 * Renders the topbar, mobile menu dropdown, and sidebar navigation across all pages.
 */

const NAV_ITEMS = [
  { id: 'home', idx: '00', label: 'Home' },
  { id: 'work', idx: '01', label: 'Releases' },
  { id: 'notes', idx: '02', label: 'Notes' },
  { id: 'log', idx: '03', label: 'Changelog' },
  { id: 'stack', idx: '04', label: 'Stack' },
  { id: 'arch', idx: '05', label: 'Architecture' },
  { id: 'principles', idx: '06', label: 'Principles' },
  { id: 'exp', idx: '07', label: 'Experience' },
  { id: 'about', idx: '08', label: 'About' },
  { id: 'contact', idx: '09', label: 'Contact' }
];

function renderSiteNavigation(isSubpage = false) {
  const isHardwarePage = (document.body && document.body.classList.contains('hardware-page')) || window.location.pathname.includes('hardware.html');
  const prefix = isSubpage ? (isHardwarePage ? '../hardware.html#' : '../index.html#') : '#';
  const resumeHref = isSubpage ? '../assets/resume.pdf' : 'assets/resume.pdf';
  const personaToggleHref = isHardwarePage ? (isSubpage ? '../index.html' : 'index.html') : (isSubpage ? '../hardware.html' : 'hardware.html');
  const personaToggleText = isHardwarePage ? '[⚡ Switch to Software ➔]' : '[⚙️ Switch to Hardware ➔]';
  const personaRole = isHardwarePage ? 'Hardware & Embedded Engineer' : 'Full-Stack Software Engineer';

  // 1. Render Topbar
  const topbarContainer = document.getElementById('site-topbar');
  if (topbarContainer) {
    topbarContainer.className = 'topbar';
    topbarContainer.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <div style="font-family:'Fraunces',serif; font-size:16px; font-weight:500;">Kenneth Torcuator</div>
        <a class="persona-toggle-link" href="${personaToggleHref}" style="font-family:'IBM Plex Mono',monospace; font-size:10px; color:var(--cobalt); text-decoration:none;">${isHardwarePage ? 'Software Mode' : 'Hardware Mode'}</a>
      </div>
      <button class="menu-btn" id="menuBtn" aria-label="Open menu"><span></span><span></span><span></span></button>
    `;
  }

  // 2. Render Mobile Menu Dropdown
  const mobileMenuContainer = document.getElementById('site-mobile-menu');
  if (mobileMenuContainer) {
    mobileMenuContainer.className = 'mobile-menu';
    mobileMenuContainer.id = 'mobileMenu';
    let mobileLinksHtml = NAV_ITEMS.map(item => `<a href="${prefix}${item.id}"><span class="mm-idx">${item.idx}</span>${item.label}</a>`).join('\n  ');
    mobileLinksHtml += `\n  <a class="persona-toggle-link" href="${personaToggleHref}"><span class="mm-idx">⚡</span>${personaToggleText}</a>`;
    mobileLinksHtml += `\n  <a href="${resumeHref}" target="_blank" data-site-field="${isSubpage ? 'subpageResumeUrl' : 'resumeUrl'}" data-site-attr="href"><span class="mm-idx">↗</span>Resume</a>`;
    mobileLinksHtml += `\n  <div class="mm-foot"><span>© 2026 KT</span><span>v3.2.0</span></div>`;
    mobileMenuContainer.innerHTML = mobileLinksHtml;
  }

  // 3. Render Sidebar
  const sidebarContainer = document.getElementById('site-sidebar');
  if (sidebarContainer) {
    sidebarContainer.className = 'sidebar';
    let navLinksHtml = NAV_ITEMS.map((item, idx) => {
      const activeClass = (isSubpage && item.id === 'notes' && window.location.pathname.includes('/notes/')) || 
                          (isSubpage && item.id === 'work' && window.location.pathname.includes('/releases/')) || 
                          (!isSubpage && idx === 0) ? ' active' : '';
      const hrefAttr = isSubpage ? `href="${prefix}${item.id}"` : `data-target="${item.id}"`;
      return `<a class="navlink${activeClass}" ${hrefAttr}><span class="idx">${item.idx}</span>${item.label}</a>`;
    }).join('\n      ');

    navLinksHtml += `\n      <a class="navlink resume" href="${resumeHref}" target="_blank" data-site-field="${isSubpage ? 'subpageResumeUrl' : 'resumeUrl'}" data-site-attr="href"><span class="idx">↗</span>Resume</a>`;

    sidebarContainer.innerHTML = `
      <div>
        <div class="brand">
          <div class="mark">KT</div>
          <div class="brand-name">Kenneth Torcuator</div>
          <div class="brand-role">${personaRole}</div>
          <a class="persona-toggle-link" href="${personaToggleHref}" style="display:inline-block; margin-top:6px; font-family:'IBM Plex Mono',monospace; font-size:10.5px; color:var(--cobalt); text-decoration:none;" title="Switch engineering persona mode">${personaToggleText}</a>
        </div>
        <nav id="navlist">
          ${navLinksHtml}
        </nav>
      </div>
      <div class="sidebar-foot">
        <div class="status"><span class="pulse"></span><span data-site-field="statusText">currently building</span></div>
        <div class="social-row">
          <a href="https://github.com/daikendy" target="_blank" rel="noopener" data-site-field="github" data-site-attr="href">GH</a>
          <a href="https://x.com/" target="_blank" rel="noopener" data-site-field="twitter" data-site-attr="href">X</a>
          <a href="https://linkedin.com/in/kenneth-torcuator" target="_blank" rel="noopener" data-site-field="linkedin" data-site-attr="href">IN</a>
        </div>
      </div>
    `;
  }
}
