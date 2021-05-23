import React, { useCallback, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useConstantSourceNode from "hooks/nodes/useConstantSourceNode";

function Gate({ data, id, type }: NodeProps) {
  const { isOn = false, onChange } = data;

  // AudioNode
  const node = useConstantSourceNode(id, {});

  // AudioParam
  useEffect(() => void node.offset.setTargetAtTime(isOn ? 1 : 0, node.context.currentTime, 0.015), [node, isOn]);

  const toggleOn = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      if ("repeat" in e && e.repeat) {
        return;
      }
      onChange({ isOn: true });
    },
    [onChange]
  );
  const toggleOff = useCallback(() => onChange({ isOn: false }), [onChange]);

  return (
    <Node id={id} outputs={["output"]} title="Gate" type={type}>
      <div className="customNode_item">
        <button onMouseDown={toggleOn} onMouseUp={toggleOff} onKeyDown={toggleOn} onKeyUp={toggleOff}>
          trigger {isOn ? "off" : "on"}
        </button>
      </div>
    </Node>
  );
}

export default React.memo(Gate);
