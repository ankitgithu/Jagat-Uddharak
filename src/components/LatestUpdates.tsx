import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  Calendar,
  ArrowRight,
  Play,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
  Sparkles,
} from 'lucide-react';
import { UPDATES_DATA, OFFICIAL_CHANNELS } from '../data';
import { useLanguage } from '../LanguageContext';
import { UpdateItem } from '../types';

interface TiltCoord {
  rotateX: number;
  rotateY: number;
  glowX: number;
  glowY: number;
}

const UpdateVideoCard: React.FC<{
  update: UpdateItem;
  index: number;
  onPlay: (update: UpdateItem) => void;
}> = ({ update, index, onPlay }) => {
  const { language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltCoord>({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
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
      rotateX: -normY * 5,
      rotateY: normX * 5,
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer select-none"
      style={{
        transform:
          isHovered && isFinePointer
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-6px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered
          ? 'transform 0.12s ease-out, box-shadow 0.3s ease, border-color 0.3s ease'
          : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      data-cursor="PLAY"
    >
      {/* Dynamic Cursor Light Effect (Desktop Only) */}
      {isHovered && isFinePointer && (
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-25 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 220px at ${tilt.glowX}% ${tilt.glowY}%, rgba(220, 38, 38, 0.2), transparent 70%)`,
          }}
        />
      )}

      <div>
        {/* Media Thumbnail Container */}
        <div className="relative aspect-video overflow-hidden bg-stone-900">
          <img
            src={update.image}
            alt={language === 'en' ? update.titleEn : update.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
            style={{
              transform:
                isHovered && isFinePointer
                  ? `scale(1.08) translate(${tilt.rotateY * -0.5}px, ${tilt.rotateX * 0.5}px)`
                  : 'scale(1) translate(0px, 0px)',
              transition: isHovered
                ? 'transform 0.12s ease-out'
                : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            loading="lazy"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition-colors duration-300" />

          {/* Play Button with Magnetic Hover */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onPlay(update);
            }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-red-500 transition-all duration-300"
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
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5 drop-shadow-md" />
            </div>
          </div>

          {/* Top Pill */}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/85 text-amber-300 border border-amber-500/20 text-[11px] font-bold backdrop-blur-xs flex items-center gap-1.5 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {update.category || 'अन्नपूर्णा सेवा अपडेट'}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-red-700" />
              <span>{language === 'en' ? update.dateEn : update.date}</span>
            </span>
            <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">
              YouTube
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-red-700 transition-colors mb-2.5 leading-snug line-clamp-2">
            {language === 'en' ? update.titleEn : update.title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
            {language === 'en' ? update.descriptionEn : update.description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlay(update);
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 group-hover:text-red-800 pt-3 transition-colors cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-red-700 text-red-700" />
          <span>{language === 'hi' ? 'वीडियो देखें' : 'Watch Video'}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>

        <a
          href={update.youtubeUrl || OFFICIAL_CHANNELS.annapurnaMuhimYoutube}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs text-stone-400 group-hover:text-red-700 transition-colors pt-3"
          aria-label="Open on YouTube"
        >
          <span>YouTube</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
};

export const LatestUpdates: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeVideoModal, setActiveVideoModal] = useState<UpdateItem | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

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

  const totalItems = UPDATES_DATA.length;
  const maxIndex = Math.max(0, totalItems - visibleCount);

  const handleNext = useCallback(() => {
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay loop with pause on hover/modal
  useEffect(() => {
    if (isHovered || activeVideoModal) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, activeVideoModal, handleNext]);

  return (
    <section
      id="updates"
      className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Staggered Fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-red-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
            <Bell className="w-3.5 h-3.5 text-red-600 animate-bounce" />
            <span>अन्नपूर्णा मुहिम • {t.updates.badge}</span>
          </div>

          <h2
            id="updates-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4"
          >
            {language === 'hi'
              ? 'अन्नपूर्णा सेवा के नवीनतम वीडियो अपडेट'
              : 'Latest Annapurna Seva Video Updates'}
          </h2>

          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {language === 'hi'
              ? 'annapurnamuhim.com एवं आधिकारिक YouTube चैनल से प्रसारित वास्तविक ज़मीनी सेवा के 8 आधिकारिक वीडियो एपिसोड।'
              : '8 official video episodes showcasing real ground relief, ration distribution, and shelter rehabilitation from annapurnamuhim.com.'}
          </p>
        </motion.div>

        {/* Carousel Controls Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span>
              {language === 'hi'
                ? `8 आधिकारिक YouTube वीडियो अपडेट`
                : `8 Official YouTube Video Updates`}
            </span>
            <span className="text-stone-400 font-mono">
              ({String(carouselIndex + 1).padStart(2, '0')}/
              {String(totalItems).padStart(2, '0')})
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous updates"
              className="w-10 h-10 rounded-full bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200/90 shadow-sm hover:shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next updates"
              className="w-10 h-10 rounded-full bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200/90 shadow-sm hover:shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Viewport */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="overflow-hidden rounded-2xl w-full"
        >
          <motion.div
            className="flex gap-6"
            animate={{
              x: `-${carouselIndex * (100 / visibleCount)}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 28,
              mass: 0.8,
            }}
          >
            {UPDATES_DATA.map((update, idx) => (
              <div
                key={update.id}
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
                <UpdateVideoCard
                  update={update}
                  index={idx}
                  onPlay={(sel) => setActiveVideoModal(sel)}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCarouselIndex(idx)}
              aria-label={`Slide to index ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                carouselIndex === idx
                  ? 'w-7 bg-red-600'
                  : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>

        {/* Channel Link Banner */}
        <div className="mt-12 text-center">
          <a
            href={OFFICIAL_CHANNELS.annapurnaMuhimYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-100 font-semibold text-xs sm:text-sm border border-stone-800 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-red-500 text-red-500" />
            <span>
              {language === 'hi'
                ? 'अन्नपूर्णा मुहिम आधिकारिक YouTube चैनल पर सभी वीडियो देखें'
                : 'Explore all episodes on Annapurna Muhim Official YouTube'}
            </span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 text-stone-400" />
          </a>
        </div>
      </div>

      {/* Modal Video Player */}
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
              {/* Header Bar */}
              <div className="p-4 bg-stone-950 flex items-center justify-between border-b border-stone-800">
                <div className="flex items-center gap-2 max-w-[70%]">
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-xs font-bold shrink-0">
                    YouTube
                  </span>
                  <span className="text-xs sm:text-sm text-stone-200 font-bold truncate">
                    {language === 'en' ? activeVideoModal.titleEn : activeVideoModal.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={activeVideoModal.youtubeUrl || OFFICIAL_CHANNELS.annapurnaMuhimYoutube}
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
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>
                    {language === 'en' ? activeVideoModal.dateEn : activeVideoModal.date}
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
    </section>
  );
};
