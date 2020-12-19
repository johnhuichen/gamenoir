import ResponsiveLayout from "components/shared/ResponsiveLayout";

import GameCardLarge from "./GameCardLarge";
import GameCardSmall from "./GameCardSmall";

interface Props {
  id: string;
  name: string;
  imgFile: string;
  shortDescription: string;
  gameType: string;
}

const GameCard: React.FC<Props> = (props: Props) => {
  return (
    <>
      <ResponsiveLayout screenSizes={["lg", "md"]}>
        <GameCardLarge {...props} />
      </ResponsiveLayout>
      <ResponsiveLayout screenSizes={["xs", "sm"]}>
        <GameCardSmall {...props} />
      </ResponsiveLayout>
    </>
  );
};

export default GameCard;
