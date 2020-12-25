import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import uniq from "lodash/uniq";

import { getDosGames, getArcadeGames, HomePageGame } from "lib/home";
import Emoji from "components/shared/Emoji";
import GameGallery from "components/shared/GameGallery";

import styles from "./index.module.css";

interface Props {
  games: HomePageGame[];
  genres: string[];
}

const Annoucement: React.FC = () => {
  const { locale } = useRouter();

  if (locale === "en-US") {
    return (
      <div className={styles.announcement}>
        Merry Christmas! <Emoji symbol="🎉" label="Party Pooper" />{" "}
        <Emoji symbol="🎉" label="Party Pooper" /> <br />
        <br />
        You can play dos and arcade games at Game Noir. We We make sure
        everything just works, but if you do find a problem, just send us an
        email (
        <a href="mailto:cliffgoslinginc@gmail.com">cliffgoslinginc@gmail.com</a>
        ).
      </div>
    );
  }

  return (
    <div className={styles.announcement}>
      圣诞快乐! <Emoji symbol="🎉" label="Party Pooper" />{" "}
      <Emoji symbol="🎉" label="Party Pooper" />
      <br />
      <br />
      Dos和街机老游戏在线试玩,每款游戏都经过我们测试，确保运行良好。
      <br />
      友情提示：在电脑上玩游戏的效果要比手机上更好。
      <br />
      <br />
      如果你在游戏过程中遇到什么疑难困惑，或者你有一款非常想玩的老游戏，你可以直接给我们发邮件(
      <a href="mailto:cliffgoslinginc@gmail.com">cliffgoslinginc@gmail.com</a>)
    </div>
  );
};

const Home: React.FC<Props> = ({ games, genres }: Props) => {
  return (
    <>
      <Head>
        <title>墨黑网页游戏 Game Noir</title>
        <meta name="description" content="网页重现经典Dos和街机老游戏" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Annoucement />
        <GameGallery games={games} genres={genres} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const games = [
    ...getDosGames(locale as string),
    ...getArcadeGames(locale as string),
  ].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
  const genres = uniq(games.map(game => game.genre));

  return { props: { games, genres } };
};

export default Home;
