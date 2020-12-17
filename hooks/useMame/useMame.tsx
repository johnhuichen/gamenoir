import { useReducer, useCallback } from "react";
import * as BrowserFS from "browserfs";

import { noop, fetchFile, formatBytes, RequestEvent } from "lib/utils";

interface UseMameProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  gameFile: string;
}

interface UseMameState {
  isMameLoading: boolean;
  isMameReady: boolean;
  loadedSize?: string;
  totalSize?: string;
  percentage?: number;
}

interface UseMameAction {
  type: string;
  loadedSize?: string;
  totalSize?: string;
  percentage?: number;
}

interface UseMameData extends UseMameState {
  startMame: () => void;
  stopMame: () => void;
}

declare global {
  interface Window {
    Module: {
      arguments: string[];
      screenIsReadOnly: boolean;
      print: (msg: string) => void;
      printErr: (msg: string) => void;
      canvas: HTMLCanvasElement;
      noInitialRun: boolean;
      locateFile: (fileName: string) => string;
      preInit: () => void;
      preRun: any;
    };
  }
  // eslint-disable-next-line
  var FS: any;
}

const logger = (msg: string) => console.log(msg);

const MAME_JS_URL = "/mamecps2.js";

function getModuleArgs(gameName: string): string[] {
  return [
    gameName,
    "-verbose",
    "-rompath",
    "emulator",
    "-window",
    "-nokeepaspect",
    "-resolution",
    "1152x672",
  ];
}

function getBrowserFSConfig({
  gameName,
  zipData,
}: {
  gameName: string;
  zipData: Buffer;
}) {
  const writable = {
    fs: "AsyncMirror",
    options: {
      sync: { fs: "InMemory" },
      // storeName needs to be emularity as it's harded in wasm
      async: { fs: "IndexedDB", options: { storeName: "emularity" } },
    },
  };
  const readable = {
    fs: "MountableFileSystem",
    options: {
      // wasm is hard coded to look for this folder
      [`/${gameName}`]: {
        fs: "ZipFS",
        options: { zipData },
      },
    },
  };
  return {
    fs: "OverlayFS",
    options: {
      writable,
      readable,
    },
  };
}

async function browserFSCallback() {}

function locateFile(fileName: string): string {
  return `/${fileName}`;
}

async function updateModule({
  canvas,
  gameFile,
  dispatch,
}: {
  canvas: HTMLCanvasElement;
  gameFile: string;
  dispatch: (action: UseMameAction) => void;
}) {
  const onProgress = (event: RequestEvent) => {
    const { total, loaded } = event;
    const percentage = Math.floor((loaded / total) * 100);

    dispatch({
      type: "SET_LOADING_DETAILS",
      totalSize: formatBytes(total),
      loadedSize: formatBytes(loaded),
      percentage,
    });
  };
  const arrayBuffer = await fetchFile(gameFile, {
    onProgress,
    onError: noop,
  });
  const zipData = BrowserFS.BFSRequire("buffer").Buffer.from(arrayBuffer);
  const gameName = gameFile
    .substring(gameFile.lastIndexOf("/") + 1)
    .replace(/\.zip$/, "");
  const browserFSConfig = getBrowserFSConfig({ zipData, gameName });
  BrowserFS.configure(browserFSConfig, browserFSCallback);

  window.Module = {
    arguments: getModuleArgs(gameName),
    screenIsReadOnly: true,
    print: logger,
    printErr: logger,
    canvas,
    noInitialRun: false,
    locateFile,
    preInit: () => {
      const BFS = new BrowserFS.EmscriptenFS();
      FS.mkdir("/emulator");
      FS.mount(BFS, { root: "/" }, "/emulator");
    },
    preRun: [],
  };
}

function addMameScript() {
  const script = document.createElement("script");

  script.src = MAME_JS_URL;
  script.async = true;

  document.body.appendChild(script);
}

const initialState = { isMameLoading: false, isMameReady: false };

function reducer(state: UseMameState, action: UseMameAction) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isMameLoading: true };
    case "SET_LOADING_DETAILS":
      return {
        ...state,
        totalSize: action.totalSize,
        loadedSize: action.loadedSize,
        percentage: action.percentage,
      };
    case "SET_READY":
      return { ...state, isMameLoading: false, isMameReady: true };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function useMame({
  canvasRef,
  gameFile,
}: UseMameProps): UseMameData {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startMame = useCallback(async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        dispatch({ type: "SET_LOADING" });

        await updateModule({ canvas, gameFile, dispatch });
        addMameScript();

        dispatch({ type: "SET_READY" });
      } catch {
        dispatch({ type: "RESET" });
      }
    }
  }, [canvasRef, gameFile]);

  const stopMame = useCallback(() => {
    window.location.reload(false);
  }, []);

  return { ...state, startMame, stopMame };
}
