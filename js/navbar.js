// Navbar Logic, Responsive Handling & Glass Effects
import { getCurrentLang, setLanguage, t } from './language.js';

export function initNavbar() {
  const navbarWrapper = document.getElementById('siteNavbarWrapper');
  const langBtns = document.querySelectorAll('.lang-btn');
  const navLinks = document.querySelectorAll('.navbar-nav-link, .mobile-nav-link');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  // 1. Language Toggle Buttons
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang) {
        setLanguage(targetLang);
      }
    });
  });

  // Update active state of language buttons
  function updateLangButtons() {
    const current = getCurrentLang();
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === current) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  updateLangButtons();
  window.addEventListener('languageChanged', updateLangButtons);

  // 2. Scroll effect (compact navbar & shadow)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbarWrapper?.classList.add('site-navbar-scrolled');
    } else {
      navbarWrapper?.classList.remove('site-navbar-scrolled');
    }
    updateActiveNavLink();
  }, { passive: true });

  // 3. Close mobile drawer on link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        // Smooth scroll to section
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          const navHeight = 90;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close Bootstrap offcanvas if open
          if (mobileDrawer && typeof bootstrap !== 'undefined') {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(mobileDrawer);
            if (bsOffcanvas) {
              bsOffcanvas.hide();
            }
          }
        }
      }
    });
  });

  // 4. Scroll spy for active link
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
}
