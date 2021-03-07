import React, { useCallback, useRef } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import { AudioBufferSourceNode } from "utils/audioContext";

function AudioBufferSource({ data, id, selected, type }: NodeProps) {
  const { loop = true, onChange } = data;
  const activeBufferSource = useRef<AudioBufferSourceNode>();

  // TODO buffer source -> gain and swap buffer
  // AudioNode
  const node = useNode(id, context => context.createGain());

  const linkBufferSource = useCallback(
    (bufferSource: AudioBufferSourceNode) => {
      // cleanup previous
      activeBufferSource.current?.disconnect();
      activeBufferSource.current = bufferSource;

      // start new
      activeBufferSource.current.connect(node);
    },
    [node]
  );
  const start = useCallback(() => {
    if (!activeBufferSource.current) {
      return;
    }

    const bufferSource = node.context.createBufferSource();
    bufferSource.buffer = activeBufferSource.current.buffer;
    bufferSource.loop = loop;

    linkBufferSource(bufferSource);
    activeBufferSource.current.start();
  }, [node, loop, linkBufferSource]);
  const stop = useCallback(() => {
    try {
      activeBufferSource.current?.stop();
    } catch {}
  }, []);

  const handleNewFile = useCallback(
    async (file: File) => {
      const bufferSource = node.context.createBufferSource();
      bufferSource.buffer = await node.context.decodeAudioData(await file.arrayBuffer());
      bufferSource.loop = loop;

      linkBufferSource(bufferSource);
    },
    [node, loop, linkBufferSource]
  );

  const handleChange = useCallback(
    e => {
      e.preventDefault();
      handleNewFile(e.target.files[0]);
    },
    [handleNewFile]
  );
  const handleDragOver = useCallback(e => void e.preventDefault(), []);
  const handleDrop = useCallback(
    async e => {
      e.preventDefault();
      const file: File = [...e.dataTransfer.items]
        .filter((item: DataTransferItem) => item.kind === "file")[0]
        .getAsFile();
      handleNewFile(file);
    },
    [handleNewFile]
  );

  return (
    <Node
      id={id}
      outputs={["output"]}
      title="Buffer Source"
      type={type}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="customNode_editor nodrag">
        <div className="customNode_item">
          <button onClick={start}>Play</button>
          <button onClick={stop}>Stop</button>
        </div>
        {selected && (
          <>
            <div className="customNode_item">
              <input onChange={handleChange} type="file" />
            </div>
            <div className="customNode_item">
              <label>
                <input checked={loop} onChange={() => onChange({ loop: !loop })} title="Loop" type="checkbox" />
                Loop
              </label>
            </div>
          </>
        )}
      </div>
    </Node>
  );
}

export default React.memo(AudioBufferSource);
