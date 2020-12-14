import { useCallback } from "react";

import styles from "./CanvasStatus.module.css";

interface Props {
  isLoading: boolean;
  isReady: boolean;
  start: () => void;
}

const CanvasStatus: React.FC<Props> = ({
  isLoading,
  isReady,
  start,
}: Props) => {
  const handleClick = useCallback(() => {
    if (!isReady && !isLoading) {
      start();
    }
  }, [start, isLoading, isReady]);

  if (isReady) {
    return null;
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <button onClick={handleClick} className={styles.playButton} type="button">
      <i aria-hidden className="fas fa-play" /> Play
    </button>
  );
};

export default CanvasStatus;
