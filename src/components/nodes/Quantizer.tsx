import React from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import { AudioWorkletNode } from "utils/audioContext";

function Rectifier({ data, id, selected, type }: NodeProps) {
  const { levels = 256, max = 1, min = -1, onChange } = data;

  // AudioNode
  useNode(
    id,
    context => new AudioWorkletNode!(context, "quantizer-processor", { processorOptions: { levels, max, min } }),
    [levels, max, min]
  );

  return (
    <Node id={id} inputs={["input"]} outputs={["output"]} title="Quantizer" type={type}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item" style={{ width: 138 }}>
            <input
              onChange={e => onChange({ levels: +e.target.value })}
              step={1}
              title="Levels"
              type="number"
              value={levels}
            />
          </div>
          <div className="customNode_item" style={{ width: 138 }}>
            <input
              onChange={e => onChange({ min: +e.target.value })}
              step={1}
              style={{ width: "50%" }}
              title="Min"
              type="number"
              value={min}
            />
            <input
              onChange={e => onChange({ max: +e.target.value })}
              style={{ width: "50%" }}
              step={1}
              title="Max>"
              type="number"
              value={max}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Rectifier);
