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

function getGames(): HomePageGame[] {
  const dosgameMdDir = path.join(process.cwd(), "lib/dosgame/md");
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

  return [
    ...getGameDataForDir(dosgameMdDir, "dosgame"),
    ...getGameDataForDir(arcadeMdDir, "arcade"),
  ];
}

export { getGames };
