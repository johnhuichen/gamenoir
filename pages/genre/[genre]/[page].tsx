import { GetStaticProps, GetStaticPaths } from "next";
import range from "lodash/range";
import uniq from "lodash/uniq";

import { getDosGames, getArcadeGames, HomePageGame } from "lib/home";

interface Props {}

const PAGE_SIZE = 10;

const GenrePage: React.FC<Props> = ({}: Props) => {
  return <div>test page</div>;
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = (locales || [])
    .map(locale => {
      const allGames = [
        ...getDosGames(locale as string),
        ...getArcadeGames(locale as string),
      ];
      const genres = uniq(allGames.map(game => game.genre));

      return genres.map(genre => ({
        locale,
        genre,
        games: allGames.filter(game => game.genre === genre),
      }));
    })
    .flat()
    .map(({ locale, genre, games }) => {
      const maxPage = Math.ceil(games.length / PAGE_SIZE);

      return range(1, maxPage + 1).map(page => ({
        params: { page: `${page}`, genre },
        locale,
      }));
    })
    .flat();
  console.log(paths);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { page: pageString, genre } = params;
  // const page = parseInt(pageString);
  //
  // const maxPage = Math.ceil(allGames.length / PAGE_SIZE);
  // const games = allGames
  //   .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"))
  //   .slice((page - 1) * 10, page * 10);
  // const translations = getTranslations(locale as string);
  // const genres = uniq(allGames.map(game => game.genre));

  return { props: {} };
};

export default GenrePage;
