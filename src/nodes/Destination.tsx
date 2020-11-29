import { forwardRef, useContext, useImperativeHandle } from "react";
import { AudioContext } from "context/AudioContext";

interface Props {
  id: string;
}

type Ref = AudioDestinationNode;

const Destination = forwardRef<Ref, Props>(function ({ id }, ref) {
  const context = useContext(AudioContext);

  useImperativeHandle(ref, () => context.destination);

  return null;
});
Destination.displayName = "Destination";

export default Destination;
