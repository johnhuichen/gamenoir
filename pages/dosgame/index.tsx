import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { getDosGames, HomePageGame } from "lib/home";
import GameGallery from "components/shared/GameGallery";

import styles from "./index.module.css";

interface Props {
  games: HomePageGame[];
}

const Dosgame: React.FC<Props> = ({ games }: Props) => {
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>Gamenoir</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <GameGallery games={games} locale={locale as string} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const games = getDosGames(locale as string).sort((a, b) =>
    a.name.localeCompare(b.name, "zh-CN")
  );

  return { props: { games } };
};

export default Dosgame;
