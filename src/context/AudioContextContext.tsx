import { createContext, useContext } from "react";
import * as sac from "standardized-audio-context";

export const AudioContextContext = createContext<sac.AudioContext>(null!);

export function useAudioContext() {
  return useContext(AudioContextContext);
}
