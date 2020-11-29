import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo } from "react";
import { AudioContext } from "context/AudioContext";

interface Props {
  children?: React.ReactNode; // TODO temporarily for easier testing of notes
  detune?: number;
  frequency: number;
  id: string;
  type: OscillatorType;
}

type Ref = OscillatorNode;

const Oscillator = forwardRef<Ref, Props>(function Oscillator({ detune, frequency, type }, ref) {
  const context = useContext(AudioContext);

  const node = useMemo(
    () => context.createOscillator(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context]
  );

  useEffect(() => {
    node.detune.value = detune ?? 0;
    node.frequency.value = frequency;
    node.type = type;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detune, frequency, type]);

  useEffect(() => {
    node.start();
    return () => node.stop();
  }, [node]);

  useImperativeHandle(ref, () => node);

  return null;
});
Oscillator.displayName = "Oscillator";

export default Oscillator;
