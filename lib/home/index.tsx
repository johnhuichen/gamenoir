import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

export { getDosGames, getArcadeGames };
