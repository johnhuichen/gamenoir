import ResponsiveLayout from "components/shared/ResponsiveLayout";

import HeaderLarge from "./HeaderLarge";

const Header: React.FC = () => {
  return (
    <>
      <ResponsiveLayout screenSizes={["lg", "md"]}>
        <HeaderLarge />
      </ResponsiveLayout>
    </>
  );
};

export default Header;
