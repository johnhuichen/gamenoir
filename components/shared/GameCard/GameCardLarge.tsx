import Link from "next/link";

import styles from "./GameCardLarge.module.css";

interface Props {
  id: string;
  name: string;
  imgFile: string;
  shortDescription: string;
  gameType: string;
}

const GameCardLarge: React.FC<Props> = ({
  id,
  name,
  imgFile,
  shortDescription,
  gameType,
}: Props) => {
  const src = `${imgFile.substring(0, imgFile.lastIndexOf("/"))}/140.jpg`;
  return (
    <div className={styles.container}>
      <Link href={`/${gameType}/${id}`}>
        <a href={`/${gameType}/${id}`} className={styles.gameCard}>
          <img
            className={styles.gameCardImg}
            src={src}
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

export default GameCardLarge;
