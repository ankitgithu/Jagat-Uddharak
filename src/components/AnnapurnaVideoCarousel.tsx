import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Calendar,
  X,
  Sparkles,
} from 'lucide-react';
import { ANNAPURNA_VIDEOS, AnnapurnaVideoItem } from '../data';
import { useLanguage } from '../LanguageContext';

interface CardTiltState {
  rotateX: number;
  rotateY: number;
  glowX: number;
  glowY: number;
}

const AnnapurnaVideoCard: React.FC<{
  video: AnnapurnaVideoItem;
  index: number;
  onPlay: (video: AnnapurnaVideoItem) => void;
}> = ({ video, index, onPlay }) => {
  const { language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<CardTiltState>({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(pointer: fine)');
      setIsFinePointer(mq.matches);
      const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTilt({
      rotateX: -normY * 6,
      rotateY: normX * 6,
      glowX: (x / rect.width) * 100,
      glowY: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full flex flex-col justify-between rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden cursor-pointer select-none"
      style={{
        transform:
          isHovered && isFinePointer
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-4px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered
          ? 'transform 0.12s ease-out, border-color 0.3s ease, box-shadow 0.3s ease'
          : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      data-cursor="PLAY"
    >
      {/* Dynamic Cursor Light Effect (Desktop Only) */}
      {isHovered && isFinePointer && (
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${tilt.glowX}% ${tilt.glowY}%, rgba(245, 158, 11, 0.25), transparent 70%)`,
          }}
        />
      )}

      {/* Media Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-stone-950">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform:
              isHovered && isFinePointer
                ? `scale(1.08) translate(${tilt.rotateY * -0.6}px, ${tilt.rotateX * 0.6}px)`
                : 'scale(1) translate(0px, 0px)',
            transition: isHovered
              ? 'transform 0.12s ease-out'
              : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          loading="lazy"
        />

        {/* Cinematic Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-85 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-md bg-red-600/90 text-white font-mono font-bold text-xs tracking-wider shadow-md backdrop-blur-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {video.episode}
          </span>

          <span className="px-2.5 py-1 rounded-md bg-stone-950/80 text-amber-300 border border-amber-500/30 text-[11px] font-semibold backdrop-blur-xs flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span className="max-w-[130px] truncate">
              {language === 'en' ? video.locationEn : video.location}
            </span>
          </span>
        </div>

        {/* Center Interactive Play Button with Magnetic Hover */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onPlay(video);
          }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:bg-red-500 group-hover:scale-110"
            style={{
              transform:
                isHovered && isFinePointer
                  ? `translate(${tilt.rotateY * 1.2}px, ${-tilt.rotateX * 1.2}px) scale(1.1)`
                  : 'translate(0px, 0px) scale(1)',
              transition: isHovered
                ? 'transform 0.12s ease-out'
                : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-0.5 drop-shadow-md" />
          </div>
        </div>

        {/* Bottom Channel Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-stone-300 font-medium z-10">
          <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-stone-300">
            <Calendar className="w-3 h-3 text-amber-400" />
            <span>{language === 'en' ? video.dateEn : video.date}</span>
          </span>
          <span className="text-[10px] text-red-400 font-bold tracking-wide uppercase">
            YouTube
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-stone-900">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug mb-2.5">
            {language === 'en' ? video.titleEn : video.title}
          </h4>
          <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed mb-4">
            {language === 'en' ? video.descriptionEn : video.description}
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(video);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-amber-400" />
            <span>{language === 'hi' ? 'वीडियो देखें' : 'Watch Video'}</span>
          </button>

          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium border border-stone-700 transition-colors"
          >
            <span>YouTube</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const AnnapurnaVideoCarousel: React.FC = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<AnnapurnaVideoItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const totalItems = ANNAPURNA_VIDEOS.length;

  // Responsive items count: Desktop 3, Tablet 2, Mobile 1
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, totalItems - visibleCount);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay loop with pause on hover/modal
  useEffect(() => {
    if (isPaused || activeVideoModal) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, activeVideoModal, handleNext]);

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  return (
    <div
      className="relative w-full focus:outline-hidden"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Annapurna Ground Seva Video Carousel"
    >
      {/* Top Carousel Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {language === 'hi'
                ? `8 आधिकारिक सेवा एपिसोड`
                : `8 Official Seva Episodes`}
            </span>
          </div>

          <span className="text-xs text-stone-400 font-mono">
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(totalItems).padStart(2, '0')}
          </span>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Videos"
            className="w-10 h-10 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700/80 hover:border-amber-500/50 flex items-center justify-center transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Videos"
            className="w-10 h-10 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700/80 hover:border-amber-500/50 flex items-center justify-center transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Viewport */}
      <div
        ref={containerRef}
        className="overflow-hidden rounded-2xl w-full"
      >
        <motion.div
          className="flex gap-5 sm:gap-6"
          animate={{
            x: `-${currentIndex * (100 / visibleCount)}%`,
          }}
          transition={{
            type: 'spring',
            stiffness: 220,
            damping: 28,
            mass: 0.8,
          }}
        >
          {ANNAPURNA_VIDEOS.map((video, idx) => (
            <div
              key={video.id}
              className="shrink-0"
              style={{
                width:
                  visibleCount === 1
                    ? '100%'
                    : visibleCount === 2
                    ? 'calc(50% - 12px)'
                    : 'calc(33.333% - 16px)',
              }}
            >
              <AnnapurnaVideoCard
                video={video}
                index={idx}
                onPlay={(selected) => setActiveVideoModal(selected)}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? 'w-7 bg-amber-400'
                : 'w-2 bg-stone-700 hover:bg-stone-500'
            }`}
          />
        ))}
      </div>

      {/* Modal Video Player for Seamless In-App Playback */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideoModal(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl"
            >
              {/* Header bar */}
              <div className="p-4 bg-stone-950 flex items-center justify-between border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-xs font-bold">
                    {activeVideoModal.episode}
                  </span>
                  <span className="text-xs sm:text-sm text-stone-200 font-bold truncate max-w-[280px] sm:max-w-md">
                    {language === 'en'
                      ? activeVideoModal.titleEn
                      : activeVideoModal.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={activeVideoModal.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <span>YouTube पर खोलें</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(null)}
                    aria-label="Close Modal"
                    className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* YouTube Responsive iFrame */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.videoId}?autoplay=1&rel=0`}
                  title={activeVideoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Modal Description Footer */}
              <div className="p-5 bg-stone-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>
                    {language === 'en'
                      ? activeVideoModal.locationEn
                      : activeVideoModal.location}
                  </span>
                </div>
                <p className="text-xs text-stone-400 line-clamp-2 max-w-xl">
                  {language === 'en'
                    ? activeVideoModal.descriptionEn
                    : activeVideoModal.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
