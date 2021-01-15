import React from "react";

interface Props {
  checked: boolean;
  labelOff?: string;
  labelOn?: string;
  onChange: () => void;
}

function Toggle({ checked, labelOff = "off", labelOn = "on", onChange }: Props) {
  return (
    <label className="toggle">
      <input checked={checked} onChange={onChange} type="checkbox" />
      <span className="option">{labelOn}</span>
      <span className="option">{labelOff}</span>
    </label>
  );
}

export default Toggle;
