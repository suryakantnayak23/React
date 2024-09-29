// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "modalTitle": "Welcome",
            "modalBody": "This is an English modal.",
            "modalOk": "OK",
            "modalCancel": "Cancel"
        }
    },
    fr: {
        translation: {
            "modalTitle": "Bienvenue",
            "modalBody": "Ceci est une modale en français.",
            "modalOk": "D'accord",
            "modalCancel": "Annuler"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
