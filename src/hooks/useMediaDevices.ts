import { useEffect, useState } from "react";

export default function useMediaDevices(kind: "audioinput" | "audiooutput"): MediaDeviceInfo[] {
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    (async () => {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      navigator.mediaDevices
        .enumerateDevices()
        .then(devices => setMediaDevices(devices.filter(device => device.kind === kind)))
        .catch(() => {});
    })();
  }, [kind]);

  return mediaDevices;
}
