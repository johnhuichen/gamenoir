import { useCallback, useMemo } from "react";

import styles from "./CanvasStatus.module.css";

interface Props {
  isLoading: boolean;
  isReady: boolean;
  start: () => void;
  loadedSize: string;
  totalSize: string;
  percentage: number;
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
  const progressWidth = useMemo(() => `${percentage}%`, [percentage]);

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
            styles={{ width: progressWidth }}
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
      <i aria-hidden className="fas fa-play" /> Play
    </button>
  );
};

export default CanvasStatus;
