import { a, config, useSpring } from "react-spring";
import { useDrag, Vector2 } from "@use-gesture/react";
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

  const [{ y }, api] = useSpring(() => ({
    y: 0,
  }));
  const frame = useRef<HTMLDivElement | null>(null);
  const bind = useDrag(({ offset: [,y], ...props }) => {
    const t = props;
    debugger;
    const percent = y / height;
    api.start({ y })
  }, {
    rubberband: true,
    bounds: { left: 0, right: 0, top: 0, bottom: height }
  });
  useEffect(() => {

  console.log({ frame })
    setHeight( frame?.current?.clientHeight ?
      frame?.current?.clientHeight
      : 100)
  }, []);
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
      <a.div {...bind()} className="absolute" style={{ backgroundColor:'gray' }}>
        <a.div   
          className="
            rounded-sm h-4
            w-32 px-4
            bg-neutral-400
          "
          style={{ y }}
        />
    </a.div>
    </div>
  );
};

export default ThumbSlider;
