import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface Props {
  children: React.ReactNode;
}

const Portal: React.FC<Props> = ({ children }: Props) => {
  const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const newPortalNode = document.createElement("div");
    const modalRoot = document.getElementById("modal-root");
    modalRoot?.appendChild(newPortalNode);
    setPortalNode(newPortalNode);

    return () => {
      modalRoot?.removeChild(newPortalNode);
    };
  }, []);

  return portalNode ? ReactDOM.createPortal(children, portalNode) : null;
};

export default Portal;
