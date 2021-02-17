import React, { useCallback } from "react";

interface Props
  extends Omit<React.HTMLProps<HTMLInputElement>, "max" | "min" | "onChange" | "step" | "type" | "value"> {
  onChange: (value: number) => void;
  type: SliderType;
  value: number;
}

export enum SliderType {
  Linear = "Linear",
  Log = "Log",
}

function lin2log(value: number): number {
  return (Math.pow(10, value) - 1) / 9;
}

function log2lin(value: number): number {
  return Math.log10(1 + value * 9);
}

function Slider({ onChange, type, value, ...props }: Props) {
  const min = 0;
  const max = 1;
  let step = 0.001;
  let valueShown = value;
  if (type === SliderType.Log) {
    step = 9 / ((max - min) / step);
    valueShown = lin2log(valueShown);
  }

  const change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = +e.target.value;
      if (type === SliderType.Log) {
        newValue = log2lin(newValue);
      }

      onChange(newValue);
    },
    [onChange, type]
  );

  return <input {...props} type="range" max={max} min={min} step={step} onChange={change} value={valueShown} />;
}

export default Slider;
