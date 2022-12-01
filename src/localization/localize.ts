import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCommon from "./en/common.json";
import enScreens from "./en/screens.json";
import esCommon from "./es/common.json";
import esScreens from "./es/screens.json";

export type Languages = keyof typeof resources;

const resources = {
  en: {
    common: enCommon,
    screens: enScreens,
  },
  es: {
    common: esCommon,
    screens: esScreens,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      order: ["localStorage", "navigator"],
    },
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n, resources };
