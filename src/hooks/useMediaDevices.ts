import { useEffect, useState } from "react";

export default function useMediaDevices(kind: "audioinput" | "audiooutput"): MediaDeviceInfo[] {
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(devices => setMediaDevices(devices.filter(device => device.kind === kind)))
      .catch(() => {});
  }, [kind]);

  return mediaDevices;
}
