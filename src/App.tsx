import React, { useRef, useState } from "react";
import Audio from "components/Audio";
import Oscillator from "nodes/Oscillator";
import Gain from "nodes/Gain";
import { getNoteFrequency, getNoteName } from "utils/notes";

function App() {
  const [gainRef1, setGainRef1] = useState<GainNode>();
  const [gainRef2, setGainRef2] = useState<GainNode>();
  const noteRef = useRef<OscillatorNode | null>(null);
  const [gain1, setGain1] = useState(1);
  const [gain2, setGain2] = useState(1);
  const [type, setType] = useState<OscillatorType>("sine");
  const [gainToggle, setGainToggle] = useState(true);

  const [octave, setOctave] = useState(4);
  const [twelfth, setTwelfth] = useState(0);
  const frequency = getNoteFrequency(octave, twelfth);
  const note = getNoteName(octave, twelfth);

  return (
    <Audio>
      <Gain ref={c => c && setGainRef1(c)} gain={gain1} />
      <Gain ref={c => c && setGainRef2(c)} gain={gain2} />
      <Oscillator ref={noteRef} frequency={frequency} output={gainToggle ? gainRef1 : gainRef2} type={type} />

      <div>
        Volume:
        <button onClick={() => setGainToggle(t => !t)}>{gainToggle ? "<" : ">"}</button>
        <br />
        <input type="range" max="1" min="0" step={0.01} value={gain1} onChange={e => setGain1(+e.target.value)} />
        {gain1}
        <br />
        <input type="range" max="1" min="0" step={0.01} value={gain2} onChange={e => setGain2(+e.target.value)} />
        {gain2}
      </div>
      <div>
        Octave:
        <button onClick={() => setOctave(o => (o > 0 ? o - 1 : o))}>-</button>
        <button onClick={() => setOctave(o => (o < 8 ? o + 1 : o))}>+</button>
        {octave}
        <br />
        Twelfth:
        <button onClick={() => setTwelfth(t => (t > 0 ? t - 1 : t))}>-</button>
        <button onClick={() => setTwelfth(t => (t < 11 ? t + 1 : t))}>+</button>
        {twelfth}
        <br />
        {note} @ {frequency}
      </div>
      <div>
        Wave:
        <select onChange={e => setType(e.target.value as OscillatorType)} value={type}>
          <option value="sawtooth">sawtooth</option>
          <option value="square">square</option>
          <option value="sine">sine</option>
          <option value="triangle">triangle</option>
        </select>
      </div>
      <button onClick={() => noteRef.current?.start()}>start</button>
      <button onClick={() => noteRef.current?.stop()}>stop</button>
    </Audio>
  );
}

export default App;
