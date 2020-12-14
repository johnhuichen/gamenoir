import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface SearchBarGame {
  id: string;
  name: string;
  gameType: string;
}

function getGames(): SearchBarGame[] {
  const dosgameMdDir = path.join(process.cwd(), "lib/dosgame/md");
  const arcadeMdDir = path.join(process.cwd(), "lib/arcade/md");

  function getGameDataForDir(dir: string, gameType: string): SearchBarGame[] {
    const fileNames = fs.readdirSync(dir);
    const gameData = fileNames.map(fileName => {
      const filePath = path.join(dir, fileName);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      const { name } = data;
      return {
        id: fileName.replace(/\.md$/, ""),
        name,
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
