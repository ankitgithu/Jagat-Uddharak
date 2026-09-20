import React from 'react';
import { MapPin, Phone, Building, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { ASHRAM_CONTACTS, OFFICIAL_CHANNELS } from '../data';
import { useLanguage } from '../LanguageContext';

export const ContactSection: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-red-700" />
            <span>{t.contact.badge}</span>
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4"
          >
            {t.contact.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Ashrams Directory - 2 Column Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
              <Building className="w-6 h-6 text-red-700" />
              <span>{t.contact.ashramsTitle}</span>
            </h3>
            <span className="text-xs font-medium text-stone-500 hidden sm:inline">
              {language === 'hi' ? '4 प्रमुख आधिकारिक केंद्र' : '4 Major Official Centers'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ASHRAM_CONTACTS.map((ashram) => (
              <div
                key={ashram.id}
                id={`ashram-card-${ashram.id}`}
                className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/90 shadow-sm hover:border-red-600/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="text-lg sm:text-xl font-bold text-stone-900">
                      {language === 'en' ? ashram.nameEn : ashram.name}
                    </h4>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-800 shrink-0">
                      {language === 'en' ? ashram.locationEn : ashram.location}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 mb-4 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{language === 'en' ? ashram.addressEn : ashram.address}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/70">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-red-700" />
                      {language === 'hi' ? 'हेल्पलाइन:' : 'Helpline:'}
                    </span>
                    {ashram.phoneNumbers.map((phone, pIdx) => (
                      <a
                        key={pIdx}
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-red-800 hover:text-white bg-red-50 hover:bg-red-700 px-3 py-1.5 rounded-lg border border-red-200 hover:border-red-700 transition-all shadow-2xs"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{phone}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Helpline Information & Guidelines Banner (Clean official guidelines instead of form) */}
        <div className="rounded-3xl bg-gradient-to-br from-red-950 via-stone-900 to-stone-950 text-white p-6 sm:p-10 border border-red-900/60 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>{t.contact.helplineTitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {language === 'hi' ? 'सत्संग, नामदान व साहित्य मार्गदर्शन' : 'Discourse, Initiation & Literature Guidance'}
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
                {t.contact.helplineDesc}
              </p>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.contact.disclaimer}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href="#official-website-single-card"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-red-700 hover:bg-red-600 text-white text-sm font-bold shadow-md transition-all text-center cursor-pointer"
              >
                <span>{language === 'hi' ? 'आधिकारिक पोर्टल विवरण' : 'Official Portal Details'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={OFFICIAL_CHANNELS.annapurnaMuhimWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-amber-300 text-sm font-bold border border-amber-500/40 transition-all text-center"
              >
                <span>annapurnamuhim.com</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
