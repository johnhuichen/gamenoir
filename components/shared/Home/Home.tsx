import { useMemo } from "react";
import Head from "next/head";

import { HomePageGame } from "lib/home";
import GameGallery from "components/shared/GameGallery";
import Pagination from "components/shared/Pagination";
import Filters from "components/shared/Filters";

import Announcement from "./Announcement";
import styles from "./Home.module.css";

export interface HomeProps {
  activePage: number;
  maxPage: number;
  games: HomePageGame[];
  genres: string[];
  translations: { [key: string]: string };
}

const PAGE_SIZE = 10;
const getPageHref = (page: number) => `/home/${page}`;
const getFilterHref = (filter: string) => `/genre/${filter}/1`;

const Home: React.FC<HomeProps> = ({
  activePage,
  maxPage,
  games,
  genres,
  translations,
}: HomeProps) => {
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
          activeFilter={null}
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
