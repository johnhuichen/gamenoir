import { useState, useCallback } from "react";
import Modal from "components/shared/Modal";

import styles from "./CanvasControl.module.css";

interface Props {
  isNormal: boolean;
  faqContent: React.ReactNode;
  handleFullScreen: () => void;
  handleExpand: () => void;
  handleReset: () => void;
}

interface FAQProps {
  faqContent: React.ReactNode;
}

const FAQ: React.FC<FAQProps> = ({ faqContent }: FAQProps) => {
  return <>{faqContent}</>;
};

const CanvasControl: React.FC<Props> = ({
  isNormal,
  faqContent,
  handleExpand,
  handleFullScreen,
  handleReset,
}: Props) => {
  const [showFAQ, setShowFAQ] = useState(false);
  const handleOpenFAQ = useCallback(() => {
    setShowFAQ(true);
  }, []);
  const handleCloseFAQ = useCallback(() => {
    setShowFAQ(false);
  }, []);

  return (
    <div className={styles.container}>
      {isNormal ? (
        <>
          <button
            type="button"
            title="Fullscreen Mode"
            className={styles.toggleBtn}
            onClick={handleFullScreen}
          >
            <i aria-hidden className="fas fa-expand" />
          </button>
          <button
            type="button"
            title="Theater Mode"
            className={styles.toggleBtn}
            onClick={handleExpand}
          >
            <i aria-hidden className="fa fa-window-maximize" />
          </button>
          <button
            type="button"
            title="FAQ"
            className={styles.toggleBtn}
            onClick={handleOpenFAQ}
          >
            <i aria-hidden className="fas fa-info-circle" />
          </button>
        </>
      ) : (
        <button
          type="button"
          title="Theater Mode"
          className={styles.toggleBtn}
          onClick={handleReset}
        >
          <i aria-hidden className="fa fa-window-minimize" />
        </button>
      )}
      {showFAQ && (
        <Modal handleCloseModal={handleCloseFAQ}>
          <FAQ faqContent={faqContent} />
        </Modal>
      )}
    </div>
  );
};

export default CanvasControl;
