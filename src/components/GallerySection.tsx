import React, { useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Instagram, ExternalLink } from 'lucide-react';
import { GALLERY_DATA, OFFICIAL_CHANNELS } from '../data';
import { PhotoItem } from '../types';
import { useLanguage } from '../LanguageContext';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const { language, t } = useLanguage();

  const categories = [
    { id: 'all', label: language === 'hi' ? 'सभी चित्र' : 'All Photos' },
    { id: 'संत रामपाल जी महाराज', label: language === 'hi' ? 'संत रामपाल जी महाराज' : 'Sant Rampal Ji' },
    { id: 'अन्नपूर्णा मुहिम', label: language === 'hi' ? 'अन्नपूर्णा मुहिम' : 'Annapurna Mission' },
    { id: 'सामाजिक सेवा', label: language === 'hi' ? 'सामाजिक सेवा' : 'Social Service' },
    { id: 'कार्यक्रम', label: language === 'hi' ? 'सत्संग व कार्यक्रम' : 'Congregations' },
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? GALLERY_DATA
      : GALLERY_DATA.filter((p) => p.category === activeCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      selectedPhotoIndex === 0 ? filteredPhotos.length - 1 : selectedPhotoIndex - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      selectedPhotoIndex === filteredPhotos.length - 1 ? 0 : selectedPhotoIndex + 1
    );
  };

  const currentPhoto: PhotoItem | null =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  const getSourceDisplay = (photo: PhotoItem) => {
    if (photo.instagramAccount) {
      return `Instagram (${photo.instagramAccount})`;
    }
    switch (photo.source) {
      case 'official-website':
        return 'jagatgururampalji.org (आधिकारिक)';
      case 'annapurna-website':
        return 'annapurnamuhim.com (आधिकारिक)';
      case 'instagram':
        return 'आधिकारिक इंस्टाग्राम';
      default:
        return photo.source;
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>{t.gallery.badge}</span>
          </div>
          <h2
            id="gallery-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4"
          >
            {t.gallery.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {language === 'hi'
              ? 'आधिकारिक वेबसाइटों एवं अधिकृत Instagram अकाउंट्स (@spiritualleadersaintrampalji एवं @annapurnamuhim) से संकलित नवीनतम तस्वीरें।'
              : 'Curated verified photographs from official websites and Instagram channels (@spiritualleadersaintrampalji & @annapurnamuhim).'}
          </p>
        </div>

        {/* Official Instagram Channels Quick Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <a
            href={OFFICIAL_CHANNELS.santRampalJiInstagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-50 via-purple-50 to-amber-50 border border-pink-200 text-pink-800 text-xs font-bold hover:shadow-md transition-all hover:scale-[1.02]"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>@spiritualleadersaintrampalji</span>
            <ExternalLink className="w-3 h-3 text-pink-500" />
          </a>
          <a
            href={OFFICIAL_CHANNELS.annapurnaMuhimInstagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-50 via-amber-50 to-pink-50 border border-red-200 text-red-800 text-xs font-bold hover:shadow-md transition-all hover:scale-[1.02]"
          >
            <Instagram className="w-4 h-4 text-red-600" />
            <span>@annapurnamuhim</span>
            <ExternalLink className="w-3 h-3 text-red-500" />
          </a>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-red-700 text-white shadow-md'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Photos Masonry-styled Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(idx)}
              className={`group relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                photo.aspectRatio === 'tall'
                  ? 'sm:row-span-2 aspect-[3/4]'
                  : photo.aspectRatio === 'wide'
                  ? 'aspect-[16/10]'
                  : 'aspect-[4/3]'
              }`}
            >
              <img
                src={photo.image}
                alt={language === 'en' ? photo.titleEn : photo.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 group-hover:brightness-105 transition-all duration-700 ease-out will-change-transform"
                loading="lazy"
              />

              {/* Source Tag Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                {photo.instagramAccount ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[11px] font-bold text-pink-300 border border-pink-500/30 shadow-md">
                    <Instagram className="w-3 h-3 text-pink-400" />
                    <span>{photo.instagramAccount}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[11px] font-bold text-amber-300 border border-amber-500/30 shadow-md">
                    <span>{photo.source === 'annapurna-website' ? 'annapurnamuhim.com' : 'Official Portal'}</span>
                  </span>
                )}
              </div>

              {/* Hover overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                  {photo.category}
                </span>
                <h4 className="text-base font-bold text-white mb-1 leading-snug">
                  {language === 'en' ? photo.titleEn : photo.title}
                </h4>
                <p className="text-xs text-stone-300 line-clamp-2">
                  {language === 'en' ? photo.captionEn : photo.caption}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-amber-200 font-semibold border-t border-white/10 pt-2.5">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.gallery.viewFull}</span>
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {photo.source}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-stone-800/80 text-stone-200 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
            aria-label={t.gallery.close}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-800/80 text-stone-200 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer border border-white/10"
            aria-label={t.gallery.prev}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-800/80 text-stone-200 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer border border-white/10"
            aria-label={t.gallery.next}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="max-w-4xl w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[70vh] rounded-xl overflow-hidden shadow-2xl bg-stone-950 flex items-center justify-center border border-stone-800">
              <img
                src={currentPhoto.image}
                alt={language === 'en' ? currentPhoto.titleEn : currentPhoto.title}
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>

            {/* Caption bar */}
            <div className="mt-4 text-center text-white max-w-2xl px-4">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                  {currentPhoto.category}
                </span>
                {currentPhoto.instagramAccount && (
                  <a
                    href={currentPhoto.postUrl || OFFICIAL_CHANNELS.santRampalJiInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-400 hover:text-pink-300"
                  >
                    <Instagram className="w-3 h-3" />
                    <span>{currentPhoto.instagramAccount}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1">
                {language === 'en' ? currentPhoto.titleEn : currentPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                {language === 'en' ? currentPhoto.captionEn : currentPhoto.caption}
              </p>
              <div className="text-[11px] text-stone-400 mt-2 flex items-center justify-center gap-2">
                <span>{t.gallery.sourceLabel}: {getSourceDisplay(currentPhoto)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
