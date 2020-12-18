import { useState, useCallback } from "react";
import Modal from "components/shared/Modal";

import styles from "./CanvasControl.module.css";

interface Props {
  handleToggleExpand: () => void;
  isTheater: boolean;
  faqContent: React.FC;
  // handleToggleFullScreen: () => void;
  // isFullScreen: boolean;
}

interface FAQProps {
  faqContent: React.FC;
}

const FAQ: React.FC<FAQProps> = ({ faqContent }: FAQProps) => {
  return <>{faqContent}</>;
};

const CanvasControl: React.FC<Props> = ({
  handleToggleExpand,
  isTheater,
  faqContent,
}: // handleToggleFullScreen,
// isFullScreen,
Props) => {
  const [showFAQ, setShowFAQ] = useState(false);
  const handleOpenFAQ = useCallback(() => {
    setShowFAQ(true);
  }, []);
  const handleCloseFAQ = useCallback(() => {
    setShowFAQ(false);
  }, []);

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
      <button
        type="button"
        title="Theater Mode"
        className={styles.toggleBtn}
        onClick={handleOpenFAQ}
      >
        <i aria-hidden className="fas fa-info-circle" />
      </button>
      {showFAQ && (
        <Modal handleCloseModal={handleCloseFAQ}>
          <FAQ faqContent={faqContent} />
        </Modal>
      )}
    </div>
  );
};

export default CanvasControl;
