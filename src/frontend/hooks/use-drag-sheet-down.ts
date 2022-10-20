import React, { useEffect, useState } from 'react';
import { useSpring, config } from '@react-spring/web';
import { useDrag } from '@use-gesture/react'

export interface Props {
  children?: React.ReactNode;
  isTop?: boolean;
  layer?: number;
  onClose: () => void;
}

export function useDragSheetDown(height: number, onCloseCallback: () => void) {
  const [{ y }, api] = useSpring(() => ({ y: height }));
  const [windowHeight, setWindowHeight] = useState('100vh');

  const open = ({ canceled }: { canceled: boolean }) => {
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
    onCloseCallback();
  };

  useEffect(() => {
    if (window) {
      open({ canceled: false });
      setWindowHeight(`${window.innerHeight}px`)
    }
  }, []); 

  const bind = useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
      canceled
    }) => {
      if (my < -40){
        console.log('cancel');
        cancel();
      }

      if (last) {
        my > height * 0.5 || (vy > 0.5 && dy > 0)
          ? close(vy)
          : open({ canceled });
      }
      else {
        api.start({ y: my, immediate: true });
        console.log({my})
      }
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
      ["translateY(-8%)", "translateY(0px)"]
    ),
    opacity: y.to([0, height], [0.4, 1], "clamp")
  };

  return {
    bgStyle,
    bind,
    close,
    display,
    open,
    windowHeight,
    y
  };
}