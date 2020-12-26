import { GetStaticProps } from "next";
// import uniq from "lodash/uniq";

import { getDosGames, getArcadeGames, HomePageGame } from "lib/home";
import Home, { PAGE_SIZE } from "components/shared/Home";

interface Props {
  games: HomePageGame[];
  maxPage: number;
  genres: string[];
}

const HomeFirstPage: React.FC<Props> = ({ games, maxPage }: Props) => {
  return <Home activePage={1} maxPage={maxPage} games={games} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const allGames = [
    ...getDosGames(locale as string),
    ...getArcadeGames(locale as string),
  ].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
  const games = allGames.slice(0, 10);
  // const genres = uniq(allGames.map(game => game.genre));
  const maxPage = Math.ceil(allGames.length / PAGE_SIZE);

  return { props: { games, maxPage } };
};

export default HomeFirstPage;
