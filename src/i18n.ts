// i18n configuration for Conexta Medical IoT Platform

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import locale files
import en from '@/locales/en.json';
import ta from '@/locales/ta.json';
import ml from '@/locales/ml.json';
import hi from '@/locales/hi.json';
import te from '@/locales/te.json';
import kn from '@/locales/kn.json';
import mr from '@/locales/mr.json';
import or from '@/locales/or.json';
import ur from '@/locales/ur.json';

const resources = {
  en: { translation: en },
  ta: { translation: ta },
  ml: { translation: ml },
  hi: { translation: hi },
  te: { translation: te },
  kn: { translation: kn },
  mr: { translation: mr },
  or: { translation: or },
  ur: { translation: ur },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;

export const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'mr', name: 'मराठी' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'ur', name: 'اردو' },
];
