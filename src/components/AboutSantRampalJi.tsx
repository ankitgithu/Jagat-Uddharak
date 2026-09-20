import React, { useState } from 'react';
import { UserCheck, Sparkles, ChevronDown, ChevronUp, ExternalLink, Instagram } from 'lucide-react';
import { OFFICIAL_CHANNELS } from '../data';
import { useLanguage } from '../LanguageContext';

export const AboutSantRampalJi: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { language, t } = useLanguage();

  return (
    <section id="about-guruji" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Portrait & Highlights */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-stone-100">
              <img
                src="https://www.jagatgururampalji.org/theme/alpha-v-1.0-2024/assets/img/about-guruji.webp"
                alt="जगतगुरु तत्वदर्शी संत रामपाल जी महाराज"
                className="w-full h-auto object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  {language === 'hi' ? 'तत्वदर्शी संत' : 'Tatvdarshi Saint'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  {language === 'hi' ? 'संत रामपाल जी महाराज' : 'Sant Rampal Ji Maharaj'}
                </h3>
              </div>
            </div>

            {/* Quick Fact Badges */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 block">{t.about.dobLabel}</span>
                <span className="text-sm font-bold text-stone-900">{t.about.dobValue}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 block">{t.about.guruLabel}</span>
                <span className="text-sm font-bold text-stone-900">{t.about.guruValue}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 block">{t.about.postLabel}</span>
                <span className="text-sm font-bold text-stone-900">{t.about.postValue}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 block">{t.about.principleLabel}</span>
                <span className="text-sm font-bold text-stone-900">{t.about.principleValue}</span>
              </div>
            </div>

            {/* Instagram CTA for Sant Rampal Ji Maharaj */}
            <div className="mt-4">
              <a
                href={OFFICIAL_CHANNELS.santRampalJiInstagram}
                target="_blank"
                rel="noopener noreferrer"
                id="guruji-instagram-cta-btn"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-600 via-red-600 to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              >
                <Instagram className="w-4 h-4" />
                <span>{t.about.instagramBtn}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Biography */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 text-red-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t.about.badge}</span>
            </div>

            <h2
              id="about-guruji-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-6"
            >
              {t.about.title}
            </h2>

            <div className="prose prose-stone max-w-none text-stone-700 text-base sm:text-lg leading-relaxed space-y-4">
              <p>{t.about.bio1}</p>
              <p>{t.about.bio2}</p>
            </div>

            {/* Expandable Section for Detailed Official Content */}
            {expanded && (
              <div className="mt-6 pt-6 border-t border-stone-200 space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed animate-in fade-in duration-300">
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-4">
                  <h4 className="font-bold text-amber-900 text-base mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    {t.about.prophecyTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                    {t.about.prophecyDesc}
                  </p>
                </div>

                <h4 className="font-bold text-stone-900 text-base">
                  {language === 'hi'
                    ? 'पवित्र सद्ग्रंथों का यथार्थ अनावरण:'
                    : 'Authentic Revelation of Sacred Scriptures:'}
                </h4>
                <p>
                  {language === 'hi'
                    ? 'संत रामपाल जी महाराज ने चारों वेदों, श्रीमद्भगवद्गीता, पवित्र अठारह पुराणों, पवित्र कुरान शरीफ, पवित्र बाइबल और श्री गुरु ग्रंथ साहिब के वास्तविक श्लोकों एवं मंत्रों को मूल प्रतियों सहित जनता के समक्ष रखकर यह सिद्ध किया कि सम्पूर्ण सृष्टि का सृष्टिकर्ता सर्वशक्तिमान परमेश्वर कबीर साहेब (कविर्देव) हैं।'
                    : 'Sant Rampal Ji Maharaj brought forth authentic verses from the Vedas, Bhagavad Gita, 18 Puranas, Holy Quran, Holy Bible, and Sri Guru Granth Sahib, demonstrating that the Supreme Creator of all realms is Almighty God Kabir (KavirDev).'}
                </p>

                <h4 className="font-bold text-stone-900 text-base">
                  {language === 'hi'
                    ? 'निस्वार्थ सेवा और समाज सुधार:'
                    : 'Selfless Service & Social Transformation:'}
                </h4>
                <p>
                  {language === 'hi'
                    ? 'आपके सानिध्य में किसी भी प्रकार का दान-पात्र या चढ़ावा नहीं लिया जाता। नामदान पूर्णतः निःशुल्क दिया जाता है। आपके अनुयायी नशा, दहेज, मृत्युभोज, जाति-पाति व अंधविश्वास से पूर्णतः मुक्त होकर सात्विक व मर्यादित जीवन व्यतीत करते हैं।'
                    : 'Under his guidance, zero donations or public offerings are accepted. Spiritual initiation is completely free. Followers live virtuous, disciplined lives completely liberated from intoxication, dowry, caste bias, and superstitious rituals.'}
                </p>
              </div>
            )}

            {/* Toggle Expand / Read More Button */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-700 hover:bg-red-800 text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <span>{expanded ? t.about.collapseBtn : t.about.expandBtn}</span>
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <a
                href="#official-website-single-card"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-stone-700 hover:text-red-700 font-semibold transition-colors"
              >
                <span>{t.about.officialSiteBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
