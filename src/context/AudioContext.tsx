import { createContext, useContext } from "react";

export const AudioContext = createContext<AudioContext>(null!);

export function useAudioContext() {
  return useContext(AudioContext);
}
