import { createContext, useContext } from "react";

interface Rect {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface ContextMenuContextType {
  getRect: () => Rect;
  hide: () => void;
  show: (foo: any) => void;
  setRect: (bbox: Rect) => void;
}

export const ContextMenuContext = createContext<ContextMenuContextType>(null!);

export function useContextMenu() {
  return useContext(ContextMenuContext);
}
