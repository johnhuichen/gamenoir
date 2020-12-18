interface Translation {
  theaterMode: string;
  fullScreenMode: string;
  normalMode: string;
  faq: string;
}

const chineseTranslations: Translation = {
  theaterMode: "宽屏",
  fullScreenMode: "全屏",
  normalMode: "退回",
  faq: "常见问题解答",
};
const englishTranslations: Translation = {
  theaterMode: "Theater Mode",
  fullScreenMode: "Full Screen Mode",
  normalMode: "Normal Mode",
  faq: "FAQ",
};

const getTranslations = (locale: string): Translation => {
  if (locale === "en-US") {
    return englishTranslations;
  }
  return chineseTranslations;
};

export default getTranslations;
