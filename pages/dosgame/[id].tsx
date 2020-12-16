import { createRef, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

import { getDosgameIds, getDosgameProps, DosgameProps } from "lib/dosgame";
import useDosbox from "hooks/useDosbox";

import Canvas, { CanvasElement } from "components/shared/Canvas";

import styles from "./[id].module.css";

const Dosgame: React.FC<DosgameProps> = ({
  name,
  gameFile,
  imgFile,
  descriptionHtml,
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
        />
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
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
