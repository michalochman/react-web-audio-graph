import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { ComplexAudioNode, useNode } from "context/NodeContext";
import Node from "components/Node";
import { Mode, Parameters } from "worklets/adsr-processor.types";

interface ADSRNode extends Required<ComplexAudioNode<undefined, undefined>> {
  [Parameters.AttackTime]: AudioParam;
  [Parameters.DecayTime]: AudioParam;
  gain: AudioWorkletNode;
  gate: AudioWorkletNode;
  [Parameters.ReleaseTime]: AudioParam;
  [Parameters.SustainLevel]: AudioParam;
}

function ADSR({ data, id, selected, type }: NodeProps) {
  const {
    attackTime = 0.2,
    decayTime = 0.1,
    mode = Mode.Linear,
    onChange,
    releaseTime = 0.6,
    sustainLevel = 0.7,
    sustainOn = true,
  } = data;

  // AudioNode
  const node = (useNode(
    id,
    context => {
      const envelope = new AudioWorkletNode(context, "adsr-processor", {
        processorOptions: { sustainOn, mode },
      });

      return {
        [Parameters.AttackTime]: envelope.parameters.get(Parameters.AttackTime),
        [Parameters.DecayTime]: envelope.parameters.get(Parameters.DecayTime),
        gain: envelope,
        gate: envelope,
        input: undefined,
        output: undefined,
        [Parameters.ReleaseTime]: envelope.parameters.get(Parameters.ReleaseTime),
        [Parameters.SustainLevel]: envelope.parameters.get(Parameters.SustainLevel),
      };
    },
    [mode, sustainOn]
  ) as unknown) as ADSRNode;

  // AudioParam
  useEffect(() => void (node[Parameters.AttackTime].value = attackTime), [node, attackTime]);
  useEffect(() => void (node[Parameters.DecayTime].value = decayTime), [node, decayTime]);
  useEffect(() => void (node[Parameters.ReleaseTime].value = releaseTime), [node, releaseTime]);
  useEffect(() => void (node[Parameters.SustainLevel].value = sustainLevel), [node, sustainLevel]);

  return (
    <Node
      id={id}
      inputs={["gate", Parameters.AttackTime, Parameters.DecayTime, Parameters.ReleaseTime, Parameters.SustainLevel]}
      outputs={["gain"]}
      title="ADSR"
      type={type}
    >
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <select onChange={e => onChange({ mode: e.target.value })} title="Type" value={mode}>
              <option value={Mode.Exponential}>{Mode.Exponential}</option>
              <option value={Mode.Linear}>{Mode.Linear}</option>
              <option value={Mode.Logarithmic}>{Mode.Logarithmic}</option>
            </select>
          </div>
          <div className="customNode_item">
            <label>
              <input
                checked={sustainOn}
                onChange={() => onChange({ sustainOn: !sustainOn })}
                title="Sustain"
                type="checkbox"
              />
              sustain on
            </label>
          </div>
          <div className="customNode_item" style={{ width: 138 }}>
            <input
              min={0}
              onChange={e => onChange({ attackTime: +e.target.value })}
              step={0.05}
              style={{ width: "50%" }}
              title="Attack time"
              type="number"
              value={attackTime}
            />
            <input
              min={0}
              onChange={e => onChange({ decayTime: +e.target.value })}
              step={0.05}
              style={{ width: "50%" }}
              title="Decay time"
              type="number"
              value={decayTime}
            />
          </div>
          <div className="customNode_item" style={{ width: 138 }}>
            <input
              min={0}
              onChange={e => onChange({ releaseTime: +e.target.value })}
              step={0.05}
              style={{ width: "50%" }}
              title="Release time"
              type="number"
              value={releaseTime}
            />
            <input
              max={1}
              min={0}
              onChange={e => onChange({ sustainLevel: +e.target.value })}
              step={0.01}
              style={{ width: "50%" }}
              title="Sustain level"
              type="number"
              value={sustainLevel}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(ADSR);
