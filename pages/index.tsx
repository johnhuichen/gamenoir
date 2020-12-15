import { useMemo, useState, useCallback } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

import { dosgames, arcadeGames, HomePageGame } from "lib/home";
import GameCard from "components/shared/GameCard";
import Emoji from "components/shared/Emoji";
import Search from "components/shared/Search";

import styles from "./index.module.css";

interface Props {
  games: HomePageGame[];
}

const Home: React.FC<Props> = ({ games }: Props) => {
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
          Merry Christmas everyone! <Emoji symbol="🎉" label="Party Pooper" />{" "}
          <Emoji symbol="🎉" label="Party Pooper" />
          <Emoji symbol="🎅" label="Santa" />
          <br />
          <br />
          Here you can play hundreds of classic games that you loved since
          childhood. All our games have been tested by us, we promise they are
          fun.
          <br />
          <br />
          If you find a problem or want to make a special game request, just
          shoot us a message (
          <a href="mailto:cliffgoslinginc@gmail.com">
            cliffgoslinginc@gmail.com
          </a>
          ). We will see what we can do <Emoji symbol="😊" label="Smiley" />
          <Emoji symbol="😊" label="Smiley" />
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

export const getStaticProps: GetStaticProps = async () => {
  const games = [...dosgames, ...arcadeGames];

  return { props: { games } };
};

export default Home;
