const fs = require("fs");
const globby = require("globby");

async function generateSiteMap() {
  const staticPageFiles = await globby([
    "pages/**/*.tsx",
    "!pages/404.tsx",
    "!pages/_*.tsx",
    "!pages/**/[id].tsx",
    "!pages/api",
  ]);

  const staticPages = staticPageFiles
    .map(file => {
      const path = file
        .replace("pages", "")
        .replace(".tsx", "")
        .replace(".md", "")
        .replace(/\/index$/, "");
      return `<url>
  <loc>${`https://gamenoir.app${path}`}</loc>
</url>`;
    })
    .join("\n");

  const dosgamePageFiles = await globby(["lib/dosgame/md/*.md"]);
  const dosgamePages = dosgamePageFiles
    .map(file => {
      const path = file
        .replace(/^lib\/dosgame\/md/, "/dosgame")
        .replace(".md", "");
      return `<url>
  <loc>${`https://gamenoir.app${path}`}</loc>
</url>`;
    })
    .join("\n");

  const arcadePageFiles = await globby(["lib/arcade/md/*.md"]);
  const arcadePages = arcadePageFiles
    .map(file => {
      const path = file
        .replace(/^lib\/arcade\/md/, "/arcade")
        .replace(".md", "");
      return `<url>
  <loc>${`https://gamenoir.app${path}`}</loc>
</url>`;
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages}
${dosgamePages}
${arcadePages}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
}

generateSiteMap();
