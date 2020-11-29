import React, { useCallback, useEffect, useState } from "react";
import { Handle, Node, Position } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Visualiser from "./Visualiser";

type Props = Node;

const Analyser = ({ id }: Props) => {
  const node = useNode<AnalyserNode>(id);

  const [audioData, setAudioData] = useState(new Uint8Array(0));

  const tick = useCallback((): number => {
    const dataArray = new Uint8Array(node.frequencyBinCount);
    node.getByteTimeDomainData(dataArray);
    setAudioData(dataArray);
    return requestAnimationFrame(tick);
  }, [node]);

  useEffect(() => {
    const rafId = tick();
    return () => cancelAnimationFrame(rafId);
  }, [tick]);

  return (
    <div className="customNode" title={id}>
      <Handle id="input" position={Position.Left} type="target" />

      <div>input</div>

      <Visualiser data={audioData} height={50} style={{ background: "#ddd" }} width={200} />
    </div>
  );
};

export default Analyser;
