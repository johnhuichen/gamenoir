import { useMemo } from "react";
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";

import SearchBar from "./SearchBar";
import styles from "./Header.module.css";

const PAGES = {
  HOME: "home",
  DOSGAME: "dosgame",
  ARCADE: "arcade",
};

const Header: React.FC = () => {
  const { route } = useRouter();
  const currentPage = useMemo(() => {
    if (route === "/dosgame/[id]") {
      return PAGES.DOSGAME;
    }

    if (route === "/arcade/[id]") {
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
      <SearchBar />
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
        <Link href="/dosgame/pal-1995">
          <a
            href="/dosgame/pal-1995"
            className={cn(styles.link, {
              [styles.current]: currentPage === PAGES.DOSGAME,
            })}
          >
            Dos Demo
          </a>
        </Link>
        <Link href="/arcade/mvsc">
          <a
            href="/arcade/mvsc"
            className={cn(styles.link, {
              [styles.current]: currentPage === PAGES.ARCADE,
            })}
          >
            Arcade Demo
          </a>
        </Link>
        <i aria-hidden className={cn("fas fa-bars", styles.hamburger)} />
      </div>
    </div>
  );
};

export default Header;
