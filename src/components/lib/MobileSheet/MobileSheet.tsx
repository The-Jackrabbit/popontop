import React, { useEffect, useState } from 'react';

import { a, useSpring, config } from '@react-spring/web';
import { useDrag } from '@use-gesture/react'
export interface Props {
  children?: React.ReactNode;
  isTop?: boolean;
  layer?: number;
  onClose: () => void;
}

export const MobileSheet: React.FC<Props> = ({
  children,
  isTop = true,
  layer = 0,
  onClose,
}) => {
  const [windowHeight, setWindowHeight] = useState('100vh');

  const height = 667;

  useEffect(() => {
    if (window) {
      open({ canceled: false });
      setWindowHeight(`${window.innerHeight}px`)
    }
  }, []); 
 
  const [{ y }, api] = useSpring(() => ({ y: height }));

  const open = ({ canceled }: { canceled: boolean }) => {
    // when cancel is true, it means that the user passed the upwards threshold
    // so we change the spring config to create a nice wobbly effect
    api.start({
      y: 0,
      immediate: false,
      config: canceled ? config.wobbly : config.stiff
    });
  };
  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...config.stiff, velocity }
    });
  };
  const bind = useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
      canceled
    }) => {
      // debugger
      // if the user drags up passed a threshold, then we cancel
      // the drag so that the sheet resets to its open position
      if (my < -300) cancel();

      // when the user releases the sheet, we check whether it passed
      // the threshold for it to close, or if we reset it to its open positino
      if (last) {
        my > height * 0.5 || (vy > 0.5 && dy > 0)
          ? close(vy)
          : open({ canceled });
      }
      // when the user keeps dragging, we just move the sheet according to
      // the cursor position
      else api.start({ y: my, immediate: true });
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true
    }
  );

  const display = y.to((py) => (py < height ? "block" : "none"));

  const bgStyle = {
    transform: y.to(
      [0, height],
      ["translateY(-8%) scale(1.16)", "translateY(0px) scale(1.05)"]
    ),
    opacity: y.to([0, height], [0.4, 1], "clamp")
  };

  useEffect(() => {
    console.log({ y });
  }, [y]);
  return (
    <a.div
      className={`
        sheet
        overflow-y-scroll w-screen h-[${windowHeight}]
        z-${(1+layer)*10}
        shadow-inner
         inset-0
        justify-center ${isTop ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-neutral-200 dark:bg-neutral-700'}  rounded-t-2xl
        transition-transform duration-1000
      `}
      {...bind()}
      style={{ height: windowHeight, marginTop: layer*10, display, bottom: `calc(-100vh + ${height - 100}px)`, y}}
    
    >
      <div onClick={() => onClose()} className="h-6 w-screen flex justify-center items-center">
        {isTop ? <div className="w-36 h-2 rounded-full bg-neutral-500 dark:bg-neutral-400"></div> : null}
      </div>
      <div className="px-6">
        {children}
      </div>
    </a.div>
  )
};

export default MobileSheet;