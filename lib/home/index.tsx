import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface HomePageGame {
  id: string;
  gameType: string;
  name: string;
  imgFile: string;
  shortDescription: string;
}

const arcadeMdDir = path.join(process.cwd(), "lib/arcade/md");

function getGameDataForDir(dir: string, gameType: string): HomePageGame[] {
  const fileNames = fs.readdirSync(dir);
  const gameData = fileNames.map(fileName => {
    const filePath = path.join(dir, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    const { name, imgFile, shortDescription } = data;
    return {
      id: fileName.replace(/\.md$/, ""),
      name,
      imgFile,
      shortDescription,
      gameType,
    };
  });
  return gameData;
}

function getDosGames(locale: string): HomePageGame[] {
  const dosgameMdDir = path.join(process.cwd(), `lib/dosgame/md/${locale}`);
  return getGameDataForDir(dosgameMdDir, "dosgame");
}
function getArcadeGames(locale: string): HomePageGame[] {
  const arcadeMdDir = path.join(process.cwd(), `lib/arcade/md/${locale}`);
  return getGameDataForDir(arcadeMdDir, "arcade");
}

export { getDosGames, getArcadeGames };
