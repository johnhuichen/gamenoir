import { useMemo } from "react";
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";

import styles from "./Header.module.css";

const PAGES = {
  HOME: "home",
  DOSGAME: "dosgame",
  ARCADE: "arcade",
};

const Header: React.FC = () => {
  const { route } = useRouter();
  const currentPage = useMemo(() => {
    if (/^\/dosgame/.test(route)) {
      return PAGES.DOSGAME;
    }

    if (/^\/arcade/.test(route)) {
      return PAGES.ARCADE;
    }

    return PAGES.HOME;
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
              [styles.current]: currentPage === PAGES.HOME,
            })}
          >
            Home
          </a>
        </Link>
        <Link href="/dosgame">
          <a
            href="/dosgame"
            className={cn(styles.link, {
              [styles.current]: currentPage === PAGES.DOSGAME,
            })}
          >
            Dos Games
          </a>
        </Link>
        <Link href="/arcade">
          <a
            href="/arcade"
            className={cn(styles.link, {
              [styles.current]: currentPage === PAGES.ARCADE,
            })}
          >
            Arcade Games
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
