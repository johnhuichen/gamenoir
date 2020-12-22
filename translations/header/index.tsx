interface Translation {
  brand: string;
}

const chineseTranslations: Translation = {
  brand: "黑游",
};
const englishTranslations: Translation = {
  brand: "Game Noir",
};

const getTranslations = (locale: string): Translation => {
  if (locale === "en-US") {
    return englishTranslations;
  }
  return chineseTranslations;
};

export default getTranslations;
