import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import Slider, { SliderType } from "components/controls/Slider";
import useDelayNode from "hooks/nodes/useDelayNode";
import useGainNode from "hooks/nodes/useGainNode";
import { float32toDb } from "utils/units";

function DelayEffect({ data, id, selected, type }: NodeProps) {
  const { delayTime = 0.2, feedback = 0.7, mix = 0.5, onChange } = data;

  // Interface
  const inputNode = useGainNode(`${id}_input`, {});
  const outputNode = useGainNode(`${id}_output`, {});
  // Mixing
  const dryNode = useGainNode(`${id}_dry`, { gain: Math.cos(mix * 0.5 * Math.PI) });
  const wetNode = useGainNode(`${id}_wet`, { gain: Math.cos((1.0 - mix) * 0.5 * Math.PI) });
  // Delay
  const delayNode = useDelayNode(`${id}_delay`, { delayTime });
  // Feedback
  const feedbackNode = useGainNode(`${id}_feedback`, { gain: feedback });

  // Dry chain
  useEffect(() => {
    inputNode.connect(dryNode);
    dryNode.connect(outputNode);
  }, [dryNode, inputNode, outputNode]);
  // Wet chain
  useEffect(() => {
    inputNode.connect(delayNode);
    delayNode.connect(wetNode);
    wetNode.connect(outputNode);
  }, [delayNode, inputNode, outputNode, wetNode]);
  // Feedback chain
  useEffect(() => {
    wetNode.connect(feedbackNode);
    feedbackNode.connect(delayNode);
  }, [delayNode, feedbackNode, wetNode]);

  // AudioNode
  useNode(id, () => ({ input: inputNode, output: outputNode }), [inputNode, outputNode]);

  return (
    <Node id={id} inputs={["input"]} outputs={["output"]} title={`DelayEffect`} type={type}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <input
              max="1"
              min="0"
              onChange={e => onChange({ mix: +e.target.value })}
              step="0.01"
              title={`Mix: ${(1 - mix) * 100}% dry / ${mix * 100}% wet`}
              type="range"
              value={mix}
            />
          </div>
          <div className="customNode_item">
            <input
              max="1"
              min="0"
              onChange={e => onChange({ delayTime: +e.target.value })}
              step="0.01"
              title={`Delay: ${delayTime} s`}
              type="range"
              value={delayTime}
            />
          </div>
          <div className="customNode_item">
            <Slider
              onChange={feedback => onChange({ feedback })}
              title={`Feedback: ${float32toDb(feedback).toFixed(2)} dB`}
              type={SliderType.Linear}
              value={feedback}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(DelayEffect);
