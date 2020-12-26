import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import Search from "components/shared/Search";
import ResponsiveLayout from "components/shared/ResponsiveLayout";
import getTranslations from "translations/header";

import styles from "./Header.module.css";

const HeaderLarge: React.FC = () => {
  const { locale } = useRouter();
  const translations = useMemo(() => getTranslations(locale as string), [
    locale,
  ]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Link href="/">
            <a href="/" className={styles.logo}>
              <FontAwesomeIcon icon={faPowerOff} />
              {translations.brand}
            </a>
          </Link>
        </div>
        <div className={styles.rightContainer}>
          <ResponsiveLayout screenSizes={["lg", "md", "sm"]}>
            <>
              <div className={styles.spacer} />
              <Search />
              <div className={styles.spacer} />
            </>
          </ResponsiveLayout>
          <Link href={"/"} locale={locale === "zh-CN" ? "en-US" : "zh-CN"}>
            <a href={"/"} className={cn(styles.localeLink, {})}>
              <div
                className={cn({
                  [styles.active]: locale === "zh-CN",
                })}
              >
                中文
              </div>
              <div
                className={cn({
                  [styles.active]: locale === "en-US",
                })}
              >
                EN
              </div>
            </a>
          </Link>
        </div>
      </div>
      <ResponsiveLayout screenSizes={["xs"]}>
        <div className={styles.searchContainer}>
          <Search />
        </div>
      </ResponsiveLayout>
    </>
  );
};

export default HeaderLarge;
