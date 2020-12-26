interface Translation {
  metaTitle: string;
  metaDescription: string;
}

const chineseTranslations: Translation = {
  metaTitle: "墨黑网页游戏",
  metaDescription: "在线Dos和街机老游戏，每款游戏都经过我们细心测试。",
};
const englishTranslations: Translation = {
  metaTitle: "Game Noir",
  metaDescription:
    "You can play classic old games at Game Noir. We make sure everything just works.",
};

const getTranslations = (locale: string): Translation => {
  if (locale === "en-US") {
    return englishTranslations;
  }
  return chineseTranslations;
};

export default getTranslations;
