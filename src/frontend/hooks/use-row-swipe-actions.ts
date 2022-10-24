// import { useRef, useState } from 'react'
import { useSpring } from '@react-spring/web'
import React, {  useState } from "react";
import { useDrag } from '@use-gesture/react';
import { isIntentionalXAxisGesture } from '../../utils/directions';

const left = {
  bg: `linear-gradient(120deg, #f093fb 0%, #f5576c 100%)`,
  justifySelf: 'end',
}
const right = {
  bg: `linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)`,
  justifySelf: 'start',
}

export interface Props {
  leftSwipeAction: () => void;
  rightSwipeAction: () => void;
  swipeLengthThreshold?: number;
}

export const useRowSwipeActions = ({
  leftSwipeAction,
  rightSwipeAction,
  swipeLengthThreshold = 50,
}: Props) => {
  const [layerActionText, setlayerActionText] = useState('🗑');
  const [{ x, bg, height, justifySelf }, api] = useSpring(() => ({
    x: 0,
    height: 50,
    ...left,
  }));

  const bind = useDrag(({ active, cancel, movement: [mx, my] }) => {
    if (!isIntentionalXAxisGesture(mx, my)) {
      return;
    }

    if (layerActionText === '🗑' && mx > 0) {
      setlayerActionText('💿');
    }

    if (layerActionText === '💿' && mx < 0) {
      setlayerActionText('🗑');
    }

    if (active) {
      return api.start({
        x: active ? mx : 0,
        ...(mx < 0 ? left : right),
        immediate: name => active && name === 'x',
      });
    }
    cancel();
    const isSwipeLengthOverThreshold = Math.abs(mx) > swipeLengthThreshold;

    if (!isSwipeLengthOverThreshold) {
      return;
    }

    const finalizeActionAnimations = {
      x: mx > 0 ? 400 : 0,
      height: 0,
      immediate: true,
    };

    if (mx < 0) {
      leftSwipeAction();
    } else {
      rightSwipeAction();
    }

    api.start(finalizeActionAnimations);
  });

  return {
    bind,
    layerActionText,
    x, bg, height, justifySelf,
  }
}
