import { useState } from "react";
import { a, useSpring } from "react-spring";
import Thermometer from "./Thermometer/Thermometer";
import ThumbSlider from "./ThumbSlider/ThumbSlider";

export interface Props {
  max: number;
  min: number;
  initialValue: number;
  currentValue: number;
  setCurrentValue: (newIndex: number) => void;
  onPointerUp: () => void;
  onCancel: () => void;
}

const ReorderOverlay: React.FC<Props> = ({
  max,
  min,
  initialValue,
  currentValue,
  setCurrentValue,
  onPointerUp,
  onCancel,
}) => {
  return (
    <div
      className="
        h-[calc(100vh_-_0px)] w-screen
        bg-[rgba(20,_20,_20,_0.9)]
        fixed top-0 left-0 z-50 p-4
        flex justify-end items-end
      "
    >
      <div
        className="h-full basis-6/12 py-8"
        onClick={() => onCancel()}
      >
        {initialValue}
      </div>
      <div className="h-full flex flex-row  basis-6/12 py-8">
        <Thermometer
          min={min}
          max={max}
          currentValue={currentValue}
          initialValue={initialValue}
        />
        <ThumbSlider
          onChange={setCurrentValue}
          onPointerUp={onPointerUp}
          value={currentValue}
          max={max}
          min={min}
        />
      </div>
    </div>
  );
};

export default ReorderOverlay;
