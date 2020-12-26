import { useCallback } from "react";
import Head from "next/head";

import { HomePageGame } from "lib/home";
import GameGallery from "components/shared/GameGallery";
import Pagination from "components/shared/Pagination";
import Filters from "components/shared/Filters";

import Announcement from "./Announcement";
import styles from "./Home.module.css";

export interface HomeProps {
  games: HomePageGame[];
  activePage: number;
  maxPage: number;
  activeFilter: string | null;
  genres: string[];
  translations: { [key: string]: string };
}

const PAGE_SIZE = 10;

const Home: React.FC<HomeProps> = ({
  games,
  activePage,
  maxPage,
  activeFilter,
  genres,
  translations,
}: HomeProps) => {
  const getPageHref = useCallback(
    (page: number) => {
      if (activeFilter) {
        return `/genre/${activeFilter}/${page}`;
      }
      return `/home/${page}`;
    },
    [activeFilter]
  );
  const getFilterHref = useCallback(
    (filter: string) => {
      if (filter === activeFilter) {
        return `/`;
      }
      return `/genre/${filter}/1`;
    },
    [activeFilter]
  );

  return (
    <>
      <Head>
        <title>{translations.metaTitle}</title>
        <meta name="description" content={translations.metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Announcement />
      <div className={styles.container}>
        <Filters
          activeFilter={activeFilter}
          filters={genres}
          getFilterHref={getFilterHref}
        />
        <div className={styles.spacer} />
        <GameGallery games={games} />
        <Pagination
          activePage={activePage}
          maxPage={maxPage}
          getPageHref={getPageHref}
        />
      </div>
    </>
  );
};

export default Home;
export { PAGE_SIZE };
