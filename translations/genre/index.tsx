interface Translation {
  [key: string]: string;
}

const chineseTranslations: Translation = {
  SLG: "战旗",
  SIM: "模拟",
  RPG: "RPG",
  FG: "格斗",
  BRD: "棋牌",
  ACT: "横幅",
};
const englishTranslations: Translation = {
  SLG: "SLG",
  SIM: "Simulation",
  RPG: "RPG",
  FG: "Fighting",
  BRD: "Board",
  ACT: "Action",
  TBSG: "Strategy",
  FPS: "FPS",
};

const getTranslations = (locale: string): Translation => {
  if (locale === "en-US") {
    return englishTranslations;
  }
  return chineseTranslations;
};

export default getTranslations;
