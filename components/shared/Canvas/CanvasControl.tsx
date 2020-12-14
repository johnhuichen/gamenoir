import styles from "./CanvasControl.module.css";

interface Props {
  handleToggleExpand: () => void;
  handleToggleFullScreen: () => void;
  isTheater: boolean;
  isFullScreen: boolean;
}

const CanvasControl: React.FC<Props> = ({
  handleToggleExpand,
  handleToggleFullScreen,
  isTheater,
  isFullScreen,
}: Props) => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        title="Full Screen"
        className={styles.toggleBtn}
        onClick={handleToggleFullScreen}
      >
        {isFullScreen ? (
          <i aria-hidden className="fas fa-compress-arrows-alt" />
        ) : (
          <i aria-hidden className="fas fa-expand-arrows-alt" />
        )}
      </button>
      <button
        type="button"
        title="Theater Mode"
        className={styles.toggleBtn}
        onClick={handleToggleExpand}
      >
        {isTheater ? (
          <i aria-hidden className="far fa-window-maximize" />
        ) : (
          <i aria-hidden className="fas fa-window-maximize" />
        )}
      </button>
    </div>
  );
};

export default CanvasControl;
