interface Translation {
  contactus: string;
  copyright: string;
}

const chineseTranslations: Translation = {
  contactus: "联系我们",
  copyright: "版权所有",
};
const englishTranslations: Translation = {
  contactus: "Contact Us",
  copyright: "Copy Right",
};

const getTranslations = (locale: string): Translation => {
  if (locale === "en-US") {
    return englishTranslations;
  }
  return chineseTranslations;
};

export default getTranslations;
