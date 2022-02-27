import React, { useCallback, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import { useNode } from "context/NodeContext";
import useMediaDevices from "hooks/useMediaDevices";
import { getDeviceAudioStream, MediaStreamWithDeviceId } from "utils/mediaDevices";

function InputAudioStream({ id, type, selected }: NodeProps) {
  const inputDevices = useMediaDevices("audioinput");
  const [stream, setStream] = useState<MediaStreamWithDeviceId>();
  const setDeviceStream = useCallback(
    async e => {
      const deviceId = inputDevices.find(info => info.deviceId === e.target.value)?.deviceId;
      const stream = deviceId ? await getDeviceAudioStream(deviceId) : undefined;
      setStream(stream);
    },
    [inputDevices]
  );

  // AudioNode
  useNode(id, context => (stream ? context.createMediaStreamSource(stream) : context.createGain()), [stream]);

  // Cleanup only, note the double () =>
  useEffect(() => () => void stream?.getTracks().forEach((track: any) => track.stop()), [stream]);

  return (
    <Node id={id} outputs={["output"]} type={type} title={`Source: Audio Input Stream`}>
      {selected && (
        <select value={stream?.deviceId ?? "-"} onChange={setDeviceStream}>
          <option value={undefined}>-</option>
          {inputDevices.map(deviceInfo => (
            <option key={deviceInfo.deviceId} value={deviceInfo.deviceId}>
              {deviceInfo.label}
            </option>
          ))}
        </select>
      )}
    </Node>
  );
}

export default React.memo(InputAudioStream);
