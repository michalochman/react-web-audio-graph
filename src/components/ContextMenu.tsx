import React, { useMemo, useRef } from "react";
import { ContextMenuContext } from "context/ContextMenuContext";
import { usePopper } from "react-popper";
import { VirtualElement } from "@popperjs/core";

interface Props {
  children?: React.ReactNode;
}

function ContextMenu({ children }: Props) {
  const [showPopper, setShowPopper] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState<HTMLDivElement>();
  const virtualReference = useRef<VirtualElement>();
  const { styles, attributes } = usePopper(virtualReference.current, popperElement, { placement: "bottom-start" });

  const context = useMemo(
    () => ({
      getRect: () => {
        if (virtualReference.current == null) {
          return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
        }

        return virtualReference.current.getBoundingClientRect();
      },
      hide: () => {
        setShowPopper(null);
      },
      show: (foo: any) => {
        setShowPopper(foo);
      },
      setRect: (bbox: any) => {
        virtualReference.current = {
          getBoundingClientRect: () => bbox,
        };
      },
      setPopperElement,
    }),
    []
  );

  return (
    <ContextMenuContext.Provider value={context}>
      {children}
      <div ref={node => node && setPopperElement(node)} style={styles.popper} {...attributes.popper}>
        {showPopper}
      </div>
    </ContextMenuContext.Provider>
  );
}

export default ContextMenu;
