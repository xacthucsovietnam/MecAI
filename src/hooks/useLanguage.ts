import { useTranslation } from 'react-i18next';
import { useState, useCallback, useEffect } from 'react';

export type Language = 'vi' | 'en';

export interface LanguageOption {
  value: Language;
  label: string;
}

export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    (localStorage.getItem('i18nextLng') as Language) || 'vi'
  );

  // Available language options
  const languageOptions: LanguageOption[] = [
    { value: 'vi', label: t('language.vietnamese') },
    { value: 'en', label: t('language.english') },
  ];

  // Change language handler
  const changeLanguage = useCallback(
    (language: Language) => {
      i18n.changeLanguage(language);
      setCurrentLanguage(language);
    },
    [i18n]
  );

  // Update the current language when it changes via i18n
  useEffect(() => {
    const lng = i18n.language as Language;
    setCurrentLanguage(lng);
  }, [i18n.language]);

  return {
    currentLanguage,
    changeLanguage,
    languageOptions,
    t,
  };
};

export default useLanguage; 