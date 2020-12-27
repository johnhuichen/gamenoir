import { GetStaticProps } from "next";

import { gamesByLocale, genresByLocale, HomePageGame } from "lib/home";
import Home, { PAGE_SIZE } from "components/shared/Home";
import getTranslations from "translations/home";

interface Props {
  games: HomePageGame[];
  activePage: number;
  activeGenre: string;
  maxPage: number;
  genres: string[];
  translations: { [key: string]: string };
}

const HomeFirstPage: React.FC<Props> = ({
  games,
  activePage,
  activeGenre,
  maxPage,
  translations,
  genres,
}: Props) => {
  return (
    <Home
      games={games}
      activePage={activePage}
      maxPage={maxPage}
      activeFilter={activeGenre}
      translations={translations}
      genres={genres}
    />
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const activePage = 1;
  const activeGenre = "CLS";
  const allGames = gamesByLocale[locale as string] || [];
  const genres = genresByLocale[locale as string] || [];

  const allGamesInGenre = allGames.filter(game => game.genre === activeGenre);
  const maxPage = Math.ceil(allGamesInGenre.length / PAGE_SIZE);
  const games = allGamesInGenre.slice(0, 10);
  const translations = getTranslations(locale as string);

  return {
    props: { games, activePage, activeGenre, maxPage, genres, translations },
  };
};

export default HomeFirstPage;
