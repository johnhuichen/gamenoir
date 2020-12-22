import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoenixFramework } from "@fortawesome/free-brands-svg-icons";
import cn from "classnames";

import getTranslations from "translations/header";

import styles from "./Header.module.css";

const HeaderLarge: React.FC = () => {
  const { route, locale } = useRouter();
  const translations = useMemo(() => getTranslations(locale as string), [
    locale,
  ]);

  const localeHref = useMemo(() => {
    if (/^\/dosgame/.test(route)) {
      return "/dosgame";
    }

    if (/^\/arcade/.test(route)) {
      return "/arcade";
    }

    return route;
  }, [route]);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <Link href="/">
          <a href="/" className={styles.logo}>
            <FontAwesomeIcon icon={faPhoenixFramework} />
            {translations.brand}
          </a>
        </Link>
      </div>
      <div className={styles.rightContainer}>
        <Link href={localeHref} locale={locale === "zh-CN" ? "en-US" : "zh-CN"}>
          <a href={localeHref} className={cn(styles.localeLink, {})}>
            <div
              className={cn({
                [styles.active]: locale === "zh-CN",
              })}
            >
              中
            </div>
            <div
              className={cn({
                [styles.active]: locale === "en-US",
              })}
            >
              En
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HeaderLarge;
