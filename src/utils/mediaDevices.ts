export interface MediaStreamWithDeviceId extends MediaStream {
  deviceId?: string;
}

export async function getDeviceAudioStream(deviceId: string) {
  const stream: MediaStreamWithDeviceId = await navigator.mediaDevices.getUserMedia({
    audio: { deviceId: { exact: deviceId } },
    video: false,
  });
  stream.deviceId = deviceId;

  return stream;
}
