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

function getArcadeGameIds(locale: string): string[] {
  const mdDirectory = path.join(process.cwd(), `md/arcade/${locale}`);
  const fileNames = fs.readdirSync(mdDirectory);
  return fileNames.map(fileName => fileName.replace(/\.md$/, ""));
}

async function getArcadeProps(
  id: string,
  locale: string
): Promise<ArcadeProps> {
  const mdDirectory = path.join(process.cwd(), `md/arcade/${locale}`);
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

export { getArcadeProps, getArcadeGameIds };
