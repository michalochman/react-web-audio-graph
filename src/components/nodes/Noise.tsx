import React from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";
import { NoiseType } from "worklets/noise-processor.types";

function Noise({ data, id, selected, type: nodeType }: NodeProps) {
  const { onChange, type = NoiseType.White } = data;
  useAudioWorkletNode(id, "noise-processor", { numberOfInputs: 0, processorOptions: { type } }, [type]);

  return (
    <Node id={id} outputs={["output"]} title={`Noise: ${type}`} type={nodeType}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <select onChange={e => onChange({ type: e.target.value })} title="Type" value={type}>
              <option value={NoiseType.White}>{NoiseType.White}</option>
              <option value={NoiseType.Pink}>{NoiseType.Pink}</option>
              <option value={NoiseType.Brown}>{NoiseType.Brown}</option>
            </select>
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Noise);
