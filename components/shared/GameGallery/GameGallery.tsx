import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

import GameCard from "components/shared/GameCard";
import Search from "components/shared/Search";
import Filters from "components/shared/Filters";
import Pagination from "components/shared/Pagination";

import getTranslations from "translations/gameGallery";
import { HomePageGame } from "lib/home";

import styles from "./GameGallery.module.css";

interface Props {
  games: HomePageGame[];
  genres: string[];
}

const PAGE_SIZE = 10;
const INITIAL_FILTERS = [] as string[];
const INITIAL_PAGES = { [JSON.stringify(INITIAL_FILTERS)]: 1 };

const GameGallery: React.FC<Props> = ({ games, genres }: Props) => {
  const { locale } = useRouter();
  const [currentPages, setCurrentPages] = useState<{ [key: string]: number }>(
    INITIAL_PAGES
  );
  const [activeFilters, setActiveFilters] = useState<string[]>(INITIAL_FILTERS);
  const [searchedGames, setSearchedGames] = useState<HomePageGame[] | null>(
    null
  );
  const currentPage = useMemo(
    () => currentPages[JSON.stringify(activeFilters)],
    [currentPages, activeFilters]
  );
  const translations = useMemo(() => getTranslations(locale as string), [
    locale,
  ]);
  const filteredGames = useMemo(() => {
    const gamePool = searchedGames || games;

    if (activeFilters.length) {
      return gamePool.filter(game => activeFilters.includes(game.genre));
    }

    return gamePool;
  }, [searchedGames, games, activeFilters]);
  const gamesToDisplay = useMemo(() => {
    return filteredGames.slice(
      PAGE_SIZE * (currentPage - 1),
      PAGE_SIZE * currentPage
    );
  }, [filteredGames, currentPage]);

  const maxPage = useMemo(() => Math.ceil(filteredGames.length / PAGE_SIZE), [
    filteredGames.length,
  ]);

  const handleChangeInput = useCallback(
    value => {
      if (!value.trim()) {
        setSearchedGames(null);
      }

      const keyword = value.trim().toLowerCase();
      const result = games.filter(
        game =>
          game.name.toLowerCase().includes(keyword) ||
          game.shortDescription.toLowerCase().includes(keyword)
      );
      setSearchedGames(result);
      setCurrentPages({
        ...currentPages,
        [JSON.stringify(activeFilters)]: 1,
      });
    },
    [games]
  );

  const handleClearSearch = useCallback(() => {
    setSearchedGames(null);
  }, []);

  const handleChangeCurrentPage = useCallback(
    page => {
      setCurrentPages({
        ...currentPages,
        [JSON.stringify(activeFilters)]: page,
      });
    },
    [currentPages, activeFilters]
  );

  const handleChangeActiveFilters = useCallback(
    filters => {
      const key = JSON.stringify(filters);
      if (!currentPages[key]) {
        setCurrentPages({ ...currentPages, [key]: 1 });
      }

      setActiveFilters(filters);
    },
    [currentPages]
  );

  useEffect(() => {
    setActiveFilters(INITIAL_FILTERS);
    setCurrentPages(INITIAL_PAGES);
  }, [locale]);
  console.log(activeFilters, currentPage);

  return (
    <>
      <div className={styles.topContainer}>
        <div className={styles.searchContainer}>
          <Search
            handleChangeInput={handleChangeInput}
            handleClearSearch={handleClearSearch}
          />
        </div>
        <div className={styles.filterContainer}>
          <Filters
            filters={genres}
            activeFilters={activeFilters}
            handleChangeActiveFilters={handleChangeActiveFilters}
          />
        </div>
      </div>
      <div className={styles.gameContianer}>
        {!!gamesToDisplay.length &&
          gamesToDisplay.map(game => (
            <GameCard
              key={`game-${game.id}`}
              id={game.id}
              name={game.name}
              imgFile={game.imgFile}
              shortDescription={game.shortDescription}
              gameType={game.gameType}
            />
          ))}
        {!gamesToDisplay.length && (
          <div className={styles.notfound}>{translations.notfound}</div>
        )}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          currentPage={currentPage}
          maxPage={maxPage}
          handleChangeCurrentPage={handleChangeCurrentPage}
        />
      </div>
    </>
  );
};

export default GameGallery;
