import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Portal from "components/shared/Portal";

import styles from "./Modal.module.css";

interface Props {
  children: React.ReactNode;
  handleCloseModal: () => void;
}

const Modal: React.FC<Props> = ({ children, handleCloseModal }: Props) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.key === "Enter") {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  return (
    <Portal>
      <div
        className={styles.overlay}
        onClick={handleCloseModal}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      />
      <div className={styles.container}>
        <button onClick={handleCloseModal} className={styles.closeBtn}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {children}
      </div>
    </Portal>
  );
};

export default Modal;
