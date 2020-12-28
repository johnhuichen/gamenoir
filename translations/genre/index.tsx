interface Translation {
  [key: string]: string;
}

const chineseTranslations: Translation = {
  CLS: "超经典",
  SLG: "战旗",
  SIM: "经营",
  RPG: "RPG",
  FG: "格斗",
  BRD: "棋牌",
  ACT: "动作",
  AVG: "AVG",
};
const englishTranslations: Translation = {
  CLS: "Timeless",
  SLG: "SLG",
  SIM: "Simulation",
  RPG: "RPG",
  FG: "Fighting",
  BRD: "Board",
  ACT: "Action",
  TBSG: "Strategy",
  FPS: "FPS",
  AVG: "AVG",
};

const getTranslations = (locale: string): Translation => {
  if (locale === "en-US") {
    return englishTranslations;
  }
  return chineseTranslations;
};

export default getTranslations;
