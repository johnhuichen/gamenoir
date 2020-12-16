interface Translation {
  searchPlaceholder: string;
}

const chineseTranslations: Translation = {
  searchPlaceholder: "搜搜看吧",
};
const englishTranslations: Translation = {
  searchPlaceholder: "Find your game",
};

const getTranslations = (locale: string): Translation => {
  if (locale === "en-US") {
    return englishTranslations;
  }
  return chineseTranslations;
};

export default getTranslations;
