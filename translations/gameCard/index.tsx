interface Translation {
  enterPage: string;
}

const chineseTranslations: Translation = {
  enterPage: "开始游戏",
};
const englishTranslations: Translation = {
  enterPage: "Play",
};

const getTranslations = (locale: string): Translation => {
  if (locale === "en-US") {
    return englishTranslations;
  }
  return chineseTranslations;
};

export default getTranslations;
