import { createRef, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { getArcadeGameIds, getArcadeProps, ArcadeProps } from "lib/arcade";
import useMame from "hooks/useMame";

import Canvas, { CanvasElement } from "components/shared/Canvas";
import styles from "./[id].module.css";

const FAQContent: React.FC = () => {
  const { locale } = useRouter();

  if (locale === "en-US") {
    return (
      <div className={styles.faqContainer}>
        <div className={styles.faqQuestion}>What are the basic controls?</div>
        <div className={styles.faqAnswer}>
          Press num 5 to insert a coin, press 1 to start a game quickly. Player
          1 main controls are
          <br />
          Moving: &larr; &uarr; &rarr; &darr;
          <br />
          Action: Left Ctrl, Left Alt, space, Left Shift, Z, X, C, V
          <br />
          You can customize the keys by pressing Tab in game, and then choose
          Input(general) to update control for each player
          <br />
        </div>
        <br />
        <div className={styles.faqQuestion}>
          Hitting the Escape key exists full screen, but I want to play in full
          screen and use Escape?
        </div>
        <div className={styles.faqAnswer}>
          The Escape key is the default key to exit full screen mode. If you
          want to use play in full screen and use Escape, use Theater mode and
          then use your browser&apos;s own full screen mode (for example
          Chrome&apos;s default key to toggle full screen is F11).
        </div>
        <br />
        <div className={styles.faqQuestion}>
          Can I save game or game control?
        </div>
        <div className={styles.faqAnswer}>
          Unfortunately arcade game does not support saving game or control at
          the moment.
        </div>
        <br />
        If you have any other questions, just ask us!{" "}
        <a href="mailto:cliffgoslinginc@gmail.com">cliffgoslinginc@gmail.com</a>
      </div>
    );
  }

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqQuestion}>游戏的基本操作是？</div>
      <div className={styles.faqAnswer}>
        按数字5投币, 数字1可以快速开始游戏。P1玩家的操作是
        <br />
        移动: &larr; &uarr; &rarr; &darr;
        <br />
        街机按钮: 左Ctrl, 左Alt, 空格, 左Shift, Z, X, C, V
        <br />
        所有按键都可以自己定义。在游戏中按Tab, 选择Input(general), Player 1
        Controls 为P1玩家按键。
        <br />
      </div>
      <br />
      <div className={styles.faqQuestion}>
        全屏后按了ESC键后会跳出全屏怎么破？
      </div>
      <div className={styles.faqAnswer}>
        ESC键是你浏览器默认的退出按键，如果想全屏游戏，建议宽屏后使用浏览器的全屏功能
        （比如Chrome可以使用F11切换全屏，和大多数游戏的操作不冲突）。
      </div>
      <br />
      <div className={styles.faqQuestion}>街机游戏可以存档吗？</div>
      <div className={styles.faqAnswer}>街机游戏暂时不支持存档功能。</div>
      <br />
      如果你对某款游戏有问题的话，直接和我们联系会更快得到解答哦{" "}
      <a href="mailto:cliffgoslinginc@gmail.com">cliffgoslinginc@gmail.com</a>
    </div>
  );
};

const Arcade: React.FC<ArcadeProps> = ({
  name,
  gameFile,
  imgFile,
}: ArcadeProps) => {
  const canvasRef = createRef<CanvasElement>();
  const {
    startMame,
    stopMame,
    isMameLoading,
    isMameReady,
    loadedSize,
    totalSize,
    percentage,
  } = useMame({
    canvasRef,
    gameFile,
  });

  useEffect(() => {
    return () => {
      stopMame();
    };
  }, [stopMame]);

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <Canvas
          canvasRef={canvasRef}
          name={name}
          imgFile={imgFile}
          isLoading={isMameLoading}
          isReady={isMameReady}
          start={startMame}
          loadedSize={loadedSize}
          totalSize={totalSize}
          percentage={percentage}
          faqContent={<FAQContent />}
        />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = (locales || [])
    .map(locale =>
      getArcadeGameIds(locale).map(id => ({
        params: { id },
        locale,
      }))
    )
    .flat();

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const props = await getArcadeProps(params?.id as string, locale as string);

  return { props };
};

export default Arcade;
