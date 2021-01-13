import React from "react";

interface Props {
  addNode: (node: string) => void;
}

function FlowContextMenu({ addNode }: Props) {
  return (
    <ul className="contextMenu">
      <li>
        Sources
        <ul className="contextMenu sub">
          <li onClick={() => addNode("Gate")}>Gate</li>
          <li onClick={() => addNode("Keyboard")}>Keyboard</li>
          <li onClick={() => addNode("Metronome")}>Metronome</li>
          <li onClick={() => addNode("Noise")}>Noise</li>
          <li onClick={() => addNode("Oscillator")}>Oscillator</li>
          <li onClick={() => addNode("OscillatorNote")}>Oscillator Note</li>
        </ul>
      </li>
      <li>
        Destinations
        <ul className="contextMenu sub">
          <li onClick={() => addNode("Destination")}>Destination</li>
        </ul>
      </li>
      <li>
        Effects
        <ul className="contextMenu sub">
          <li onClick={() => addNode("BiquadFilter")}>Biquad Filter</li>
          <li onClick={() => addNode("Delay")}>Delay</li>
          <li onClick={() => addNode("DelayEffect")}>Delay Effect</li>
          <li onClick={() => addNode("DynamicsCompressor")}>Dynamics Compressor</li>
          <li onClick={() => addNode("Gain")}>Gain</li>
          <li onClick={() => addNode("Rectifier")}>Rectifier</li>
          <li onClick={() => addNode("Sign")}>Sign</li>
          <li onClick={() => addNode("StereoPanner")}>Stereo Panner</li>
          <li onClick={() => addNode("Transformer")}>Transformer</li>
          <li onClick={() => addNode("WaveShaper")}>Wave Shaper</li>
          <li onClick={() => addNode("ChannelMerger")}>Channel Merger</li>
          <li onClick={() => addNode("ChannelSplitter")}>Channel Splitter</li>
        </ul>
      </li>
      <li>
        Controllers
        <ul className="contextMenu sub">
          <li onClick={() => addNode("ADSR")}>ADSR</li>
          <li onClick={() => addNode("ConstantSource")}>Constant Source</li>
          <li onClick={() => addNode("Envelope")}>Envelope</li>
          <li onClick={() => addNode("InputSwitch")}>Input Switch</li>
          <li onClick={() => addNode("OutputSwitch")}>Output Switch</li>
        </ul>
      </li>
      <li>
        Logic
        <ul className="contextMenu sub">
          <li onClick={() => addNode("AndGate")}>AND Gate</li>
          <li onClick={() => addNode("NotGate")}>NOT Gate</li>
          <li onClick={() => addNode("OrGate")}>OR Gate</li>
          <li onClick={() => addNode("XorGate")}>XOR Gate</li>
        </ul>
      </li>
      <li>
        Analysers
        <ul className="contextMenu sub">
          <li onClick={() => addNode("Analyser")}>Analyser</li>
        </ul>
      </li>
    </ul>
  );
}

export default React.memo(FlowContextMenu);
