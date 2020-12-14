import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextApiRequest, NextApiResponse } from "next";

interface SearchGame {
  id: string;
  name: string;
  gameType: string;
}

const dosgameMdDir = path.join(process.cwd(), "lib/dosgame/md");
const arcadeMdDir = path.join(process.cwd(), "lib/arcade/md");

function getGameDataForDir(dir: string, gameType: string): SearchGame[] {
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

const allGameData = [
  ...getGameDataForDir(dosgameMdDir, "dosgame"),
  ...getGameDataForDir(arcadeMdDir, "arcade"),
];

export default (req: NextApiRequest, res: NextApiResponse): void => {
  try {
    const {
      body: { query },
    } = req;

    const keyword = query.trim().toLowerCase();
    const result = allGameData.filter(game =>
      game.name.toLowerCase().includes(keyword)
    );

    res.statusCode = 200;
    res.json({ query, result });
  } catch {
    res
      .status(404)
      .json({ query: "", result: [], error: "Something went wrong" });
  }
};
