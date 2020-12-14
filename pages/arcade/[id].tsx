import { createRef, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

import { arcadeIds, getArcadeProps, ArcadeProps } from "lib/arcade";
import useMame from "hooks/useMame";

import Canvas, { CanvasElement } from "components/shared/Canvas";

import styles from "./[id].module.css";

const Arcade: React.FC<ArcadeProps> = ({
  name,
  gameFile,
  imgFile,
  descriptionHtml,
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
        />
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = arcadeIds.map(id => ({ params: { id } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const props = await getArcadeProps(params?.id as string);

  return { props };
};

export default Arcade;
