import React, { useEffect, useState } from 'react';
import { useSpring, SpringValue, config } from '@react-spring/web';
import { useDrag, Vector2 } from '@use-gesture/react';
import { isIntentionalYAxisGesture } from '../../../utils/directions';
import { Interpolation } from 'react-spring';
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';

export interface Props {
  children?: React.ReactNode;
  isTop?: boolean;
  layer?: number;
  onClose: () => void;
}

export function useDragSheetDown(
  height: number,
  onCloseCallback: () => void
): {
  bgStyle: {
    transform: Interpolation<number, 'translateY(-8%)' | 'translateY(0px)'>;
    opacity: Interpolation<number, 0.4 | 1>;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bind: (...args: any[]) => ReactDOMAttributes;
  close: (velocity?: number) => void;
  display: Interpolation<number, 'block' | 'none'>;
  open: ({ canceled }: { canceled: boolean }) => void;
  windowHeight: string;
  y: SpringValue<number>;
} {
  const [{ y }, api] = useSpring(() => ({ y: height }));
  const [windowHeight, setWindowHeight] = useState('100vh');

  const open = ({ canceled }: { canceled: boolean }) => {
    api.start({
      y: 0,
      immediate: false,
      config: canceled ? config.wobbly : config.stiff,
    });
  };

  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...config.stiff, velocity },
      onRest: () => {
        onCloseCallback();
      },
    });
  };

  useEffect(() => {
    if (window) {
      setWindowHeight(`${window.innerHeight - 16}px`);
    }
  }, []);

  const bind = useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [mx, my],
      cancel,
      canceled,
    }) => {
      if (!isIntentionalYAxisGesture(mx, my)) {
        return;
      }
      if (my < -40) {
        cancel();
      }

      if (last) {
        my > height * 0.5 || (vy > 0.5 && dy > 0)
          ? close(vy)
          : open({ canceled });
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      threshold: [100, 0] as Vector2,
      rubberband: true,
    }
  );

  const display = y.to((py) => (py < height ? 'block' : 'none'));

  const bgStyle = {
    transform: y.to([0, height], ['translateY(-8%)', 'translateY(0px)']),
    opacity: y.to([0, height], [0.4, 1], 'clamp'),
  };

  return {
    bgStyle,
    bind,
    close,
    display,
    open,
    windowHeight,
    y,
  };
}
