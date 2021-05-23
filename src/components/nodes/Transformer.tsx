import React from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";

const inputStyle = {
  width: 50,
};

function Transformer({ data, id, selected, type }: NodeProps) {
  const { inputMax = 1, inputMin = -1, onChange, outputMax = 1, outputMin = 0 } = data;
  useAudioWorkletNode(
    id,
    "transformer-processor",
    {
      processorOptions: {
        inputMin,
        inputMax,
        outputMin,
        outputMax,
      },
    },
    [inputMin, inputMax, outputMin, outputMax]
  );

  return (
    <Node id={id} inputs={["input"]} outputs={["output"]} title="Transformer" type={type}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <input
              onChange={e => onChange({ inputMin: +e.target.value })}
              style={inputStyle}
              title={`Input min`}
              type="number"
              value={inputMin}
            />
            <span>&rarr;</span>
            <input
              onChange={e => onChange({ outputMin: +e.target.value })}
              style={inputStyle}
              title={`Output min`}
              type="number"
              value={outputMin}
            />
          </div>
          <div className="customNode_item">
            <input
              onChange={e => onChange({ inputMax: +e.target.value })}
              style={inputStyle}
              title={`Input max`}
              type="number"
              value={inputMax}
            />
            <span>&rarr;</span>
            <input
              onChange={e => onChange({ outputMax: +e.target.value })}
              style={inputStyle}
              title={`Output max`}
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
