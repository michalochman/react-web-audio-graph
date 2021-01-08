import { createContext, useContext } from "react";

interface ContextMenuContextType {
  getRect: () => ClientRect | DOMRect;
  hide: () => void;
  show: (foo: any) => void;
  setRect: (bbox: ClientRect | DOMRect) => void;
}

export const ContextMenuContext = createContext<ContextMenuContextType>(null!);

export function useContextMenu() {
  return useContext(ContextMenuContext);
}
