import { useState } from "react";
import { a, useSpring } from "react-spring";

export interface Props {
  onChange: (value: number) => void;
  onPointerUp: () => void;
  value: number;
  min: number;
  max: number
}

const ThumbSlider: React.FC<Props> = ({
  onChange,
  onPointerUp,
  value,
  min,
  max,
}) => {
  return (
    <div
      className="
        outline-rose-200 
        rounded-lg
        h-full
        outline-2 focus-within:outline outline-offset-2
      "
    >
      <input
        className="gh h-full slider rotate-180"
        step="1" 
        onChange={(e) => onChange(parseInt(e.target.value))}
        onPointerUp={() => onPointerUp()}
        type="range"
        min={min}
        max={max}
        value={value}
        data-attribute-value={value}
      /> 
    </div>
  );
};

export default ThumbSlider;
