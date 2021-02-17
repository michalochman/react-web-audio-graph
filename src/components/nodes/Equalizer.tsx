import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { ComplexAudioNode, useNode } from "context/NodeContext";
import Node from "components/Node";
import produce from "immer";

// const BANDS_WINAMP = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];
const BANDS_OCTAVES = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

function octaveBandwidthToQ(bandwidth: number): number {
  const frequencyRatio = Math.pow(2, bandwidth);
  return Math.sqrt(frequencyRatio) / (frequencyRatio - 1);
}

function formatFrequency(frequency: number): string {
  if (frequency >= 1000) {
    return `${Math.floor(frequency / 1000)}k`;
  }

  return `${frequency}`;
}

interface EqualizerNode extends ComplexAudioNode<GainNode, GainNode> {
  filters: BiquadFilterNode[];
}

function Equalizer({ data, id, selected, type }: NodeProps) {
  const { bandwidth = 1, gains = Array(BANDS_OCTAVES.length).fill(0), onChange } = data;

  // AudioNode
  const node = (useNode(id, context => {
    const input = context.createGain();
    const output = context.createGain();

    const filters = BANDS_OCTAVES.map((frequency, index, frequencies) => {
      const isLowShelf = index === 0;
      const isHighShelf = index === frequencies.length - 1;
      const isBandPass = !isLowShelf && !isHighShelf;

      const gain = isBandPass ? gains[index] : 0;
      const type = isLowShelf ? "lowshelf" : isHighShelf ? "highshelf" : "peaking";
      const Q = octaveBandwidthToQ(bandwidth);

      const filter = context.createBiquadFilter();
      filter.frequency.value = frequency;
      filter.gain.value = gain;
      filter.type = type;
      filter.Q.value = Q;

      return filter;
    });

    (filters as AudioNode[]).concat(output).reduce((source, destination) => source.connect(destination), input);

    return {
      filters,
      input,
      output,
    };
  }) as unknown) as EqualizerNode;

  // AudioParam;
  useEffect(() => {
    node.filters.forEach((filter, index) => {
      filter.gain.setTargetAtTime(gains[index], filter.context.currentTime, 0.015);
    });
  }, [node, gains]);
  useEffect(() => {
    node.filters.forEach(filter => {
      filter.Q.setTargetAtTime(octaveBandwidthToQ(bandwidth), filter.context.currentTime, 0.015);
    });
  }, [node, bandwidth]);

  return (
    <Node id={id} inputs={["input"]} outputs={["output"]} title="EQ" type={type}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <div className="equalizer">
              {node.filters.map((filter, index) => (
                <div key={index}>
                  <input
                    max={12}
                    min={-12}
                    onChange={e =>
                      onChange({ gains: produce(gains, (draft: number[]) => void (draft[index] = +e.target.value)) })
                    }
                    step={0.1}
                    title={`Gain: ${gains[index]} dB`}
                    type="range"
                    value={gains[index]}
                  />
                  {formatFrequency(filter.frequency.value)}
                </div>
              ))}
            </div>
          </div>
          <div className="customNode_item">
            <input
              max={4}
              min={0.5}
              step={0.5}
              onChange={e => onChange({ bandwidth: +e.target.value })}
              title={`Bandwidth: ${bandwidth} octaves`}
              type="range"
              value={bandwidth}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Equalizer);
