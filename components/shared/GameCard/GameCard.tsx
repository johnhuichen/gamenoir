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
      <ResponsiveLayout screenSizes={["lg", "md", "xs", "sm"]}>
        <GameCardLarge {...props} />
      </ResponsiveLayout>
      <ResponsiveLayout screenSizes={[]}>
        <GameCardSmall {...props} />
      </ResponsiveLayout>
    </>
  );
};

export default GameCard;
