import React, { useState } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import Audio from "components/Audio";
import Flow from "components/Flow";
import Nodes from "components/Nodes";
import Analyser from "nodes/Analyser";
import Destination from "nodes/Destination";
import Gain from "nodes/Gain";
import Oscillator from "nodes/Oscillator";

import { getNoteFrequency, getNoteName } from "utils/notes";

function App() {
  const [detune] = useState(0);
  const [type, setType] = useState<OscillatorType>("sine");
  const [octave, setOctave] = useState(4);
  const [twelfth, setTwelfth] = useState(0);
  const frequency = getNoteFrequency(octave, twelfth);
  const note = getNoteName(octave, twelfth);

  return (
    <Audio>
      <Nodes>
        <ReactFlowProvider>
          <Flow>
            <Oscillator id="note" frequency={frequency} type={type}>
              {/* TODO temporarily for easier testing of notes */}
              <div>detune: {detune.toFixed(2)}</div>
              <div>
                frequency:{" "}
                <div>
                  octave:
                  <button onClick={() => setOctave(o => (o > 0 ? o - 1 : o))}>-</button>
                  <button onClick={() => setOctave(o => (o < 8 ? o + 1 : o))}>+</button>
                  {octave}
                  <br />
                  twelfth:
                  <button onClick={() => setTwelfth(t => (t > 0 ? t - 1 : t))}>-</button>
                  <button onClick={() => setTwelfth(t => (t < 11 ? t + 1 : t))}>+</button>
                  {twelfth}
                  <br />
                  {note} @ {frequency.toFixed(2)}
                </div>
              </div>
              <div>
                type:
                <select onChange={e => setType(e.target.value as OscillatorType)} value={type}>
                  <option value="sawtooth">sawtooth</option>
                  <option value="square">square</option>
                  <option value="sine">sine</option>
                  <option value="triangle">triangle</option>
                </select>
              </div>
            </Oscillator>
            <Oscillator id="lfo" frequency={0.25} type="sine" />
            <Gain id="note" gain={0.1} />
            <Gain id="lfo" gain={0.2} />
            <Gain id="master" gain={1} />
            <Analyser id="note" />
            <Analyser id="lfo" />
            <Analyser id="master" />
            <Destination id="destination" />
          </Flow>
        </ReactFlowProvider>
      </Nodes>
    </Audio>
  );
}

export default App;
