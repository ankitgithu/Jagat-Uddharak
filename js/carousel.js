// Master Carousel & Interactive Slider System
import { ALL_HOME_VIDEOS } from './data/videos.js';
import { getCurrentLang } from './language.js';

let videoCarouselState = {
  currentIndex: 0,
  filter: 'all',
  items: [],
  autoPlayTimer: null,
  isPaused: false,
};

export function initCarousels() {
  initVideoGalleryCarousel();
  setupSliderControls('annapurnaVideosSlider', 'annapurnaVideosPrev', 'annapurnaVideosNext');
  setupSliderControls('booksSlider', 'booksSliderPrev', 'booksSliderNext');
}

/**
 * High-performance, touch & drag enabled responsive Video Gallery Carousel
 */
export function initVideoGalleryCarousel() {
  const track = document.getElementById('videoGalleryCarouselTrack');
  const viewport = document.getElementById('videoGalleryViewport');
  const prevBtn = document.getElementById('videoGalleryPrev');
  const nextBtn = document.getElementById('videoGalleryNext');
  const counterBadge = document.getElementById('videoSliderCounter');
  const filterBtns = document.querySelectorAll('.video-filter-btn');

  if (!track || !viewport) return;

  // Initialize with all items
  videoCarouselState.items = [...ALL_HOME_VIDEOS];
  renderVideoCarouselSlides();

  // Setup category filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter || 'all';
      filterBtns.forEach(b => {
        b.classList.remove('active', 'btn-spiritual-red');
        b.classList.add('btn-outline-secondary');
      });
      btn.classList.remove('btn-outline-secondary');
      btn.classList.add('active', 'btn-spiritual-red');

      videoCarouselState.filter = filter;
      videoCarouselState.currentIndex = 0;

      if (filter === 'all') {
        videoCarouselState.items = [...ALL_HOME_VIDEOS];
      } else if (filter === 'sa-true-story') {
        videoCarouselState.items = ALL_HOME_VIDEOS.filter(v => v.categoryKey === 'sa-true-story');
      } else if (filter === 'annapurna') {
        videoCarouselState.items = ALL_HOME_VIDEOS.filter(v => v.categoryKey === 'annapurna');
      } else if (filter === 'youtube-show') {
        videoCarouselState.items = ALL_HOME_VIDEOS.filter(v => v.categoryKey === 'youtube-show');
      }

      renderVideoCarouselSlides();
      updateCarouselPosition(true);
    });
  });

  // Calculate cards visible based on viewport width
  function getVisibleCardsCount() {
    const width = window.innerWidth;
    if (width < 576) return 1;
    if (width < 992) return 2;
    return 3;
  }

  function getMaxIndex() {
    const visible = getVisibleCardsCount();
    return Math.max(0, videoCarouselState.items.length - visible);
  }

  function updateCarouselPosition(animate = true) {
    const slides = track.querySelectorAll('.video-carousel-slide');
    if (!slides.length) return;

    const visible = getVisibleCardsCount();
    const maxIdx = Math.max(0, videoCarouselState.items.length - visible);

    if (videoCarouselState.currentIndex > maxIdx) {
      videoCarouselState.currentIndex = maxIdx;
    }
    if (videoCarouselState.currentIndex < 0) {
      videoCarouselState.currentIndex = 0;
    }

    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 20; // 20px gap
    const shift = videoCarouselState.currentIndex * (slideWidth + gap);

    if (animate) {
      track.classList.remove('no-transition');
    } else {
      track.classList.add('no-transition');
    }

    track.style.transform = `translateX(-${shift}px)`;

    // Update Counter
    if (counterBadge) {
      const currentNum = String(videoCarouselState.currentIndex + 1).padStart(2, '0');
      const totalNum = String(videoCarouselState.items.length).padStart(2, '0');
      counterBadge.textContent = `${currentNum} / ${totalNum}`;
    }
  }

  function nextSlide() {
    const maxIdx = getMaxIndex();
    if (videoCarouselState.currentIndex >= maxIdx) {
      // Smooth loop back to beginning
      videoCarouselState.currentIndex = 0;
    } else {
      videoCarouselState.currentIndex++;
    }
    updateCarouselPosition(true);
  }

  function prevSlide() {
    const maxIdx = getMaxIndex();
    if (videoCarouselState.currentIndex <= 0) {
      // Loop to end
      videoCarouselState.currentIndex = maxIdx;
    } else {
      videoCarouselState.currentIndex--;
    }
    updateCarouselPosition(true);
  }

  // Prev / Next button click handlers
  nextBtn?.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  // Touch Swipe Handlers for Mobile & Tablet
  let touchStartX = 0;
  let touchCurrentX = 0;
  let isSwiping = false;

  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchCurrentX = touchStartX;
    isSwiping = true;
    pauseAutoplay();
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    touchCurrentX = e.touches[0].clientX;
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    if (!isSwiping) return;
    isSwiping = false;
    const diff = touchStartX - touchCurrentX;
    const threshold = 45; // 45px swipe threshold

    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
    resumeAutoplay();
  }, { passive: true });

  // Mouse Drag Scrolling for Desktop
  let isMouseDown = false;
  let mouseStartX = 0;
  let mouseDiff = 0;

  viewport.addEventListener('mousedown', (e) => {
    // Only primary mouse button
    if (e.button !== 0) return;
    isMouseDown = true;
    mouseStartX = e.clientX;
    mouseDiff = 0;
    viewport.classList.add('is-dragging');
    pauseAutoplay();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    mouseDiff = e.clientX - mouseStartX;
  });

  window.addEventListener('mouseup', (e) => {
    if (!isMouseDown) return;
    isMouseDown = false;
    viewport.classList.remove('is-dragging');

    const threshold = 50;
    if (mouseDiff < -threshold) {
      nextSlide();
    } else if (mouseDiff > threshold) {
      prevSlide();
    }
    resumeAutoplay();
  });

  // Autoplay with Pause on Hover
  function startAutoplay() {
    stopAutoplay();
    videoCarouselState.autoPlayTimer = setInterval(() => {
      if (!videoCarouselState.isPaused) {
        nextSlide();
      }
    }, 4500);
  }

  function stopAutoplay() {
    if (videoCarouselState.autoPlayTimer) {
      clearInterval(videoCarouselState.autoPlayTimer);
      videoCarouselState.autoPlayTimer = null;
    }
  }

  function pauseAutoplay() {
    videoCarouselState.isPaused = true;
  }

  function resumeAutoplay() {
    videoCarouselState.isPaused = false;
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  viewport.addEventListener('mouseenter', pauseAutoplay);
  viewport.addEventListener('mouseleave', resumeAutoplay);
  viewport.addEventListener('focusin', pauseAutoplay);
  viewport.addEventListener('focusout', resumeAutoplay);

  // Responsive resize handler
  window.addEventListener('resize', () => {
    updateCarouselPosition(false);
  });

  // Start Autoplay initially
  startAutoplay();

  // Listen to language change to re-render texts in slides
  window.addEventListener('languageChanged', () => {
    renderVideoCarouselSlides();
    updateCarouselPosition(false);
  });
}

