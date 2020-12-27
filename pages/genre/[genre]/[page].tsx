import { GetStaticProps, GetStaticPaths } from "next";
import range from "lodash/range";

import { gamesByLocale, genresByLocale, HomePageGame } from "lib/home";
import Home, { PAGE_SIZE } from "components/shared/Home";
import getTranslations from "translations/home";

interface Props {
  games: HomePageGame[];
  activePage: number;
  maxPage: number;
  activeGenre: string;
  genres: string[];
  translations: { [key: string]: string };
}

const GenrePage: React.FC<Props> = ({
  games,
  activePage,
  maxPage,
  activeGenre,
  genres,
  translations,
}: Props) => {
  return (
    <Home
      games={games}
      activePage={activePage}
      maxPage={maxPage}
      activeFilter={activeGenre}
      genres={genres}
      translations={translations}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = (locales || [])
    .map(locale => {
      const allGames = gamesByLocale[locale as string] || [];
      const genres = genresByLocale[locale as string] || [];

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

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const activePage = parseInt(params?.page as string);
  const activeGenre = params?.genre as string;
  const allGames = gamesByLocale[locale as string] || [];
  const genres = genresByLocale[locale as string] || [];

  const allGamesInGenre = allGames.filter(game => game.genre === activeGenre);
  const maxPage = Math.ceil(allGamesInGenre.length / PAGE_SIZE);
  const games = allGamesInGenre.slice((activePage - 1) * 10, activePage * 10);
  const translations = getTranslations(locale as string);

  return {
    props: { games, activePage, activeGenre, maxPage, genres, translations },
  };
};

export default GenrePage;
