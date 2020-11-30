import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Handle, Node, Position } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import Visualiser from "./Visualiser";

type Props = Node;

const Analyser = ({ id }: Props) => {
  const [audioData, setAudioData] = useState(new Uint8Array(0));

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<AnalyserNode>(() => context.createAnalyser(), [context]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  // AudioParam
  useEffect(() => void (node.fftSize = 2048), [node]);

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