/**
 * Renders video slides dynamically into the track with exact thumbnails and titles
 */
export function renderVideoCarouselSlides() {
  const track = document.getElementById('videoGalleryCarouselTrack');
  if (!track) return;

  const isHindi = getCurrentLang() === 'hi';
  const items = videoCarouselState.items;

  track.innerHTML = items.map((vid) => {
    const title = isHindi ? vid.title : (vid.titleEn || vid.title);
    const desc = isHindi ? (vid.description || '') : (vid.descriptionEn || vid.description || '');
    const badge = isHindi ? vid.badge : (vid.badgeEn || vid.badge);
    const youtubeId = vid.youtubeId || '';
    const videoUrl = vid.url || `https://youtu.be/${youtubeId}`;

    return `
      <div class="video-carousel-slide">
        <div class="video-card-item h-100 d-flex flex-column" data-youtube-id="${youtubeId}" data-url="${videoUrl}">
          <div class="video-thumb-container">
            <img 
              src="${vid.thumbnail}" 
              alt="${title}" 
              class="video-thumb-img" 
              loading="lazy" 
              referrerpolicy="no-referrer"
            >
            <div class="video-play-overlay">
              <div class="btn-play-gradient shadow-lg">
                <i class="bi bi-play-fill fs-2 text-white ps-1"></i>
              </div>
            </div>
            <span class="position-absolute top-2 start-2 badge bg-danger text-white rounded-pill px-3 py-1 shadow-sm fs-7">
              ${badge}
            </span>
            ${vid.isPlaylist ? `
              <span class="position-absolute bottom-2 end-2 badge bg-dark bg-opacity-75 text-white rounded-pill px-2 py-1 fs-8">
                <i class="bi bi-collection-play-fill me-1"></i> प्लेलिस्ट
              </span>
            ` : ''}
            ${vid.isShow ? `
              <span class="position-absolute bottom-2 end-2 badge bg-dark bg-opacity-75 text-white rounded-pill px-2 py-1 fs-8">
                <i class="bi bi-tv-fill me-1"></i> सम्पूर्ण शो
              </span>
            ` : ''}
          </div>

          <div class="p-3 p-md-4 d-flex flex-column flex-grow-1">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="badge bg-danger-subtle text-danger fw-semibold rounded-pill px-2 py-1 fs-8">
                ${isHindi ? vid.category : (vid.categoryEn || vid.category)}
              </span>
              <span class="text-muted fs-8 d-flex align-items-center gap-1">
                <i class="bi bi-shield-check text-success"></i> सत्यापित
              </span>
            </div>

            <h5 class="fw-bold text-dark mb-2 fs-6 line-clamp-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.45;">
              ${title}
            </h5>

            <p class="text-secondary small mb-3 flex-grow-1 line-clamp-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.45;">
              ${desc}
            </p>

            <div class="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
              <button type="button" class="btn btn-sm btn-spiritual-red rounded-pill px-3 py-1 fw-semibold play-modal-btn d-inline-flex align-items-center gap-1">
                <i class="bi bi-play-fill"></i> ${isHindi ? 'चलाएं' : 'Play'}
              </button>
              <a href="${videoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 fs-8 d-inline-flex align-items-center gap-1" onclick="event.stopPropagation();">
                <i class="bi bi-youtube text-danger"></i> YouTube <i class="bi bi-box-arrow-up-right fs-9"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Setup click-to-play & 3D tilt cursor follow on newly rendered cards
  attachCardInteractions();
}

/**
 * Attaches 3D tilt parallax, smooth hover aura and video playback triggers to cards
 */
function attachCardInteractions() {
  const cards = document.querySelectorAll('.video-card-item');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  cards.forEach(card => {
    // Click card to open modal player
    card.addEventListener('click', (e) => {
      // Ignore if clicking direct external YouTube anchor
      if (e.target.closest('a[target="_blank"]')) return;

      const youtubeId = card.dataset.youtubeId;
      const url = card.dataset.url;

      if (youtubeId && window.openVideoModal) {
        window.openVideoModal(youtubeId);
      } else if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });

    // 3D Parallax & Cursor-Follow on fine pointer desktop devices
    if (isFinePointer) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.015)`;

        const thumb = card.querySelector('.video-thumb-img');
        if (thumb) {
          const shiftX = (centerX - x) * 0.04;
          const shiftY = (centerY - y) * 0.04;
          thumb.style.transform = `translate3d(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px, 0) scale(1.08)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        const thumb = card.querySelector('.video-thumb-img');
        if (thumb) {
          thumb.style.transform = '';
        }
      });
    }
  });
}

/**
 * Standard slider helper for other sections (Annapurna, Books)
 */
function setupSliderControls(sliderId, prevBtnId, nextBtnId) {
  const slider = document.getElementById(sliderId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);

  if (!slider) return;

  const scrollAmount = 360;

  prevBtn?.addEventListener('click', () => {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn?.addEventListener('click', () => {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // Mouse drag scrolling for desktop
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active-dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active-dragging');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active-dragging');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });
}
