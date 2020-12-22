import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import getTranslations from "translations/gameCard";

import styles from "./GameCard.module.css";

interface Props {
  id: string;
  name: string;
  imgFile: string;
  shortDescription: string;
  gameType: string;
}

const GameCard: React.FC<Props> = ({
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
        <img className={styles.img} src={src} alt={`${name}-avatar`} />
        <div className={styles.textWrapper}>
          <Link href={`/${gameType}/${id}`}>
            <a href={`/${gameType}/${id}`} className={styles.title}>
              {name}
            </a>
          </Link>
          <div className={styles.description}>{shortDescription}</div>
          <Link href={`/${gameType}/${id}`}>
            <a href={`/${gameType}/${id}`} className={styles.link}>
              {translations.enterPage}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
