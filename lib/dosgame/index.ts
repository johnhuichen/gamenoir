import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import remarkHtml from "remark-html";

export interface DosgameProps {
  id: string;
  name: string;
  gameFile: string;
  imgFile: string;
  commands: string[];
  descriptionHtml: string;
}

const mdDirectory = path.join(process.cwd(), "lib/dosgame/md");
const fileNames = fs.readdirSync(mdDirectory);
const dosgameIds = fileNames.map(fileName => fileName.replace(/\.md$/, ""));

async function getDosgameProps(id: string): Promise<DosgameProps> {
  const filePath = path.join(mdDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const { name, gameFile, imgFile, commands } = data;
  const processedContent = await remark()
    .use(remarkHtml)
    .process(content);
  const descriptionHtml = processedContent.toString();

  return {
    id,
    name,
    gameFile,
    imgFile,
    commands: JSON.parse(commands),
    descriptionHtml,
  };
}

export { getDosgameProps, dosgameIds };
