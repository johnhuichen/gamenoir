import { createRef, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { getDosgameIds, getDosgameProps, DosgameProps } from "lib/dosgame";
import useDosbox from "hooks/useDosbox";
import Canvas, { CanvasElement } from "components/shared/Canvas";

import styles from "./[id].module.css";

interface FAQContentProps {
  locale: string;
}

const FAQContent: React.FC<FAQContentProps> = ({ locale }: FAQContentProps) => {
  if (locale === "en-US") {
    return (
      <div className={styles.faqContainer}>
        <div className={styles.faqQuestion}>Basic controls?</div>
        <div className={styles.faqAnswer}>coming soon</div>
      </div>
    );
  }

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqQuestion}>游戏的基本操作是？</div>
      <div className={styles.faqAnswer}>
        Dos游戏的操作大多以键盘为主，也有些游戏是可以使用鼠标的。能够使用鼠标的游戏直接把鼠标划入屏幕即可。
        <br />
        键盘操作一般使用方向键 (&larr; &uarr; &rarr; &darr;)
        移动角色，Enter和空格可以确认选择，ESC取消，返回或者跳出系统菜单。有时Tab,
        Shift, Ctrl, F1-F10等按键也有特殊用途。
        <br />
      </div>
      <div className={styles.faqQuestion}>进入游戏后让我输入密码怎么办？</div>
      <div className={styles.faqAnswer}></div>
      <div className={styles.faqQuestion}>我该怎样才能全屏游戏？</div>
      <div className={styles.faqAnswer}></div>
      <div className={styles.faqQuestion}>Q4</div>
      <div className={styles.faqAnswer}></div>
      <div className={styles.faqQuestion}>Q5</div>
      <div className={styles.faqAnswer}></div>
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
  const { locale } = useRouter();
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
        <title>{`${name} at GameNoir`}</title>
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
          faqContent={<FAQContent locale={locale as string} />}
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
