import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

const storedLang = localStorage.getItem("i18nextLng") || "es"

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: storedLang,
        fallbackLng: "es",
        debug: false,
        interpolation: {
            escapeValue: false,
        },
            detection: {
            order: ["querystring", "cookie", "localStorage", "navigator"],
            caches: ["cookie"],
        },
    })

export default i18n;
