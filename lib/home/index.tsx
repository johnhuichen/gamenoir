import fs from "fs";
import path from "path";
import matter from "gray-matter";
import uniq from "lodash/uniq";

export interface HomePageGame {
  id: string;
  gameType: string;
  name: string;
  imgFile: string;
  shortDescription: string;
  genre: string;
}

function getGameDataForDir(dir: string, gameType: string): HomePageGame[] {
  const fileNames = fs.readdirSync(dir);
  const gameData = fileNames.map(fileName => {
    const filePath = path.join(dir, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    const { name, imgFile, shortDescription, genre } = data;
    return {
      id: fileName.replace(/\.md$/, ""),
      gameType,
      name,
      imgFile,
      shortDescription,
      genre,
    };
  });
  return gameData;
}

function getDosGames(locale: string): HomePageGame[] {
  const dosgameMdDir = path.join(process.cwd(), `md/dosgame/${locale}`);
  return getGameDataForDir(dosgameMdDir, "dosgame");
}
function getArcadeGames(locale: string): HomePageGame[] {
  const arcadeMdDir = path.join(process.cwd(), `md/arcade/${locale}`);
  return getGameDataForDir(arcadeMdDir, "arcade");
}

const locales = ["zh-CN", "en-US"];

const gamesByLocale: { [key: string]: HomePageGame[] } = locales.reduce(
  (acc, locale) => {
    const games = [
      ...getDosGames(locale),
      ...getArcadeGames(locale),
    ].sort((a, b) => a.name.localeCompare(b.name, locale));

    return { ...acc, [locale]: games };
  },
  {}
);

const genresByLocale: { [key: string]: string[] } = Object.entries(
  gamesByLocale
).reduce((acc, [locale, games]) => {
  const genres = uniq(games.map(game => game.genre)).sort((a, b) => {
    if (a === "CLS") {
      return -1;
    }

    if (b === "CLS") {
      return 1;
    }

    return a > b ? -1 : 1;
  });

  return { ...acc, [locale]: genres };
}, {});

export { gamesByLocale, genresByLocale };
