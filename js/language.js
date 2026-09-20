// Language State & Translation Helper
import { TRANSLATIONS } from './data/content.js';

let currentLanguage = localStorage.getItem('ju_lang') || 'hi';

export function getCurrentLang() {
  return currentLanguage;
}

export function setLanguage(lang) {
  if (lang !== 'hi' && lang !== 'en') return;
  currentLanguage = lang;
  localStorage.setItem('ju_lang', lang);
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Dispatch custom event for all components to update
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// Helper to get nested translation string e.g. t('hero.title')
export function t(keyPath) {
  const keys = keyPath.split('.');
  let obj = TRANSLATIONS[currentLanguage] || TRANSLATIONS.hi;
  for (const k of keys) {
    if (obj && obj[k] !== undefined) {
      obj = obj[k];
    } else {
      // Fallback to Hindi
      let fallback = TRANSLATIONS.hi;
      for (const fk of keys) {
        if (fallback && fallback[fk] !== undefined) {
          fallback = fallback[fk];
        } else {
          return keyPath;
        }
      }
      return fallback;
    }
  }
  return obj;
}
