import { useMemo } from "react";
import { useRouter } from "next/router";

import getTranslations from "translations/footer";

import styles from "./Footer.module.css";

const EMAIL = "cliffgoslinginc@gmail.com";

const Footer: React.FC = () => {
  const { locale } = useRouter();
  const translations = useMemo(() => getTranslations(locale as string), [
    locale,
  ]);

  return (
    <div className={styles.container}>
      <a href={`mailto: ${EMAIL}`} className={styles.contactus}>
        {translations.contactus}
      </a>
      <div className={styles.copyright}>
        {`${translations.copyright} © ${new Date().getFullYear()} Game Noir`}
      </div>
    </div>
  );
};

export default Footer;
