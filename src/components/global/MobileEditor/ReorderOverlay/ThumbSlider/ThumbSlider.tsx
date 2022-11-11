import { useSpring } from "react-spring";
import { useDrag } from "@use-gesture/react";

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
  const [sliderYPosition, animateSliderYPosition] = useSpring(() => ({
    y: 0,
  }));
  const bind = useDrag(({ movement: [,my] }) => {
    animateSliderYPosition.start({
      y: my,
    });
  });
  const t = { orient: "vertical"} as any
  return (
    <div
      className="
        rounded-lg
        h-full
        outline-2 outline-rose-200  outline-offset-2 focus-within:outline
      "
    >
      <input
        className="vertical h-full slider rotate-180"
        step="1" 
        onChange={(e) => onChange(parseInt(e.target.value))}
        onPointerUp={() => onPointerUp()}
        type="range"
        {...t}
        min={min}
        max={max}
        value={value}
        data-attribute-value={value}
        list="tickmarks" />

      <datalist id="tickmarks">
        <option value="0" label="very cold!"></option>
        <option value="25" label="cool"></option>
        <option value="50" label="medium"></option>
        <option value="75" label="getting warm!"></option>
        <option value="100" label="hot!"></option>
      </datalist>
      {/* <a.div
        {...bind()}
        className="
          rounded-sm h-4 w-full
          bg-neutral-400
        "
        style={{ ...sliderYPosition }}
      /> */}
    </div>
  );
};

export default ThumbSlider;
