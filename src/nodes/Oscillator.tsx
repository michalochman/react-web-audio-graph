import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo } from "react";
import { AudioContext } from "context/AudioContext";

interface Props {
  detune?: number;
  frequency: number;
  output?: AudioNode;
  type: OscillatorType;
}
interface Ref {
  start: () => void;
  stop: () => void;
}

const Oscillator = forwardRef<Ref, Props>(function Oscillator({ detune, frequency, output, type }, ref) {
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

  useEffect(() => {
    if (!output) return;

    node.connect(output);
    return () => output && node.disconnect(output);
  }, [output]);

  useImperativeHandle(ref, () => ({
    start: () => output && node.connect(output),
    stop: () => output && node.disconnect(output),
  }));

  return null;
});
Oscillator.displayName = "Oscillator";

export default Oscillator;
