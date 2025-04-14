import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationVI from './vi/translation.json';
import translationEN from './en/translation.json';

// Define resources with translations
const resources = {
  vi: {
    translation: translationVI
  },
  en: {
    translation: translationEN
  }
};

i18n
  // Use language detector to automatically detect language
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'vi', // Default language fallback
    detection: {
      order: ['localStorage', 'navigator'], // Detection methods order
      caches: ['localStorage'], // What to cache
    },
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n; 