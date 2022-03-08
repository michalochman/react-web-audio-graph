import React, { useCallback, useEffect, useRef } from "react";
import { RadialGauge as Gauge, RadialGaugeOptions } from "canvas-gauges";

const RadialGauge = function RadialGauge(props: Omit<RadialGaugeOptions, "renderTo">) {
  const canvasRef = useRef();
  const gaugeRef = useRef<Gauge | undefined>(undefined);
  const drawGauge = useCallback(canvas => {
    if (!canvasRef.current) {
      canvasRef.current = canvas;
      gaugeRef.current = new Gauge({
        ...props,
        renderTo: canvasRef.current!,
      });
      gaugeRef.current.draw();
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    gaugeRef.current?.update({ ...props });
  }, [props]);

  return <canvas ref={drawGauge} />;
};

export default React.memo(RadialGauge);
