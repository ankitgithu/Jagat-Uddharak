import React from 'react';
import { HeartHandshake, CheckCircle2 } from 'lucide-react';
import { SOCIAL_REFORMS } from '../data';
import { useLanguage } from '../LanguageContext';

export const SocialReforms: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="social-reforms" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-red-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-red-700" />
            <span>{t.reforms.badge}</span>
          </div>
          <h2
            id="social-reforms-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4"
          >
            {t.reforms.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.reforms.subtitle}
          </p>
        </div>

        {/* Reform Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SOCIAL_REFORMS.map((item) => {
            const points = (language === 'en' && item.impactPointsEn) ? item.impactPointsEn : item.impactPoints;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={language === 'en' ? item.titleEn : item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs font-semibold text-amber-300 block mb-0.5">
                      {language === 'en' ? item.taglineEn : item.tagline}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      {language === 'en' ? item.titleEn : item.title}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <p className="text-stone-600 text-sm leading-relaxed mb-5">
                    {language === 'en' ? item.descriptionEn : item.description}
                  </p>

                  {/* Impact Points */}
                  <div className="space-y-2 pt-4 border-t border-stone-100">
                    {points.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-stone-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
