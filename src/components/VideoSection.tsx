import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Youtube,
  ExternalLink,
  X,
  Film,
  ChevronLeft,
  ChevronRight,
  ListVideo,
  Tv,
  Pause,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { FEATURED_MEDIA_ITEMS, OFFICIAL_CHANNELS } from '../data';
import { FeaturedMediaItem } from '../types';
import { useLanguage } from '../LanguageContext';

// Interactive Video Card with subtle cursor-follow parallax & magnetic response
const VideoCard: React.FC<{
  item: FeaturedMediaItem;
  onPlay: (item: FeaturedMediaItem) => void;
  language: string;
  t: any;
}> = ({ item, onPlay, language, t }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Subtle 3D parallax on mouse move (only for desktop pointer devices)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const rotateX = isHovered ? -mousePos.y * 4 : 0;
  const rotateY = isHovered ? mousePos.x * 4 : 0;
  const thumbShiftX = isHovered ? mousePos.x * 5 : 0;
  const thumbShiftY = isHovered ? mousePos.y * 5 : 0;
  const playShiftX = isHovered ? mousePos.x * 8 : 0;
  const playShiftY = isHovered ? mousePos.y * 8 : 0;

  const displayTitle = language === 'en' && item.titleEn ? item.titleEn : item.title;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="PLAY"
      className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-2xl hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between h-full select-none"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isHovered ? '-6px' : '0px'})`,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div>
        {/* Thumbnail Container */}
        <div
          onClick={() => onPlay(item)}
          className="relative aspect-video overflow-hidden bg-stone-900 cursor-pointer"
        >
          {/* Real YouTube Official Thumbnail */}
          <img
            src={item.thumbnail}
            alt={displayTitle}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108 group-hover:brightness-110 will-change-transform"
            style={{
              transform: `scale(${isHovered ? 1.08 : 1}) translate(${thumbShiftX}px, ${thumbShiftY}px)`,
              filter: isHovered ? 'brightness(1.08)' : 'brightness(1)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease-out',
            }}
            loading="lazy"
          />

          {/* Vignette Gradients & Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent group-hover:from-stone-950/60 transition-colors" />

          {/* Type / Badge Indicator */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-500/40 shadow-sm">
              {item.type === 'playlist' ? (
                <ListVideo className="w-3.5 h-3.5 text-amber-300" />
              ) : item.type === 'show' ? (
                <Tv className="w-3.5 h-3.5 text-amber-300" />
              ) : (
                <Play className="w-3 h-3 fill-amber-300 text-amber-300" />
              )}
              <span>{language === 'en' ? item.badgeEn : item.badge}</span>
            </span>

            <span className="px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-[10px] font-semibold text-stone-200 border border-stone-700/60">
              {item.channel}
            </span>
          </div>

          {/* Center Play Button with Subtle Magnetic Shift */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-xl ring-4 ring-white/20 group-hover:ring-white/40 group-hover:scale-115 transition-all duration-300"
              style={{
                transform: `translate(${playShiftX}px, ${playShiftY}px) scale(${isHovered ? 1.15 : 1})`,
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {item.type === 'playlist' ? (
                <ListVideo className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 fill-white text-white ml-0.5" />
              )}
            </div>
          </div>
        </div>

        {/* Card Body Info */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 mb-2">
            <Youtube className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span className="truncate">{item.channel}</span>
          </div>

          <h3
            onClick={() => onPlay(item)}
            className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug cursor-pointer"
            title={displayTitle}
          >
            {displayTitle}
          </h3>
        </div>
      </div>

      {/* Card Footer: Direct Link to Exact Supplied URL */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-red-50 text-stone-700 hover:text-red-700 text-xs font-bold transition-all duration-200 border border-stone-200/90 hover:border-red-200 shadow-2xs hover:shadow-xs group/btn cursor-pointer"
        >
          <span>{t.videos.watchOnYoutube}</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
};

export const VideoSection: React.FC = () => {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Filter category state
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'playlist' | 'video' | 'show'>('all');
  const [activeVideo, setActiveVideo] = useState<FeaturedMediaItem | null>(null);

  // Carousel sliding state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Dragging interaction state
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Filter items
  const filteredItems =
    selectedFilter === 'all'
      ? FEATURED_MEDIA_ITEMS
      : FEATURED_MEDIA_ITEMS.filter((item) => item.type === selectedFilter);

  const totalItems = filteredItems.length;

  // Responsive items visible per view
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Ensure currentIndex stays within bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedFilter]);

  // Max sliding index
  const maxIndex = Math.max(0, totalItems - visibleCount);

  // Next and Prev handlers
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return 0; // Infinite loop wrap
      return prev + 1;
    });
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return maxIndex; // Infinite loop wrap
      return prev - 1;
    });
  }, [maxIndex]);

  // Autoplay slider timer: pause on hover, dragging, or modal open
  useEffect(() => {
    if (shouldReduceMotion || isHovered || isPaused || isDragging || activeVideo !== null || totalItems <= visibleCount) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, 5500);

    return () => clearInterval(timer);
  }, [isHovered, isPaused, isDragging, shouldReduceMotion, activeVideo, handleNext, totalItems, visibleCount]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const diff = dragStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setDragStartX(null);
  };

  // Mouse Drag Handlers for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only trigger if clicking on carousel track (not buttons/links)
    const target = e.target as HTMLElement;
    if (target.closest('a, button')) return;
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX === null) return;
    const diff = dragStartX - e.clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setDragStartX(null);
    setIsDragging(false);
  };

  // Categories filter tabs
  const categories = [
    {
      id: 'all' as const,
      label: language === 'hi' ? 'सभी वीडियो एवं प्लेलिस्ट (10)' : 'All Videos & Playlists (10)',
    },
    {
      id: 'playlist' as const,
      label: language === 'hi' ? 'SA True Story प्लेलिस्ट' : 'SA True Story Playlist',
    },
    {
      id: 'video' as const,
      label: language === 'hi' ? 'Factful Debates वीडियो (8)' : 'Factful Debates Videos (8)',
    },
    {
      id: 'show' as const,
      label: language === 'hi' ? 'यूट्यूब शो' : 'YouTube Show',
    },
  ];

  return (
    <section
      id="videos"
      className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 text-red-800 text-xs font-bold uppercase tracking-wider mb-3.5 border border-red-200">
            <Film className="w-3.5 h-3.5 text-red-600" />
            <span>{t.videos.badge}</span>
          </div>
          <h2
            id="videos-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight mb-4"
          >
            {t.videos.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.videos.subtitle}
          </p>
        </div>

        {/* Filter Categories Bar & Carousel Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Categories / Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-red-700 text-white shadow-md shadow-red-700/20 scale-102'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/90'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Navigation Arrows & Slider Status */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-stone-500 mr-2 hidden md:inline-block">
              {currentIndex + 1} / {totalItems}
            </span>

            <button
              onClick={handlePrev}
              data-cursor="PREV"
              aria-label="Previous Videos"
              className="p-2.5 sm:p-3 rounded-full bg-white hover:bg-red-700 text-stone-700 hover:text-white border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              data-cursor="NEXT"
              aria-label="Next Videos"
              className="p-2.5 sm:p-3 rounded-full bg-white hover:bg-red-700 text-stone-700 hover:text-white border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Viewport */}
        <div
          className="relative overflow-hidden rounded-3xl py-2 cursor-grab active:cursor-grabbing"
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
          {/* Animated Sliding Track */}
          <motion.div
            className="flex transition-transform"
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
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="shrink-0 px-3"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <VideoCard
                  item={item}
                  onPlay={(media) => setActiveVideo(media)}
                  language={language}
                  t={t}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Slider Pagination Dots & Hint */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-stone-200/60">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>
              {language === 'hi'
                ? 'कार्ड्स को स्लाइड करने के लिए स्वाइप या ड्रैग करें'
                : 'Swipe or drag cards horizontally to explore'}
            </span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 sm:w-8 h-2 bg-gradient-to-r from-red-600 to-amber-500 shadow-xs'
                    : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 font-medium transition-colors cursor-pointer"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? (language === 'hi' ? 'ऑटोप्ले चालू' : 'Resume Autoplay') : (language === 'hi' ? 'ऑटोप्ले रोकें' : 'Pause Autoplay')}</span>
          </button>
        </div>

        {/* Channel Links Footer Bar */}
        <div className="mt-10 pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-600">
          <span className="font-bold text-stone-900">
            {language === 'hi' ? 'आधिकारिक यूट्यूब चैनल:' : 'Official YouTube Channels:'}
          </span>
          <a
            href={OFFICIAL_CHANNELS.factfulDebatesYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-700 font-semibold underline underline-offset-2 transition-colors"
          >
            Factful Debates
          </a>
          <span>•</span>
          <a
            href={OFFICIAL_CHANNELS.saTrueStoryYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-700 font-semibold underline underline-offset-2 transition-colors"
          >
            SA True Story Official
          </a>
          <span>•</span>
          <a
            href={OFFICIAL_CHANNELS.annapurnaMuhimYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-700 font-semibold underline underline-offset-2 transition-colors"
          >
            Annapurna Muhim Official
          </a>
        </div>
      </div>

      {/* Full-Screen Video Modal Player */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="bg-stone-950 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative border border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-stone-900 border-b border-stone-800 text-white">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider">
                  {language === 'en' ? activeVideo.badgeEn : activeVideo.badge}
                </span>
                <span className="text-xs font-semibold text-stone-300">{activeVideo.channel}</span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label={t.gallery.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Video Frame */}
            <div className="relative aspect-video w-full bg-black">
              {activeVideo.type === 'playlist' ? (
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=PL9xnADcE4fNcxxvpeGg2Rm_iVn5UYVvl0&autoplay=1"
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : activeVideo.type === 'show' ? (
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=PLci4PS0qbjkw&autoplay=1"
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1`}
                  title={language === 'en' && activeVideo.titleEn ? activeVideo.titleEn : activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-900 border-t border-stone-800">
              <h4 className="text-sm sm:text-base font-bold text-stone-200 line-clamp-2">
                {language === 'en' && activeVideo.titleEn ? activeVideo.titleEn : activeVideo.title}
              </h4>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{t.videos.watchOnYoutube}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
