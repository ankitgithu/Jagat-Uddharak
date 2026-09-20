// Main Application Bootstrap & Dynamic Content Rendering
// Jagat Uddharak Website
import { initNavbar } from './navbar.js';
import { initAnimations, initScrollReveal } from './animations.js';
import { initGallery } from './gallery.js';
import { initCarousels } from './carousel.js';
import { getCurrentLang, t } from './language.js';

import {
  OFFICIAL_CHANNELS,
  SPIRITUAL_TOPICS,
  HOLY_SCRIPTURES,
  SOCIAL_REFORMS,
  FAQ_DATA,
  ASHRAM_CONTACTS
} from './data/content.js';

import {
  ANNAPURNA_STATS,
  ANNAPURNA_INITIATIVES,
  ANNAPURNA_STORIES,
  ANNAPURNA_VIDEOS,
  UPDATES_DATA
} from './data/annapurna.js';

import { BOOKS_DATA } from './data/books.js';
import { FEATURED_MEDIA_ITEMS, VIDEOS_DATA } from './data/videos.js';

document.addEventListener('DOMContentLoaded', () => {
  renderAllSections();
  initNavbar();
  initAnimations();
  initGallery();
  initCarousels();
  setupVideoModal();

  window.addEventListener('languageChanged', () => {
    updateDynamicTexts();
    renderAllSections();
  });
});

function renderAllSections() {
  updateDynamicTexts();
  renderSpiritualTopics();
  renderHolyScriptures();
  renderSocialReforms();
  renderAnnapurnaSection();
  renderBooksSection();
  renderVideosSection();
  renderUpdatesSection();
  renderFaqSection();
  renderAshramsSection();
  initScrollReveal();
}

// Update static text elements mapped to data-i18n attributes
function updateDynamicTexts() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (key) {
      el.innerHTML = t(key);
    }
  });
}

