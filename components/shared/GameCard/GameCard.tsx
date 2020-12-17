import Link from "next/link";

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
  return (
    <div className={styles.container}>
      <Link href={`/${gameType}/${id}`}>
        <a href={`/${gameType}/${id}`} className={styles.gameCard}>
          <img
            className={styles.gameCardImg}
            src={`${imgFile.replace(/.jpg$/, "-140.jpg")}`}
            alt={`${name}-avatar`}
          />
          <div className={styles.gameCardText}>
            <div className={styles.gameCardTitle}>{name}</div>
            <div className={styles.gameCardDescription}>{shortDescription}</div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default GameCard;
