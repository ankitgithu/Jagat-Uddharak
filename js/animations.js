// Visual Animations, Scroll Reveal, Indian Time Clock, Stats Counter & Custom Pointer System
// Jagat Uddharak Website

export function initAnimations() {
  initScrollReveal();
  initStatsCounter();
  initIndianTimeClock();
  initCustomPointerSystem();
}

// 1. Scroll Reveal Observer with Staggering
export function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-init:not(.revealed)');
  if (revealElements.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el, index) => {
    // Add subtle natural staggered delays to sibling cards
    if (!el.classList.contains('reveal-delay-1') && 
        !el.classList.contains('reveal-delay-2') && 
        !el.classList.contains('reveal-delay-3')) {
      const colIndex = index % 4;
      if (colIndex === 1) el.classList.add('reveal-delay-1');
      else if (colIndex === 2) el.classList.add('reveal-delay-2');
      else if (colIndex === 3) el.classList.add('reveal-delay-3');
    }
    observer.observe(el);
  });
}

// 2. Annapurna Stats Counter Animation
function initStatsCounter() {
  const statsContainer = document.getElementById('annapurnaStatsContainer');
  if (!statsContainer) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateNumbers();
      }
    });
  }, { threshold: 0.25 });

  observer.observe(statsContainer);

  function animateNumbers() {
    const counterElements = document.querySelectorAll('.stat-counter-value');
    counterElements.forEach(el => {
      const targetStr = el.getAttribute('data-target') || '0';
      const isZero = targetStr.includes('0') && targetStr.length <= 2;
      const cleanNum = parseInt(targetStr.replace(/[^0-9]/g, ''), 10);
      const suffix = targetStr.replace(/[0-9]/g, '');

      if (isNaN(cleanNum) || isZero) {
        el.textContent = targetStr;
        return;
      }

      let current = 0;
      const duration = 1800; // ms
      const stepTime = 25;
      const steps = duration / stepTime;
      const increment = cleanNum / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= cleanNum) {
          current = cleanNum;
          clearInterval(timer);
          el.textContent = cleanNum.toLocaleString('en-IN') + suffix;
        } else {
          el.textContent = Math.floor(current).toLocaleString('en-IN') + suffix;
        }
      }, stepTime);
    });
  }
}

// 3. Indian Standard Time (IST - UTC+5:30) Live Clock
function initIndianTimeClock() {
  const clockEl = document.getElementById('istLiveClockDisplay');
  const statusBadge = document.getElementById('liveStatusBadge');
  if (!clockEl) return;

  function updateIST() {
    const now = new Date();
    // Calculate IST: UTC + 5 hours 30 mins
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utc + (3600000 * 5.5));

    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const seconds = istTime.getSeconds();

    const formattedHours = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    clockEl.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm} IST`;

    // Check if within 7:30 PM (19:30) to 8:30 PM (20:30) IST
    const totalMinutes = (hours * 60) + minutes;
    const liveStart = 19 * 60 + 30; // 19:30
    const liveEnd = 20 * 60 + 30;   // 20:30

    if (statusBadge) {
      if (totalMinutes >= liveStart && totalMinutes <= liveEnd) {
        statusBadge.innerHTML = '<span class="live-pulse-dot me-1"></span> 🔴 LIVE ON AIR NOW (YouTube)';
        statusBadge.className = 'badge bg-danger text-white px-3 py-2 fs-6 shadow-sm';
      } else {
        statusBadge.innerHTML = '<i class="bi bi-broadcast me-1 text-danger"></i> प्रतिदिन शाम 7:30 - 8:30 बजे';
        statusBadge.className = 'badge bg-white text-danger border border-danger px-3 py-2 fs-6 shadow-sm';
      }
    }
  }

  updateIST();
  setInterval(updateIST, 1000);
}

// 4. Premium Desktop Custom Mouse Pointer System (Requirement 7)
function initCustomPointerSystem() {
  // Respect user preference and mobile/touch environments
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  const dotEl = document.getElementById('customCursorDot');
  const ringEl = document.getElementById('customCursorRing');
  const glowEl = document.getElementById('customCursorGlow');

  if (!dotEl || !ringEl || !glowEl) return;

  let mouseX = -999;
  let mouseY = -999;
  let ringX = -999;
  let ringY = -999;
  let glowX = -999;
  let glowY = -999;
  let isVisible = false;

  function setCursorVisibility(visible) {
    isVisible = visible;
    const opacityVal = visible ? '1' : '0';
    dotEl.style.opacity = opacityVal;
    ringEl.style.opacity = opacityVal;
    glowEl.style.opacity = opacityVal;
  }

  document.addEventListener('mousemove', (e) => {
    if (!isVisible) {
      setCursorVisibility(true);
      ringX = e.clientX;
      ringY = e.clientY;
      glowX = e.clientX;
      glowY = e.clientY;
    }
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Direct instant update for dot
    dotEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    setCursorVisibility(false);
  });

  document.addEventListener('mouseenter', () => {
    setCursorVisibility(true);
  });

  // Delegated hover interaction detection
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (!target) return;

    // Check if hovering over a video card or player element
    const videoCard = target.closest('.video-card-item, [data-youtube-id], .video-thumb-container, .btn-play-gradient');
    if (videoCard) {
      ringEl.classList.add('cursor-video-active');
      ringEl.classList.remove('cursor-hover-active');
      return;
    }

    // Check if hovering over any interactive element (buttons, links, gallery, cards)
    const interactive = target.closest(
      'a, button, .btn, .gallery-card, .glass-card, .stat-card-item, .ashram-card, ' +
      '.navbar-nav-link, .lang-btn, input, select, textarea, .accordion-button, [role="button"]'
    );

    if (interactive) {
      ringEl.classList.add('cursor-hover-active');
      ringEl.classList.remove('cursor-video-active');
    } else {
      ringEl.classList.remove('cursor-hover-active', 'cursor-video-active');
    }
  }, { passive: true });

  // Smooth lerp rendering loop
  function renderCursor() {
    if (isVisible && mouseX > -100) {
      // Smooth easing ring follow
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      // Soft ambient glow follow
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      glowEl.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
    }
    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);
}
