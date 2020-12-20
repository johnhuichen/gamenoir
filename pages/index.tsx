import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { getDosGames, getArcadeGames, HomePageGame } from "lib/home";
import Emoji from "components/shared/Emoji";
import GameGallery from "components/shared/GameGallery";

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
      2020年圣诞快乐! <Emoji symbol="🎉" label="Party Pooper" />{" "}
      <Emoji symbol="🎉" label="Party Pooper" />{" "}
      <Emoji symbol="🎅" label="Santa" />
      <br />
      <br />
      Gamenoir提供各种Dos和街机平台上的老游戏的在线试玩。你可以一口气穿越到90年代，体验那些脍炙人口的经典电脑游戏，也可以再一次和发小们重新拾起小时候玩过的那些红白机游戏。
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
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>黑游 Game Noir</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Annoucement />
        <GameGallery games={games} locale={locale as string} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const games = [
    ...getDosGames(locale as string),
    ...getArcadeGames(locale as string),
  ].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));

  return { props: { games } };
};

export default Home;
