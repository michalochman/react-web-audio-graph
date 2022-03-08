import React, { useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { useThrottleFn } from "ahooks";
import Node from "components/Node";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";
import { PitchMethod } from "worklets/pitch-detector-processor.types";

const BUFFER_SIZES = Array(5)
  .fill(null)
  .map((_, sizeIndex) => 2 ** (10 + sizeIndex));
const HOP_SIZES = Array(5)
  .fill(null)
  .map((_, factorIndex) => 2 ** factorIndex);

function PitchDetector({ data, id, selected, type }: NodeProps) {
  const { bufferSize = 1024, hopSizeFactor = 4, method = PitchMethod.default, onChange } = data;
  const [pitch, setPitch] = useState(0);

  // AudioNode
  const node = useAudioWorkletNode(
    id,
    "pitch-detector-processor",
    { processorOptions: { bufferSize, hopSizeFactor, method } },
    [bufferSize, hopSizeFactor, method]
  );

  // AudioWorklet messages
  const { run: handleMessage } = useThrottleFn(event => setPitch(event.data), { leading: true, wait: 250 });
  useEffect(() => {
    node.port.onmessage = handleMessage;
  }, [node, handleMessage]);

  return (
    <Node id={id} inputs={["input"]} outputs={["output"]} title={`Pitch: ${pitch.toFixed(2)} Hz`} type={type}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <select onChange={e => onChange({ method: e.target.value })} title="Detection method" value={method}>
              {Object.keys(PitchMethod).map(pitchMethod => (
                <option key={pitchMethod} value={pitchMethod}>
                  {pitchMethod}
                </option>
              ))}
            </select>
          </div>
          <div className="customNode_item">
            <select onChange={e => onChange({ bufferSize: +e.target.value })} title="Buffer size" value={bufferSize}>
              {BUFFER_SIZES.map(bufferSize => (
                <option key={bufferSize} value={bufferSize}>
                  {bufferSize}
                </option>
              ))}
            </select>
            <select onChange={e => onChange({ hopSizeFactor: +e.target.value })} title="Hop size" value={hopSizeFactor}>
              {HOP_SIZES.map(hopSize => (
                <option key={hopSize} value={hopSize}>
                  {hopSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(PitchDetector);
