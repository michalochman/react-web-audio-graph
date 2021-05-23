import React from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";
import { Mode } from "worklets/rectifier-processor.types";

function Rectifier({ data, id, selected, type }: NodeProps) {
  const { mode = Mode.HalfWave, onChange } = data;
  useAudioWorkletNode(id, "rectifier-processor", { processorOptions: { mode } }, [mode]);

  return (
    <Node id={id} inputs={["input"]} outputs={["output"]} title="Rectifier" type={type}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <select onChange={e => onChange({ mode: e.target.value })} title="Type" value={mode}>
              <option value={Mode.FullWave}>{Mode.FullWave}</option>
              <option value={Mode.HalfWave}>{Mode.HalfWave}</option>
            </select>
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Rectifier);
