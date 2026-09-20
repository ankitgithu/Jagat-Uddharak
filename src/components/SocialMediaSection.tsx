import React from 'react';
import { Youtube, Facebook, Instagram, Radio, ExternalLink } from 'lucide-react';
import { OFFICIAL_CHANNELS } from '../data';
import { useLanguage } from '../LanguageContext';

export const SocialMediaSection: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="social-connect" className="py-16 sm:py-20 bg-[#161719] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Radio className="w-3.5 h-3.5 text-red-400" />
            <span>{t.social.badge}</span>
          </div>
          <h2
            id="social-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3"
          >
            {t.social.title}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            {t.social.subtitle}
          </p>
        </div>

        {/* 4 Social Cards: Jagat Uddharak YouTube, Jagat Uddharak Facebook, Sant Rampal Ji Instagram, Annapurna Muhim Instagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Jagat Uddharak YouTube */}
          <div className="bg-stone-900 rounded-3xl p-6 border border-stone-800 hover:border-red-600/60 shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mb-4">
                <Youtube className="w-7 h-7 text-red-500 fill-red-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                Jagat Uddharak YouTube
              </h3>
              <p className="text-xs text-amber-300 font-medium mb-2">
                @JagatUddharak
              </p>
              <p className="text-xs text-stone-400 leading-relaxed mb-6">
                {language === 'hi'
                  ? 'प्रतिदिन शाम 7:30 से 8:30 बजे तक लाइव सत्संग एवं विशेष आध्यात्मिक कार्यक्रम।'
                  : 'Daily Live Satsang every evening from 7:30 to 8:30 PM IST and discourses.'}
              </p>
            </div>

            <a
              href={OFFICIAL_CHANNELS.jagatUddharakYoutube}
              target="_blank"
              rel="noopener noreferrer"
              id="social-youtube-cta-btn"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all"
            >
              <span>{t.social.youtubeBtn}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Jagat Uddharak Facebook */}
          <div className="bg-stone-900 rounded-3xl p-6 border border-stone-800 hover:border-blue-600/60 shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                <Facebook className="w-7 h-7 text-blue-400 fill-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                Jagat Uddharak Facebook
              </h3>
              <p className="text-xs text-blue-300 font-medium mb-2">
                @JagatUddharak
              </p>
              <p className="text-xs text-stone-400 leading-relaxed mb-6">
                {language === 'hi'
                  ? 'आध्यात्मिक सुविचार, दैनिक पोस्ट, कार्यक्रम सूचनाएं एवं समाज सेवा अपडेट्स।'
                  : 'Daily spiritual quotes, event announcements, and community updates.'}
              </p>
            </div>

            <a
              href={OFFICIAL_CHANNELS.jagatUddharakFacebook}
              target="_blank"
              rel="noopener noreferrer"
              id="social-facebook-cta-btn"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-blue-600 text-white text-xs font-bold shadow-md transition-all border border-stone-700"
            >
              <span>{t.social.facebookBtn}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Sant Rampal Ji Maharaj Instagram */}
          <div className="bg-stone-900 rounded-3xl p-6 border border-stone-800 hover:border-pink-500/60 shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center mb-4">
                <Instagram className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">
                {t.social.srjInstagramTitle}
              </h3>
              <p className="text-xs text-pink-300 font-mono font-medium mb-2">
                {t.social.srjInstagramHandle}
              </p>
              <p className="text-xs text-stone-400 leading-relaxed mb-6">
                {t.social.srjInstagramDesc}
              </p>
            </div>

            <a
              href={OFFICIAL_CHANNELS.santRampalJiInstagram}
              target="_blank"
              rel="noopener noreferrer"
              id="social-srj-instagram-btn"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600/80 via-red-600/80 to-amber-600/80 hover:from-pink-600 hover:to-amber-600 text-white text-xs font-bold shadow-md transition-all"
            >
              <span>{t.social.instagramBtn}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Annapurna Muhim Instagram */}
          <div className="bg-stone-900 rounded-3xl p-6 border border-stone-800 hover:border-amber-500/60 shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-4">
                <Instagram className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                {t.social.amInstagramTitle}
              </h3>
              <p className="text-xs text-amber-300 font-mono font-medium mb-2">
                {t.social.amInstagramHandle}
              </p>
              <p className="text-xs text-stone-400 leading-relaxed mb-6">
                {t.social.amInstagramDesc}
              </p>
            </div>

            <a
              href={OFFICIAL_CHANNELS.annapurnaMuhimInstagram}
              target="_blank"
              rel="noopener noreferrer"
              id="social-am-instagram-btn"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600/90 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-md transition-all"
            >
              <span>{t.social.instagramBtn}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
