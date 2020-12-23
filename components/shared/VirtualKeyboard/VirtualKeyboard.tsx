import { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleUp,
  faAngleRight,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

import { CanvasElement } from "components/shared/Canvas";
import Portal from "components/shared/Portal";

import styles from "./VirtualKeyboard.module.css";

interface Props {
  canvasRef: React.RefObject<CanvasElement>;
}

const VirtualKeyboard: React.FC<Props> = ({ canvasRef }: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const simulateKeyEvent = useCallback(
    (keyCode: number, pressed: boolean): void => {
      const name = pressed ? "keydown" : "keyup";
      const event = document.createEvent("KeyboardEvent") as any;
      const getter: any = {
        get() {
          return this.keyCodeVal;
        },
      };

      Object.defineProperty(event, "keyCode", getter);
      Object.defineProperty(event, "which", getter);
      Object.defineProperty(event, "charCode", getter);

      event.initKeyboardEvent
        ? event.initKeyboardEvent(
            name,
            true,
            true,
            document.defaultView,
            false,
            false,
            false,
            false,
            keyCode,
            keyCode
          )
        : event.initKeyEvent(
            name,
            true,
            true,
            document.defaultView,
            false,
            false,
            false,
            false,
            keyCode,
            0
          );

      event.keyCodeVal = keyCode;
      canvasRef.current?.dispatchEvent(event);
    },
    [canvasRef]
  );

  function simulateKeyPress(keyCode: number): void {
    simulateKeyEvent(keyCode, true);
    setTimeout(() => simulateKeyEvent(keyCode, false), 100);
  }

  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  if (!isMobile) {
    return null;
  }
  return (
    <Portal>
      <button
        onClick={e => {
          simulateKeyPress(37);
        }}
        onMouseDown={() => console.log("onKeyDown")}
        onContextMenu={e => e.preventDefault()}
        className={styles.left}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button onClick={() => simulateKeyPress(38)} className={styles.up}>
        <FontAwesomeIcon icon={faAngleUp} />
      </button>
      <button onClick={() => simulateKeyPress(39)} className={styles.right}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button onClick={() => simulateKeyPress(40)} className={styles.down}>
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
      <button onClick={() => simulateKeyPress(27)} className={styles.escape}>
        ESC
      </button>
      <button onClick={() => simulateKeyPress(13)} className={styles.enter}>
        ENTER
      </button>
      <button onClick={() => simulateKeyPress(32)} className={styles.space}>
        SPACE
      </button>
    </Portal>
  );
};

export default VirtualKeyboard;
