import { useCallback, useEffect, useRef } from "react";

interface Options {
  maxFPS?: number;
}

export default function useAnimationFrame(callback: FrameRequestCallback, options?: Options): void {
  const previousTimeRef = useRef<DOMHighResTimeStamp>();
  const requestRef = useRef<number>();
  const maxFPS = options?.maxFPS;

  const animate = useCallback(
    (time: DOMHighResTimeStamp): void => {
      if (previousTimeRef.current != null) {
        const deltaTime = time - previousTimeRef.current;
        if (!maxFPS || deltaTime > 1000 / maxFPS) {
          callback(deltaTime);
          previousTimeRef.current = time;
        }
      } else {
        callback(0);
        previousTimeRef.current = time;
      }

      requestRef.current = requestAnimationFrame(animate);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return (): void => {
      if (requestRef.current != null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
}
