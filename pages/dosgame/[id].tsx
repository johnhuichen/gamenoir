import { createRef, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { getDosgameIds, getDosgameProps, DosgameProps } from "lib/dosgame";
import useDosbox from "hooks/useDosbox";
import Canvas, { CanvasElement } from "components/shared/Canvas";

import styles from "./[id].module.css";

const FAQContent: React.FC = () => {
  const { locale } = useRouter();

  if (locale === "en-US") {
    return (
      <div className={styles.faqContainer}>
        <div className={styles.faqQuestion}>What are the basic controls?</div>
        <div className={styles.faqAnswer}>
          Most dos games can be controlled with a keyboard, and some can be
          controlled with a mouse. If mouse control is enabled, you can just
          move mouse cursor into the game screen and click.
          <br />
          Moving: &larr; &uarr; &rarr; &darr;
          <br />
          Confirm: Enter or Space
          <br />
          Cancel/Back/Menu: Escape
          <br />
          Tab, Shift, Ctrl, F1-F10 can also be useful sometimes
          <br />
        </div>
        <br />
        <div className={styles.faqQuestion}>
          The game is asking me for password?
        </div>
        <div className={styles.faqAnswer}>
          If that happens, press random number or letter a couple of times to
          skip this part. For example, press A or 1 up to five times and hit
          enter.
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
        <div className={styles.faqQuestion}>Why is my saved game gone?</div>
        <div className={styles.faqAnswer}>
          Game data is saved in your browser&apos;s local storage. If you clear
          browser data or use a different browser, we cannot retrieve your saved
          game.
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
        Dos游戏的操作大多用键盘操作，也有些可以使用鼠标。如果是能够使用鼠标的游戏，直接把鼠标划入屏幕再单击即可。
        <br />
        移动: &larr; &uarr; &rarr; &darr;
        <br />
        确认: Enter和空格
        <br />
        取消/返回/系统菜单: ESC
        <br />
        有时Tab, Shift, Ctrl, F1-F10也有特殊用途
        <br />
      </div>
      <br />
      <div className={styles.faqQuestion}>进入游戏后需要输入密码？</div>
      <div className={styles.faqAnswer}>
        如果进入游戏后显示要输入密码，你可以按几次数字或者字母跳过。比如AAAA或者11111后确认。
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
      <div className={styles.faqQuestion}>我的存档怎么没了？</div>
      <div className={styles.faqAnswer}>
        游戏存档都被储存在当前使用的浏览器里。如果你不清空浏览器数据也不更换浏览器的话，就不会丢失存档哦。
      </div>
      <br />
      如果你对某款游戏有问题的话，直接和我们联系会更快得到解答哦{" "}
      <a href="mailto:cliffgoslinginc@gmail.com">cliffgoslinginc@gmail.com</a>
    </div>
  );
};

const Dosgame: React.FC<DosgameProps> = ({
  name,
  gameFile,
  imgFile,
}: DosgameProps) => {
  const canvasRef = createRef<CanvasElement>();
  const {
    startDosbox,
    stopDosbox,
    isDosboxLoading,
    isDosboxReady,
    loadedSize,
    totalSize,
    percentage,
  } = useDosbox({
    canvasRef,
    gameFile,
  });

  useEffect(() => {
    return () => {
      stopDosbox();
    };
  }, [stopDosbox]);

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
          isLoading={isDosboxLoading}
          isReady={isDosboxReady}
          start={startDosbox}
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
      getDosgameIds(locale).map(id => ({
        params: { id },
        locale,
      }))
    )
    .flat();

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const props = await getDosgameProps(params?.id as string, locale as string);

  return { props };
};

export default Dosgame;
