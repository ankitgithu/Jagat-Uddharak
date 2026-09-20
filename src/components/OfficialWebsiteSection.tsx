import React from 'react';
import { Globe, ShieldCheck } from 'lucide-react';
import { OFFICIAL_CHANNELS } from '../data';
import { useLanguage } from '../LanguageContext';

export const OfficialWebsiteSection: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="official-portal-section" className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="official-website-single-card"
          className="relative rounded-3xl bg-gradient-to-r from-red-950 via-stone-900 to-amber-950/90 border-2 border-amber-500/40 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden group transition-all duration-300 hover:shadow-red-950/30 hover:border-amber-400"
        >
          {/* Ambient decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/25 transition-all duration-700" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === 'hi' ? 'एकमात्र अधिकृत पोर्टल' : 'Single Authorized Web Portal'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                {t.videos.officialWebsiteCardTitle}
              </h3>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-4">
                {t.videos.officialWebsiteCardDesc}
              </p>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-300 font-mono">
                <Globe className="w-4 h-4 shrink-0 text-amber-400" />
                <span className="font-semibold underline underline-offset-4 break-all">
                  https://www.jagatgururampalji.org/hi/
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <a
                href={OFFICIAL_CHANNELS.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                id="exclusive-official-website-btn"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-sm sm:text-base shadow-xl hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer w-full sm:w-auto"
              >
                <Globe className="w-5 h-5 shrink-0" />
                <span>{t.videos.visitOfficialWebsite}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
