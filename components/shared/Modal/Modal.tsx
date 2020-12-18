import { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

interface Props {
  children: React.ReactNode;
  handleCloseModal: () => void;
}

const Modal: React.FC<Props> = ({ children, handleCloseModal }: Props) => {
  const portalNode = document.createElement("div");
  const handleKeyDown = useCallback(
    e => {
      if (e.key === "Enter") {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    if (portalNode) {
      modalRoot?.appendChild(portalNode);
    }

    return () => {
      if (portalNode) {
        modalRoot?.removeChild(portalNode);
      }
    };
  }, [portalNode]);

  return portalNode
    ? ReactDOM.createPortal(
        <>
          <div
            className={styles.overlay}
            onClick={handleCloseModal}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          />
          <div className={styles.container}>
            <button onClick={handleCloseModal} className={styles.closeBtn}>
              <i aria-hidden className="fas fa-times" />
            </button>
            {children}
          </div>
        </>,
        portalNode
      )
    : null;
};

export default Modal;
