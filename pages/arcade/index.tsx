import { useMemo, useState, useCallback } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { getArcadeGames, HomePageGame } from "lib/home";
import GameCard from "components/shared/GameCard";
import Search from "components/shared/Search";
import getTranslations from "translations/arcade";

import styles from "./index.module.css";

interface Props {
  games: HomePageGame[];
}

const ArcadeGame: React.FC<Props> = ({ games }: Props) => {
  const { locale } = useRouter();
  const translations = useMemo(() => getTranslations(locale as string), [
    locale,
  ]);

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
            <div className={styles.notfound}>{translations.notfound}</div>
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const games = getArcadeGames(locale as string);

  return { props: { games } };
};

export default ArcadeGame;
