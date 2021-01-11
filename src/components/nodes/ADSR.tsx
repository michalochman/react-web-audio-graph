import React from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import { Mode, Parameters } from "worklets/envelope-processor.types";

function ADSR({ data, id, selected, type }: NodeProps) {
  const { mode = Mode.Linear, onChange, sustainOn = true } = data;

  // AudioNode
  useNode(
    id,
    context => {
      const envelope = new AudioWorkletNode(context, "envelope-processor", {
        processorOptions: { sustainOn, mode },
      });

      return {
        attack: envelope.parameters.get(Parameters.AttackTime),
        decay: envelope.parameters.get(Parameters.DecayTime),
        gain: envelope,
        gate: envelope,
        input: undefined,
        output: undefined,
        release: envelope.parameters.get(Parameters.ReleaseTime),
        sustain: envelope.parameters.get(Parameters.SustainLevel),
      };
    },
    [mode, sustainOn]
  );

  return (
    <Node
      id={id}
      inputs={["gate", Parameters.AttackTime, Parameters.DecayTime, Parameters.ReleaseTime, Parameters.SustainLevel]}
      outputs={["gain"]}
      title="ADSR"
      type={type}
    >
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <select onChange={e => onChange({ mode: e.target.value })} value={mode}>
              <option value={Mode.Exponential}>{Mode.Exponential}</option>
              <option value={Mode.Linear}>{Mode.Linear}</option>
              <option value={Mode.Logarithmic}>{Mode.Logarithmic}</option>
            </select>
          </div>
          <div className="customNode_item">
            <label
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <input
                className="nodrag"
                type="checkbox"
                checked={sustainOn}
                onChange={() => onChange({ sustainOn: !sustainOn })}
              />
              sustain on
            </label>
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(ADSR);
