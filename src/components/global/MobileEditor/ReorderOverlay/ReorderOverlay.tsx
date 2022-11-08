import { useState } from "react";
import { a, useSpring } from "react-spring";
import Thermometer from "./Thermometer/Thermometer";
import ThumbSlider from "./ThumbSlider/ThumbSlider";

const ReorderOverlay: React.FC = () => {
  const heightAnimation = useSpring({
    from: {
      y: '0%',
    },
    to: {
      y: '100%'
    },
  });
  const max = 100;
  const [offset, setCurrentValue] = useState(37);
  const currentValue = max - offset

  return (
    <div
      className="
        h-[calc(100vh_-_55px)] w-screen
        bg-[rgba(20,_20,_20,_0.9)]
        fixed top-0 left-0 z-50 p-4
        flex justify-end items-end
      "
    >
      <div className="h-full basis-3/12 py-8"></div>
      <div className="h-full bg-neutral-300 basis-3/12 py-8">
        <a.div
          className="
            bg-red-600
            rounded-lg
            h-4 w-full
          "
          style={{ ...heightAnimation }}
        >
          <p className="text-xl text-neutral-900">{currentValue}</p>
        </a.div>
      </div>
      <div className="h-full bg-neutral-700 basis-3/12 py-8">
        <Thermometer
          min={0}
          max={100}
        />
      </div>
      <div className="h-full bg-neutral-800 basis-3/12 py-8">
        <ThumbSlider
          onChange={setCurrentValue}
          value={offset}
          max={100}
          min={1}
        />
      </div>
    </div>
  );
};

export default ReorderOverlay;
