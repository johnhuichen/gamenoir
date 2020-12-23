import { useState, useCallback, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleUp,
  faAngleRight,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash/debounce";

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

  const simulateKeyHold = useMemo(
    () =>
      debounce((keyCode: number): void => {
        simulateKeyEvent(keyCode, true);
      }, 100),
    [simulateKeyEvent]
  );

  const simulateKeyRelease = useMemo(
    () =>
      debounce((keyCode: number): void => {
        simulateKeyEvent(keyCode, false);
      }, 100),
    [simulateKeyEvent]
  );

  const simulateKeyPress = useCallback(
    (keyCode: number): void => {
      simulateKeyHold(keyCode);
      setTimeout(() => simulateKeyRelease(keyCode), 200);
    },
    [simulateKeyHold, simulateKeyRelease]
  );

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
        onClick={() => simulateKeyPress(37)}
        onTouchStart={() => simulateKeyHold(37)}
        onTouchEnd={() => simulateKeyRelease(37)}
        onTouchCancel={() => simulateKeyRelease(37)}
        onContextMenu={e => e.preventDefault()}
        className={styles.left}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button
        onClick={() => simulateKeyPress(38)}
        onTouchStart={() => simulateKeyHold(38)}
        onTouchEnd={() => simulateKeyRelease(38)}
        onTouchCancel={() => simulateKeyRelease(38)}
        onContextMenu={e => e.preventDefault()}
        className={styles.up}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </button>
      <button
        onClick={() => simulateKeyPress(39)}
        onTouchStart={() => simulateKeyHold(39)}
        onTouchEnd={() => simulateKeyRelease(39)}
        onTouchCancel={() => simulateKeyRelease(39)}
        onContextMenu={e => e.preventDefault()}
        className={styles.right}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button
        onClick={() => simulateKeyPress(40)}
        onTouchStart={() => simulateKeyHold(40)}
        onTouchEnd={() => simulateKeyRelease(40)}
        onTouchCancel={() => simulateKeyRelease(40)}
        onContextMenu={e => e.preventDefault()}
        className={styles.down}
      >
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
      <button
        onClick={() => simulateKeyPress(27)}
        onTouchStart={() => simulateKeyHold(27)}
        onTouchEnd={() => simulateKeyRelease(27)}
        onTouchCancel={() => simulateKeyRelease(27)}
        onContextMenu={e => e.preventDefault()}
        className={styles.escape}
      >
        ESC
      </button>
      <button
        onClick={() => simulateKeyPress(13)}
        onTouchStart={() => simulateKeyHold(13)}
        onTouchEnd={() => simulateKeyRelease(13)}
        onTouchCancel={() => simulateKeyRelease(13)}
        onContextMenu={e => e.preventDefault()}
        className={styles.enter}
      >
        ENTER
      </button>
      <button
        onClick={() => simulateKeyPress(32)}
        onTouchStart={() => simulateKeyHold(32)}
        onTouchEnd={() => simulateKeyRelease(32)}
        onTouchCancel={() => simulateKeyRelease(32)}
        onContextMenu={e => e.preventDefault()}
        className={styles.space}
      >
        SPACE
      </button>
      <button
        onClick={() => simulateKeyPress(9)}
        onTouchStart={() => simulateKeyHold(9)}
        onTouchEnd={() => simulateKeyRelease(9)}
        onTouchCancel={() => simulateKeyRelease(9)}
        onContextMenu={e => e.preventDefault()}
        className={styles.tab}
      >
        TAB
      </button>
    </Portal>
  );
};

export default VirtualKeyboard;
