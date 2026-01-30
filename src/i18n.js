import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ta from './locales/ta.json';
import ml from './locales/ml.json';
import ur from './locales/ur.json';
import te from './locales/te.json';
import kn from './locales/kn.json';
import mr from './locales/mr.json';
import or from './locales/or.json';
import hi from './locales/hi.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ta: { translation: ta },
            ml: { translation: ml },
            ur: { translation: ur },
            te: { translation: te },
            kn: { translation: kn },
            mr: { translation: mr },
            or: { translation: or },
            hi: { translation: hi },
        },
        lng: 'en', // default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
