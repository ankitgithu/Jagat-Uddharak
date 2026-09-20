import React, { useState } from 'react';
import { Scroll, Quote } from 'lucide-react';
import { HOLY_SCRIPTURES } from '../data';
import { useLanguage } from '../LanguageContext';

export const HolyScriptures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(HOLY_SCRIPTURES[0].id);
  const currentScripture = HOLY_SCRIPTURES.find((s) => s.id === activeTab) || HOLY_SCRIPTURES[0];
  const { language, t } = useLanguage();

  return (
    <section id="holy-scriptures" className="py-16 sm:py-24 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Scroll className="w-3.5 h-3.5" />
            <span>{t.scriptures.badge}</span>
          </div>
          <h2
            id="holy-scriptures-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4"
          >
            {t.scriptures.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.scriptures.subtitle}
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {HOLY_SCRIPTURES.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-red-700 text-white shadow-md'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 hover:text-stone-900'
                }`}
              >
                {language === 'en' ? item.nameEn : item.name}
              </button>
            );
          })}
        </div>

        {/* Active Scripture Feature Card */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/80 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Scripture Image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 sm:w-60 aspect-square rounded-2xl overflow-hidden bg-white p-3 shadow-lg border border-stone-200/70">
                <img
                  src={currentScripture.image}
                  alt={language === 'en' ? currentScripture.nameEn : currentScripture.name}
                  className="w-full h-full object-contain object-center"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Scripture Content */}
            <div className="lg:col-span-8">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-red-700 uppercase mb-2 block">
                {language === 'en' ? currentScripture.nameEn : currentScripture.name} • {currentScripture.reference}
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-6 leading-tight">
                {language === 'en' ? currentScripture.titleEn : currentScripture.title}
              </h3>

              {/* Shloka / Verse Quote Box */}
              <div className="relative pl-6 py-3 border-l-4 border-amber-600 bg-white/70 rounded-r-xl p-4 mb-6 shadow-xs">
                <Quote className="w-6 h-6 text-amber-500/40 absolute top-2 right-3" />
                <p className="text-base sm:text-lg font-serif italic text-stone-900 font-semibold mb-2">
                  “{currentScripture.quote}”
                </p>
                <span className="text-xs text-stone-500 font-medium">
                  {currentScripture.reference}
                </span>
              </div>

              {/* Factual Meaning */}
              <div className="text-sm sm:text-base text-stone-700 leading-relaxed">
                <h4 className="font-bold text-stone-900 mb-1 text-sm uppercase tracking-wide">
                  {t.scriptures.meaningLabel}:
                </h4>
                <p>{language === 'en' ? currentScripture.meaningEn : currentScripture.meaning}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
