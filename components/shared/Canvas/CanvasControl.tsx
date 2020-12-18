import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";

import Modal from "components/shared/Modal";
import getTranslations from "translations/canvas";

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
  const { locale } = useRouter();
  const [showFAQ, setShowFAQ] = useState(false);

  const translations = useMemo(() => getTranslations(locale), [locale]);

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
            title={translations.fullScreenMode}
            className={styles.toggleBtn}
            onClick={handleFullScreen}
          >
            <i aria-hidden className="fas fa-expand" />
          </button>
          <button
            type="button"
            title={translations.theaterMode}
            className={styles.toggleBtn}
            onClick={handleExpand}
          >
            <i aria-hidden className="fa fa-window-maximize" />
          </button>
          <button
            type="button"
            title={translations.faq}
            className={styles.toggleBtn}
            onClick={handleOpenFAQ}
          >
            <i aria-hidden className="fas fa-info-circle" />
          </button>
        </>
      ) : (
        <button
          type="button"
          title={translations.normalMode}
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
