import { useState } from "react";
import Link from "next/link";

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
  const [showDescription, setShowDescription] = useState(false);
  const src = `${imgFile.substring(0, imgFile.lastIndexOf("/"))}/140.jpg`;

  return (
    <div className={styles.container}>
      <Link href={`/${gameType}/${id}`}>
        <a href={`/${gameType}/${id}`} className={styles.gameCard}>
          <div className={styles.gameCardTitle}>{name}</div>
          <img
            className={styles.gameCardImg}
            src={src}
            alt={`${name}-avatar`}
          />
        </a>
      </Link>
      {showDescription && (
        <div className={styles.gameCardDescription}>{shortDescription}</div>
      )}
    </div>
  );
};

export default GameCardSmall;
