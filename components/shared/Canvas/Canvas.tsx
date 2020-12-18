import { useState, createRef, useMemo, useCallback } from "react";
import cn from "classnames";

import CanvasControl from "./CanvasControl";
import CanvasStatus from "./CanvasStatus";

import styles from "./Canvas.module.css";

interface DivElement extends HTMLDivElement {
  exitFullscreen(): Promise<void>;
  mozRequestFullScreen(): Promise<void>;
  webkitRequestFullscreen(): Promise<void>;
  msRequestFullscreen(): Promise<void>;
}

export interface CanvasElement extends HTMLCanvasElement {
  exitFullscreen(): Promise<void>;
  mozRequestFullScreen(): Promise<void>;
  webkitRequestFullscreen(): Promise<void>;
  msRequestFullscreen(): Promise<void>;
}

interface Props {
  canvasRef: React.RefObject<CanvasElement>;
  name: string;
  imgFile: string;
  isLoading: boolean;
  isReady: boolean;
  start: () => void;
  loadedSize: string | undefined;
  totalSize: string | undefined;
  percentage: number | undefined;
  faqContent: React.ReactNode;
}

const DISPLAY_MODES = {
  NORMAL: "normal",
  THEATER: "theater",
  FULLSCREEN: "fullscreen",
};

const Canvas: React.FC<Props> = ({
  canvasRef,
  name,
  imgFile,
  isLoading,
  isReady,
  start,
  loadedSize,
  totalSize,
  percentage,
  faqContent,
}: Props) => {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODES.NORMAL);
  const canvasContainerRef = createRef<DivElement>();

  const isNormal = useMemo(() => displayMode === DISPLAY_MODES.NORMAL, [
    displayMode,
  ]);

  const handleExpand = useCallback(() => {
    if (document.fullscreen) {
      document.exitFullscreen();
    }
    setDisplayMode(DISPLAY_MODES.THEATER);
  }, []);

  const handleFullScreen = useCallback(() => {
    const elem = canvasContainerRef.current;
    if (elem?.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem?.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem?.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }

    setDisplayMode(DISPLAY_MODES.FULLSCREEN);
  }, [canvasContainerRef]);

  const handleReset = useCallback(() => {
    if (document.fullscreen) {
      document.exitFullscreen();
    }

    setDisplayMode(DISPLAY_MODES.NORMAL);
  }, []);

  // canvas id is needed because mame wasm hard coded it
  return (
    <div
      ref={canvasContainerRef}
      className={cn(
        { [styles.theater]: displayMode === DISPLAY_MODES.THEATER },
        styles.container
      )}
    >
      {isNormal && <div className={styles.canvasTitle}>{name}</div>}
      {!isReady && (
        <img className={styles.canvasImg} src={imgFile} alt="game background" />
      )}
      <canvas id="canvas" className={styles.canvas} ref={canvasRef} />
      <CanvasControl
        faqContent={faqContent}
        isNormal={isNormal}
        handleExpand={handleExpand}
        handleFullScreen={handleFullScreen}
        handleReset={handleReset}
      />
      <CanvasStatus
        isLoading={isLoading}
        isReady={isReady}
        start={start}
        loadedSize={loadedSize}
        totalSize={totalSize}
        percentage={percentage}
      />
    </div>
  );
};

export default Canvas;
