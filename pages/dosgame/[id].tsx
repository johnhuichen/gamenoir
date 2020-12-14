import { createRef, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

import { dosgameIds, getDosgameProps, DosgameProps } from "lib/dosgame";
import useDosbox from "hooks/useDosbox";

import Canvas, { CanvasElement } from "components/shared/Canvas";

import styles from "./[id].module.css";

const Dosgame: React.FC<DosgameProps> = ({
  name,
  gameFile,
  imgFile,
  descriptionHtml,
  commands,
}: DosgameProps) => {
  const canvasRef = createRef<CanvasElement>();
  const { startDosbox, stopDosbox, isDosboxLoading, isDosboxReady } = useDosbox(
    {
      canvasRef,
      gameFile,
      commands,
    }
  );

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
        />
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = dosgameIds.map(id => ({ params: { id } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const props = await getDosgameProps(params?.id as string);

  return { props };
};

export default Dosgame;
