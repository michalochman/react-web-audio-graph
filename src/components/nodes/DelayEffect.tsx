import React from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import Slider, { SliderType } from "components/controls/Slider";
import { float32toDb } from "utils/units";

function DelayEffect({ data, id, selected, type }: NodeProps) {
  const { delayTime = 0.2, feedback = 0.7, mix = 0.5, onChange } = data;

  // AudioNode
  useNode(
    id,
    context => {
      // Interface
      const input = context.createGain();
      const output = context.createGain();
      // Mixing
      const dry = context.createGain();
      const wet = context.createGain();
      // Delay
      const delayNode = context.createDelay(1);
      delayNode.delayTime.value = delayTime;
      // Feedback
      const feedbackNode = context.createGain();
      feedbackNode.gain.setTargetAtTime(feedback, feedbackNode.context.currentTime, 0.015);

      // Mix using equal power crossfade
      dry.gain.setTargetAtTime(Math.cos(mix * 0.5 * Math.PI), dry.context.currentTime, 0.015);
      wet.gain.setTargetAtTime(Math.cos((1.0 - mix) * 0.5 * Math.PI), wet.context.currentTime, 0.015);

      // Dry
      input.connect(dry);
      dry.connect(output);
      // Wet
      input.connect(delayNode);
      delayNode.connect(wet);
      wet.connect(output);
      // Feedback
      wet.connect(feedbackNode);
      feedbackNode.connect(delayNode);

      return {
        input,
        output,
      };
    },
    [delayTime, feedback, mix]
  );

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
