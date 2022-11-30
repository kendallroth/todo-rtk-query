import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./en/common.json";
import enScreens from "./en/screens.json";

const resources = {
  en: {
    common: enCommon,
    screens: enScreens,
  },
};

i18n.use(initReactI18next).init({
  resources,
  // NOTE: Only used when NOT using a language detector!
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export { i18n, resources };
