import { useMemo } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import GameGallery from "components/shared/GameGallery";
import { gamesByLocale, HomePageGame } from "lib/home";

import styles from "./index.module.css";

interface Props {
  allGames: HomePageGame[];
}

const SearchPage: React.FC<Props> = ({ allGames }: Props) => {
  const { query } = useRouter();
  const games = useMemo(() => {
    const keywords = ((query.keywords || "") as string).toLowerCase();
    if (!keywords) {
      return [];
    }

    return allGames.filter(game => game.name.toLowerCase().includes(keywords));
  }, [allGames, query]);

  return (
    <div className={styles.container}>
      <GameGallery games={games} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const allGames = gamesByLocale[locale as string] || [];

  return { props: { allGames } };
};

export default SearchPage;
