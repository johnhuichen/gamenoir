import { GetStaticProps } from "next";
import uniq from "lodash/uniq";

import { getDosGames, getArcadeGames, HomePageGame } from "lib/home";
import Home, { PAGE_SIZE } from "components/shared/Home";
import getTranslations from "translations/home";

interface Props {
  games: HomePageGame[];
  maxPage: number;
  genres: string[];
  translations: { [key: string]: string };
}

const HomeFirstPage: React.FC<Props> = ({
  games,
  maxPage,
  translations,
  genres,
}: Props) => {
  return (
    <Home
      games={games}
      activePage={1}
      maxPage={maxPage}
      activeFilter={null}
      translations={translations}
      genres={genres}
    />
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const allGames = [
    ...getDosGames(locale as string),
    ...getArcadeGames(locale as string),
  ].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
  const games = allGames.slice(0, 10);
  const maxPage = Math.ceil(allGames.length / PAGE_SIZE);
  const translations = getTranslations(locale as string);
  const genres = uniq(allGames.map(game => game.genre)).sort((a, b) =>
    a > b ? -1 : 1
  );

  return { props: { games, maxPage, genres, translations } };
};

export default HomeFirstPage;
