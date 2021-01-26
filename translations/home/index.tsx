interface Translation {
  metaTitle: string;
  metaDescription: string;
}

const chineseTranslations: Translation = {
  metaTitle: "墨黑网页游戏",
  metaDescription:
    "网页在线玩Dos和街机老游戏，仙剑奇侠传，金庸奇侠传，主题医院，三国志，侠客游，天使帝国，无声狂啸，明星志愿，炎龙骑士团，英雄无敌，阿猫阿狗",
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
