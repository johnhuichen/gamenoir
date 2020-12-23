import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faExpand,
  faWindowMaximize,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";

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

  const translations = useMemo(() => getTranslations(locale as string), [
    locale,
  ]);

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
            title={translations.faq}
            className={styles.toggleBtn}
            onClick={handleOpenFAQ}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
          <button
            type="button"
            title={translations.theaterMode}
            className={styles.toggleBtn}
            onClick={handleExpand}
          >
            <FontAwesomeIcon icon={faWindowMaximize} />
          </button>
          <button
            type="button"
            title={translations.fullScreenMode}
            className={styles.toggleBtn}
            onClick={handleFullScreen}
          >
            <FontAwesomeIcon icon={faExpand} />
          </button>
        </>
      ) : (
        <button
          type="button"
          title={translations.normalMode}
          className={styles.toggleBtn}
          onClick={handleReset}
        >
          <FontAwesomeIcon icon={faWindowMinimize} />
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
