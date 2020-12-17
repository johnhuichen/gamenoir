interface Translation {
  notfound: string;
}

const chineseTranslations: Translation = {
  notfound: "啥都没找到， 要不再试一次？",
};
const englishTranslations: Translation = {
  notfound: "Nothing found...try another keyword?",
};

const getTranslations = (locale: string): Translation => {
  if (locale === "en-US") {
    return englishTranslations;
  }
  return chineseTranslations;
};

export default getTranslations;
