import React from 'react';
import { Youtube, Facebook, Instagram, ExternalLink, ArrowUp } from 'lucide-react';
import { OFFICIAL_CHANNELS } from '../data';
import { useLanguage } from '../LanguageContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#8B1A1A] text-stone-100 pt-16 pb-12 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/jagat-uddharak-logo.png"
                alt="जगत उद्धारक"
                className="w-14 h-14 rounded-full object-cover shadow-md ring-2 ring-amber-400"
                style={{ aspectRatio: '1/1' }}
              />
              <div>
                <span className="text-2xl font-black text-white tracking-tight block">
                  {t.hero.title}
                </span>
                <span className="text-xs font-semibold text-amber-300 tracking-wider">
                  JAGAT UDDHARAK
                </span>
              </div>
            </div>

            <p className="text-stone-200 text-sm leading-relaxed mb-6 max-w-md">
              {t.tagline}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={OFFICIAL_CHANNELS.jagatUddharakYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-red-700 flex items-center justify-center transition-all"
                title="Jagat Uddharak YouTube"
              >
                <Youtube className="w-5 h-5 fill-current" />
              </a>
              <a
                href={OFFICIAL_CHANNELS.santRampalJiInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-pink-600 flex items-center justify-center transition-all"
                title="Sant Rampal Ji Maharaj Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={OFFICIAL_CHANNELS.annapurnaMuhimInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-pink-600 flex items-center justify-center transition-all"
                title="Annapurna Muhim Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={OFFICIAL_CHANNELS.jagatUddharakFacebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-blue-700 flex items-center justify-center transition-all"
                title="Facebook"
              >
                <Facebook className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-200">
              <li>
                <button
                  onClick={() => onNavigate('spiritual-knowledge')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  {t.nav.knowledge}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('holy-scriptures')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  {t.nav.scriptures}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('social-reforms')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  {t.nav.reforms}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('annapurna-muhim')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  {t.nav.annapurna}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('books')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  {t.nav.books}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('videos')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  {t.nav.videos}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official References */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4">
              {t.footer.officialSources}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-200 mb-6">
              <li>
                <a
                  href="#official-website-single-card"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('official-website-single-card');
                  }}
                  className="hover:text-amber-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>jagatgururampalji.org ({language === 'hi' ? 'आधिकारिक पोर्टल विवरण' : 'Official Portal Details'})</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_CHANNELS.annapurnaMuhimWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 flex items-center gap-1.5"
                >
                  <span>annapurnamuhim.com ({language === 'hi' ? 'अन्नपूर्णा पोर्टल' : 'Annapurna Portal'})</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_CHANNELS.officialBooksSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 flex items-center gap-1.5"
                >
                  <span>books.jagatgururampalji.org ({language === 'hi' ? 'ई-पुस्तकालय' : 'E-Library'})</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </li>
            </ul>

            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-900/80 text-xs text-stone-300">
              <span className="font-semibold text-amber-300 block mb-1">
                {language === 'hi' ? 'दैनिक लाइव सत्संग' : 'Daily Live Discourse'}
              </span>
              {t.footer.liveNote}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-red-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {t.footer.copyright}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
