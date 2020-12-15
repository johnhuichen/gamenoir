interface Translation {
  home: string;
  dosGames: string;
  arcadeGames: string;
}

const chineseTranslations: Translation = {
  home: "大本营",
  dosGames: "DOS",
  arcadeGames: "街机",
};
const englishTranslations: Translation = {
  home: "Home",
  dosGames: "Dosbox",
  arcadeGames: "Arcade",
};

const getTranslations = (locale: string): Translation => {
  if (locale === "en-US") {
    return englishTranslations;
  }
  return chineseTranslations;
};

export default getTranslations;
