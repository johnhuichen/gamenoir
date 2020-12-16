import { useMemo, useState, useCallback } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

import { getDosGames, HomePageGame } from "lib/home";
import GameCard from "components/shared/GameCard";
import Search from "components/shared/Search";

import styles from "./index.module.css";

interface Props {
  games: HomePageGame[];
}

const Dosgame: React.FC<Props> = ({ games }: Props) => {
  const [filteredGames, setFilteredGames] = useState<HomePageGame[] | null>(
    null
  );
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

  return (
    <>
      <Head>
        <title>Gamenoir</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.announcement}>
          Do you know that you can save your progress and come back later?
          <br />
          <br />
          Your game progress will be saved in your browser, so as long as you
          don&apos;t clear browser data, your saved game will always be there
        </div>
        <Search
          handleChangeInput={handleChangeInput}
          handleClearSearch={handleClearSearch}
        />
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
            <div className={styles.noGames}>
              We haven&apos;t found anything that matches your search.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const games = getDosGames(locale as string);

  return { props: { games } };
};

export default Dosgame;
