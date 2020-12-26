import { GetStaticProps, GetStaticPaths } from "next";
import range from "lodash/range";

import { gamesByLocale, genresByLocale, HomePageGame } from "lib/home";
import Home, { PAGE_SIZE } from "components/shared/Home";
import getTranslations from "translations/home";

interface Props {
  games: HomePageGame[];
  activePage: number;
  maxPage: number;
  genres: string[];
  translations: { [key: string]: string };
}

const PaginatedHome: React.FC<Props> = ({
  games,
  activePage,
  maxPage,
  genres,
  translations,
}: Props) => {
  return (
    <Home
      games={games}
      activePage={activePage}
      maxPage={maxPage}
      activeFilter={null}
      genres={genres}
      translations={translations}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = (locales || [])
    .map(locale => {
      const allGames = gamesByLocale[locale as string] || [];
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
  const activePage = parseInt(params?.page as string);
  const allGames = gamesByLocale[locale as string] || [];
  const genres = genresByLocale[locale as string] || [];

  const games = allGames.slice((activePage - 1) * 10, activePage * 10);
  const maxPage = Math.ceil(allGames.length / PAGE_SIZE);
  const translations = getTranslations(locale as string);

  return { props: { games, maxPage, activePage, genres, translations } };
};

export default PaginatedHome;
