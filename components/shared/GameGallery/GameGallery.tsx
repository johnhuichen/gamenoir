import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

import GameCard from "components/shared/GameCard";
import Search from "components/shared/Search";
import Filters from "components/shared/Filters";

import getTranslations from "translations/gameGallery";
import { HomePageGame } from "lib/home";

import styles from "./GameGallery.module.css";

interface Props {
  games: HomePageGame[];
  genres: string[];
}

const INITIAL_FILTERS = [] as string[];

const GameGallery: React.FC<Props> = ({ games, genres }: Props) => {
  const { locale } = useRouter();
  const [activeFilters, setActiveFilters] = useState<string[]>(INITIAL_FILTERS);
  const [searchedGames, setSearchedGames] = useState<HomePageGame[] | null>(
    null
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
    },
    [games]
  );

  const handleClearSearch = useCallback(() => {
    setSearchedGames(null);
  }, []);

  const handleClickFilter = useCallback(
    filter => {
      if (activeFilters.includes(filter)) {
        setActiveFilters([]);
      } else {
        setActiveFilters([filter]);
      }
    },
    [activeFilters]
  );

  useEffect(() => {
    setActiveFilters(INITIAL_FILTERS);
  }, [locale]);

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
            handleClickFilter={handleClickFilter}
          />
        </div>
      </div>
      <div className={styles.gameContianer}>
        {!!filteredGames.length &&
          filteredGames.map(game => (
            <GameCard
              key={`game-${game.id}`}
              id={game.id}
              name={game.name}
              imgFile={game.imgFile}
              shortDescription={game.shortDescription}
              gameType={game.gameType}
            />
          ))}
        {!filteredGames.length && (
          <div className={styles.notfound}>{translations.notfound}</div>
        )}
      </div>
    </>
  );
};

export default GameGallery;
