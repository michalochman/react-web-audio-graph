import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

// See: https://noisehack.com/generate-noise-web-audio-api/
function generateWhiteNoise(buffer: AudioBuffer) {
  const bufferSize = buffer.length;
  const output = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  return buffer;
}

// See: https://noisehack.com/generate-noise-web-audio-api/
function generatePinkNoise(buffer: AudioBuffer) {
  const bufferSize = buffer.length;
  const output = buffer.getChannelData(0);
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;
  let b5 = 0;
  let b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    output[i] *= 0.11; // (roughly) compensate for gain
    b6 = white * 0.115926;
  }

  return buffer;
}

// See: https://noisehack.com/generate-noise-web-audio-api/
function generateBrownNoise(buffer: AudioBuffer) {
  const bufferSize = buffer.length;
  const output = buffer.getChannelData(0);
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    output[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = output[i];
    output[i] *= 3.5; // (roughly) compensate for gain
  }

  return buffer;
}

function Noise({ data, id, selected, type: nodeType }: NodeProps) {
  const { onChange, type = "white" } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<AudioBufferSourceNode>(() => {
    // Will create buffer with 5 seconds of noise
    const bufferSize = 5 * context.sampleRate;
    const generators = {
      brown: generateBrownNoise,
      pink: generatePinkNoise,
      white: generateWhiteNoise,
    };
    const generator = generators[type as keyof typeof generators];
    const buffer = generator(context.createBuffer(1, bufferSize, context.sampleRate));
    console.log(buffer.getChannelData(0));
    const node = context.createBufferSource();
    node.buffer = buffer;
    node.loop = true;

    return node;
  }, [context, type]);
  useEffect(() => {
    node.start();
    return () => node.stop();
  }, [node]);
  useNode(id, node);

  return (
    <Node id={id} inputs={["input"]} outputs={["output"]} title={`Noise: ${type}`} type={nodeType}>
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <select onChange={e => onChange({ type: e.target.value })} value={type}>
              <option value="white">white</option>
              <option value="pink">pink</option>
              <option value="brown">brown</option>
            </select>
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Noise);
