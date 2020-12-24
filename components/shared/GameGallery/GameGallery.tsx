import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

import GameCard from "components/shared/GameCard";
import Search from "components/shared/Search";
import Pagination from "components/shared/Pagination";
import getTranslations from "translations/gameGallery";
import { HomePageGame } from "lib/home";

import styles from "./GameGallery.module.css";

interface Props {
  games: HomePageGame[];
  locale: string;
}

const PAGE_SIZE = 10;

const GameGallery: React.FC<Props> = ({ games, locale }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredGames, setFilteredGames] = useState<HomePageGame[] | null>(
    null
  );
  const { route } = useRouter();
  const maxPage = useMemo(() => Math.ceil(games.length / PAGE_SIZE), [
    games.length,
  ]);
  const translations = useMemo(() => getTranslations(locale), [locale]);
  const handleChangeInput = useCallback(
    value => {
      if (!value.trim()) {
        setFilteredGames(null);
      }

      const keyword = value.trim().toLowerCase();
      const result = games.filter(
        game =>
          game.name.toLowerCase().includes(keyword) ||
          game.shortDescription.toLowerCase().includes(keyword)
      );
      setFilteredGames(result);
    },
    [games]
  );

  const handleClearSearch = useCallback(() => {
    setFilteredGames(null);
  }, []);

  const gamesToDisplay = useMemo(() => {
    const totalGamesToDisplay = filteredGames || games;
    return totalGamesToDisplay.slice(
      PAGE_SIZE * (currentPage - 1),
      PAGE_SIZE * currentPage
    );
  }, [filteredGames, games, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [route]);

  return (
    <>
      <div className={styles.searchContainer}>
        <Search
          handleChangeInput={handleChangeInput}
          handleClearSearch={handleClearSearch}
        />
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
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default GameGallery;
