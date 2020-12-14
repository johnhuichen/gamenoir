import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";

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
  return (
    <>
      <Head>
        <title>Gamenoir</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        {games.map(game => (
          <GameCard
            key={`game-${game.id}`}
            id={game.id}
            name={game.name}
            imgFile={game.imgFile}
            shortDescription={game.shortDescription}
            gameType={game.gameType}
          />
        ))}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const games = getGames();

  return { props: { games } };
};

export default Home;
