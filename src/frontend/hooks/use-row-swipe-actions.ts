import { useSpring } from '@react-spring/web'
import { useState } from "react";
import { useDrag } from '@use-gesture/react';

export interface Props {
  leftSwipeAction: () => void;
  rightSwipeAction: () => void;
  setIsScrollDisabled: (value: boolean) => void;
  swipeLengthThreshold?: number;
}

export enum LiftActionZone {
  LEFT_ACTION = 'left-action',
  NOOP = 'noop',
  RIGHT_ACTION = 'right-action',
  ZERO = 'zero',
}

const BG_STYLES = {
  [LiftActionZone.LEFT_ACTION]:'linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)',
  [LiftActionZone.RIGHT_ACTION]: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
  [LiftActionZone.NOOP]: 'linear-gradient(120deg, #474747 100%, #171717 100%)',
  [LiftActionZone.ZERO]: 'linear-gradient(120deg, #171717 100%, #171717 100%)',
}

export const getCurrentZone = (offsetX: number, swipeLengthThreshold: number): LiftActionZone => {
  if (Math.abs(offsetX) < 5) {
    return LiftActionZone.ZERO;
  }
  if (offsetX > 0 && offsetX > swipeLengthThreshold) {
    return LiftActionZone.LEFT_ACTION;
  }
  
  if (offsetX < 0 && offsetX < -1*swipeLengthThreshold) {
    return LiftActionZone.RIGHT_ACTION;
  }

  return LiftActionZone.NOOP;
}

export const useRowSwipeActions = ({
  leftSwipeAction,
  rightSwipeAction,
  setIsScrollDisabled,
  swipeLengthThreshold = 100,
}: Props) => {
  const [layerActionText, setlayerActionText] = useState('');
  const [{ x, bg }, api] = useSpring(() => ({
    x: 0,
    bg: BG_STYLES[LiftActionZone.ZERO],
  }));

  const bind = useDrag(({ active, offset: [offsetX,] }) => {
    if (layerActionText !== '💿' && offsetX > 0) {
      setlayerActionText('💿');
    }

    if (layerActionText !== '🗑' && offsetX < 0) {
      setlayerActionText('🗑');
    }

    const isSwipeLengthOverThreshold = Math.abs(offsetX) > swipeLengthThreshold;
    const zone = getCurrentZone(offsetX, swipeLengthThreshold);
    const bg = BG_STYLES[zone];

    if (active) {
      setIsScrollDisabled(true);
      return api.start({
        x: offsetX,
        bg,
      });
    }
    setIsScrollDisabled(!true);

    if (!isSwipeLengthOverThreshold) {
      return api.start({
        x: 0,
        bg: BG_STYLES[LiftActionZone.ZERO],
      });
    }

    // const finalizeActionAnimations = {
    //   x: offsetX > 0 ? 400 : 0,
    //   immediate: true,
    // };

    if (isSwipeLengthOverThreshold) {
      if (offsetX < 0) {
        leftSwipeAction();
      } else {
        rightSwipeAction();
      }
    }

    // api.start(finalizeActionAnimations);
  });

  return {
    bg,
    bind,
    layerActionText,
    x,
  }
}
