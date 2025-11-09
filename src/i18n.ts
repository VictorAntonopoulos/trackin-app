// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import pt from './locales/pt.json';
import es from './locales/es.json';

const resources = { pt: { translation: pt }, es: { translation: es } };
const LANGUAGE_STORAGE_KEY = '@trackin:language';

export const initI18n = async () => {
  const savedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  const initialLng = savedLang || Localization.getLocales()[0].languageCode || 'pt';

  await i18n.use(initReactI18next).init({
    resources,
    lng: initialLng,
    fallbackLng: 'pt',
    interpolation: { escapeValue: false },
  });
};

export const changeLanguage = async (lang: 'pt' | 'es') => {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
};

export default i18n;
