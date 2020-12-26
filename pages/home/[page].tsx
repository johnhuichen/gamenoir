import { GetStaticProps, GetStaticPaths } from "next";
import range from "lodash/range";
// import uniq from "lodash/uniq";

import { getDosGames, getArcadeGames, HomePageGame } from "lib/home";
import Home, { PAGE_SIZE } from "components/shared/Home";

interface Props {
  page: number;
  maxPage: number;
  games: HomePageGame[];
}

const PaginatedHome: React.FC<Props> = ({ page, maxPage, games }: Props) => {
  return <Home activePage={page} maxPage={maxPage} games={games} />;
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = (locales || [])
    .map(locale => {
      const allGames = [
        ...getDosGames(locale as string),
        ...getArcadeGames(locale as string),
      ];
      const maxPage = Math.ceil(allGames.length / PAGE_SIZE);

      return range(1, maxPage + 1).map(page => ({
        params: { page: `${page}` },
        locale,
      }));
    })
    .flat();

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const page = parseInt(params.page);
  const allGames = [
    ...getDosGames(locale as string),
    ...getArcadeGames(locale as string),
  ];
  // const genres = uniq(allGames.map(game => game.genre));
  const maxPage = Math.ceil(allGames.length / PAGE_SIZE);
  const games = allGames
    .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"))
    .slice((page - 1) * 10, page * 10);

  return { props: { games, maxPage, page } };
};

export default PaginatedHome;
