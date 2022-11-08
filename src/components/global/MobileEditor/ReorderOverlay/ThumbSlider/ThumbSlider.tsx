import { useState } from "react";
import { a, useSpring } from "react-spring";

export interface Props {
  onChange: (value: number) => void;
  value: number;
  min: number;
  max: number
}

const ThumbSlider: React.FC<Props> = ({
  onChange,
  value,
  min,
  max,
}) => {
  return (
    <div
      className="
        outline-rose-200 
        rounded-lg
        outline-2 focus-within:outline outline-offset-2
      "
    >
      <input
       className="gh"
     step="1" 
        // className="
        //   slider shadow-lg 
        //   p-0 w-full text-lg 
        //   bg-transparent
        //   cursor-pointer
        //  focus-within:text-rose-300
        //   outline-none
        // "
        onChange={(e) => onChange(parseInt(e.target.value))}
        type="range"
        // orient="vertical"
        min={min}
        max={max}
        value={value}
        data-value={value}
      /> 
    </div>
  );
};

export default ThumbSlider;
