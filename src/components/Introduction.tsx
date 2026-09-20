import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface IntroductionProps {
  onLearnMore: () => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onLearnMore }) => {
  const { language, t } = useLanguage();

  return (
    <section id="introduction" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Large Official Photograph */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-stone-100 aspect-[4/5] sm:aspect-[3/4]">
              <img
                src="https://www.jagatgururampalji.org/theme/alpha-v-1.0-2024/assets/img/about-guruji.webp"
                alt="जगतगुरु संत रामपाल जी महाराज"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-medium text-amber-300">
                  {language === 'hi' ? 'तत्वदर्शी संत' : 'Tatvdarshi Saint'}
                </p>
                <p className="text-sm sm:text-base font-semibold">
                  {language === 'hi' ? 'संत रामपाल जी महाराज' : 'Sant Rampal Ji Maharaj'}
                </p>
              </div>
            </div>
            {/* Subtle decorative card border accent */}
            <div className="absolute -bottom-3 -right-3 w-28 h-28 bg-red-700/10 rounded-2xl -z-10 blur-sm" />
          </div>

          {/* Right Column: Editorial Details */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-red-800 text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
              <span className="w-2 h-2 rounded-full bg-red-700" />
              <span>{t.intro.badge}</span>
            </div>

            <h2
              id="intro-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight mb-6"
            >
              {t.intro.title}
            </h2>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-6 font-normal">
              {t.intro.subtitle}
            </p>

            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-stone-800">
                  <strong>{t.intro.point1Title}:</strong> {t.intro.point1Desc}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-stone-800">
                  <strong>{t.intro.point2Title}:</strong> {t.intro.point2Desc}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-stone-800">
                  <strong>{t.intro.point3Title}:</strong> {t.intro.point3Desc}
                </span>
              </div>
            </div>

            <div>
              <button
                id="intro-learn-more-btn"
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-700 hover:bg-red-800 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-red-700/20 group cursor-pointer"
              >
                <span>{t.intro.moreBtn}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
