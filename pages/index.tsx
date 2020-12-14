import { createRef, useMemo, useState, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import cn from "classnames";
import debounce from "lodash/debounce";

import { getGames, HomePageGame } from "lib/home";

import styles from "./index.module.css";

interface Props {
  games: HomePageGame[];
}

const GameCard: React.FC<HomePageGame> = ({
  id,
  name,
  imgFile,
  shortDescription,
  gameType,
}: HomePageGame) => {
  return (
    <Link href={`/${gameType}/${id}`}>
      <a href={`/${gameType}/${id}`} className={styles.gameCard}>
        <img
          className={styles.gameCardImg}
          src={imgFile}
          alt={`${name}-avatar`}
        />
        <div className={styles.gameCardText}>
          <div className={styles.gameCardTitle}> {name}</div>
          <div className={styles.gameCardDescription}> {shortDescription}</div>
        </div>
      </a>
    </Link>
  );
};

const Home: React.FC<Props> = ({ games }: Props) => {
  const inputRef = createRef<HTMLInputElement>();
  const [filteredGames, setFilteredGames] = useState<HomePageGame[] | null>(
    null
  );
  const handleChangeInput = useMemo(
    () =>
      debounce(async (e: { target: HTMLInputElement }) => {
        console.log("here?");
        const { value } = e.target;

        if (!value.trim()) {
          setFilteredGames(null);
        }

        const keyword = value.trim().toLowerCase();
        const result = games.filter(game =>
          game.name.toLowerCase().includes(keyword)
        );
        setFilteredGames(result);
      }, 300),
    [games]
  );
  const handleClearSearch = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setFilteredGames(null);
    }
  }, [inputRef]);

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
        <div className={styles.searchContainer}>
          <i aria-hidden className={cn("fas fa-search", styles.searchIcon)} />
          <input
            ref={inputRef}
            className={styles.searchInput}
            placeholder="Try searching for the games"
            onChange={handleChangeInput}
          />
          <button onClick={handleClearSearch}>
            <i aria-hidden className="fas fa-times" />
          </button>
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
  const games = getGames();

  return { props: { games } };
};

export default Home;
