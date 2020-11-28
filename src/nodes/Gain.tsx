import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo } from "react";
import { AudioContext } from "context/AudioContext";

interface Props {
  gain: number;
}

type Ref = GainNode;

const Gain = forwardRef<Ref, Props>(function ({ gain }, ref) {
  const context = useContext(AudioContext);
  const node = useMemo<GainNode>(
    () => {
      const node = context.createGain();
      node.gain.value = gain;

      return node;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context]
  );

  useEffect(
    () => {
      node.gain.setValueAtTime(gain, 0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gain]
  );

  useEffect(() => {
    node.connect(context.destination);
    return () => node.disconnect(context.destination);
  }, [node]);

  useImperativeHandle(ref, () => node);

  return null;
});
Gain.displayName = "Gain";

export default Gain;
