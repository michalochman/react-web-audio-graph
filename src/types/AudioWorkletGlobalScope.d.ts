// See: https://github.com/microsoft/TypeScript/issues/28308#issuecomment-650802278
declare function registerProcessor(
  name: string,
  processorCtor: typeof AudioWorkletProcessor & {
    parameterDescriptors?: AudioParamDescriptor[];
  }
);

declare const currentFrame: number;
declare const currentTime: number;
declare const sampleRate: number;
