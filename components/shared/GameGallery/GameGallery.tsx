import { useMemo } from "react";
import { useRouter } from "next/router";

import GameCard from "components/shared/GameCard";

import getTranslations from "translations/gameGallery";
import { HomePageGame } from "lib/home";

import styles from "./GameGallery.module.css";

interface Props {
  games: HomePageGame[];
  genres: string[];
}

const GameGallery: React.FC<Props> = ({ games }: Props) => {
  const { locale } = useRouter();
  const translations = useMemo(() => getTranslations(locale as string), [
    locale,
  ]);

  return (
    <div className={styles.gameContianer}>
      {!!games.length &&
        games.map(game => (
          <GameCard
            key={`game-${game.id}`}
            id={game.id}
            name={game.name}
            imgFile={game.imgFile}
            shortDescription={game.shortDescription}
            gameType={game.gameType}
          />
        ))}
      {!games.length && (
        <div className={styles.notfound}>{translations.notfound}</div>
      )}
    </div>
  );
};

export default GameGallery;
