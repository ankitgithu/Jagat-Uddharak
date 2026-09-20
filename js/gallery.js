// Photo Gallery with Category Filters, Zoom Effects & Lightbox Modal
import { GALLERY_DATA } from './data/gallery.js';
import { getCurrentLang, t } from './language.js';
import { initScrollReveal } from './animations.js';

let activeCategory = 'all';
let currentLightboxIndex = 0;
let filteredImages = [...GALLERY_DATA];

export function initGallery() {
  const container = document.getElementById('galleryCardsGrid');
  const filterBtnsContainer = document.getElementById('galleryFilterButtons');
  if (!container) return;

  renderFilterButtons();
  renderGalleryGrid();
  setupLightbox();

  window.addEventListener('languageChanged', () => {
    renderFilterButtons();
    renderGalleryGrid();
    updateLightboxContent();
  });
}

function renderFilterButtons() {
  const filterBtnsContainer = document.getElementById('galleryFilterButtons');
  if (!filterBtnsContainer) return;

  const isHindi = getCurrentLang() === 'hi';

  const categories = [
    { id: 'all', label: isHindi ? 'सभी चित्र' : 'All Photos' },
    { id: 'sant-rampal-ji', label: isHindi ? 'संत रामपाल जी महाराज' : 'Sant Rampal Ji Maharaj' },
    { id: 'annapurna', label: isHindi ? 'अन्नपूर्णा मुहिम' : 'Annapurna Mission' },
    { id: 'social-service', label: isHindi ? 'समाज सुधार' : 'Social Service' },
    { id: 'events', label: isHindi ? 'सत्संग समागम' : 'Spiritual Events' },
  ];

  filterBtnsContainer.innerHTML = categories.map(cat => `
    <button 
      type="button" 
      class="btn btn-sm ${activeCategory === cat.id ? 'btn-spiritual-red' : 'btn-outline-secondary'} rounded-pill px-3 py-2 fw-semibold gallery-filter-btn"
      data-category="${cat.id}">
      ${cat.label}
    </button>
  `).join('');

  filterBtnsContainer.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-category') || 'all';
      renderFilterButtons();
      renderGalleryGrid();
    });
  });
}

function renderGalleryGrid() {
  const container = document.getElementById('galleryCardsGrid');
  if (!container) return;

  const isHindi = getCurrentLang() === 'hi';

  filteredImages = activeCategory === 'all' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(item => item.category === activeCategory);

  if (filteredImages.length === 0) {
    container.innerHTML = `<div class="col-12 text-center py-5 text-muted">${isHindi ? 'कोई चित्र उपलब्ध नहीं है।' : 'No photos found.'}</div>`;
    return;
  }

  container.innerHTML = filteredImages.map((item, index) => {
    const title = isHindi ? item.title : item.titleEn;
    const desc = isHindi ? item.description : item.descriptionEn;
    const category = isHindi ? item.categoryLabel : item.categoryLabelEn;
    const source = isHindi ? item.sourceLabel : item.sourceLabelEn;

    return `
      <div class="col-12 col-sm-6 col-lg-4 col-xl-3 reveal-init">
        <div class="gallery-card h-100 cursor-pointer" data-index="${index}" style="cursor: pointer;">
          <div class="gallery-card-img-wrapper">
            <img 
              src="${item.imageUrl}" 
              alt="${title}" 
              class="gallery-card-img" 
              loading="lazy" 
              referrerpolicy="no-referrer">
            
            <div class="gallery-card-overlay">
              <span class="badge bg-danger text-white align-self-start mb-2 rounded-pill px-2 py-1 text-xs">
                ${category}
              </span>
              <h5 class="fw-bold text-white mb-1 fs-6">${title}</h5>
              <p class="text-light opacity-85 mb-0 text-xs text-truncate">${desc}</p>
            </div>

            <div class="gallery-zoom-badge shadow-sm">
              <i class="bi bi-arrows-fullscreen"></i>
            </div>
          </div>
          <div class="p-2 px-3 bg-white border-top d-flex align-items-center justify-content-between text-xs text-muted">
            <span><i class="bi bi-tag me-1"></i>${category}</span>
            <span><i class="bi bi-link-45deg me-1"></i>${source}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach click events for lightbox
  container.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index') || '0', 10);
      openLightbox(idx);
    });
  });

  initScrollReveal();
}

// Lightbox Modal Implementation
function setupLightbox() {
  const modalEl = document.getElementById('galleryLightboxModal');
  if (!modalEl) return;

  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');

  prevBtn?.addEventListener('click', () => {
    if (filteredImages.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxContent();
  });

  nextBtn?.addEventListener('click', () => {
    if (filteredImages.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredImages.length;
    updateLightboxContent();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modalEl.classList.contains('show')) return;
    if (e.key === 'ArrowLeft') {
      prevBtn?.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn?.click();
    }
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();

  const modalEl = document.getElementById('galleryLightboxModal');
  if (modalEl && typeof bootstrap !== 'undefined') {
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  }
}

function updateLightboxContent() {
  const modalEl = document.getElementById('galleryLightboxModal');
  if (!modalEl || !filteredImages[currentLightboxIndex]) return;

  const item = filteredImages[currentLightboxIndex];
  const isHindi = getCurrentLang() === 'hi';

  const imgEl = document.getElementById('lightboxImage');
  const titleEl = document.getElementById('lightboxTitle');
  const descEl = document.getElementById('lightboxDesc');
  const badgeEl = document.getElementById('lightboxBadge');
  const counterEl = document.getElementById('lightboxCounter');

  if (imgEl) {
    imgEl.src = item.imageUrl;
    imgEl.alt = isHindi ? item.title : item.titleEn;
  }
  if (titleEl) titleEl.textContent = isHindi ? item.title : item.titleEn;
  if (descEl) descEl.textContent = isHindi ? item.description : item.descriptionEn;
  if (badgeEl) badgeEl.textContent = isHindi ? item.categoryLabel : item.categoryLabelEn;
  if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} / ${filteredImages.length}`;
}
