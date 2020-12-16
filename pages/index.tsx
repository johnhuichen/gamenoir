import { useMemo, useState, useCallback } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { getDosGames, getArcadeGames, HomePageGame } from "lib/home";
import GameCard from "components/shared/GameCard";
import Emoji from "components/shared/Emoji";
import Search from "components/shared/Search";

import styles from "./index.module.css";

interface Props {
  games: HomePageGame[];
}

const Annoucement: React.FC = () => {
  const { locale } = useRouter();

  if (locale === "en-US") {
    return (
      <div className={styles.announcement}>
        Merry Christmas everyone! <Emoji symbol="🎉" label="Party Pooper" />{" "}
        <Emoji symbol="🎉" label="Party Pooper" /> <br />
        <br />
        Here you can play hundreds of classic games that you loved since
        childhood. All our games have been tested by us, we promise they are
        fun.
        <br />
        <br />
        If you find a problem or want to make a special game request, just shoot
        us a message (
        <a href="mailto:cliffgoslinginc@gmail.com">cliffgoslinginc@gmail.com</a>
        ). We will see what we can do <Emoji symbol="😊" label="Smiley" />
        <Emoji symbol="😊" label="Smiley" />
      </div>
    );
  }

  return (
    <div className={styles.announcement}>
      大家2020年圣诞快乐! <Emoji symbol="🎉" label="Party Pooper" />{" "}
      <Emoji symbol="🎉" label="Party Pooper" />{" "}
      <Emoji symbol="🎅" label="Santa" />
      <br />
      <br />
      我们在Gamenoir提供各种Dos和街机平台上的老游戏的在线试玩。你可以一口气穿越到90年代，体验那些脍炙人口的经典电脑游戏，也可以再一次感受到和发小们一起玩红白机的快感。
      <br />
      <br />
      如果你在游戏过程中遇到什么疑难困惑，或者你有一款非常想玩的老游戏，你可以直接给我们发邮件(
      <a href="mailto:cliffgoslinginc@gmail.com">cliffgoslinginc@gmail.com</a>
      ). 我们一定会尽力帮你实现你的愿望 <Emoji
        symbol="😊"
        label="Smiley"
      />{" "}
      <Emoji symbol="😊" label="Smiley" /> <Emoji symbol="🎅" label="Santa" />
    </div>
  );
};

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
        <Annoucement />
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
  const games = [
    ...getDosGames(locale as string),
    ...getArcadeGames(locale as string),
  ];

  return { props: { games } };
};

export default Home;
