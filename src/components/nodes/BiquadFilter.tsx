import React, { useEffect, useRef } from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useBiquadFilterNode from "hooks/nodes/useBiquadFilterNode";
import { BiquadFilterNode, TBiquadFilterType } from "utils/audioContext";

const filtersUsingGain: TBiquadFilterType[] = ["lowshelf", "highshelf", "peaking"];
const filtersUsingQ: TBiquadFilterType[] = ["lowpass", "highpass", "bandpass", "peaking", "notch", "allpass"];

function drawFrequencyResponse(context: CanvasRenderingContext2D, data: Float32Array, node: BiquadFilterNode) {
  let x = 0;
  const height = context.canvas.height;
  const width = context.canvas.width;
  const bufferLength = data.length;
  const sliceWidth = width / bufferLength;

  context.fillStyle = "#001400";
  context.fillRect(0, 0, width, height);

  context.lineWidth = 1;
  context.strokeStyle = "#ffffff77";
  context.beginPath();
  context.moveTo((node.frequency.value / (node.context.sampleRate / 2)) * width, 0);
  context.lineTo((node.frequency.value / (node.context.sampleRate / 2)) * width, height);
  context.stroke();
  context.closePath();

  context.lineWidth = 2;
  context.strokeStyle = "#00c800";
  context.beginPath();
  for (let i = 0; i < bufferLength; i++) {
    const y = (data[i] * height) / 2;
    context.lineTo(x, height - y);
    x += sliceWidth;
  }
  context.stroke();
}

function BiquadFilter({ data, id, selected, type: nodeType }: NodeProps) {
  const { detune = 0, gain = 0, frequency = 350, Q = 1, onChange, type = "lowpass" } = data;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const node = useBiquadFilterNode(id, { detune, frequency, gain, Q, type });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    const frequencies = new Float32Array(node.context.sampleRate / 200).map((_, i) => i * 100);
    const magnitudes = new Float32Array(frequencies.length);
    const phases = new Float32Array(frequencies.length);

    // This only gets frequency response based on the filter's own AudioParams
    // TODO figure out a way to get frequency response for connected AudioParams
    node.getFrequencyResponse(frequencies, magnitudes, phases);

    drawFrequencyResponse(context, magnitudes, node);
  }, [node, detune, gain, frequency, Q, selected, type]);

  const canUseGain = filtersUsingGain.includes(type);
  const canUseQ = filtersUsingQ.includes(type);

  return (
    <Node
      id={id}
      inputs={["input", "detune", "frequency", "gain", "Q"]}
      outputs={["output"]}
      title={`Filter: ${type}`}
      type={nodeType}
    >
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <input
              min={-100}
              max={100}
              onChange={e => onChange({ detune: +e.target.value })}
              step={1}
              title={`Detune: ${detune} cents`}
              type="range"
              value={detune}
            />
          </div>
          <div className="customNode_item">
            <input
              min={10}
              max={node.context.sampleRate / 2}
              onChange={e => onChange({ frequency: +e.target.value })}
              step={1}
              title={`Frequency: ${frequency} Hz`}
              type="range"
              value={frequency}
            />
          </div>
          <div className="customNode_item">
            <input
              disabled={!canUseGain}
              min={-40}
              max={40}
              onChange={e => onChange({ gain: +e.target.value })}
              step={0.1}
              title={`Gain: ${gain} dB`}
              type="range"
              value={gain}
            />
          </div>
          <div className="customNode_item">
            <input
              disabled={!canUseQ}
              min={0.0001}
              max={["lowpass", "highpass"].includes(type) ? 10 : 1000}
              onChange={e => onChange({ Q: +e.target.value })}
              step={["lowpass", "highpass"].includes(type) ? 0.1 : 10}
              title={`Q: ${Q}`}
              type="range"
              value={Q}
            />
          </div>
          <div className="customNode_item">
            <select onChange={e => onChange({ type: e.target.value })} value={type}>
              <option value="lowpass">lowpass</option>
              <option value="highpass">highpass</option>
              <option value="bandpass">bandpass</option>
              <option value="lowshelf">lowshelf</option>
              <option value="highshelf">highshelf</option>
              <option value="peaking">peaking</option>
              <option value="notch">notch</option>
              <option value="allpass">allpass</option>
            </select>
          </div>
          <div className="customNode_item">
            <canvas ref={canvasRef} height={64} width={256} />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(BiquadFilter);