// 1. Spiritual Knowledge Topics
function renderSpiritualTopics() {
  const container = document.getElementById('spiritualTopicsGrid');
  if (!container) return;

  const isHindi = getCurrentLang() === 'hi';

  container.innerHTML = SPIRITUAL_TOPICS.map((topic, index) => {
    const title = isHindi ? topic.title : topic.titleEn;
    const subtitle = isHindi ? topic.subtitle : topic.subtitleEn;
    const desc = isHindi ? topic.description : topic.descriptionEn;
    const details = isHindi ? topic.details : topic.detailsEn;

    return `
      <div class="col-12 col-md-6 reveal-init">
        <div class="glass-card h-100 p-4 d-flex flex-column">
          <div class="position-relative rounded-3 overflow-hidden mb-3 img-hover-container" style="height: 200px;">
            <img src="${topic.image}" alt="${title}" class="w-100 h-100 object-fit-cover img-hover-zoom" loading="lazy" referrerpolicy="no-referrer">
            <div class="img-hover-overlay"></div>
            <span class="position-absolute top-2 start-2 badge bg-danger text-white rounded-pill px-3 py-1 shadow-sm">
              ${isHindi ? `विषय #${index + 1}` : `Topic #${index + 1}`}
            </span>
          </div>

          <h4 class="fw-bold mb-2 text-dark fs-5">${title}</h4>
          <h6 class="text-spiritual-amber fw-semibold mb-3 fs-6">${subtitle}</h6>
          <p class="text-muted mb-3 flex-grow-1">${desc}</p>

          <div class="collapse mb-3" id="topicDetails-${topic.id}">
            <div class="p-3 bg-light rounded-3 border text-secondary small">
              <p class="mb-2">${details}</p>
              <div class="fw-bold text-dark mb-1">${isHindi ? 'सद्ग्रंथ प्रमाण:' : 'Scripture Evidences:'}</div>
              <ul class="mb-0 ps-3">
                ${topic.references.map(ref => `<li>${ref}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div class="pt-2 border-top d-flex align-items-center justify-content-between mt-auto">
            <button class="btn btn-sm btn-outline-danger rounded-pill px-3" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#topicDetails-${topic.id}">
              <i class="bi bi-book me-1"></i> ${isHindi ? 'शास्त्र प्रमाण देखें' : 'View Scriptural Proofs'}
            </button>
            <a href="${OFFICIAL_CHANNELS.officialWebsite}" target="_blank" rel="noopener noreferrer" class="text-danger small fw-semibold text-decoration-none">
              ${isHindi ? 'विस्तार से पढ़ें →' : 'Read Full →'}
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 2. Holy Scriptures
function renderHolyScriptures() {
  const container = document.getElementById('holyScripturesGrid');
  if (!container) return;

  const isHindi = getCurrentLang() === 'hi';

  container.innerHTML = HOLY_SCRIPTURES.map(scripture => {
    const name = isHindi ? scripture.name : scripture.nameEn;
    const title = isHindi ? scripture.title : scripture.titleEn;
    const ref = isHindi ? scripture.reference : scripture.referenceEn;
    const meaning = isHindi ? scripture.meaning : scripture.meaningEn;

    return `
      <div class="col-12 col-md-6 col-lg-4 reveal-init">
        <div class="glass-card border-top-gradient h-100 p-4 d-flex flex-column">
          <div class="d-flex align-items-center gap-3 mb-3">
            <img src="${scripture.image}" alt="${name}" class="rounded-circle object-fit-cover shadow-sm" style="width: 54px; height: 54px;" loading="lazy" referrerpolicy="no-referrer">
            <div>
              <h5 class="fw-bold text-dark mb-0 fs-6">${name}</h5>
              <span class="badge bg-danger-subtle text-danger fw-semibold px-2 py-1 rounded text-xs">${ref}</span>
            </div>
          </div>

          <h6 class="fw-bold text-spiritual-amber mb-2 fs-6">${title}</h6>

          <div class="p-3 bg-light rounded-3 border-start border-3 border-amber mb-3 fst-italic text-dark small" style="border-left-color: #D97706 !important;">
            "${scripture.quote}"
          </div>

          <p class="text-secondary small mb-3 flex-grow-1">
            <strong>${isHindi ? 'यथार्थ भावार्थ:' : 'Meaning:'}</strong> ${meaning}
          </p>

          <div class="mt-auto pt-2 border-top text-end">
            <a href="${OFFICIAL_CHANNELS.officialWebsite}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-link text-danger p-0 text-decoration-none fw-semibold">
              ${isHindi ? 'अधिक प्रमाण देखें →' : 'See Full Evidences →'}
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 3. Social Reforms
function renderSocialReforms() {
  const container = document.getElementById('socialReformsGrid');
  if (!container) return;

  const isHindi = getCurrentLang() === 'hi';

  container.innerHTML = SOCIAL_REFORMS.map((reform, idx) => {
    const title = isHindi ? reform.title : reform.titleEn;
    const tagline = isHindi ? reform.tagline : reform.taglineEn;
    const desc = isHindi ? reform.description : reform.descriptionEn;
    const points = isHindi ? reform.points : reform.pointsEn;

    return `
      <div class="col-12 col-md-6 col-lg-4 reveal-init">
        <div class="glass-card h-100 p-4 d-flex flex-column">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="badge bg-danger-subtle text-danger rounded-pill px-3 py-1 fw-bold text-xs">
              0${idx + 1}
            </span>
            <i class="bi bi-shield-check text-spiritual-amber fs-4"></i>
          </div>

          <h5 class="fw-bold text-dark mb-1 fs-5">${title}</h5>
          <h6 class="text-spiritual-amber fw-semibold mb-3 fs-6">${tagline}</h6>
          <p class="text-muted small mb-3 flex-grow-1">${desc}</p>

          <div class="p-3 bg-light rounded-3 border mt-auto">
            <div class="fw-bold text-dark small mb-2">${isHindi ? 'प्रमुख नियम व उपलब्धियां:' : 'Key Principles:'}</div>
            <ul class="mb-0 ps-3 text-secondary small">
              ${points.map(p => `<li class="mb-1">${p}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 4. Annapurna Mission Section (Stats, Initiatives, Stories, 8 Ground Videos)
function renderAnnapurnaSection() {
  const statsContainer = document.getElementById('annapurnaStatsGrid');
  const initiativesContainer = document.getElementById('annapurnaInitiativesGrid');
  const storiesContainer = document.getElementById('annapurnaStoriesGrid');
  const videosContainer = document.getElementById('annapurnaVideosSlider');

  const isHindi = getCurrentLang() === 'hi';

  // Stats
  if (statsContainer) {
    statsContainer.innerHTML = ANNAPURNA_STATS.map(stat => {
      const label = isHindi ? stat.label : stat.labelEn;
      return `
        <div class="col-6 col-lg-3 reveal-init">
          <div class="stat-card-item p-4 rounded-4 text-center bg-white border shadow-sm h-100">
            <div class="display-5 fw-extrabold text-gradient-red mb-1 stat-counter-value" data-target="${stat.number}">
              ${stat.number}
            </div>
            <div class="fw-bold text-secondary small">${label}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 6 Initiatives
  if (initiativesContainer) {
    initiativesContainer.innerHTML = ANNAPURNA_INITIATIVES.map(init => {
      const title = isHindi ? init.title : init.titleEn;
      const tagline = isHindi ? init.tagline : init.taglineEn;
      const desc = isHindi ? init.description : init.descriptionEn;
      const points = isHindi ? init.points : init.pointsEn;

      return `
        <div class="col-12 col-md-6 col-lg-4 reveal-init">
          <div class="glass-card h-100 p-4 d-flex flex-column">
            <div class="rounded-3 overflow-hidden mb-3 img-hover-container" style="height: 180px;">
              <img src="${init.image}" alt="${title}" class="w-100 h-100 object-fit-cover img-hover-zoom" loading="lazy" referrerpolicy="no-referrer">
              <div class="img-hover-overlay"></div>
            </div>
            <h5 class="fw-bold text-dark mb-1 fs-5">${title}</h5>
            <h6 class="text-spiritual-amber fw-semibold mb-2 fs-6">${tagline}</h6>
            <p class="text-muted small mb-3 flex-grow-1">${desc}</p>
            <ul class="list-unstyled mb-0 pt-2 border-top small text-secondary">
              ${points.map(pt => `<li class="d-flex align-items-center gap-2 mb-1"><i class="bi bi-heart-fill text-danger small"></i> ${pt}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }).join('');
  }

  // Stories
  if (storiesContainer) {
    storiesContainer.innerHTML = ANNAPURNA_STORIES.map(story => {
      const title = isHindi ? story.title : story.titleEn;
      const summary = isHindi ? story.summary : story.summaryEn;
      const location = isHindi ? story.location : story.locationEn;
      const date = isHindi ? story.date : story.dateEn;

      return `
        <div class="col-12 col-md-4 reveal-init">
          <div class="glass-card h-100 p-3 d-flex flex-column">
            <div class="rounded-3 overflow-hidden mb-3 position-relative img-hover-container" style="height: 180px;">
              <img src="${story.image}" alt="${title}" class="w-100 h-100 object-fit-cover img-hover-zoom" loading="lazy" referrerpolicy="no-referrer">
              <div class="img-hover-overlay"></div>
              <span class="position-absolute bottom-2 start-2 badge bg-dark text-white rounded-pill px-2 py-1 text-xs">
                <i class="bi bi-geo-alt me-1"></i>${location}
              </span>
            </div>
            <div class="text-xs text-muted mb-1">${date}</div>
            <h6 class="fw-bold text-dark mb-2 fs-6">${title}</h6>
            <p class="text-secondary small mb-3 flex-grow-1">${summary}</p>
            <a href="${story.link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-danger rounded-pill mt-auto align-self-start">
              ${isHindi ? 'पूरी कहानी पढ़ें →' : 'Read Full Story →'}
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // 8 Ground Seva YouTube Videos
  if (videosContainer) {
    videosContainer.innerHTML = ANNAPURNA_VIDEOS.map(vid => {
      const title = isHindi ? vid.title : vid.titleEn;
      const loc = isHindi ? vid.location : vid.locationEn;

      return `
        <div class="flex-shrink-0" style="width: 320px;">
          <div class="video-card-item h-100 overflow-hidden d-flex flex-column" data-youtube-id="${vid.id}" style="cursor: pointer;">
            <div class="video-thumb-container" style="height: 180px;">
              <img src="${vid.thumbnail}" alt="${title}" class="video-thumb-img" loading="lazy" referrerpolicy="no-referrer">
              <div class="video-play-overlay">
                <div class="btn-play-gradient btn-play-gradient-sm">
                  <i class="bi bi-play-fill fs-4 text-white"></i>
                </div>
              </div>
              <span class="position-absolute top-2 start-2 badge bg-danger text-white rounded-pill text-xs">
                ${loc}
              </span>
            </div>
            <div class="p-3 d-flex flex-column flex-grow-1">
              <h6 class="fw-bold text-dark mb-2 text-truncate-2 fs-6" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${title}</h6>
              <div class="mt-auto d-flex align-items-center justify-content-between pt-2 border-top text-xs text-danger fw-semibold">
                <span><i class="bi bi-youtube me-1"></i> YouTube</span>
                <span>${isHindi ? 'वीडियो चलाएं ▶' : 'Play Video ▶'}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// 5. Books & PDF Section
function renderBooksSection() {
  const container = document.getElementById('booksCardsGrid');
  if (!container) return;

  const isHindi = getCurrentLang() === 'hi';

  container.innerHTML = BOOKS_DATA.map(book => {
    const title = isHindi ? book.title : book.titleEn;
    const desc = isHindi ? book.description : book.descriptionEn;
    const cat = isHindi ? book.category : book.categoryEn;

    return `
      <div class="col-12 col-sm-6 col-lg-3 reveal-init">
        <div class="glass-card h-100 p-3 d-flex flex-column">
          <div class="position-relative mb-3 rounded-3 overflow-hidden bg-light shadow-sm text-center" style="height: 260px;">
            <img src="${book.coverImage}" alt="${title}" class="h-100 object-fit-contain p-2 book-cover-img" loading="lazy" referrerpolicy="no-referrer">
            ${book.featured ? `<span class="position-absolute top-2 end-2 badge bg-warning text-dark rounded-pill shadow-sm"><i class="bi bi-star-fill me-1"></i>${isHindi ? 'प्रमुख' : 'Popular'}</span>` : ''}
          </div>

          <span class="badge bg-secondary-subtle text-secondary align-self-start mb-2 rounded-pill px-2 py-1 text-xs">
            ${cat}
          </span>

          <h5 class="fw-bold text-dark mb-2 fs-6">${title}</h5>
          <p class="text-muted small mb-3 flex-grow-1 text-truncate-3" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${desc}</p>

          <div class="d-flex flex-column gap-2 mt-auto pt-2 border-top">
            <a href="${book.readUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-danger rounded-pill fw-semibold">
              <i class="bi bi-book-half me-1"></i> ${isHindi ? 'ऑनलाइन पढ़ें' : 'Read Online'}
            </a>
            <a href="${book.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-spiritual-red rounded-pill fw-semibold text-center">
              <i class="bi bi-file-earmark-pdf-fill me-1"></i> ${isHindi ? 'आधिकारिक PDF डाउनलोड' : 'Download PDF'}
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 6. Videos & Featured Media Section + Single Official Website Card
function renderVideosSection() {
  const featuredContainer = document.getElementById('featuredMediaSlider');
  const videosGrid = document.getElementById('videosCardsGrid');

  const isHindi = getCurrentLang() === 'hi';

  if (featuredContainer) {
    featuredContainer.innerHTML = FEATURED_MEDIA_ITEMS.map(item => {
      const title = isHindi ? item.title : item.titleEn;
      const desc = isHindi ? item.description : item.descriptionEn;
      const badge = isHindi ? item.badge : item.badgeEn;
      const meta = isHindi ? item.meta : item.metaEn;

      return `
        <div class="flex-shrink-0" style="width: 360px;">
          <div class="video-card-item h-100 overflow-hidden d-flex flex-column" data-youtube-id="${item.youtubeId}" style="cursor: pointer;">
            <div class="video-thumb-container" style="height: 200px;">
              <img src="${item.thumbnail}" alt="${title}" class="video-thumb-img" loading="lazy" referrerpolicy="no-referrer">
              <div class="video-play-overlay">
                <div class="btn-play-gradient">
                  <i class="bi bi-play-fill fs-3 text-white"></i>
                </div>
              </div>
              <span class="position-absolute top-2 start-2 badge bg-danger text-white rounded-pill px-3 py-1 shadow-sm">
                ${badge}
              </span>
            </div>

            <div class="p-3 d-flex flex-column flex-grow-1">
              <div class="text-xs text-spiritual-amber fw-semibold mb-1">${meta}</div>
              <h5 class="fw-bold text-dark mb-2 fs-6">${title}</h5>
              <p class="text-muted small mb-3 flex-grow-1 text-truncate-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${desc}</p>
              
              <div class="mt-auto pt-2 border-top d-flex align-items-center justify-content-between text-xs">
                <span class="text-danger fw-semibold">${isHindi ? 'चलाएं ▶' : 'Play ▶'}</span>
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="text-secondary" onclick="event.stopPropagation();">
                  YouTube <i class="bi bi-box-arrow-up-right ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  if (videosGrid) {
    videosGrid.innerHTML = VIDEOS_DATA.map(vid => {
      const title = isHindi ? vid.title : vid.titleEn;
      const speaker = isHindi ? vid.speaker : vid.speakerEn;
      const cat = isHindi ? vid.category : vid.categoryEn;

      return `
        <div class="col-12 col-md-6 col-lg-3 reveal-init">
          <div class="video-card-item h-100 overflow-hidden d-flex flex-column" data-youtube-id="${vid.youtubeId}" style="cursor: pointer;">
            <div class="video-thumb-container" style="height: 170px;">
              <img src="${vid.thumbnail}" alt="${title}" class="video-thumb-img" loading="lazy" referrerpolicy="no-referrer">
              <div class="video-play-overlay">
                <div class="btn-play-gradient btn-play-gradient-sm">
                  <i class="bi bi-play-fill fs-5 text-white"></i>
                </div>
              </div>
              <span class="position-absolute bottom-2 end-2 badge bg-dark text-white rounded px-2 py-1 text-xs">
                ${vid.duration}
              </span>
            </div>

            <div class="p-3 d-flex flex-column flex-grow-1">
              <span class="badge bg-danger-subtle text-danger align-self-start mb-2 rounded-pill px-2 py-1 text-xs">${cat}</span>
              <h6 class="fw-bold text-dark mb-1 fs-6 text-truncate-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${title}</h6>
              <div class="text-xs text-muted mb-2">${speaker}</div>
              <div class="mt-auto pt-2 border-top d-flex align-items-center justify-content-between text-xs text-muted">
                <span><i class="bi bi-eye me-1"></i>${vid.views}</span>
                <span class="text-danger fw-semibold">${isHindi ? 'वीडियो देखें' : 'Watch'}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// 7. Latest Updates
function renderUpdatesSection() {
  const container = document.getElementById('updatesCardsGrid');
  if (!container) return;

  const isHindi = getCurrentLang() === 'hi';

  container.innerHTML = UPDATES_DATA.map(item => {
    const title = isHindi ? item.title : item.titleEn;
    const desc = isHindi ? item.description : item.descriptionEn;
    const cat = isHindi ? item.category : item.categoryEn;
    const date = isHindi ? item.date : item.dateEn;

    return `
      <div class="col-12 col-md-4 reveal-init">
        <div class="glass-card h-100 p-4 d-flex flex-column border-start border-4 border-danger">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="badge bg-danger text-white rounded-pill px-2 py-1 text-xs">${cat}</span>
            <span class="text-muted text-xs">${date}</span>
          </div>
          <h5 class="fw-bold text-dark mb-2 fs-6">${title}</h5>
          <p class="text-secondary small mb-3 flex-grow-1">${desc}</p>
          <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-link text-danger p-0 text-decoration-none fw-semibold align-self-start">
            ${isHindi ? 'अधिक विवरण →' : 'Read More →'}
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// 8. FAQ Accordion
function renderFaqSection() {
  const container = document.getElementById('faqAccordionContainer');
  if (!container) return;

  const isHindi = getCurrentLang() === 'hi';

  container.innerHTML = FAQ_DATA.map((faq, index) => {
    const q = isHindi ? faq.question : faq.questionEn;
    const a = isHindi ? faq.answer : faq.answerEn;
    const isOpen = index === 0;

    return `
      <div class="accordion-item mb-3 border rounded-3 overflow-hidden shadow-sm">
        <h2 class="accordion-header" id="heading-${faq.id}">
          <button class="accordion-button fw-bold text-dark ${isOpen ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${faq.id}" aria-expanded="${isOpen ? 'true' : 'false'}">
            <span class="badge bg-danger-subtle text-danger rounded-circle p-2 me-3" style="width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center;">
              ${index + 1}
            </span>
            ${q}
          </button>
        </h2>
        <div id="collapse-${faq.id}" class="accordion-collapse collapse ${isOpen ? 'show' : ''}" data-bs-parent="#faqAccordionContainer">
          <div class="accordion-body text-secondary bg-white">
            ${a}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 9. Ashrams & Contacts (STRICTLY NO BARWALA / HISAR)
function renderAshramsSection() {
  const container = document.getElementById('ashramsCardsGrid');
  if (!container) return;

  const isHindi = getCurrentLang() === 'hi';

  container.innerHTML = ASHRAM_CONTACTS.map(ashram => {
    const name = isHindi ? ashram.name : ashram.nameEn;
    const loc = isHindi ? ashram.location : ashram.locationEn;
    const addr = isHindi ? ashram.address : ashram.addressEn;

    return `
      <div class="col-12 col-md-6 col-lg-3 reveal-init">
        <div class="ashram-card glass-card border-top-gradient h-100 p-4 d-flex flex-column">
          <div class="d-flex align-items-center gap-2 mb-2">
            <i class="bi bi-geo-alt-fill text-danger fs-5"></i>
            <span class="badge bg-warning-subtle text-dark fw-bold px-2 py-1 text-xs">${loc}</span>
          </div>

          <h5 class="fw-bold text-dark mb-2 fs-6">${name}</h5>
          <p class="text-secondary small mb-3 flex-grow-1"><i class="bi bi-pin-map me-1 text-muted"></i> ${addr}</p>

          <div class="mt-auto pt-3 border-top">
            <div class="text-xs text-muted fw-bold mb-1">${isHindi ? 'संपर्क नंबर:' : 'Helpline:'}</div>
            <div class="d-flex flex-column gap-1">
              ${ashram.phoneNumbers.map(phone => `
                <a href="tel:${phone.replace(/\s+/g, '')}" class="btn btn-sm btn-outline-danger rounded-pill d-flex align-items-center justify-content-center gap-1 text-decoration-none fw-semibold">
                  <i class="bi bi-telephone-fill"></i> ${phone}
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Video Player Modal
function setupVideoModal() {
  const modalEl = document.getElementById('videoPlayerModal');
  const iframeEl = document.getElementById('videoPlayerIframe');
  if (!modalEl || !iframeEl) return;

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.video-card-item');
    if (card) {
      const ytid = card.getAttribute('data-youtube-id');
      if (ytid) {
        iframeEl.src = `https://www.youtube-nocookie.com/embed/${ytid}?autoplay=1`;
        if (typeof bootstrap !== 'undefined') {
          const modal = new bootstrap.Modal(modalEl);
          modal.show();
        }
      }
    }
  });

  modalEl.addEventListener('hidden.bs.modal', () => {
    iframeEl.src = '';
  });
}
