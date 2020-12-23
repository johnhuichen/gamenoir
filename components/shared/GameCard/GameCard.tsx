import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

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
  return (
    <div className={styles.container}>
      <div className={styles.gameCard}>
        <img className={styles.img} src={imgFile} alt={`${name}-avatar`} />
        <div className={styles.textWrapper}>
          <Link href={`/${gameType}/${id}`}>
            <a href={`/${gameType}/${id}`} className={styles.title}>
              {name}
            </a>
          </Link>
          <div className={styles.description}>{shortDescription}</div>
        </div>
        <Link href={`/${gameType}/${id}`}>
          <a href={`/${gameType}/${id}`} className={styles.link}>
            {translations.enterPage}
            <FontAwesomeIcon icon={faPowerOff} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
