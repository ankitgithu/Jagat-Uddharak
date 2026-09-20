import React, { useState } from 'react';
import { ArrowRight, BookOpen, X, CheckCircle } from 'lucide-react';
import { SPIRITUAL_TOPICS } from '../data';
import { SpiritualTopic } from '../types';
import { useLanguage } from '../LanguageContext';

export const SpiritualKnowledge: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<SpiritualTopic | null>(null);
  const { language, t } = useLanguage();

  return (
    <section id="spiritual-knowledge" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/70 text-red-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.spiritual.badge}</span>
          </div>
          <h2
            id="spiritual-knowledge-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4"
          >
            {t.spiritual.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.spiritual.subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SPIRITUAL_TOPICS.map((topic) => (
            <div
              key={topic.id}
              id={`spiritual-card-${topic.id}`}
              onClick={() => setSelectedTopic(topic)}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col cursor-pointer"
            >
              {/* Image Container with Zoom */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100">
                <img
                  src={topic.image}
                  alt={language === 'en' ? topic.titleEn : topic.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                <span className="absolute bottom-3 left-3 bg-red-700/90 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                  {language === 'en' ? topic.subtitleEn : topic.subtitle}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-red-700 transition-colors mb-2.5">
                    {language === 'en' ? topic.titleEn : topic.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-3 mb-4">
                    {language === 'en' ? topic.descriptionEn : topic.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-red-700">
                  <span>{t.spiritual.readMore}</span>
                  <div className="w-8 h-8 rounded-full bg-red-50 group-hover:bg-red-700 group-hover:text-white flex items-center justify-center transition-all duration-200">
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedTopic(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTopic(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label={t.gallery.close}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-md bg-red-50 text-red-700 text-xs font-bold mb-2">
                {language === 'en' ? selectedTopic.subtitleEn : selectedTopic.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {language === 'en' ? selectedTopic.titleEn : selectedTopic.title}
              </h3>
            </div>

            <div className="rounded-xl overflow-hidden mb-6 h-56 bg-stone-100">
              <img
                src={selectedTopic.image}
                alt={language === 'en' ? selectedTopic.titleEn : selectedTopic.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="prose prose-stone max-w-none text-stone-700 mb-6 text-sm sm:text-base leading-relaxed">
              <p className="font-medium text-stone-900 mb-3">
                {language === 'en' ? selectedTopic.descriptionEn : selectedTopic.description}
              </p>
              <p>{language === 'en' ? selectedTopic.detailsEn : selectedTopic.details}</p>
            </div>

            {selectedTopic.references && (
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                  {t.spiritual.references}
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-800">
                  {selectedTopic.references.map((ref, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
