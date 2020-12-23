import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import remarkHtml from "remark-html";

export interface DosgameProps {
  id: string;
  name: string;
  shortDescription: string;
  gameFile: string;
  imgFile: string;
  descriptionHtml: string;
}

function getDosgameIds(locale: string): string[] {
  const mdDirectory = path.join(process.cwd(), `md/dosgame/${locale}`);
  const fileNames = fs.readdirSync(mdDirectory);
  return fileNames.map(fileName => fileName.replace(/\.md$/, ""));
}

async function getDosgameProps(
  id: string,
  locale: string
): Promise<DosgameProps> {
  const mdDirectory = path.join(process.cwd(), `md/dosgame/${locale}`);
  const filePath = path.join(mdDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const { name, shortDescription, gameFile, imgFile } = data;
  const processedContent = await remark()
    .use(remarkHtml)
    .process(content);
  const descriptionHtml = processedContent.toString();

  return {
    id,
    name,
    shortDescription,
    gameFile,
    imgFile,
    descriptionHtml,
  };
}

export { getDosgameProps, getDosgameIds };
