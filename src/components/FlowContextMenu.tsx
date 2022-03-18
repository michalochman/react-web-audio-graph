import React from "react";

interface Props {
  addNode: (node: string) => void;
}

const items = [
  {
    items: [
      { label: "Audio Buffer Source", node: "AudioBufferSource" },
      { label: "Audio Input Stream", node: "InputAudioStream" },
      { label: "Gate", node: "Gate" },
      { label: "Keyboard", node: "Keyboard" },
      { label: "Metronome", node: "Metronome" },
      { label: "Noise", node: "Noise" },
      { label: "Oscillator", node: "Oscillator" },
      { label: "Oscillator Note", node: "OscillatorNote" },
    ],
    label: "Sources",
  },
  {
    items: [{ label: "Destination", node: "Destination" }],
    label: "Destinations",
  },
  {
    items: [
      { label: "Biquad Filter", node: "BiquadFilter" },
      { label: "Channel Merger", node: "ChannelMerger" },
      { label: "Channel Splitter", node: "ChannelSplitter" },
      { label: "Clipper", node: "Clipper" },
      { label: "Convolver", node: "Convolver" },
      { label: "Delay", node: "Delay" },
      { label: "Delay Effect", node: "DelayEffect" },
      { label: "Dynamics Compressor", node: "DynamicsCompressor" },
      { label: "Equalizer", node: "Equalizer" },
      { label: "Gain", node: "Gain" },
      { label: "Quantizer", node: "Quantizer" },
      { label: "Rectifier", node: "Rectifier" },
      { label: "Sample and Hold", node: "SampleAndHold" },
      { label: "Sign", node: "Sign" },
      { label: "Stereo Panner", node: "StereoPanner" },
      { label: "Transformer", node: "Transformer" },
      { label: "Wave Shaper", node: "WaveShaper" },
    ],
    label: "Effects",
  },
  {
    items: [
      { label: "ADSR", node: "ADSR" },
      { label: "Constant Source", node: "ConstantSource" },
      { label: "Mixer", node: "Mixer" },
      { label: "Input Switch", node: "InputSwitch" },
      { label: "Output Switch", node: "OutputSwitch" },
      { label: "XY Pad", node: "XYPad" },
    ],
    label: "Controllers",
  },
  {
    items: [
      { label: "AND Gate", node: "AndGate" },
      { label: "Comparator", node: "Comparator" },
      { label: "NOT Gate", node: "NotGate" },
      { label: "OR Gate", node: "OrGate" },
      { label: "XOR Gate", node: "XorGate" },
    ],
    label: "Logic",
  },
  {
    items: [
      { label: "Analyser", node: "Analyser" },
      { label: "Beat Detector", node: "BeatDetector" },
      { label: "Meter", node: "Meter" },
      { label: "Pitch Detector", node: "PitchDetector" },
      { label: "Tuner", node: "Tuner" },
    ],
    label: "Analysers",
  },
  { label: "Sub Flow", node: "SubFlow" },
];

function FlowContextMenu({ addNode }: Props) {
  return (
    <ul className="contextMenu">
      {items.map(item => (
        <li key={item.label} onClick={item.items ? undefined : () => addNode(item.node)}>
          {item.label}
          {item.items && (
            <>
              <span>&#x276F;</span>
              <ul className="contextMenu sub">
                {item.items.map(subitem => (
                  <li key={subitem.label} onClick={() => addNode(subitem.node)}>
                    {subitem.label}
                  </li>
                ))}
              </ul>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default React.memo(FlowContextMenu);
