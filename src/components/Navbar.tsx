import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Youtube, Facebook, Globe } from 'lucide-react';
import { OFFICIAL_CHANNELS } from '../data';
import { useLanguage } from '../LanguageContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

/**
 * Ambient Glass Orbs/Bubbles Effect
 * Gentle floating circular gradients in spiritual brand tones (saffron, golden, crimson)
 * Placed behind the frosted glass with zero pointer-events.
 */
const NavbarBubbles: React.FC = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none opacity-85"
      aria-hidden="true"
    >
      {/* Saffron / Golden Orb 1 (Left-Center) */}
      <motion.div
        className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full blur-xl"
        style={{
          left: '12%',
          top: '-30%',
          background:
            'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(245, 158, 11, 0.04) 65%, transparent 80%)',
        }}
        animate={{
          x: ['-6%', '14%', '-6%'],
          y: ['-8%', '16%', '-8%'],
          scale: [1, 1.18, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Deep Red / Crimson Orb 2 (Center) */}
      <motion.div
        className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full blur-2xl"
        style={{
          left: '46%',
          top: '-40%',
          background:
            'radial-gradient(circle, rgba(220, 38, 38, 0.18) 0%, rgba(220, 38, 38, 0.03) 70%, transparent 85%)',
        }}
        animate={{
          x: ['10%', '-12%', '10%'],
          y: ['12%', '-14%', '12%'],
          scale: [1.1, 0.95, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Warm Golden / Amber Orb 3 (Right-Center) */}
      <motion.div
        className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full blur-xl"
        style={{
          left: '74%',
          top: '-25%',
          background:
            'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0.04) 60%, transparent 80%)',
        }}
        animate={{
          x: ['-8%', '12%', '-8%'],
          y: ['-10%', '14%', '-10%'],
          scale: [0.95, 1.12, 0.95],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Soft Vermilion Orb 4 (Right Edge) */}
      <motion.div
        className="absolute w-20 h-20 rounded-full blur-lg"
        style={{
          right: '4%',
          top: '5%',
          background:
            'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 75%)',
        }}
        animate={{
          x: ['4%', '-12%', '4%'],
          y: ['8%', '-10%', '8%'],
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

/**
 * Premium Glass Language Switcher Toggle
 * Fixed equal-width buttons with spring motion slider to guarantee ZERO layout jumping.
 */
const LanguageSwitcher: React.FC<{
  currentLanguage: 'hi' | 'en';
  onSelect: (lang: 'hi' | 'en') => void;
}> = ({ currentLanguage, onSelect }) => {
  return (
    <div
      id="nav-language-switcher"
      className="relative inline-flex items-center p-0.5 rounded-full bg-stone-900/[0.04] border border-amber-400/50 backdrop-blur-md shadow-2xs shrink-0 select-none"
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => onSelect('hi')}
        id="lang-btn-hi"
        title="हिन्दी भाषा चुनें"
        className={`relative z-10 w-12 sm:w-13.5 py-1 text-xs font-bold rounded-full transition-colors duration-200 cursor-pointer flex items-center justify-center ${
          currentLanguage === 'hi'
            ? 'text-white'
            : 'text-stone-700 hover:text-red-800'
        }`}
      >
        <span>हिन्दी</span>
      </button>

      <button
        type="button"
        onClick={() => onSelect('en')}
        id="lang-btn-en"
        title="Select English Language"
        className={`relative z-10 w-12 sm:w-13.5 py-1 text-xs font-bold rounded-full transition-colors duration-200 cursor-pointer flex items-center justify-center ${
          currentLanguage === 'en'
            ? 'text-white'
            : 'text-stone-700 hover:text-red-800'
        }`}
      >
        <span>ENG</span>
      </button>

      {/* Sliding Glass Capsule Pill */}
      <motion.div
        className="absolute top-0.5 bottom-0.5 rounded-full bg-gradient-to-r from-red-700 to-red-800 shadow-sm border border-red-600/40 pointer-events-none"
        style={{
          width: 'calc(50% - 2px)',
          left: currentLanguage === 'hi' ? '2px' : 'calc(50%)',
        }}
        transition={{ type: 'spring', stiffness: 480, damping: 36 }}
      />
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: t.nav.home },
    { id: 'spiritual-knowledge', label: t.nav.knowledge },
    { id: 'social-reforms', label: t.nav.reforms },
    { id: 'annapurna-muhim', label: t.nav.annapurna },
    { id: 'books', label: t.nav.books },
    { id: 'videos', label: t.nav.videos },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-amber-900/15 shadow-lg shadow-stone-900/5 py-2'
          : 'bg-[#FAF8F5]/80 backdrop-blur-lg border-b border-amber-900/10 shadow-xs py-3'
      }`}
    >
      {/* Top Glass Hairline Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

      {/* Ambient Floating Glass Bubbles */}
      <NavbarBubbles />

      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-7 relative z-10 flex items-center justify-between gap-2 lg:gap-3">
        {/* Left: Jagat Uddharak Official Logo (Guaranteed shrink-0 to prevent overlap) */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
          id="nav-logo-link"
        >
          <div className="relative">
            <img
              src="/jagat-uddharak-logo.png"
              alt="जगत उद्धारक लोगो"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shadow-sm ring-2 ring-red-700/25 group-hover:ring-red-600 transition-all duration-300 group-hover:scale-105"
              style={{ aspectRatio: '1/1' }}
            />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 ring-2 ring-white"
              title="Official Portal"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl xl:text-2xl font-black tracking-tight text-red-900 leading-tight whitespace-nowrap group-hover:text-red-700 transition-colors">
              {t.siteName}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-amber-800 tracking-wider whitespace-nowrap hidden sm:block">
              {t.siteSubname}
            </span>
          </div>
        </a>

        {/* Center: Desktop & Tablet Flexible Navigation Bar */}
        {/* Uses dynamic padding and responsive font sizing so Hindi and English labels never overlap */}
        <nav
          className="hidden lg:flex items-center justify-center flex-1 min-w-0 mx-1 xl:mx-2 2xl:mx-3"
          aria-label="Main Navigation"
        >
          <div className="flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 p-1 rounded-full bg-stone-900/[0.03] border border-stone-200/60 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`group relative whitespace-nowrap rounded-full transition-all duration-200 ease-out cursor-pointer flex items-center justify-center px-1.5 xl:px-2.5 2xl:px-3 py-1 xl:py-1.5 text-[12px] xl:text-[13px] 2xl:text-sm ${
                    isActive
                      ? 'text-red-800 font-bold bg-white/95 shadow-xs border border-red-600/20'
                      : 'text-stone-700 font-medium hover:text-red-700 hover:bg-white/60 hover:-translate-y-0.5 hover:shadow-2xs border border-transparent'
                  }`}
                >
                  <span className="relative z-10 transition-transform duration-200 group-hover:scale-[1.02]">
                    {item.label}
                  </span>

                  {/* Active Page Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute bottom-0.5 left-2 right-2 h-0.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 rounded-full shadow-xs pointer-events-none"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right: Language Switcher & Quick Social Links (Desktop & Tablet) */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
          {/* Language Switcher */}
          <LanguageSwitcher currentLanguage={language} onSelect={setLanguage} />

          {/* YouTube Official Channel Button */}
          <a
            href={OFFICIAL_CHANNELS.jagatUddharakYoutube}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-youtube-btn"
            title="Jagat Uddharak YouTube"
            className="group flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 border border-red-500/30 shadow-xs hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
          >
            <Youtube className="w-4 h-4 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6" />
            <span className="hidden 2xl:inline">YouTube</span>
          </a>

          {/* Facebook Official Channel Button */}
          <a
            href={OFFICIAL_CHANNELS.jagatUddharakFacebook}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-facebook-btn"
            title="Jagat Uddharak Facebook"
            className="group flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-bold text-stone-700 hover:text-blue-700 bg-white/80 hover:bg-blue-50/80 border border-stone-200/90 hover:border-blue-300/60 shadow-2xs hover:shadow-xs transition-all duration-200 hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
          >
            <Facebook className="w-4 h-4 text-blue-600 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6" />
            <span className="hidden 2xl:inline">Facebook</span>
          </a>
        </div>

        {/* Mobile / Portrait Tablet Controls (< lg) */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          {/* Compact Glass Language Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            id="mobile-lang-toggle"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/85 border border-amber-300 text-xs font-bold text-red-800 shadow-2xs active:scale-95 transition-all cursor-pointer"
            title="भाषा बदलें / Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-red-700" />
            <span>{language === 'hi' ? 'ENG' : 'हिन्दी'}</span>
          </button>

          {/* YouTube Icon */}
          <a
            href={OFFICIAL_CHANNELS.jagatUddharakYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-white bg-red-700 hover:bg-red-800 rounded-full shadow-2xs transition-transform active:scale-95"
            title="YouTube Channel"
          >
            <Youtube className="w-4 h-4" />
          </a>

          {/* Glass Hamburger / Menu Toggle Button */}
          <button
            type="button"
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-red-700 bg-white/80 hover:bg-red-50/80 border border-stone-200/90 hover:border-red-300 rounded-xl transition-all duration-200 shadow-2xs cursor-pointer active:scale-95"
            aria-label={mobileMenuOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-red-700" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Portrait Tablet Glassy Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden relative bg-[#FAF8F5]/95 backdrop-blur-2xl border-b border-amber-900/15 shadow-2xl px-4 sm:px-6 pt-3 pb-6 overflow-hidden"
          >
            {/* Ambient bubbles inside drawer */}
            <NavbarBubbles />

            {/* Language Selection Bar inside Drawer */}
            <div className="mb-3.5 pb-2.5 border-b border-stone-200/70 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === 'hi' ? 'भाषा चयन:' : 'Language:'}</span>
              </span>
              <LanguageSwitcher currentLanguage={language} onSelect={setLanguage} />
            </div>

            {/* Vertical Navigation Links */}
            <div className="flex flex-col space-y-1 py-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleLinkClick(item.id)}
                    className={`text-left px-4 py-2.5 sm:py-3 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600/15 via-amber-500/10 to-red-600/10 text-red-800 border border-red-600/25 shadow-xs'
                        : 'text-stone-700 hover:bg-stone-100/80 hover:text-red-700'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Quick Social Channel Links */}
            <div className="mt-4 pt-4 border-t border-stone-200/70 flex items-center justify-around gap-3">
              <a
                href={OFFICIAL_CHANNELS.jagatUddharakYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-700 to-red-600 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <Youtube className="w-4 h-4" />
                <span>YouTube</span>
              </a>
              <a
                href={OFFICIAL_CHANNELS.jagatUddharakFacebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/90 text-stone-800 text-xs font-bold border border-stone-300/80 hover:border-blue-300 shadow-2xs hover:shadow-sm transition-all active:scale-95"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                <span>Facebook</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
