import { useMemo, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { faPhoenixFramework } from "@fortawesome/free-brands-svg-icons";
import cn from "classnames";

import useClickOutside from "hooks/useClickOutside";
import getTranslations from "translations/header";

import styles from "./HeaderSmall.module.css";

const PAGES = {
  HOME: "home",
  DOSGAME: "dosgame",
  ARCADE: "arcade",
};

const HeaderSmall: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { asPath, route, locale } = useRouter();

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

  const handleOpenMenu = useCallback(() => {
    setShowMenu(true);
  }, []);

  const handleClickOutside = useCallback(() => {
    setShowMenu(false);
  }, []);

  const { nodeRef } = useClickOutside({ handleClickOutside });

  useEffect(() => {
    setShowMenu(false);
  }, [asPath]);

  return (
    <>
      <div className={styles.container}>
        <button className={styles.hamburger} onClick={handleOpenMenu}>
          <FontAwesomeIcon icon={faHamburger} />
        </button>
        <Link href="/">
          <a href="/" className={styles.logo}>
            <FontAwesomeIcon icon={faPhoenixFramework} />
            {translations.brand}
          </a>
        </Link>
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

        {showMenu && (
          <div ref={nodeRef} className={styles.menu}>
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
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderSmall;
