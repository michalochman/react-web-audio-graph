import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo } from "react";
import { AudioContext } from "context/AudioContext";

interface Props {
  id: string;
}

type Ref = AnalyserNode;

const Analyser = forwardRef<Ref, Props>(function ({}, ref) {
  const context = useContext(AudioContext);
  const node = useMemo<AnalyserNode>(
    () => context.createAnalyser(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context]
  );

  useEffect(() => {
    node.fftSize = 2048;
  }, []);

  useImperativeHandle(ref, () => node);

  return null;
});
Analyser.displayName = "Analyser";

export default Analyser;
