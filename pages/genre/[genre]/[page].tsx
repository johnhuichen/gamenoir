import { GetStaticProps, GetStaticPaths } from "next";
import range from "lodash/range";
import uniq from "lodash/uniq";

import { getDosGames, getArcadeGames, HomePageGame } from "lib/home";
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

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { page: pageString, genre: activeGenre } = params;
  const activePage = parseInt(pageString);

  const allGames = [
    ...getDosGames(locale as string),
    ...getArcadeGames(locale as string),
  ];
  const allGamesInGenre = allGames.filter(game => game.genre === activeGenre);
  const maxPage = Math.ceil(allGamesInGenre.length / PAGE_SIZE);
  const games = allGamesInGenre
    .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"))
    .slice((activePage - 1) * 10, activePage * 10);
  const translations = getTranslations(locale as string);
  const genres = uniq(allGames.map(game => game.genre)).sort((a, b) =>
    a > b ? -1 : 1
  );

  return {
    props: { games, activePage, maxPage, activeGenre, genres, translations },
  };
};

export default GenrePage;
