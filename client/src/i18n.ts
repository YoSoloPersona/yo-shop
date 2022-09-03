import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './assets/i18n/en.json';
import ru from './assets/i18n/ru.json';

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: 'ru',
        debug: true,
        resources: {
            en,
            ru
        },
        interpolation: {
            escapeValue: false
        },
        react: {
            bindI18n: 'languageChanged',
            bindI18nStore: '',
            transEmptyNodeValue: '',
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
            useSuspense: false,
          }
    });
export default i18n;
