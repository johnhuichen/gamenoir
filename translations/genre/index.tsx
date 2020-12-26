interface Translation {}

const chineseTranslations: Translation = {};
const englishTranslations: Translation = {};

const getTranslations = (locale: string): Translation => {
  if (locale === "en-US") {
    return englishTranslations;
  }
  return chineseTranslations;
};

export default getTranslations;
