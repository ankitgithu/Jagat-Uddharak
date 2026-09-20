import React, { useState } from 'react';
import {
  Heart,
  Play,
  ExternalLink,
  Instagram,
  Utensils,
  Shirt,
  Home,
  GraduationCap,
  Stethoscope,
  Waves,
  ArrowRight,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  MapPin,
  Calendar,
  Film,
  Camera,
} from 'lucide-react';
import {
  OFFICIAL_CHANNELS,
  ANNAPURNA_INITIATIVES,
  ANNAPURNA_STORIES,
  ANNAPURNA_STATS,
  VIDEOS_DATA,
  ANNAPURNA_PHOTOS,
} from '../data';
import { useLanguage } from '../LanguageContext';
import { PhotoItem } from '../types';
import { AnimatedCounter } from './AnimatedCounter';
import { AnnapurnaVideoCarousel } from './AnnapurnaVideoCarousel';

export const AnnapurnaMuhim: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [galleryTab, setGalleryTab] = useState<'videos' | 'photos'>('videos');

  // Annapurna-specific photos
  const annapurnaPhotos = ANNAPURNA_PHOTOS;

  // Annapurna-specific videos (from Annapurna Muhim Official channel)
  const annapurnaVideos = VIDEOS_DATA.filter(
    (v) => v.channel === 'Annapurna Muhim Official'
  );

  const getInitiativeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-amber-400" />;
      case 'Shirt':
        return <Shirt className="w-5 h-5 text-amber-400" />;
      case 'Home':
        return <Home className="w-5 h-5 text-amber-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-amber-400" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-amber-400" />;
      case 'Waves':
        return <Waves className="w-5 h-5 text-amber-400" />;
      default:
        return <Heart className="w-5 h-5 text-amber-400" />;
    }
  };

  const openLightbox = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = annapurnaPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % annapurnaPhotos.length;
    setSelectedPhoto(annapurnaPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = annapurnaPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + annapurnaPhotos.length) % annapurnaPhotos.length;
    setSelectedPhoto(annapurnaPhotos[prevIndex]);
  };

  return (
    <section id="annapurna-muhim" className="py-16 sm:py-24 bg-[#141517] text-white relative overflow-hidden">
      {/* Ambient background accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-red-800/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section 1: Hero Banner for Annapurna Muhim */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide mb-4">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>{t.annapurna.badge}</span>
            </div>

            <h2
              id="annapurna-muhim-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 leading-tight"
            >
              {t.annapurna.title}
            </h2>

            {/* Sacred Slogan */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm sm:text-base font-bold mb-6 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{t.annapurna.subtitle}</span>
            </div>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed mb-6">
              {t.annapurna.desc}
            </p>

            {/* Official Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href={OFFICIAL_CHANNELS.annapurnaMuhimWebsite}
                target="_blank"
                rel="noopener noreferrer"
                id="annapurna-portal-btn"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-red-600/30 hover:scale-[1.02] cursor-pointer"
              >
                <span>{t.annapurna.portalCta}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={OFFICIAL_CHANNELS.annapurnaMuhimInstagram}
                target="_blank"
                rel="noopener noreferrer"
                id="annapurna-instagram-btn"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-pink-600/80 via-red-600/80 to-amber-600/80 hover:from-pink-600 hover:to-amber-600 text-white font-bold text-sm transition-all shadow-md hover:scale-[1.02]"
              >
                <Instagram className="w-4 h-4" />
                <span>{t.annapurna.instagramCta}</span>
              </a>

              <a
                href={OFFICIAL_CHANNELS.annapurnaMuhimYoutube}
                target="_blank"
                rel="noopener noreferrer"
                id="annapurna-youtube-btn"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white font-semibold text-sm border border-stone-700 transition-all"
              >
                <Play className="w-4 h-4 fill-current text-red-500" />
                <span>{t.annapurna.youtubeCta}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl group bg-stone-950">
              <img
                src="https://www.jagatgururampalji.org/theme/alpha-v-1.0-2024/assets/img/social-reforms/Feeding-the-hunger.webp"
                alt="अन्नपूर्णा मुहिम - भोजन व राशन वितरण"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="px-3 py-1 rounded-full bg-red-600 text-xs font-bold uppercase tracking-wider text-white">
                  annapurnamuhim.com
                </span>
                <p className="text-base font-bold text-white mt-2">
                  {language === 'hi'
                    ? 'प्रत्येक लाचार व बेसहारा परिवार तक निस्वार्थ सेवा'
                    : 'Unconditional Doorstep Service to Destitute Families'}
                </p>
                <p className="text-xs text-stone-300 mt-0.5">
                  {language === 'hi' ? 'स्रोत: annapurnamuhim.com' : 'Source: annapurnamuhim.com'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Annapurna Muhim in Numbers (Animated Counters) */}
        <div id="annapurna-in-numbers" className="mb-20 pt-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>annapurnamuhim.com</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.annapurna.numbersTitle}
            </h3>
            <p className="text-xs sm:text-base text-stone-400 mt-2">
              {t.annapurna.numbersSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ANNAPURNA_STATS.map((stat) => (
              <div
                key={stat.id}
                className="relative rounded-2xl bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-stone-800 p-6 flex flex-col justify-between hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-stone-800 text-amber-300 border border-stone-700">
                    {stat.id === 'donations' ? '100% निस्वार्थ' : 'Verified'}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="mb-3">
                  <div className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight flex items-baseline">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2200}
                    />
                  </div>
                  <h4 className="text-base font-bold text-white mt-2 leading-snug">
                    {language === 'en' ? stat.labelEn : stat.label}
                  </h4>
                </div>

                <p className="text-xs text-stone-400 border-t border-stone-800/80 pt-3 leading-relaxed">
                  {language === 'en' ? stat.subtextEn : stat.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Core Service Dimensions (Subsections from annapurnamuhim.com) */}
        <div className="mb-20 pt-10 border-t border-stone-800/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {t.annapurna.initiativesTitle}
            </h3>
            <p className="text-stone-400 text-sm">
              {language === 'hi'
                ? 'annapurnamuhim.com के अंतर्गत संचालित 6 प्रमुख सेवा आयाम'
                : '6 Core Dimensions of Humanitarian Assistance Under annapurnamuhim.com'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANNAPURNA_INITIATIVES.map((initiative) => (
              <div
                key={initiative.id}
                className="rounded-2xl bg-stone-900/90 border border-stone-800 p-6 flex flex-col justify-between hover:border-red-500/50 hover:bg-stone-900 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-800/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {getInitiativeIcon(initiative.icon)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {language === 'en' ? initiative.titleEn : initiative.title}
                      </h4>
                      <span className="text-xs text-stone-400 font-medium block">
                        {language === 'en' ? initiative.taglineEn : initiative.tagline}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                    {language === 'en' ? initiative.descriptionEn : initiative.description}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {(language === 'en' ? initiative.pointsEn : initiative.points).map((point, pIdx) => (
                      <li key={pIdx} className="text-xs text-stone-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={initiative.link || OFFICIAL_CHANNELS.annapurnaMuhimWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 pt-3 border-t border-stone-800 transition-colors"
                >
                  <span>{language === 'hi' ? 'और जानें' : 'Learn More'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Latest Stories & Articles from annapurnamuhim.com (Editorial Cards) */}
        <div className="mb-20 pt-10 border-t border-stone-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>Editorial Stories</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t.annapurna.latestStoriesTitle}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                {language === 'hi'
                  ? 'सच्ची घटनाएं व वास्तविक लाभार्थी विवरण (स्रोत: annapurnamuhim.com)'
                  : 'Verified Real Stories & Beneficiary Reports (Source: annapurnamuhim.com)'}
              </p>
            </div>
            <a
              href={OFFICIAL_CHANNELS.annapurnaMuhimWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 w-fit px-4 py-2 rounded-full bg-stone-900 border border-stone-800 hover:border-stone-700 transition-all"
            >
              <span>{language === 'hi' ? 'annapurnamuhim.com पर सभी पढ़ें' : 'View All on Portal'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ANNAPURNA_STORIES.map((story) => (
              <article
                key={story.id}
                className="bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-xl hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-red-600 text-white text-[11px] font-bold shadow-md">
                      {language === 'en' ? story.categoryEn : story.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-stone-300 font-medium">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {language === 'en' ? story.dateEn : story.date}
                    </span>
                    <span className="text-[10px] text-amber-300 font-mono">
                      annapurnamuhim.com
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white leading-snug mb-3 group-hover:text-amber-300 transition-colors line-clamp-2">
                      {language === 'en' ? story.titleEn : story.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-400 line-clamp-3 leading-relaxed mb-5">
                      {language === 'en' ? story.descriptionEn : story.description}
                    </p>
                  </div>

                  <a
                    href={story.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-amber-300 text-xs font-bold border border-stone-800 hover:border-amber-500/40 transition-all"
                  >
                    <span>{t.annapurna.readStory}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Section 5: अन्नपूर्णा सेवा गैलरी (Interactive Video Carousel & Verified Photo Gallery) */}
        <div className="mb-20 pt-10 border-t border-stone-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Play className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                <span>Verified Field Outreach</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t.annapurna.galleryTitle}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                {language === 'hi'
                  ? 'annapurnamuhim.com एवं आधिकारिक YouTube चैनल से 8 आधिकारिक सेवा एपिसोड व सत्यापित चित्र'
                  : '8 Official Outreach Episodes & Verified Field Imagery from annapurnamuhim.com'}
              </p>
            </div>

            {/* Toggle Switch between Video Carousel and Photo Gallery */}
            <div className="flex items-center gap-2 bg-stone-900/90 p-1.5 rounded-full border border-stone-800 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setGalleryTab('videos')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  galleryTab === 'videos'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'सेवा वीडियो (8 एपिसोड)' : 'Seva Videos (8 Ep)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setGalleryTab('photos')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  galleryTab === 'photos'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'फोटो गैलरी' : 'Photo Gallery'}</span>
              </button>
            </div>
          </div>

          {/* Conditional View: Video Carousel vs Photo Masonry */}
          {galleryTab === 'videos' ? (
            <div className="pt-2">
              <AnnapurnaVideoCarousel />
            </div>
          ) : (
            <div>
              <div className="flex justify-end mb-4">
                <a
                  href={OFFICIAL_CHANNELS.annapurnaMuhimInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm px-4 py-2 rounded-full bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/40 text-pink-300 hover:text-white font-bold transition-all"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>@annapurnamuhim Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>

              {/* Masonry / Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {annapurnaPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => openLightbox(photo)}
                    className={`group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                      photo.aspectRatio === 'tall'
                        ? 'sm:row-span-2 aspect-[3/4]'
                        : photo.aspectRatio === 'wide'
                        ? 'aspect-[16/10]'
                        : 'aspect-[4/3]'
                    }`}
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Source pill top right */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-[10px] font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        {photo.source === 'instagram' ? <Instagram className="w-3 h-3 text-pink-400" /> : <ExternalLink className="w-3 h-3 text-amber-400" />}
                        {photo.instagramAccount || 'annapurnamuhim.com'}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-2 py-0.5 rounded bg-red-600 text-[10px] font-bold text-white uppercase tracking-wider mb-1.5 inline-block">
                        {photo.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                        {language === 'en' ? photo.titleEn : photo.title}
                      </h4>
                      <p className="text-xs text-stone-300 line-clamp-1 mt-0.5">
                        {language === 'en' ? photo.captionEn : photo.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal for Annapurna Gallery */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Nav Prev / Next Buttons */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white hover:bg-red-700 transition-all cursor-pointer z-10 border border-white/10"
              title="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white hover:bg-red-700 transition-all cursor-pointer z-10 border border-white/10"
              title="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="rounded-2xl overflow-hidden shadow-2xl max-h-[75vh] flex items-center justify-center bg-stone-900 border border-stone-800">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 text-center max-w-2xl px-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider inline-block">
                  {selectedPhoto.category}
                </span>
                {selectedPhoto.instagramAccount && (
                  <a
                    href={selectedPhoto.postUrl || OFFICIAL_CHANNELS.annapurnaMuhimInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-900/60 border border-pink-700/50 text-pink-300 text-[11px] font-bold hover:text-white"
                  >
                    <Instagram className="w-3 h-3" />
                    <span>{selectedPhoto.instagramAccount}</span>
                  </a>
                )}
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                {language === 'en' ? selectedPhoto.titleEn : selectedPhoto.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                {language === 'en' ? selectedPhoto.captionEn : selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
