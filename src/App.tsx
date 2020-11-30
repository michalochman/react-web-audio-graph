import React from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import Audio from "components/Audio";
import Flow from "components/Flow";
import Nodes from "components/Nodes";

function getPosition() {
  return {
    x: Math.floor((Math.random() * 0.9 * window.innerWidth) / 20) * 20,
    y: Math.floor((Math.random() * 0.9 * window.innerHeight) / 20) * 20,
  };
}

const nodes = [
  {
    id: "Oscillator-note",
    type: "OscillatorNote",
    data: {
      octave: 4,
      twelfth: 0,
      type: "sine",
    },
    position: getPosition(),
  },
  {
    id: "Oscillator-lfo",
    type: "Oscillator",
    data: {
      frequency: 0.25,
      type: "sine",
    },
    position: getPosition(),
  },
  {
    id: "Gain-note",
    type: "Gain",
    data: {
      gain: 0.1,
    },
    position: getPosition(),
  },
  {
    id: "Gain-lfo",
    type: "Gain",
    data: {
      gain: 0.2,
    },
    position: getPosition(),
  },
  {
    id: "Gain-master",
    type: "Gain",
    data: {
      gain: 1,
    },
    position: getPosition(),
  },
  {
    id: "Analyser-1",
    type: "Analyser",
    position: getPosition(),
  },
  {
    id: "Analyser-2",
    type: "Analyser",
    position: getPosition(),
  },
  {
    id: "Analyser-3",
    type: "Analyser",
    position: getPosition(),
  },
  {
    id: "Destination-speakers",
    type: "Destination",
    position: getPosition(),
  },
];

function App() {
  return (
    <Audio>
      <Nodes>
        <ReactFlowProvider>
          <Flow edges={[]} nodes={nodes} />
        </ReactFlowProvider>
      </Nodes>
    </Audio>
  );
}

export default App;
