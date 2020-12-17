import { useState, useMemo, useCallback } from "react";
import GameCard from "components/shared/GameCard";
import Search from "components/shared/Search";
import getTranslations from "translations/gameGallery";

import { HomePageGame } from "lib/home";

import styles from "./GameGallery.module.css";

interface Props {
  games: HomePageGame[];
  locale: string;
}

const GameGallery: React.FC<Props> = ({ games, locale }: Props) => {
  const [filteredGames, setFilteredGames] = useState<HomePageGame[] | null>(
    null
  );
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
    return filteredGames || games;
  }, [filteredGames, games]);
  console.log(translations.notfound);

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
    </>
  );
};

export default GameGallery;
