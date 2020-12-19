import ResponsiveLayout from "components/shared/ResponsiveLayout";

import HeaderLarge from "./HeaderLarge";
import HeaderSmall from "./HeaderSmall";

const Header: React.FC = () => {
  return (
    <>
      <ResponsiveLayout screenSizes={["lg", "md"]}>
        <HeaderLarge />
      </ResponsiveLayout>
      <ResponsiveLayout screenSizes={["xs", "sm"]}>
        <HeaderSmall />
      </ResponsiveLayout>
    </>
  );
};

export default Header;
