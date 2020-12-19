interface Translation {
  enterPage: string;
}

const chineseTranslations: Translation = {
  enterPage: "点我开始游戏",
};
const englishTranslations: Translation = {
  enterPage: "Click me to play",
};

const getTranslations = (locale: string): Translation => {
  if (locale === "en-US") {
    return englishTranslations;
  }
  return chineseTranslations;
};

export default getTranslations;
