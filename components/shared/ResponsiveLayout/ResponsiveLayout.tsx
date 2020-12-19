import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

interface Props {
  children: React.ReactElement;
  screenSizes: string[];
}

const queries: { [key: string]: string } = {
  xs: "(max-width: 320px)",
  sm: "(min-width: 321px) and (max-width: 720px)",
  md: "(min-width: 721px) and (max-width: 1024px)",
  lg: "(min-width: 1400px)",
};

const ResponsiveLayout: React.FC<Props> = ({
  children,
  screenSizes,
}: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const updateShow = debounce(() => {
      const shouldShow = screenSizes.some(
        size => window.matchMedia(queries[size]).matches
      );
      setShow(shouldShow);
    }, 300);

    window.addEventListener("resize", updateShow);

    return () => {
      window.removeEventListener("resize", updateShow);
    };
  }, [screenSizes]);

  return show ? children : null;
};

export default ResponsiveLayout;
