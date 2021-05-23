import React from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import Slider, { SliderType } from "components/controls/Slider";
import useGainNode from "hooks/nodes/useGainNode";
import { float32toDb } from "utils/units";

function Gain({ data, id, selected, type: nodeType }: NodeProps) {
  const { gain = 1, onChange, type = SliderType.Log } = data;
  const title = `Gain: ${float32toDb(gain).toFixed(2)} dB`;
  useGainNode(id, { gain });

  return (
    <Node id={id} inputs={["input", "gain"]} outputs={["output"]} title={title} type={nodeType}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <Slider onChange={gain => onChange({ gain })} title={title} type={type} value={gain} />
          </div>
          <div className="customNode_item">
            <select onChange={e => onChange({ type: e.target.value })} title="Type" value={type}>
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
