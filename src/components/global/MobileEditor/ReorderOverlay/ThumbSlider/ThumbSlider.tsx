import { a, config, useSpring } from "react-spring";
import { FullGestureState, useDrag, Vector2 } from "@use-gesture/react";
import { useState, useEffect, useRef } from "react";

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
  const [height, setHeight] = useState(100);
  const [{ y }, api] = useSpring(() => ({ y: 0 }));
  const frame = useRef<HTMLDivElement | null>(null);
  const getValue = (dragInfo: any, height: number, max: number, min: number): number => {
    if (!dragInfo) {
      return 0;
    }
    const percent = dragInfo.offset[1]/height;
    const valueAsFloat = (max-min)*percent + min;
    const value = Math.round(valueAsFloat);

    return value;
  }
  const bind = useDrag((props) => {
    const { offset: [,y] } = props;
    const value = getValue(dragInfo, height, max, min);
    onChange(value);
    api.start({ y })
    setDragInfo(props)
  }, {
    rubberband: true,
    bounds: { left: 0, right: 0, top: 0, bottom: height }
  });
  const [dragInfo, setDragInfo] = useState<null | Omit<FullGestureState<"drag">, "event"> & {
    event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
}>(null);
  useEffect(() => {
    setHeight( frame?.current?.clientHeight ?
      frame?.current?.clientHeight
      : 100)
  }, []);
  const values = {
    min: min,
    max: max,
    offset: dragInfo ? dragInfo.offset[1] : 0,
    height,
    value: dragInfo ? Math.ceil((max-min)*(dragInfo.offset[1]/height) + min) : 0,
  }
  return (
    <div
      ref={frame}
      className="
        rounded-lg
        h-full w-12
        relative
        outline-2 outline-rose-200  outline-offset-2 focus-within:outline
      "
    >
      {/* {dragInfo && (<div className="text-white overflow-x-hidden fixed max-w-6 -translate-x-48 ">

      <p>min {min}</p>
      <p>max {max}</p>
      <p>height {values.height}</p>
      <p>value {values.value}</p>
  
      </div>)} */}
      <a.div {...bind()} className="absolute"  >
        <a.div   
          className="
            rounded-sm h-4
            w-32 mx-4
            bg-neutral-400
          "
          style={{ y }}
        />
    </a.div>
    </div>
  );
};

export default ThumbSlider;
