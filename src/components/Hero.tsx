import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ListVideo,
  Tv,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { FEATURED_MEDIA_ITEMS } from '../data';
import { FeaturedMediaItem } from '../types';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
  onExploreClick?: () => void;
  onVideoClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onVideoClick }) => {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Active slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Modal active player
  const [activeMedia, setActiveMedia] = useState<FeaturedMediaItem | null>(null);

  // Dragging interaction state
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Slide length
  const totalSlides = FEATURED_MEDIA_ITEMS.length;

  // Autoplay slider timer
  useEffect(() => {
    if (shouldReduceMotion || isHovered || activeMedia !== null) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(timer);
  }, [isHovered, shouldReduceMotion, totalSlides, activeMedia]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeMedia !== null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, activeMedia]);

  // Touch / mouse drag handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const diff = dragStartX - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setDragStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX === null) return;
    const diff = dragStartX - e.clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setDragStartX(null);
    setIsDragging(false);
  };

  const currentItem = FEATURED_MEDIA_ITEMS[currentIndex];

  // Helper for item badge icon
  const getItemIcon = (type: 'video' | 'playlist' | 'show') => {
    switch (type) {
      case 'playlist':
        return <ListVideo className="w-3.5 h-3.5 text-amber-300" />;
      case 'show':
        return <Tv className="w-3.5 h-3.5 text-amber-300" />;
      default:
        return <Play className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />;
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-screen pt-20 pb-12 flex flex-col justify-between overflow-hidden bg-stone-950 text-white select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
        setDragStartX(null);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Background Ambience & Blurred Video Thumbnail Projection */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0 bg-cover bg-center filter blur-3xl saturate-150 transform scale-110"
            style={{ backgroundImage: `url(${currentItem.thumbnail})` }}
          />
        </AnimatePresence>

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-stone-950/40 to-stone-950" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Floating Branding Bar: Minimal as requested */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-stone-800/80 pb-4">
          <div className="flex items-center gap-3">
            <img
              src="/jagat-uddharak-logo.png"
              alt="Jagat Uddharak"
              className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-red-600/40"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>जगत उद्धारक</span>
                <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded bg-red-950/80 text-amber-400 border border-red-700/50 font-bold uppercase tracking-wider">
                  आधिकारिक मीडिया
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-amber-200/90 tracking-wide">
                आध्यात्मिक ज्ञान • मानव सेवा • समाज सुधार
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-stone-300">
            <span className="px-3 py-1 rounded-full bg-stone-900/90 border border-stone-800 text-stone-300">
              {currentIndex + 1} / {totalSlides}
            </span>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-stone-900/90 border border-stone-800 hover:bg-stone-800 text-stone-300 transition-colors"
              title={isMuted ? 'Muted' : 'Unmuted'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Cinematic Carousel Stage */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 flex flex-col justify-center">
        <div className="relative w-full flex items-center justify-center">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            data-cursor="PREV"
            aria-label="Previous Video"
            className="absolute -left-2 sm:left-2 lg:left-4 z-30 p-3.5 sm:p-4 rounded-full bg-stone-900/80 hover:bg-red-700 text-white border border-stone-700 hover:border-red-600 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            data-cursor="NEXT"
            aria-label="Next Video"
            className="absolute -right-2 sm:right-2 lg:right-4 z-30 p-3.5 sm:p-4 rounded-full bg-stone-900/80 hover:bg-red-700 text-white border border-stone-700 hover:border-red-600 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Multi-Slide Stage (3D Depth / Peeking Adjacent Slides) */}
          <div className="w-full max-w-5xl relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] md:min-h-[520px]">
            {FEATURED_MEDIA_ITEMS.map((item, index) => {
              // Calculate offset relative to currentIndex
              let offset = index - currentIndex;
              // Wrap around for seamless loop
              if (offset < -Math.floor(totalSlides / 2)) offset += totalSlides;
              if (offset > Math.floor(totalSlides / 2)) offset -= totalSlides;

              const isCurrent = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              // Calculate positions and transforms for depth
              let translateX = '0%';
              let scale = 1;
              let zIndex = 20;
              let opacity = 1;

              if (offset === 0) {
                translateX = '0%';
                scale = 1;
                zIndex = 25;
                opacity = 1;
              } else if (offset === -1) {
                translateX = '-56%';
                scale = 0.82;
                zIndex = 15;
                opacity = 0.55;
              } else if (offset === 1) {
                translateX = '56%';
                scale = 0.82;
                zIndex = 15;
                opacity = 0.55;
              } else if (offset === -2) {
                translateX = '-98%';
                scale = 0.68;
                zIndex = 10;
                opacity = 0.2;
              } else if (offset === 2) {
                translateX = '98%';
                scale = 0.68;
                zIndex = 10;
                opacity = 0.2;
              }

              return (
                <motion.div
                  key={item.id}
                  className="absolute w-full max-w-[88%] sm:max-w-[78%] md:max-w-[820px] aspect-video rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-2xl border transition-colors duration-300"
                  animate={{
                    x: translateX,
                    scale,
                    opacity,
                    zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 28,
                  }}
                  onClick={() => {
                    if (isCurrent) {
                      setActiveMedia(item);
                    } else {
                      setCurrentIndex(index);
                    }
                  }}
                  data-cursor={isCurrent ? 'WATCH' : 'SLIDE'}
                  style={{
                    borderColor: isCurrent ? 'rgba(245, 158, 11, 0.6)' : 'rgba(87, 83, 78, 0.4)',
                  }}
                >
                  {/* Thumbnail Image */}
                  <img
                    src={item.thumbnail}
                    alt={language === 'en' && item.titleEn ? item.titleEn : item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                    loading="eager"
                  />

                  {/* Vignette Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                  <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-stone-950/60" />

                  {/* Active Slide Center Play Button */}
                  {isCurrent && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.15 }}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/95 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl ring-4 ring-white/20 transition-transform cursor-pointer"
                      >
                        {item.type === 'playlist' ? (
                          <ListVideo className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 fill-white ml-1" />
                        )}
                      </motion.div>
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-xs font-bold text-amber-300 border border-amber-500/40">
                      {getItemIcon(item.type)}
                      <span>{language === 'en' ? item.badgeEn : item.badge}</span>
                    </span>

                    <span className="px-3 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md text-xs font-semibold text-stone-200 border border-stone-700">
                      {item.channel}
                    </span>
                  </div>

                  {/* Bottom Captions Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-stone-950 via-stone-950/90 to-transparent">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                      <div className="max-w-2xl">
                        <h3 className="text-base sm:text-xl md:text-2xl font-black text-white leading-snug line-clamp-2 drop-shadow-md">
                          {language === 'en' && item.titleEn ? item.titleEn : item.title}
                        </h3>
                      </div>

                      {isCurrent && (
                        <div className="shrink-0 flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMedia(item);
                            }}
                            className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{language === 'hi' ? 'तुरंत देखें' : 'Watch Now'}</span>
                          </button>

                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
                            title="Open on YouTube"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Strip / Dots Carousel Navigator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2">
          {/* Quick Info */}
          <div className="hidden md:flex items-center gap-2 text-xs text-stone-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>स्वाइप करें या ऐरो कीज़ से नेविगेट करें</span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mx-auto md:mx-0 overflow-x-auto py-1">
            {FEATURED_MEDIA_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-gradient-to-r from-red-600 to-amber-500'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-stone-700 hover:bg-stone-500'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Bottom Secondary Links */}
          <div className="hidden sm:flex items-center gap-3">
            {onExploreClick && (
              <button
                onClick={onExploreClick}
                className="text-xs text-stone-400 hover:text-amber-300 transition-colors font-medium cursor-pointer"
              >
                ज्ञान अन्वेषण करें ↓
              </button>
            )}
            {onVideoClick && (
              <button
                onClick={onVideoClick}
                className="text-xs text-stone-400 hover:text-amber-300 transition-colors font-medium cursor-pointer"
              >
                संपूर्ण संग्रह ↓
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Full-Screen Video Modal Player */}
      {activeMedia && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-stone-950 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider">
                  {activeMedia.badge}
                </span>
                <span className="text-xs text-stone-300 font-semibold">
                  {activeMedia.channel}
                </span>
              </div>
              <button
                onClick={() => setActiveMedia(null)}
                className="p-1.5 rounded-full hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded YouTube Player */}
            <div className="relative aspect-video bg-black">
              {activeMedia.type === 'playlist' ? (
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=PL9xnADcE4fNcxxvpeGg2Rm_iVn5UYVvl0&autoplay=1"
                  title={activeMedia.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : activeMedia.type === 'show' ? (
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=PLci4PS0qbjkw&autoplay=1"
                  title={activeMedia.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${activeMedia.videoId}?autoplay=1`}
                  title={activeMedia.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-800">
              <h4 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                {language === 'en' && activeMedia.titleEn ? activeMedia.titleEn : activeMedia.title}
              </h4>
              <a
                href={activeMedia.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <span>YouTube पर खोलें</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
