// Carousel & Horizontal Slider Helpers

export function initCarousels() {
  setupSliderControls('featuredMediaSlider', 'featuredMediaPrev', 'featuredMediaNext');
  setupSliderControls('annapurnaVideosSlider', 'annapurnaVideosPrev', 'annapurnaVideosNext');
  setupSliderControls('booksSlider', 'booksSliderPrev', 'booksSliderNext');
}

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

  // Enable mouse drag scrolling for desktop
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
    const walk = (x - startX) * 1.5; // Scroll speed
    slider.scrollLeft = scrollLeft - walk;
  });
}
