import React from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useDelayNode from "hooks/nodes/useDelayNode";

function clampDelayTime(delayTime: number) {
  return Math.max(0.001, Math.min(179.999, delayTime));
}

function Delay({ data, id, selected, type }: NodeProps) {
  const { delayTime = 1, maxDelayTime = 1, onChange } = data;
  const node = useDelayNode(id, { delayTime, maxDelayTime });

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
