import React from 'react';
import { X, BookOpen, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { BookItem } from '../types';
import { useLanguage } from '../LanguageContext';

interface BookDetailModalProps {
  book: BookItem | null;
  onClose: () => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, onClose }) => {
  const { language, t } = useLanguage();
  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
          aria-label={language === 'hi' ? 'बंद करें' : 'Close'}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
          {/* Book Cover */}
          <div className="sm:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[240px] aspect-[3/4.2] rounded-xl overflow-hidden shadow-2xl border border-stone-200 bg-stone-100 relative group">
              <img
                src={book.coverImage}
                alt={language === 'en' ? book.titleEn : book.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <span className="mt-3 text-xs text-stone-500 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {language === 'hi' ? 'आधिकारिक प्रमाणित प्रति' : 'Official Verified Edition'}
            </span>
          </div>

          {/* Book Details */}
          <div className="sm:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-md bg-red-50 text-red-700 text-xs font-bold">
                  {language === 'en' ? book.categoryEn : book.category}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-medium">
                  {language === 'hi' ? 'भाषा: ' : 'Language: '}{book.language}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 mb-4 leading-tight">
                {language === 'en' ? book.titleEn : book.title}
              </h3>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {language === 'en' ? book.descriptionEn : book.description}
              </p>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs sm:text-sm text-stone-800 mb-6">
                <strong>{language === 'hi' ? 'नोट:' : 'Note:'}</strong>{' '}
                {language === 'hi'
                  ? 'यह पुस्तक जगतगुरु संत रामपाल जी महाराज द्वारा रचित है। इसमें सर्व धर्मों के पवित्र शास्त्रों (वेद, गीता, कुरान, बाइबल आदि) के मूल श्लोकों व संदर्भों सहित यथार्थ ज्ञान दिया गया है।'
                  : 'Authored by Jagatguru Sant Rampal Ji Maharaj, presenting authentic verses and citations from world scriptures including the Vedas, Gita, Quran, and Bible.'}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-stone-100">
              <a
                href={book.readUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm shadow-md transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t.books.readOnline}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
              </a>

              <a
                href={book.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{t.books.downloadPdf}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
