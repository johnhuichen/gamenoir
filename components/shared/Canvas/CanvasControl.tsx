import styles from "./CanvasControl.module.css";

interface Props {
  handleToggleExpand: () => void;
  // handleToggleFullScreen: () => void;
  isTheater: boolean;
  // isFullScreen: boolean;
}

const CanvasControl: React.FC<Props> = ({
  handleToggleExpand,
  // handleToggleFullScreen,
  isTheater,
}: // isFullScreen,
Props) => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        title="Theater Mode"
        className={styles.toggleBtn}
        onClick={handleToggleExpand}
      >
        {isTheater ? (
          <i aria-hidden className="fa fa-window-minimize" />
        ) : (
          <i aria-hidden className="fa fa-window-maximize" />
        )}
      </button>
    </div>
  );
};

export default CanvasControl;
