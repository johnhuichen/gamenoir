import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import remarkHtml from "remark-html";

export interface ArcadeProps {
  id: string;
  name: string;
  gameFile: string;
  imgFile: string;
  descriptionHtml: string;
}

const mdDirectory = path.join(process.cwd(), "lib/arcade/md");
const fileNames = fs.readdirSync(mdDirectory);
const arcadeIds = fileNames.map(fileName => fileName.replace(/\.md$/, ""));

async function getArcadeProps(id: string): Promise<ArcadeProps> {
  const filePath = path.join(mdDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const { name, gameFile, imgFile } = data;
  const processedContent = await remark()
    .use(remarkHtml)
    .process(content);
  const descriptionHtml = processedContent.toString();

  return {
    id,
    name,
    gameFile,
    imgFile,
    descriptionHtml,
  };
}

export { getArcadeProps, arcadeIds };
