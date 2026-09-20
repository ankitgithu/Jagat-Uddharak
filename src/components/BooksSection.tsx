import React, { useState } from 'react';
import { BookOpen, Download, ExternalLink, Library, Eye } from 'lucide-react';
import { BOOKS_DATA, OFFICIAL_CHANNELS } from '../data';
import { BookItem } from '../types';
import { BookDetailModal } from './BookDetailModal';
import { useLanguage } from '../LanguageContext';

export const BooksSection: React.FC = () => {
  const [filter, setFilter] = useState<'featured' | 'all'>('featured');
  const [activeBook, setActiveBook] = useState<BookItem | null>(null);
  const { language, t } = useLanguage();

  const displayedBooks = filter === 'featured'
    ? BOOKS_DATA.filter((b) => b.featured)
    : BOOKS_DATA;

  return (
    <section id="books" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-red-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Library className="w-3.5 h-3.5" />
            <span>{t.books.badge}</span>
          </div>
          <h2
            id="books-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4"
          >
            {t.books.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.books.subtitle}
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-xl bg-stone-100 border border-stone-200">
            <button
              onClick={() => setFilter('featured')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === 'featured'
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {language === 'hi' ? 'मुख्य पुस्तकें (विशेष)' : 'Featured Books'}
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {language === 'hi'
                ? `संपूर्ण साहित्य (${BOOKS_DATA.length})`
                : `All Literature (${BOOKS_DATA.length})`}
            </button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {displayedBooks.map((book) => (
            <div
              key={book.id}
              className="group bg-[#FAF8F5] rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Book Cover Container */}
                <div
                  onClick={() => setActiveBook(book)}
                  className="relative aspect-[3/4.2] rounded-xl overflow-hidden mb-5 bg-stone-200 shadow-md cursor-pointer group/cover"
                >
                  <img
                    src={book.coverImage}
                    alt={language === 'en' ? book.titleEn : book.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/cover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-stone-900 text-xs font-bold shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-red-700" />
                      {t.books.viewDetails}
                    </span>
                  </div>
                </div>

                {/* Category badge & Title */}
                <span className="text-[11px] font-semibold text-red-700 uppercase tracking-wider block mb-1">
                  {language === 'en' ? book.categoryEn : book.category}
                </span>
                <h3
                  onClick={() => setActiveBook(book)}
                  className="text-lg font-bold text-stone-900 group-hover:text-red-700 transition-colors mb-2 line-clamp-2 cursor-pointer"
                >
                  {language === 'en' ? book.titleEn : book.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                  {language === 'en' ? book.descriptionEn : book.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200/70 flex items-center gap-2">
                <a
                  href={book.readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t.books.readOnline}</span>
                </a>

                <a
                  href={book.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Official Books Archive Footer Banner */}
        <div className="mt-12 text-center">
          <a
            href={OFFICIAL_CHANNELS.officialBooksSite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold transition-all border border-stone-200"
          >
            <span>{t.books.officialPortal}</span>
            <ExternalLink className="w-4 h-4 text-red-700" />
          </a>
        </div>
      </div>

      {/* Book Detail Modal */}
      <BookDetailModal book={activeBook} onClose={() => setActiveBook(null)} />
    </section>
  );
};
