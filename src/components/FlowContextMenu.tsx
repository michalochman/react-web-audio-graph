import React from "react";

interface Props {
  addNode: (node: string) => void;
}

function FlowContextMenu({ addNode }: Props) {
  return (
    <ul className="contextMenu">
      <li onClick={() => addNode("ADSR")}>Add ADSR</li>
      <li onClick={() => addNode("Analyser")}>Add Analyser</li>
      <li onClick={() => addNode("BiquadFilter")}>Add Biquad Filter</li>
      <li onClick={() => addNode("ChannelMerger")}>Add Channel Merger</li>
      <li onClick={() => addNode("ChannelSplitter")}>Add Channel Splitter</li>
      <li onClick={() => addNode("ConstantSource")}>Add Constant Source</li>
      <li onClick={() => addNode("Delay")}>Add Delay</li>
      <li onClick={() => addNode("Destination")}>Add Destination</li>
      <li onClick={() => addNode("DynamicsCompressor")}>Add Dynamics Compressor</li>
      <li onClick={() => addNode("Envelope")}>Add Envelope</li>
      <li onClick={() => addNode("DelayEffect")}>Add DelayEffect</li>
      <li onClick={() => addNode("Gain")}>Add Gain</li>
      <li onClick={() => addNode("Gate")}>Add Gate</li>
      <li onClick={() => addNode("InputSwitch")}>Add Input Switch</li>
      <li onClick={() => addNode("Keyboard")}>Add Keyboard</li>
      <li onClick={() => addNode("Metronome")}>Add Metronome</li>
      <li onClick={() => addNode("Noise")}>Add Noise</li>
      <li onClick={() => addNode("Oscillator")}>Add Oscillator</li>
      <li onClick={() => addNode("OscillatorNote")}>Add Oscillator Note</li>
      <li onClick={() => addNode("OutputSwitch")}>Add Output Switch</li>
      <li onClick={() => addNode("StereoPanner")}>Add Stereo Panner</li>
      <li onClick={() => addNode("WaveShaper")}>Add Wave Shaper</li>
    </ul>
  );
}

export default React.memo(FlowContextMenu);
