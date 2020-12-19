import styles from "./Overlay.module.css";

interface Props {
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  handleClick: () => void;
}

const Overlay: React.FC<Props> = ({ handleKeyDown, handleClick }: Props) => {
  return (
    <div
      className={styles.overlay}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    />
  );
};

export default Overlay;
