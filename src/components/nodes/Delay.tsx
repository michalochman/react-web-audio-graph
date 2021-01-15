import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function clampDelayTime(delayTime: number) {
  return Math.max(0.001, Math.min(179.999, delayTime));
}

function Delay({ data, id, selected, type }: NodeProps) {
  const { delayTime = 1, maxDelayTime = 1, onChange } = data;

  // AudioNode
  const node = useNode(id, context => context.createDelay(clampDelayTime(maxDelayTime)), [maxDelayTime]);

  // AudioParam
  useEffect(() => void (node.delayTime.value = delayTime), [node, delayTime]);

  return (
    <Node id={id} inputs={["input", "delayTime"]} outputs={["output"]} title={`Delay: ${delayTime} s`} type={type}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <input
              max={node.delayTime.maxValue}
              min={node.delayTime.minValue}
              step={clampDelayTime(maxDelayTime) / 10}
              onChange={e => onChange({ delayTime: +e.target.value })}
              title={`Delay: ${delayTime} s`}
              type="range"
              value={delayTime}
            />
          </div>
          <div className="customNode_item">
            <input
              onChange={e => onChange({ maxDelayTime: +e.target.value })}
              max={0}
              min={180}
              title="Max delay"
              type="number"
              value={clampDelayTime(maxDelayTime)}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Delay);
