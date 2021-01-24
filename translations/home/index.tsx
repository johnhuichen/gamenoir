interface Translation {
  metaTitle: string;
  metaDescription: string;
}

const chineseTranslations: Translation = {
  metaTitle: "墨黑网页游戏",
  metaDescription:
    "网页在线Dos和街机老游戏，老游戏我们玩的是情怀，是再次看到童年的恍若隔世。当年那些经典的作品其实用现在的眼光去仔细欣赏也绝不比现在最好的作品逊色。虽然当年在技术上他们不能实现高画质的动画效果，也没料想到后来衍生出的多姿多彩的游戏类型，但是我们推荐的这些经典游戏每个都经过时间考验，每个都是当年最优秀的游戏制作组倾尽心血制成的大作，他们用心打造每个细节，就是为了给玩家带了一个可以沉浸其中流连忘返的游戏体验。",
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
