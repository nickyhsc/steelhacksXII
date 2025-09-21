document.addEventListener('DOMContentLoaded', function () {
  const hamb = document.querySelector('.hamburger');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = document.querySelector('.mobile-close');
  const links = document.querySelectorAll('.menu-list a');
  console.log('script.js loaded. hamb:', !!hamb, 'menu:', !!menu, 'closeBtn:', !!closeBtn, 'links:', links.length);

  // Ensure hamburger has proper ARIA attributes and button type
  if (hamb) {
    hamb.setAttribute('type', 'button');
    hamb.setAttribute('aria-controls', 'mobileMenu');
    hamb.setAttribute('aria-expanded', 'false');
  }


  
  function openMenu() {
    if (!menu) return;
    console.log('openMenu called');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    if (hamb) hamb.setAttribute('aria-expanded', 'true');
    if (closeBtn) closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!menu) return;
    console.log('closeMenu called');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    if (hamb) {
      hamb.setAttribute('aria-expanded', 'false');
      hamb.focus();
    }
    document.body.style.overflow = '';
  }

  if (hamb) hamb.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // close when clicking overlay background (but not when clicking menu content)
  if (menu) {
    menu.addEventListener('click', function (e) {
      if (e.target === menu) closeMenu();
    });
  }

  // close when selecting a menu link
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      const href = a.getAttribute('href') || '';
      // If the link contains a hash, treat it as a potential anchor.
      if (href.indexOf('#') !== -1) {
        // Extract target id after '#'
        const targetId = href.split('#')[1] || '';
        // Resolve the link to check whether it points to the current page
        let linkPointsToCurrentPage = true;
        try {
          const linkUrl = new URL(href, window.location.href);
          // If the resolved pathname differs from current page, let the browser navigate normally
          if (linkUrl.pathname !== window.location.pathname) linkPointsToCurrentPage = false;
        } catch (err) {
          // If URL parsing fails, assume it's a relative in-page link
          linkPointsToCurrentPage = true;
        }

        if (!linkPointsToCurrentPage) {
          // Different page — allow normal navigation and just close the menu
          closeMenu();
          return;
        }

        // Same-page anchor: smooth-scroll to element accounting for fixed header
        e.preventDefault();
        const target = document.getElementById(targetId);
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.offsetHeight : 0;
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        closeMenu();
        return;
      }

      // Fallback: normal navigation for non-anchor links
      closeMenu();
    });
  });

  // Start Here button: smooth scroll to mission and close menu if open
  // Start / "Start Here" handlers: support buttons/links across pages
  (function(){
    const startSelectors = ['#startBtn','[data-start]','.start-here','.start-btn','a.start-link'];
    const startEls = [];
    startSelectors.forEach(sel => document.querySelectorAll(sel).forEach(el => startEls.push(el)));
    startEls.forEach(function(el){
      el.addEventListener('click', function(e){
        e.preventDefault();
        const targetHash = '#mission';
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.offsetHeight : 0;
        const onIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';
        if (onIndex) {
          const mission = document.getElementById('mission');
          if (mission) {
            const top = mission.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
            window.scrollTo({ top, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          // Navigate to index with the mission hash so the index page will scroll on load
          window.location.href = 'index.html' + targetHash;
        }
        closeMenu();
      });
    });
  })();

  // Make the logo clickable: navigate home or scroll to top on index
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', function(e){
      // If the logo already contains a link, let the link handle navigation
      if (e.target.closest('a')) return;
      const onIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';
      if (onIndex) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.href = 'index.html';
      }
    });
    // keyboard support (Enter / Space)
    logo.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        logo.click();
      }
    });
  }
  // On page load, if there's a hash (e.g., navigating from another page to index.html#about),
  // scroll to the target accounting for the fixed header height.
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    const target = document.getElementById(hash);
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 0;
    if (target) {
      // Small timeout to allow browser to render and to avoid fighting default jump
      setTimeout(() => {
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 60);
    }
  }

  // Ensure the fixed header doesn't cover page content on pages without a hero.
  // If <main>'s first child is not a .hero, apply a minimum padding-top equal to the header height.
  function debounce(fn, wait){
    let t;
    return function(){
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), wait);
    };
  }

  function adjustForHeader(){
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 0;
    // expose as a CSS variable for optional use in styles
    document.documentElement.style.setProperty('--header-height', headerHeight + 'px');

    document.querySelectorAll('main').forEach(main => {
      const first = main.firstElementChild;
      const hasHero = first && first.classList && first.classList.contains('hero');
      if (hasHero) {
        // Let the hero keep its own margin; clear any forced padding
        main.style.paddingTop = '';
      } else {
        const computed = parseFloat(window.getComputedStyle(main).paddingTop) || 0;
        if (computed < headerHeight) {
          main.style.paddingTop = headerHeight + 'px';
        }
      }
    });
  }

  // Run initially and on resize (debounced)
  adjustForHeader();
  window.addEventListener('resize', debounce(adjustForHeader, 120));
});
