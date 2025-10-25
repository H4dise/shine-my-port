import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const dir = language === 'fa' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
  }, [language, dir]);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
