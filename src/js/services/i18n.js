const locales = {};
let currentLang = "en";

export async function loadLocale(lang) {
  if (locales[lang]) {
    currentLang = lang;
    return;
  }
  try {
    const res = await fetch(`src/locales/${lang}.json`);
    const data = await res.json();
    locales[lang] = data;
    currentLang = lang;
  } catch (e) {
    console.warn("Failed to load locale", lang, e);
  }
}

export function setLang(lang) {
  currentLang = lang;
}

export function getLang() {
  return currentLang;
}

export function t(key) {
  const dict = locales[currentLang] || {};
  return key.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), dict) || key;
}

