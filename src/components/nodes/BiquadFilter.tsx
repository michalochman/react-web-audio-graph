import React, { useEffect, useRef } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

enum BiquadFilterType {
  lowpass = "lowpass",
  highpass = "highpass",
  bandpass = "bandpass",
  lowshelf = "lowshelf",
  highshelf = "highshelf",
  peaking = "peaking",
  notch = "notch",
  allpass = "allpass",
}

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
  const { detune = 0, gain = 0, frequency = 350, Q = 1, onChange, type = BiquadFilterType.lowpass } = data;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // AudioNode
  const node = useNode(id, context => context.createBiquadFilter());

  // AudioParam
  useEffect(() => void (node.detune.value = detune), [node, detune]);
  useEffect(() => void (node.frequency.value = frequency), [node, frequency]);
  useEffect(() => void (node.gain.value = gain), [node, gain]);
  useEffect(() => void (node.Q.value = Q), [node, Q]);
  useEffect(() => void (node.type = type), [node, type]);

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

  const canUseGain = [BiquadFilterType.lowshelf, BiquadFilterType.highshelf, BiquadFilterType.peaking].includes(type);
  const canUseQ = [
    BiquadFilterType.lowpass,
    BiquadFilterType.highpass,
    BiquadFilterType.bandpass,
    BiquadFilterType.peaking,
    BiquadFilterType.notch,
    BiquadFilterType.allpass,
  ].includes(type);

  return (
    <Node
      id={id}
      inputs={["input", "detune", "frequency", "gain", "Q"]}
      outputs={["output"]}
      title={`Filter: ${type}`}
      type={nodeType}
    >
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <input
              className="nodrag"
              min={-100}
              max={100}
              onChange={e => onChange({ detune: +e.target.value })}
              step={1}
              type="range"
              value={detune}
            />
          </div>
          <div className="customNode_item">
            <input
              className="nodrag"
              min={10}
              max={node.context.sampleRate / 2}
              onChange={e => onChange({ frequency: +e.target.value })}
              step={1}
              type="range"
              value={frequency}
            />
          </div>
          <div className="customNode_item">
            <input
              className="nodrag"
              disabled={!canUseGain}
              min={-40}
              max={40}
              onChange={e => onChange({ gain: +e.target.value })}
              step={0.1}
              type="range"
              value={gain}
            />
          </div>
          <div className="customNode_item">
            <input
              className="nodrag"
              disabled={!canUseQ}
              min={0.0001}
              max={[BiquadFilterType.lowpass, BiquadFilterType.highpass].includes(type) ? 10 : 1000}
              onChange={e => onChange({ Q: +e.target.value })}
              step={[BiquadFilterType.lowpass, BiquadFilterType.highpass].includes(type) ? 0.1 : 10}
              type="range"
              value={Q}
            />
          </div>
          <div className="customNode_item">
            <select onChange={e => onChange({ type: e.target.value })} value={type}>
              {Object.values(BiquadFilterType).map(filterType => (
                <option key={filterType} value={filterType}>
                  {filterType}
                </option>
              ))}
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
