import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";

import getTranslations from "translations/header";

import styles from "./Header.module.css";

const PAGES = {
  HOME: "home",
  DOSGAME: "dosgame",
  ARCADE: "arcade",
};

const Header: React.FC = () => {
  const { route, locale } = useRouter();
  const translations = useMemo(() => getTranslations(locale as string), [
    locale,
  ]);

  const activePage = useMemo(() => {
    if (/^\/dosgame/.test(route)) {
      return PAGES.DOSGAME;
    }

    if (/^\/arcade/.test(route)) {
      return PAGES.ARCADE;
    }

    return PAGES.HOME;
  }, [route]);

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
            <i aria-hidden className="fab fa-phoenix-framework" />
            Game Noir
          </a>
        </Link>
      </div>
      <div className={styles.rightContainer}>
        <Link href="/">
          <a
            href="/"
            className={cn(styles.link, {
              [styles.active]: activePage === PAGES.HOME,
            })}
          >
            {translations.home}
          </a>
        </Link>
        <Link href="/dosgame">
          <a
            href="/dosgame"
            className={cn(styles.link, {
              [styles.active]: activePage === PAGES.DOSGAME,
            })}
          >
            {translations.dosGames}
          </a>
        </Link>
        <Link href="/arcade">
          <a
            href="/arcade"
            className={cn(styles.link, {
              [styles.active]: activePage === PAGES.ARCADE,
            })}
          >
            {translations.arcadeGames}
          </a>
        </Link>

        <div>
          <Link href={localeHref} locale="zh-CN">
            <a
              href={localeHref}
              className={cn(styles.localeLink, {
                [styles.active]: locale === "zh-CN",
              })}
            >
              中
            </a>
          </Link>
          <span className={styles.localeSeparator}>/</span>
          <Link href={localeHref} locale="en-US">
            <a
              href={localeHref}
              className={cn(styles.localeLink, {
                [styles.active]: locale === "en-US",
              })}
            >
              EN
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
