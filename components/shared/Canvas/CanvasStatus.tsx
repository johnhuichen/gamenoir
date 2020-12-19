import { useCallback, useMemo } from "react";

import styles from "./CanvasStatus.module.css";

interface Props {
  isLoading: boolean;
  isReady: boolean;
  start: () => void;
  loadedSize: string | undefined;
  totalSize: string | undefined;
  percentage: number | undefined;
}

const CanvasStatus: React.FC<Props> = ({
  isLoading,
  isReady,
  start,
  loadedSize,
  totalSize,
  percentage,
}: Props) => {
  const handleClick = useCallback(() => {
    if (!isReady && !isLoading) {
      start();
    }
  }, [start, isLoading, isReady]);
  const progressWidth = useMemo(() => `${percentage || 0}%`, [percentage]);

  if (isReady) {
    return null;
  }

  if (isLoading && totalSize) {
    return (
      <div className={styles.progressIndicator}>
        <div className={styles.progressDescription}>
          Downloading {loadedSize} of {totalSize}...
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressBarInner}
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    );
  }

  if (isLoading && !totalSize) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <button onClick={handleClick} className={styles.playButton} type="button">
      Press Start
    </button>
  );
};

export default CanvasStatus;
