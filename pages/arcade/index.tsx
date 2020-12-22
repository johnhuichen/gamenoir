import Head from "next/head";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { getArcadeGames, HomePageGame } from "lib/home";
import GameGallery from "components/shared/GameGallery";

import styles from "./index.module.css";

interface Props {
  games: HomePageGame[];
}

const ArcadeGame: React.FC<Props> = ({ games }: Props) => {
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>黑游 Game Noir</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <GameGallery games={games} locale={locale as string} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const games = getArcadeGames(locale as string).sort((a, b) =>
    a.name.localeCompare(b.name, "zh-CN")
  );

  return { props: { games } };
};

export default ArcadeGame;
