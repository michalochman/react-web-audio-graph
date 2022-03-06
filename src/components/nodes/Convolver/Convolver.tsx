import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useConvolverNode from "hooks/nodes/useConvolverNode";
import impulseResponses from "./impulseResponses";

const defaultImpulseResponse = impulseResponses[Object.keys(impulseResponses)[0]];

function Convolver({ data, id, selected, type }: NodeProps) {
  const { impulseResponse = defaultImpulseResponse, normalize, onChange } = data;

  // AudioNode
  const node = useConvolverNode(id, { normalize });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(impulseResponse);
        const buffer = await response.arrayBuffer();
        node.buffer = await node.context.decodeAudioData(buffer);
      } catch (e) {
        console.error("Error with decoding audio data", e);
      }
    })();
  }, [node, impulseResponse]);

  return (
    <Node id={id} inputs={["input"]} outputs={["output"]} type={type}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <select
              onChange={e => onChange({ impulseResponse: e.target.value })}
              title="Impulse Response"
              value={impulseResponse}
            >
              {Object.keys(impulseResponses).map(impulseResponse => (
                <option key={impulseResponse} value={impulseResponses[impulseResponse]}>
                  {impulseResponse.replace(".wav", "")}
                </option>
              ))}
            </select>
          </div>
          <div className="customNode_item">
            <label>
              <input
                checked={normalize}
                onChange={e => onChange({ normalize: !normalize })}
                title="Normalize"
                type="checkbox"
              />
              Normalize
            </label>
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Convolver);
