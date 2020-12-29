import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import Slider, { SliderType } from "components/controls/Slider";

function Gain({ data, id, selected, type: nodeType }: NodeProps) {
  const { gain = 1, onChange, type = SliderType.Log } = data;

  // AudioNode
  const node = useNode(id, context => context.createGain());

  // AudioParam
  useEffect(() => {
    node.gain.setTargetAtTime(gain, node.context.currentTime, 0.015);
  }, [node, gain]);

  return (
    <Node id={id} inputs={["input", "gain"]} outputs={["output"]} title={`Gain: ${gain.toFixed(3)}`} type={nodeType}>
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <Slider onChange={value => onChange({ gain: value })} type={type} value={gain} />
          </div>
          <div className="customNode_item">
            <select onChange={e => onChange({ type: e.target.value })} value={type}>
              <option value={SliderType.Linear}>{SliderType.Linear}</option>
              <option value={SliderType.Log}>{SliderType.Log}</option>
            </select>
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Gain);
