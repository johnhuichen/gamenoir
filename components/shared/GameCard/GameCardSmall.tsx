import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import getTranslations from "translations/gameCard";

import styles from "./GameCardSmall.module.css";

interface Props {
  id: string;
  name: string;
  imgFile: string;
  shortDescription: string;
  gameType: string;
}

const GameCardSmall: React.FC<Props> = ({
  id,
  name,
  imgFile,
  shortDescription,
  gameType,
}: Props) => {
  const { locale } = useRouter();
  const translations = useMemo(() => getTranslations(locale as string), [
    locale,
  ]);
  const src = `${imgFile.substring(0, imgFile.lastIndexOf("/"))}/140.jpg`;

  return (
    <div className={styles.container}>
      <div className={styles.gameCard}>
        <img className={styles.gameCardImg} src={src} alt={`${name}-avatar`} />
        <div className={styles.gameCardText}>
          <div className={styles.gameCardTitle}>{name}</div>
          <Link href={`/${gameType}/${id}`}>
            <a href={`/${gameType}/${id}`} className={styles.link}>
              {translations.enterPage}
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.gameCardDescription}>{shortDescription}</div>
    </div>
  );
};

export default GameCardSmall;
