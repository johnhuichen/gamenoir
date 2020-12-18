import { createRef, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

import { getArcadeGameIds, getArcadeProps, ArcadeProps } from "lib/arcade";
import useMame from "hooks/useMame";

import Canvas from "components/shared/Canvas";
import styles from "./[id].module.css";

const FAQContent: React.FC = () => {
  return <div>Mock FAQ</div>;
};

const Arcade: React.FC<ArcadeProps> = ({
  name,
  gameFile,
  imgFile,
}: ArcadeProps) => {
  const canvasRef = createRef<HTMLCanvasElement>();
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
        <title>{`${name} at GameNoir`}</title>
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
