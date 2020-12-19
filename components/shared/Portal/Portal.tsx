import { useEffect } from "react";
import ReactDOM from "react-dom";

interface Props {
  children: React.ReactNode;
}

const Portal: React.FC<Props> = ({ children }: Props) => {
  const portalNode = document.createElement("div");

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    modalRoot?.appendChild(portalNode);

    return () => {
      modalRoot?.removeChild(portalNode);
    };
  }, [portalNode]);

  return ReactDOM.createPortal(children, portalNode);
};

export default Portal;
