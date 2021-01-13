import React from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

const inputStyle = {
  width: 50,
};

function Transformer({ data, id, selected, type }: NodeProps) {
  const { inputMax = 1, inputMin = -1, onChange, outputMax = 1, outputMin = 0 } = data;

  // AudioNode
  useNode(
    id,
    context =>
      new AudioWorkletNode(context, "transformer-processor", {
        processorOptions: {
          inputMin,
          inputMax,
          outputMin,
          outputMax,
        },
      }),
    [inputMin, inputMax, outputMin, outputMax]
  );

  return (
    <Node id={id} inputs={["input"]} outputs={["output"]} title="Transformer" type={type}>
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <input
              onChange={e => onChange({ inputMin: +e.target.value })}
              style={inputStyle}
              type="number"
              value={inputMin}
            />
            <input
              onChange={e => onChange({ inputMax: +e.target.value })}
              style={inputStyle}
              type="number"
              value={inputMax}
            />
          </div>
          <div className="customNode_item">
            <input
              onChange={e => onChange({ outputMin: +e.target.value })}
              style={inputStyle}
              type="number"
              value={outputMin}
            />
            <input
              onChange={e => onChange({ outputMax: +e.target.value })}
              style={inputStyle}
              type="number"
              value={outputMax}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Transformer);
